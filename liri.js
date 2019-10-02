require("dotenv").config();

var request = require("request");
var fs = require("fs");

// Spotify
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  //concert-this
  case 'concert-this':
    concert();
    break;
  //Spotify Case
  case 'spotify-this-song':
    song();
    break;
  //Movie Case
  case 'movie-this':
    movie();
    break;
  //Do What It Says Case
  case 'do-what-it-says':
    followDirections();
    break;
  //Default
  default:
    console.log("I'm sorry, I don't understand. \n Would you like to: \n concert-this to find concerts of bands around your area.\n'spotify-this-song' to find information about a song.\n'movie-this' to find information about a movie.")
}


// spotify
//   .search({ type: 'track', query: 'All the Small Things' })
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(err) {
//     console.log(err);
//   });
  
//   node liri.js concert-this <artist/band name here>


// This will search the Bands in Town Artist Events API ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp") for an artist and render the following information about each event to the terminal:


// Name of the venue


// Venue location


// Date of the Event (use moment to format this as "MM/DD/YYYY")






// node liri.js spotify-this-song '<song name here>'


// This will show the following information about the song in your terminal/bash window


// Artist(s)


// The song's name


// A preview link of the song from Spotify


// The album that the song is from




// If no song is provided then your program will default to "The Sign" by Ace of Base.


// You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.


// The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:


// Step One: Visit https://developer.spotify.com/my-applications/#!/


// Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.


// Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.


// Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.


// node liri.js movie-this '<movie name here>'

function movie() {
  var movie = '';
  if (value === undefined) {
    console.log(`--------------------`);
    console.log(`If you haven't watched "Mr. Nobody," then you should!`);
    console.log(`It's on Netflix!`);
    console.log(`--------------------`);
    movie = 'Mr. Nobody'
  } else {
    movie = value;
    console.log(`--------------------`);
    console.log(`Here's what I found about the movie!`);
  }
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(`Movie Title: ${JSON.parse(body).Title}`);
      console.log(`Release Year: ${JSON.parse(body).Year}`);
      
      //To fix for movies with weird ratings...
      var imdb = "";
      var rotten = "";
			if (JSON.parse(body).Ratings[0]) {
				imdb = JSON.parse(body).Ratings[0].Value
			} else {
				imdb = JSON.parse(body).imdbRating
			};
			if (JSON.parse(body).Ratings[1]) {
				rotten = JSON.parse(body).Ratings[1].Value
			} else {
				rotten = 'No rating for this movie.'
      }
      console.log(`IMDB Rating: ${imdb}`);
      console.log(`Rotten Tomatoes Rating: ${rotten}`)
      console.log(`Country: ${JSON.parse(body).Country}`);
      console.log(`Language: ${JSON.parse(body).Language}`);
      console.log(`Plot: ${JSON.parse(body).Plot}`);
      console.log(`Actor(s): ${JSON.parse(body).Actors}`);
      console.log(`--------------------`);
      var movieData = `\nUsed movie-this to find: \nTitle: ${JSON.parse(body).Title} \nYear: ${JSON.parse(body).Year} \nIMDB Rating: ${imdb} \nRotten Tomatoes Rating: ${rotten} \nCountry:${JSON.parse(body).Country} \nLanguage: ${JSON.parse(body).Language} \nPlot: ${JSON.parse(body).Plot} \nActor(s): ${JSON.parse(body).Actors} \n--------------------`
    
      
     
    }else{
      console.log(`Something went wrong!`)
    }
  });
}

// This will output the following information to your terminal/bash window:
//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.


// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'


// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/


// It's on Netflix!




// You'll use the axios package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.




// node liri.js do-what-it-says


// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.


// Edit the text in random.txt to test out the feature for movie-this and concert-this.