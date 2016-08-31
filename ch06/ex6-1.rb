# email 변경

# 대치 업데이트	
user_id = BSON::ObjectId("4c4b1476238d3b4dd5000001")
doc = @users.find_one({:_id => user_id})

doc['email'] = 'mongodb-user@10gen.com'
@users.update({:_id => user_id}, doc, :safe => true)

# 타킷 업데이트
@users.update({:_id => user_id},
  {'$set' => {:email => 'mongodb-user@10gen.com'}},
  :safe => true)


# 배송주소 추가

# 대치 업데이트
doc = @users.find_one({:_id => user_id})

new_address = {
  :name => "work",
  :street => "17 W. 18th St.",
  :city => "New York",
  :state => "NY",
  :zip => 10011
}
doc['shipping_address'].append(new_address)
@users.update({:_id => user_id}, doc)

# 타깃 업데이트
@users.update({:_id => user_id},
  {'$push' => {:address =>
    { :name   => "work",
	  :street => "17 W. 18th St.",
	  :city   => "New York",
	  :state  => "NY",
	  :zip    => 10011
	}
  }
})


