// required files and apis 

var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var spotify = require("spotify");

// my tweets: pulls my 20 most recent tweets 


if (process.argv[2] === "my-tweets") {

		var client = new twitter(keys)

		var params = {
			screen_name: 'jjdaurora', 
			count: 20
		}; 

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (error)	{
			console.log(error);
		}

		else {
			console.log("")
			console.log("JJ's recent tweets");
			console.log("--------------------------");
			tweets.forEach(function(userTweets){
				console.log("Date: " + userTweets.created_at);
				console.log("Tweet: " + userTweets.text);
				console.log("--------------------------");
			});
  		};	
	});
}


// spotify 

if (process.argv[2] === "spotify-this-song") {
	
}
