// 9.2.2 샤딩 클러스터에서의 쓰기 연산

{
  _id: ObjectId("4d6f29c0e4ef0123afdacaeb"),
  filename: "sheet-1",
  updated_at: new Date(),
  username: "banks",
  data: "RAW DATA"
}

$ ruby load.rb 1

$ mongo arete:40000
use cloud-docs
db.spreadsheets.count()
db.spreadsheet.stats().size
db.spreadsheets.findOne({}, {data: 0})

use config
db.chunks.count()
db.chunks.findOne()


$ ruby load.rb 100

db.spreadsheets.count()
db.spreadsheets.stats().size

use config
db.chunks.count()
sh.status()

db.chunks.count({"shard": "shard-a"})
db.chunks.count({"shard": "shard-b"})



$ ruby load.rb 800

use config
db.chunks.count()

db.chunks.count({"shard": "shard-a"})
db.chunks.count({"shard": "shard-b"})

db.changelog.count({what: "split"})
db.changelog.find({what: "moveChunk.commit"}).count()

db.changelog.findOne({what: "moveChunk.commit"})

