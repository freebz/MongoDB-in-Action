// 7.2 인덱싱의 실제
// 7.2.1 인덱스 타입

// 고유 인덱스
db.users.ensureIndex({username: 1}, {unique: true})

// 중복키 자동삭제
db.users.ensuerIndex({username: 1}, {unique: true, dropDups: true})

// 희소 인덱스
// 널값 질의
db.products.find({category_ids: null})

db.products.ensureIndex({sku: 1}, {unique: true, spares: true})
db.reviews.ensureIndex({user_id: 1}, {spares: true})

// 다중키 인덱스
{ name: "Wheelbarrow",
  tags: ["tools", "gardening", "soil"]
}
// tags에 대해 인덱스 생성시 다중키 인덱스 생성됨

// 7.2.2 인덱스 관리

// 인덱스 생성과 삭제

spec = {ns: "green.users", key: {'address.zip': 1}, name: 'zip'}
db.system.indexes.insert(spec, true)

db.system.indexes.find()

use green
db.runCommand({deleteIndexes: "users", index: "zip"})

use green
db.users.ensuerIndex({zip: 1})

db.users.getIndexSpecs()

use green
db.users.dropIndex("zip_1")

// 인덱스 구축
db.values.ensuerIndex({open: 1, close: 1})

db.currentOp()

// 백그라운드 인덱싱
db.values.ensureIndex({open: 1, close: 1}, {background: true})

// 오프라인 인덱싱

// 압축
db.values.reIndex()

