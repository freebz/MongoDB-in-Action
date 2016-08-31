// 9.3 샤딩 클러스터 질의 및 인덱싱

// 9.3.1 샤드 쿼리 타입

selector = {username: "Abbott",
	"_id" : ObjectId("4e8a1372238d3bece8000012")}
db.spreadsheets.find(selector).explain()
db.spreadsheets.find({username: "Abbott"}).explain()
db.spreadsheets.find({filename: "sheet-1"}).explain()

db.spreadsheets.ensureIndex({updated_at: 1})
db.spreadsheets.find({}).sort({updated_at: 1}).explain()

db.spreadsheets.ensureIndex({username: 1, updated_at: -1})
db.spreadsheets.find({username: "Wallace"}).sort(
		{updated_at: -1}).explain()


// 9.3.2 인덱싱


// 9.4 샤드 키 선택

// 9.4.1 비효과적인 샤드 키

// 고르지 못한 분포
// 지역성 결핍
// 분할될 수 없는 청크

// 9.4.2 이상적인 샤드 키

// 1. 삽입 연산을 샤드 간에 고르게 분산해야 한다.
// 2. CRUD 연산이 지역성의 장점을 이용할 수 있어야 한다.
// 3. 청크가 분할될 수 있을 정도로 충분히 세분화되어야 한다.


// 9.5 실제 서비스에서의 샤딩

// 9.5.1 배포와 구성

// 초기 로드 시 청크 선분할

sh.splitAt( "cloud-docs.spreadsheets",
		{ "username" : "Chen", "_id" : ObjectId("4d6d59db1d41c8536f001453") })

sh.moveChunk("cloud-docs.spreadsheets", {username: "Chen"}, "shardB")


// 9.5.2 관리

// 샤드 추가

sh.addShard("shard-c/rs1.example.net:27017,rs2.example.net:27017")

// 샤드 삭제

use admin
db.runCommand({removeshard: "shard-1/arete:30100,arete:30101"})

// 제거 프로세스의 상태 (명령 재실행)
db.runCommand({removeshard: "shard-1/arete:30100,arete:30101"})


use config
db.databases.find()

db.runCommand({moveprimary: "test", to: "shard-0-test-rs" });

db.runCommand({removeshard: "shard-1/arete:30100,arete:30101"})

// 컬렉션을 샤드에서 제거하기

$ mongodump -h arete --port 40000 -d cloud-docs -c foo

$ mongorestore -h arete --port 40000 -d cloud-docs -c bar


// 밸런서 중지

use config
db.settings.update({_id: "balancer"}, {$set: {stopped: true}}, true);

use config
db.locks.find({_id: "balancer"})

use config
db.settings.update({_id: "balancer"}, {$set: {stopped: false}}, true);


sh.setBalancerState(false)
