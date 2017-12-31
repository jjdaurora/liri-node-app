// required files and apis 

var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var spotify = require('node-spotify-api');

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
				console.log("JJ's Tweet: " + userTweets.text);
				console.log("--------------------------");
			});
  		};	
	});
}

// spotify 

if (process.argv[2] === "spotify-this-song") {

	  var lirify = new spotify({
	  id: 'e8644fbd17994e87bee7ce0557f71914',
	  secret: '121ecc1d6ee44c9c99df4f550952d68f'
	});

	var nodeArgs = process.argv; 

	var liriTrack = "";

		for (var i = 3; i < nodeArgs.length; i++){
			if (i > 3 && i < nodeArgs.length){
				liriTrack = liriTrack + "+" + nodeArgs[i];
			}
			else {
				liriTrack += nodeArgs[i];
			}
		}

		if (liriTrack.length < 1) {
			liriTrack = "The Sign Ace of Base";
		}


	function startLirify() {
		lirify.search({ type: 'track', query: liriTrack}, function(err, data) {
	  		if (err) {
	  	  
	  	  	return console.log('Error occurred: ' + err);
	 	
	 	 	} // grabbed this from the npm documentation 
	 		
	 		else {
	 			var searchedTrack = data.tracks.items[0];
	 			var liriResult = 
	 							console.log("--------------------------")
	 							console.log(searchedTrack.artists[0].name)
	 							console.log(searchedTrack.name);
	 							console.log(searchedTrack.external_urls.spotify);
	 							console.log(searchedTrack.album.name);
	 							console.log("--------------------------")

 					}
			});
		}; 

	startLirify();
	
};