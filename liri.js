// required files and apis 

var keys = require("./keys.js");
var request = require("request");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");


var command = process.argv[2];
var liriTrack = process.argv[3];
var liriMovie = process.argv[3];

switch (command) {
	case "my-tweets":
		runMyTweets();
		break;
	case "spotify-this-song":
		runSpotify(liriTrack);
		break;
	case "movie-this":
		runOmdb(liriMovie);
		break;
	case "do-what-it-says":
		runAltFunction();
		break;
	default: 
}

// Twitter 
function runMyTweets () {

		var client = new twitter(keys)

	var parameters = {
			screen_name: 'jjdaurora', 
			count: 20
	}
	client.get('statuses/user_timeline', parameters, function (error, tweets, response) {
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

function runSpotify (liriTrack) {

	if (liriTrack === undefined) {
		liriTrack = "The Sign Ace of Base";
	}

	var spotify = new Spotify({
		id: "e8644fbd17994e87bee7ce0557f71914",
		secret: "121ecc1d6ee44c9c99df4f550952d68f"
	});

	spotify.search({ type: 'track', query: liriTrack }, function (err, data) {
		if (err) {
			return console.log('Spotify hates you. Find out why: ' + err);
		}

		console.log("-------------------------------------------------------")
		console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
		console.log("Title: " + data.tracks.items[0].name);
		console.log("Album: " + data.tracks.items[0].album.name);
		console.log("Preview: " + data.tracks.items[0].external_urls.spotify);
		console.log("-------------------------------------------------------")

	});
}

function runOmdb (liriMovie) {

	if (liriMovie === undefined) {
		liriMovie = "Mr. Nobody";
	}

var request = require("request");
// Then run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?t="+ liriMovie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {
	    // Parse the body of the site and recover just the imdbRating
	    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
		console.log("-------------------------------------------------------");
		console.log("Movie Title: " + JSON.parse(body).Title);
		console.log("Release Year: " + JSON.parse(body).Year);
		console.log("Rotten Tomatoes Rating: "  + JSON.parse(body).tomatoRating);
		console.log("Production Location: " + JSON.parse(body).Country);
		console.log("Plot: " + JSON.parse(body).Plot);
		console.log("Rating: " + JSON.parse(body).imdbRating);
		console.log("-------------------------------------------------------")
	  }
	});
}; 
