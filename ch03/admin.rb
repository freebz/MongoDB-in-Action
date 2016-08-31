require 'rubygems'
require 'mongo'

@con = Mongo::Client.new('mongodb://localhost:27017/admin')
@admin_db = @con.database
@admin_db.command({"listDatabases" => 1})

