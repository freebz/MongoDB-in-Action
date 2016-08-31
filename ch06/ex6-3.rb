# 카테고리 계층구조

def generate_ancestors(_id, parent_id)
  ancestor_list = []
  while parent = @categories.find_one(:_id => parent_id) do
    ancestor_list.unshift(parent)
	parent_id = parent['parent_id']
  end

  @categories.update({:_id => _id},
	{"$set" {:ancestors => ancestor_list}})
end

# 새 카테고리 추가
category = {
  :parent_id => parent_id,
  :slug => "gardening",
  :name => "Gardening",
  :description => "All gardening implements, tools, seeds, and soil."
}
gardening_id = @categories.insert(category)
generate_ancestors(gardening_id, parent_id)

# 카테고리 위치 변경
@categories.update({:_id => outdorrs_id},
		           {'$set' => {:parent_id => gardening_id}})

@categories.find({'ancestors.id' => outdoors_id}).each do |category|
  generate_ancestors(category['_id'], outdoors_id)
end

# 카테고리의 속성 변경
doc = @categories.find_one({:_id => outdoors_id})
doc['name'] = "The Great Outdoors"
@categories.update({:_id => outdoors_id}, doc)

@categories.update({'ancestors.id' => outdoors_id},
  {'$set' => {'ancestors.$' => doc}}, :multi => true)

