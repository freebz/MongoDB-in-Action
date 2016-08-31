// 8.2.2 복제 작동 방식

// 오피로그

// Primary
use local
show collections
db.oplog.rs.findOne({op: "i"})
db.oplog.rs.findOne({ts: {t: 1296864947000, i: 1}})
db.oplog.rs.findOne({ts: new Timestamp(1296864947000, 1)})

use bookstore
db.books.insert({title: "A Tale of Two Cities"})
db.books.insert({title: "Great Expectations"})

db.books.update({}, {$set: {author: "Dickens"}}, false, true)

use local
db.oplog.$main.find({op: "u"})
db.getReplicationInfo()
db.oplog.rs.find().sort({$natural: -1}).limit(1)

// 오피로그 크기 지정
mongod --replSet myapp --oplogSize 1024 // MB단위 1G 오피로그

