// 10장 배포와 관리

// 저널링
$ mongod --nojournal  // 미사용시

db.runCommand({getlasterror: 1, j: true})	// 저널에 쓰기까지 기다림

@collection.insert(doc, :safe => {:j => true})	// Ruby 드라이버


// 10.1.3 데이터 들여오기와 내보내기

$ mongoimport -d stocks -c values --type csv --headerline stocks.csv

$ mongoexport -d stocks -c values -o stocks.csv


// 10.1.4 보안

// 인증 API

use admin
db.addUser("boss", "supersecret")


$ mongod --auth

use admin
db.auth("boss", "supersecret")

use stocks
db.addUser("treader", "moneyfornuthin")
db.addUser("read-only-trader", "foobar", true)	// 읽기만 가능

db.system.users.find()

db.removeUser()

db.runCommand({logout: 1})

