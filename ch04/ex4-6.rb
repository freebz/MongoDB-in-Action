require 'rubygems'
require 'mongo'

VIEW_PRODUCT = 0
ADD_TO_CART = 1
CHECKOUT = 2
PURCHASE = 3

@con = Mongo::Client.new('mongodb://localhost:27017/garden')
@db = @con.database

#@db.drop_collection("user.actions")
#@db.create_collection("user.actions", :capped => true, :size => 1024)

@db["user.actions"].drop

@db["user.actions", :capped => true, :size => 1024].create

@actions = @db['user.actions']

20.times do |n|
  doc = {
	:username => "kbanker",
	:action_code => rand(4),
	:time => Time.now.utc,
	:n => n
  }

  @actions.insert_one(doc)
end

