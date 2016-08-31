// 8장 복제

// 8.1 복제 개관

// 8.1.1 복제의 중요성
// 8.1.2 복제의 사용 예

// 8.2 복제셋

// 8.2.1 셋업

mkdir /data/node1
mkdir /data/node2
mkdir /data/arbiter

mongod --replSet myapp --dbpath /data/node1 --port 40000
mongod --replSet myapp --dbpath /data/node2 --port 40001
mongod --replSet myapp --dbpath /data/node3 --port 40002

// Primary
rs.initiate()
rs.add("localhost:40001")
rs.add("arete.local:40002", {arbiterOnly: true})

db.isMaster()
rs.status()

mongo arete:40000
use bookstore
db.books.insert({title: "Oliver Twist"})
show dbs

// Secondary
mongo arete:40001
rs.slaveOk()
show dbs
use bookstore
db.books.find()

// Primary
use admin
db.shutdownServer()

// Secondary
rs.status()

