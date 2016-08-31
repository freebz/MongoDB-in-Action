# 6.2.3 오더

cart_item = {
  _id: ObjectId("4c4b1476238d3b4dd5003981"),
  slug: "wheel-barrow-9092",
  sku: "9092",

  name: "Extra Large Wheel Barrow",

  pricing: {
	retail: 589700,
	sale: 489700
  }
}


# 장바구니가 없을 경우에만 생성한다.
selector = {user_id: ObjectId("4c4b1476238d3b4dd5000001"),
	        state: 'CART',
			'line_items.id':
              {'$ne': ObjectId("4c4b1476238d3b4dd5003981")}
           }

update = {'$push': {'line_items': cart_item}}

db.orders.update(selector, update, true, false)

# 아이템 개수와 합계 금액이 맞도록 수정함
selector = {user_id: ObjectId("4c4b1476238d3b4dd5000001"),
	        state: 'CART',
			'line_items.id': ObjectId("4c4b1476238d3b4dd5003981")}

update = {$inc:
            {'line_items.$.qty': 1,
			 sub_total: cart_item['pricing']['sale']
			}
         }

db.orders.update(selector, update)

