// 6.4 실제적인 세부사항: MongoDB 업데이트와 삭제

// 6.4.1 업데이트 타입과 옵션

db.products.update({}, {$addToSet: {tags: 'green'}})

db.products.update({'price' => {$lte => 10}},
	{$addToSet: {tags: 'cheap'}})

// 모호한 업데이트
db.products.update({}, {name: "Pitchfork", $addToSet: {tags: 'cheap'}})

// 이름 변경 및 태그 추가
db.products.update({},
  {$set: {name: "Pichfork"}, $addToSet: {tags: 'cheap'}})

// 다중 업데이트 (네번째 파라메터 true)
db.products.update({}, {$addToSet: {tags: 'cheap'}}, false, true)

// 루비드라이버
@products.update({}, {'$addToSet'=>{'tags' => 'cheap'}}, :multi=>true)

// UPSERT (세번째 파라메터 true)
db.products.update({slug: 'hammer'}, {$addToSet: {tags:'cheap'}}, true)

// 루비드라이버
@products.update({'slug' => 'hammer'},
  {'$addToSet' => {'tags' => 'cheap'}}, :upsert => true)


// 6.4.2 업데이트 연산자

// 표준적인 업데이트 연산자
// $INC
db.products.update({slug: "shovel"}, {$inc: {review_count: 1}})
db.users.update({username: "moe"}, {$inc: {password_retires: -1}})

db.readings.update({_id: 324}, {$inc: {temp: 2.7435}})
db.readings.update({_id: 324}, {$inc: {temp: 2.7435}}, true)

// $SET과 $UNSET
db.readings.update({_id: 324}, {$set: {temp: 97.6}})
db.readings.update({_id: 325}, {$set: {temp: {f: 212, c:100} })
db.readings.update({_id: 326}, {$set: {temps: [97.6, 98.4, 99.1]}})

db.readings.update({_id: 324}, {$unset: {temp: 1})
db.readings.update({_id: 325}, {$unset: {'temp.f': 1}})
db.readings.update({_id: 326}, {$pop: {temps: -1})

// $rename (키 이름 변경)
db.readings.update({_id: 324}, {$rename: {'temp': 'temperature'})
db.readings.update({_id: 325}, {$rename: {'temp.f': 'temp.farenheit'})

// 배열 업데이트 연산자
// $push AND $pushAll
db.products.update({slug: 'shovel'}, {$push: {'tags': 'tools'}})
db.products.update({slug: 'shovel'}, {$pushAll: {'tags': ['tools', 'dirt', 'garden']}})

// $addToSet과 $each (배열에 없는 경우만 추가)
db.products.update({slug: 'shovel'}, {$addToSet: {'tags': 'tools'}})
db.products.update({slug: 'shovel'}, {$addToSet: {'tags': {$each ['tools', 'dirt', 'steel']}}})

// $pop
db.products.update({slug: 'shovel'}, {$pop: {'tags': 1}}) // 마지막 데이터 삭제
db.products.update({slug: 'shovel'}, {$pop: {'tags': -1}}) // 첫번째 데이터 삭제

// $pull과 $pullAll (원소 위치 대신 값으로 배열 아이템 삭제)
db.products.update({slug: 'shovel'}, {$pull: {'tags': 'dirt'}})
db.products.update({slug: 'shovel'}, {$pullAll: {'tags': ['dirt', 'garden']}})

// 위치 업데이트
query = {_id: ObjectId("4c4b1476238d3b4dd5003981"),
	    'line_items.sku': "10027"}

update = {$set: {'line_items.$.quantity': 5}}

db.orders.update(query, update)


// 6.4.3 findAndModify 명령
// 6.4.4 삭제
db.reviews.remove({})
db.reviews.remove({user_id: ObjectId('4c4b1476238d3b4dd5000001')})

// 6.4.5 동시성, 원자성, 고립
// 쓰기 연산을 양보하지 못하게 함
db.reviews.remove({user_id: ObjectId('4c4b1476238d3b4dd5000001'), {$atomic: true}})
db.reviews.update({$atomic: true}, {$set: {rating: 0}}, false, true)


// 6.4.6 업데이트 성능

