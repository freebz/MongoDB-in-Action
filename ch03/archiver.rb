require 'rubygems'
require 'mongo'
require 'twitter'

require_relative 'config'

class TweetArchiver
  # TweetArchiver 새로운 인스턴스를 생성
  def initialize(tag)
	connection = Mongo::Client.new(['localhost:27017'], :database => DATABASE_NAME)
	db         = connection.database
	@tweets    = db[COLLECTION_NAME]
	@tweets.indexes.create_one({ :id => 1 }, :unique => true)
	@tweets.indexes.create_many([
			{ :key => { tags: 1 } },
			{ :key => { id: -1 } }
	])

	@tag = tag
	@tweets_found = 0
  end

  def update
    puts "Starting Twitter search for '#{@tag}'..."
	save_tweets_for(@tag)
	print "#{@tweets_found} tweets saved.\n\n"
  end

  private

  def save_tweets_for(term)

	config = {
	  :consumer_key    => "M9OV3yovcZ3BBtV1dkQhnNwDq",
	  :consumer_secret => "xGtOpM03Wk3KQvdTf3dRdbS9QZPtfaARrfnnz3oqKONBDQqjvy",
	}

	client = Twitter::REST::Client.new(config)
	client.search(term).each do |tweet|
	  @tweets_found += 1
	  tweet_with_tag = tweet.to_hash.merge!({"tags" => [term]})
	  @tweets.insert_one(tweet_with_tag)
	end
  end

end

