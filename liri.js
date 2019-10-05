require("dotenv").config();

var request = require("request");
var fs = require("fs");

var moment = require('moment')

// Spotify gets
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var action = process.argv[2];
var value = process.argv.slice(3).join(" ");

switch (action) {

  case "concert-this":
    concert();
    break;

  case "spotify-this-song":
    song();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    doIt();
    break;

  default:
    console.log("--------------------");
    console.log("I'm sorry, I don't understand. \n Would you like to: \n 'concert-this' to find concerts of bands around your area.\n'spotify-this-song' to find information about a song.\n'movie-this' to find information about a movie.")
}

//   node liri.js concert-this <artist/band name here>
function concert() {
  var artist = "";
  artist = value;
  console.log("--------------------");
  console.log("Here's what I found for concerts!");
  request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {

    if (!error && response.statusCode === 200) {

      if (JSON.parse(body).length > 0) {
        for (i = 0; i < 1; i++) {

          console.log(`Artist: ${JSON.parse(body)[i].lineup[0]}`)
          console.log(`Venue: ${JSON.parse(body)[i].venue.name}`)
          console.log(`Venue City: ${JSON.parse(body)[i].venue.city}, ${JSON.parse(body)[i].venue.country}`)
          console.log(`Date and Time: ${moment(JSON.parse(body)[i].datetime).format("MM/DD/YYYY hh:mm")}`)
          var concertData = `\n-------- Liri concert-this -------- \nArtist: ${JSON.parse(body)[i].lineup[0]} \nVenue: ${JSON.parse(body)[i].venue.name} \nVenue City: ${JSON.parse(body)[i].venue.city}, ${JSON.parse(body)[i].venue.country} \nDate and Time: ${moment(JSON.parse(body)[i].datetime).format("MM/DD/YYYY hh:mm")} \n`

          fs.appendFile('log.txt', concertData, function (error) {
            if (error) throw error;
          });
        };
      } else {
        console.log('Band or concert not found!');
      };
    };
  });
};

// node liri.js spotify-this-song '<song name here>'
function song() {
  var song = "";
  if (value === undefined) {
    song = "The Sign Ace of Base"
  } else {
    song = value;
  }
  console.log("--------------------");
  console.log("Here's what I found about the song!")
  spotify.search({
    type: "track",
    query: song
  }, function (error, data) {
    if (!error) {
      console.log(`Song: ${data.tracks.items[0].name}`);
      console.log(`Artist(s): ${data.tracks.items[0].artists[0].name}`);
      console.log(`Preview Link: ${data.tracks.items[0].external_urls.spotify}`);
      console.log(`Album: ${data.tracks.items[0].album.name}`);
      var songData = `\n-------- Liri spotify-this-song -------- \nArtist: ${data.tracks.items[0].artists[0].name} \nSong Name: ${data.tracks.items[0].name} \nSpotify Preview Link: ${data.tracks.items[0].external_urls.spotify} \nAlbum: ${data.tracks.items[0].album.name} \n`

      fs.appendFile('log.txt', songData, function (error) {
        if (error) throw error;
      });
    }
  });
}

// node liri.js movie-this '<movie name here>'
function movie() {
  var movie = "";
  if (value === undefined) {
    console.log("--------------------");
    console.log("If you haven't watched 'Mr. Nobody,' then you should!");
    console.log("It's on Netflix!");
    console.log("--------------------");
    movie = "Mr. Nobody"
  } else {
    movie = value;
    console.log(`--------------------`);
    console.log(`Here's what I found about the movie!`);
  }
  request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece", function (error, response, body) {
    if (!error) {
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
      var movieData = `\n-------- Liri movie-this -------- \nTitle: ${JSON.parse(body).Title} \nYear: ${JSON.parse(body).Year} \nIMDB Rating: ${imdb} \nRotten Tomatoes Rating: ${rotten} \nCountry:${JSON.parse(body).Country} \nLanguage: ${JSON.parse(body).Language} \nPlot: ${JSON.parse(body).Plot} \nActor(s): ${JSON.parse(body).Actors} \n`

      fs.appendFile('log.txt', movieData, function (error) {
        if (error) throw error;
      });

    } else {
      console.log("Something went wrong!")
    }
  });
}



// node liri.js do-what-it-says
function doIt() {
  fs.readFile('random.txt', 'utf8', function (error, data) {

    if (error) {
      return console.log(error);
    } else {

      var dataArray = data.split(',');
      action = dataArray[0];
      value = dataArray.slice(1).join(" ");
      console.log("Reading text...");

      fs.appendFile('log.txt', '\n-------- reading random.txt --------', function (error) {
        if (error) throw error;
      });

      switch (action) {

        case "concert-this":
          concert();
          break;

        case "spotify-this-song":
          song();
          break;

        case "movie-this":
          movie();
          break;

        default:
          console.log("--------------------");
          console.log("Not found.")
      }
    }
  })
}