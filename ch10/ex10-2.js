// 10.2 모니터링과 진단

// 10.2.1 로깅

--logpath
--vvvvv

--logappend

// 로그 순환
use admin
db.runCommand({logrotate: 1})

// 또는 프로세스에 SIGUSR1 신호를 전송
$ kill -SIGUSR1 12345


// 10.2.2 모니터링 도구

use admin
db.runCommand({serverStatus: 1})

use admin
db.runCommand({top: 1})

db.currentOp()
db.killOp("shard-1-test-rs:1232866")

// 모든 연산의 자세한 리스트
db['$cmd.sys.inprog'].find({$all: 1})


// MONGOSTAT

$ mongostat

// 웹 콘솔
http://localhost:28017


// 10.2.4 진단 도구(mongosniff, bsondump)

$ sudo mongosniff --source NET I0

$ bsondump user.bson

$ bsondump --type=debug users.bson

