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

//   node liri.js concert-this <artist/band name here>
      
function concert() {
  var artist = '';
    artist = value;
    console.log(`--------------------`);
    console.log(`Here's what I found for concerts!`);
    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (response, body) {
      
      console.log(`Venue: ${JSON.parse(body).venue}`);
    })
  }
  
  
  // Name of the venue
  
  
  // Venue location
  
  
  // Date of the Event (use moment to format this as "MM/DD/YYYY")

  // node liri.js spotify-this-song '<song name here>'

function song() {
  var song = '';
  if (input === undefined) {
    song = 'The Sign Ace of Base'
  } else {
    song = input;
  }
  console.log(`--------------------`);
  console.log(`Here's what I found about the song!`)
  spotify.search({ type: 'track', query: song }, function (error, data) {
    if (!error) {
      console.log(`Song: ${data.tracks.items[0].name}`);
      console.log(`Artist(s): ${data.tracks.items[0].artists[0].name}`);
      console.log(`Preview Link: ${data.tracks.items[0].external_urls.spotify}`);
      console.log(`Album: ${data.tracks.items[0].album.name}`);
      var songData = `\nUsed spotify-this-song to find: \nArtist: ${data.tracks.items[0].artists[0].name} \nSong Name: ${data.tracks.items[0].name} \nSpotify Preview Link: ${data.tracks.items[0].external_urls.spotify} \nAlbum: ${data.tracks.items[0].album.name}\n--------------------`
      fs.appendFile('log.txt', songData, function (error) {
        if (error) throw error;
      });
    }
  });
}





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
      
      //Fixing ratings
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



// node liri.js do-what-it-says


// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.


// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.


// Edit the text in random.txt to test out the feature for movie-this and concert-this.