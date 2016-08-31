result = db.reviews.group({
  key:		{user_id: true},
  initial:	{reviews: 0, votes: 0.0},
  reduce:	function(doc, aggregator) {
			  aggregator.reviews += 1;
			  aggregator.votes += doc.votes;
			},
  finalize: function(doc) {
              doc.average_votes = doc.votes / doc.reviews;
			}
})

