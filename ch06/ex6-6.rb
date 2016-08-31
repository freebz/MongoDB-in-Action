# 6.3 원자적 도큐먼트 프로세싱

# 6.3.1 오더 상태 전이

# 상태를 승인 이전으로 변경
db.orders.findAndModify({
  query: {user_id: ObjectId("4c4b1476238d3b4dd5000001"),
            state: "CART" },
  update: {"$set": {"state": "PRE-AUTHORIZE"},
            new: true}
})

# 상태를 승인으로 변경
db.orders.findAndModify({
  query: {user_id: ObjectId("4c4b1476238d3b4dd5000001"),
            total: 99000,
			state: "PRE-AUTHORIZE" },
  update: {"$set": {"state": "AUTHORIZING"}}
})

# 승인 정보 저장
auth_doc = {ts: new Date(),
	        cc: 3432003948293040,
			id: 2923838291029384483949348,
			gateway: "Authorize.net"}

db.orders.findAndModify({
  query: {user_id: ObjectId("4c4b1476238d3b4dd5000001"),
            state: "AUTHORIZING" },

  update: {"$set":
                {"state": "PRE-SHIPPING"},
				 "authorization": auth_doc}
})

