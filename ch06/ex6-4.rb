# 6.2.2 리뷰

{helpful_votes: 3,
voter_ids: [ ObjectId("4c4b1476238d3b4dd5000041"),
		     ObjectId("7a4f0376238d3b4dd5000003"),
			 ObjectId("92c21476238d3b4dd5000032")
		   ]}

# 타깃 방식 리뷰 추가
db.revies.update({_id: ObjectId("4c4b1476238d3b4dd5000041")},
  {$push: {voter_ids: ObjectId("4c4b1476238d3b4dd5000001")},
   $inc: {helpful_votes: 1}
})

# 추천한적이 없는 사용자만 수행되게 수정
query_selector = {_id: ObjectId("4c4b1476238d3b4dd5000041"),
  voter_ids: {$ne: ObjectId("4c4b1476238d3b4dd5000001")}}
db.reviews.update(query_selector,
  {$push: {voter_ids: ObjectId("4c4b1476238d3b4dd5000001")},
   $inc: {helpful_votes: 1}
})
 
