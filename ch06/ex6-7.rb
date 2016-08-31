# 6.3.2 재고 관리

3.times do
  @inventory.insert({:sku => 'shovel', :state => AVAILABLE})
  @inventory.insert({:sku => 'rake', :state => AVAILABLE})
  @inventory.insert({:sku => 'clippers', :state => AVAILABLE})
end


@order_id = @orders.insert({:username => 'kbanker', :item_ids => []})
@fetcher = InventoryFetcher.new(:orders => @orders,
		                        :inventory => @inventory)

@fetcher.add_to_cart(@order_id,
		             {:sku => "shovel", :qty => 3},
					 {:sku => "clippers", :qty => 1})

order = @orders.find_one({"_id" => @order_id})
puts "\nHere's the order:"
p order

puts "\nHere's each item:"
order['item_ids'].each do |item_id|
  item = @inventory.find_one({"_id" => item_id})
  p item
end


# InventoryFetcher의 일부
def add_to_cart(order_id, *items)
  item_selectors = []
  items.each do |item|
    item[:qty].times do
	  item_selectors << {:sku => item[:sku]}
	end
  end

  transition_state(order_id, item_selectors, :from => AVAILABLE, :to => IN_CART)
end

def transition_state(order_id, selectors, opts={})
  items_transitioned = []

  begin
    for selector in selectors do
	  query = selector.merge(:state => opts[:from])

	  physical_item = @inventory.find_and_modify(:query => query,
		:update=>{'$set'=>{:state => opts[:to],:ts => Time.now.utc}})

	  if physical_item.nil?
	    raise InventoryFetchFailure
	  end

	  items_transitioned << physical_item['_id']

	  @orders.update({:_id => order_id},
			         {"$push" => {:item_ids => physical_item['_id']}})
	end

  rescue Mongo::OperationFailure, InventoryFetchFailure
	rollback(order_id, items_transitioned, opts[:from], opts[:to])
	raise InventoryFetchFailure, "Failed to add #{selector[:sku]}"
  end

  items_transitioned.size
end

def rollback(order_id, item_ids, old_state, new_state)
  @orders.update({"_id" => order_id},
	             {"$pullAll" => {:item_ids => item_ids}})
  item_ids.each do |id|
    @inventory.find_and_modify(
	  :query => {"_id" => id, :state => new_state},
	  :update => {"$set" => {:state=>old_state,:ts => Time.now.utc}}
	)
  end
end

