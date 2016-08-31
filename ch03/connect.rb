require 'rubygems'
require 'mongo'

@con = Mongo::Client.new('mongodb://localhost:27017/tutorial')
@db = @con.database
@users = @db['users']

result = @users.insert_one({"lastname" => "knuth"})
id = result.inserted_id
@users.find({"_id" => id}).first

smith = {"last_name" => "smith", "age" => 30}
jones = {"last_name" => "jones", "age" => 40}

smith_id = @users.insert_one(smith).inserted_id
jones_id = @users.insert_one(jones).inserted_id

p @users.find({"_id" => smith_id}).first
p @users.find({"_id" => jones_id}).first

@users.find({"last_name" => "smith"})
@users.find({"age" => {"$gt" => 20}})

cursor = @users.find({"age" => {"$gt" => 20}})

cursor.each do |doc|
  puts doc["last_name"]
end

#cursor = @users.find({"age" => {"$gt" => 20}})

#while doc = cursor.next
#  puts doc["last_name"]
#end

@users.update_one({"last_name" => "smith"}, {"$set" => {"city" => "Chicago"}})
@users.update_many({"last_name" => "smith"}, {"$set" => {"city" => "Chicago"}})
@users.delete_many({"age" => {"$gte" => 40}})
@users.delete_many
@users.drop

id = BSON::ObjectId.new
id.generation_time

oct_id = BSON::ObjectId.from_time(Time.utc(2010, 10, 1))
nov_id = BSON::ObjectId.from_time(Time.utc(2010, 11, 1))

@users.find({'_id' => {'$gte' => oct_id, '$lt' => nov_id}})


