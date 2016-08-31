// 8.2.3 관리

config = {_id: "myapp", members: []}

config.members.push({_id: 0, host: 'arete:40000'})
config.members.push({_id: 1, host: 'arete:40001'})
config.members.push({_id: 2, host: 'arete:40002', arbiterOnly: true})

rs.initiate(config)
db.runCommand({replSetInitiate: config});	// 위와 동일
db.runCommand({replSetReconfig: config});	// 수정

use local
config = db.system.replset.findOne()
config.members[1].host = "foobar:40000"
rs.reconfig(config)

