// 8.3 마스터-슬래이브 복제

// 8.4 드라이버와 복제

// 8.4.1 연결과 장애조치

// 세컨더리 연결
@con = Mongo::Connection.new('arete', 400001, :slave_ok => true)

// 복제셋 연결
Mongo::ReplSetConnection.new(['arete', 40000], ['arete', 40001])

db.isMaster()


// 8.4.2 쓰기 concern

@collection.insert(doc, :safe => {:w => 2, :wtimeout => 200})
@collection.insert(doc, :safe => {:w => "majority"})
@collection.insert(doc, :safe => {:w => 2, :j => true})	// 저널링

// 8.4.3 읽기 스케일링

Mongo::ReplSetConnection.new(['arete', 40000],
		['arete', 40001], :read => :secondary )


// 8.4.4 태깅

{
	"_id" : "myapp",
	"version" : 1,
	"members" : [
		{
			"_id" : 0,
			"host" : "ny1.myapp.com:30000",
			"tags" : { "dc": "NY", "rackNY": "A" }
		},
		{
			"_id" : 1,
			"host" : "ny2.myapp.com:30000",
			"tags" : { "dc": "NY", "rackNY": "A" }
		},
		{
			"_id" : 2,
			"host" : "ny3.myapp.com:30000",
			"tags" : { "dc": "NY", "rackNY": "B" }
		},
		{
			"_id" : 3,
			"host" : "fr1.myapp.com:30000",
			"tags" : { "dc": "FR", "rackFR": "A" }
		},
		{
			"_id" : 4,
			"host" : "fr2.myapp.com:30000",
			"tags" : { "dc": "FR", "rackFR": "B" }
		}
	],
	settings: {
		getLastErrorModes: {
			multiDC: { dc: 2 } },
			multiRack: { rackNY: 2 } },
		}
	}
}


@collection.insert(doc, :safe => {:w => "multiDC"})

// 쓰기가 multiDC를 만족해야 한다.
// multiDC는 쓰기가 dc에 대해 최소한 2개의 다른 값으로 태그된 노드에 복제되어야 한다.
// 이 조건으로 쓰기가 두 데이터 센터에 모두 전파되고,
// 두 번째 노드는 NY에 있는 최소한 2개의 서버 랙에 대해 쓰기를 수행해야 한다.

