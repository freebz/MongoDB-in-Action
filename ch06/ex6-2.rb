# 상품의 평점 평균
avrage = 0.0
count = 0
total = 0
cursor = @reviews.find({:product_id => product_id}, :fields => ["rating"])
while cursor.has_next? && review = cursor.next()
  total += review['rating']
  count += 1
end

average = total / count

@products.update({:_id => BSON::ObjectId("4c4b1476238d3b4dd5003981")},
  {'$set' => {:total_reviews => count, :average_review => average}})

  {'$set' => {:average_review => average, :ratings_total => total},
   '$inc' => {:total_reviews => 1}}
