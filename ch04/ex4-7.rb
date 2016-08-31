require 'rubygems'
require 'mongo'

@con = Mongo::Client.new('mongodb://localhost:27017/garden')
@db = @con.database

docs = (0..40).map do |n|
  { :username => "kbanker",
	:action_code => rand(5),
	:time => Time.now.utc,
	:n => n
  }
end
@col = @db['test.bulk.insert']
@ids = @col.insert_many(docs)
puts "Here are the ids from the bulk insert: #{@ids.inspect}"
