// 9장 샤딩

// 9.1 샤딩 개관

// 9.1.1 샤딩이란
// 9.1.2 샤딩 작동 방식

// 9.2 샘플 샤딩 클러스터

// 9.2.1 셋업

// 샤딩 구성요소 시작

$ mkdir /data/rs-a-1
$ mkdir /data/rs-a-2
$ mkdir /data/rs-a-3
$ mkdir /data/rs-b-1
$ mkdir /data/rs-b-2
$ mkdir /data/rs-b-3

$ mongod --shardsvr --replSet shard-a --dbpath /data/rs-a-1 \
  -- port 30000 --logpath /data/rs-a-1.log --fork --nojournal
$ mongod --shardsvr --replSet shard-a --dbpath /data/rs-a-2 \
  -- port 30001 --logpath /data/rs-a-2.log --fork --nojournal
$ mongod --shardsvr --replSet shard-a --dbpath /data/rs-a-3 \
  -- port 30002 --logpath /data/rs-a-3.log --fork --nojournal

$ mongod --shardsvr --replSet shard-b --dbpath /data/rs-b-1 \
  -- port 30100 --logpath /data/rs-b-1.log --fork --nojournal
$ mongod --shardsvr --replSet shard-b --dbpath /data/rs-b-2 \
  -- port 30101 --logpath /data/rs-b-2.log --fork --nojournal
$ mongod --shardsvr --replSet shard-b --dbpath /data/rs-b-3 \
  -- port 30102 --logpath /data/rs-b-3.log --fork --nojournal

$ mongo arete:30000
rs.initiate()
rs.add("arete:30001")
rs.add("arete:30002", {arbiterOnly: true})

$ mongo arete:30100
rs.initiate()
rs.add("arete:30101")
rs.add("arete:30102", {arbiterOnly: true})


$ mkdir /data/config-1
$ mongod --configsvr --dbpath /data/config-1 --port 27019 \
  --logpath /data/config-1.log --fork --nojournal

$ mkdir /data/config-2
$ mongod --configsvr --dbpath /data/config-2 --port 27020 \
  --logpath /data/config-2.log --fork --nojournal

$ mkdir /data/config-3
$ mongod --configsvr --dbpath /data/config-3 --port 27021 \
  --logpath /data/config-3.log --fork --nojournal


$ mongos --configdb arete:27019,arete:27020,arete:27021 \
  --logpath /data/mongos.log --fork --port 40000


// 클러스터 설정

$ mongo arete:40000
sh.addShard("shard-a/arete:30000,arete:30001")
sh.addShard("shard-b/arete:30100,arete:30101")

db.getSiblingDB("config").shards.find()

use admin
db.runCommand({listshards: 1})
sh.status()

sh.enableSharding("cloud-docs")

db.getSiblingDB("config").databases.find()

sh.shardCollection("cloud-docs.spreadsheets", {username: 1, _id: 1})

db.getSiblingDB("config").collections.find()



$ mongo arete:30000
use cloud-docs
db.spreadsheets.getIndexes()

