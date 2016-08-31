// 7.3 쿼리 최적화

// 7.3.1 느린 쿼리 탐지

$ unzip stocks.zip
$ mongorestore -d stocks -c values dump/stocks

db.values.find({"stock_symbol": "GOOG"}).sort({date: -1}).limit(1)

// 프로파일러 사용
use stocks
db.setProfilingLevel(2)

use stocks
db.setProfilingLevel(1, 50)

db.values.find({}).sort({close: -1}).limit(1)

db.system.profile.find({millis: {$gt: 150}})
db.system.profile.find().sort({$natural: -1}).limit(5)

// 7.3.2 느린 쿼리 분석

// EXPLAIN()의 사용과 이해

db.values.find({}).sort({close: -1}).limit(1).explain()

db.values.count()

db.values.ensureIndex({close: 1})
db.values.find({}).sort({close: -1}).limit(1).explain()
db.values.find({close: {$gt: 500}}).explain()

// MongoDB의 쿼리 옵티마이저와 HINT()
db.values.find({stock_symbol: "GOOG", close: {$gt: 200}})

db.values.find({stock_symbol: "GOOG", close: {$gt: 200}}).explain()

db.values.getIndexKeys()

db.values.dropIndex("stock_symbol_1_close_1")
db.values.ensureIndex({stock_symbol: 1})
db.values.ensureIndex({close: 1})

db.values.find({stock_symbol: "GOOG", close: {$gt: 200}}).explain(true)


query = {stock_symbol: "GOOG", close: {$gt: 100}}
db.values.find(query).hint({close: 1}).explain()

// 7.3.3 쿼리 패턴
// 단일 키 인덱스
// 정확한 일치
db.values.find({close: 100})

// 정렬
db.values.find({}).sort({close: 1})

// 범위 쿼리
db.values.find({close: {$gte: 100})

db.values.find({close: {$gte: 100}).sort({close: 1})

// 복합 키 인덱스
// 정확한 일치
db.values.find({close: 1})
db.values.find({close: 1, open: 1})
db.values.find({close: 1, open: 1, date: "1985-01-08"})

// 범위 일치
db.values.find({}).sort({close: 1})
db.values.find({close: {$gt: 1}})

db.values.find({close: 100}).sort({open: 1})
db.values.find({close: 100, open: {$gt: 1}})

db.values.find({close: 1, open: 1.01, date: {$gt: "2005-0101"}})
db.values.find({close: 1, open: 1.01}).sort({date: 1})

// 커버링 인덱스 (인덱스가 쿼리를 커버하는 경우)
db.values.find({open: 1}, {open: 1, close: 1, date: 1, _id: 0})

// explain() 에서 indexOnly가 true로 표시된다.

