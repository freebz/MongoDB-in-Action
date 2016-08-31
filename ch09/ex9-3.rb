require 'rubygems'
require 'mongo'
require_relative 'names'

@client = Mongo::Client.new("mongodb://localhost:40000/cloud-docs")
@col = @client.database['spreadsheets']
@data = "abcde" * 1000

def write_user_docs(iterations=0, name_count=200)
  iterations.times do |n|
    name_count.times do |n|
	  doc = { :filename => "sheet-#{n}",
		      :updated_at => Time.now.utc,
			  :username => Names::LIST[n],
			  :data => @data
	        }
      @col.insert_one(doc)
	end
  end
end

if ARGV.empty? || !(ARGV[0] =~ /^\d+$/)
  puts "Usage: load.rb [iterations] [name_count]"
else
  iterations = ARGV[0].to_i

  if ARGV[1] && ARGV[1] =~ /^\d+$/
    name_count = ARGV[1].to_i
  else
    name_count = 200
  end

  write_user_docs(iterations, name_count)
end

