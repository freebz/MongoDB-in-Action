// 10.3 유지보수

// 10.3.1 백업과 복구

$ mongodump -h localhost --port 27017

$ mongorestore -h localhost --port 27017 dump


// 데이터 파일 복사

use admin
db.runCommand({fsync: 1, lock: true})

db.$cmd.sys.unlock.findOne()
db.currentOp()


// 10.3.2 압축과 수리

$ mongod --repair

// 데이터베이스 하나만 수리
use cloud-docs
db.runCommand({repairDatabase: 1})

// 인덱스 재구축
use cloud-docs
db.spreadsheets.reIndex()

// 데이터 파일을 다시 쓰고 한 컬렉션에 대한 모든 인데스를 재구축
db.runCommand({ compact: "spreadsheets" })

// 프라이머리에서 압축 명령을 실행할 경우
db.runCommand({ compact: "spreadsheets", force: true })

