//Requiring all packages
require('dotenv').config();
axios = require("axios");
spotify = require("node-spotify-api");

function line(){
    console.log("------------------");
}

console.log(process.env.SPOTIFY_ID);

//Defining user input
command = process.argv[2];
input = process.argv[3];

if(command === "movie-this"){
    if(input){
        movieThis(input);
    }
    else{
        movieThis("Mr. Nobody");
    }
}
else if(command === "spotify-this-song"){
    spotifyThis();
}
else if(command === "concert-this"){
    concertThis();
}
else{
    console.log("unknown command");
}

function spotifyThis(){
    console.log("spotify");
    thisSpotify = new spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    thisSpotify.search({ type: 'track', query: input }, function(err, data) {
        if (err) {
          return console.log(err);
        }
        allTracks = data.tracks.items;
        allTracks.forEach(function(thisSong){
            line();
            //song name
            console.log(thisSong.name);
            //artists
            console.log(thisSong.artists[0].name);
            //url
            console.log(thisSong.external_urls.spotify);
            //album name
            console.log(thisSong.album.name);
        })
        // console.log(data.tracks.items[0]);
    });
}

//This will use axios to pull movie data about the input
function movieThis(movie){
    //This will pull from the omdb API and pull data about the movie
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(
    function(response) {
        //console.log(response.data);
        console.log("-------------");
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMDB Rating: " + response.data.imdbRating);
        //Add in the rotten tomatoes rating
        console.log("Country: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
        console.log("-------------");
    });
}

function concertThis(){
    console.log("concert working");
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
        function(response){
            response.data.forEach(function(thisConcert){
                line();
                console.log("Venue: " + thisConcert.venue.name);
                console.log("Location: " + thisConcert.venue.city + " " + thisConcert.venue.region);
                //Use moment.js to format the date
                console.log("Date: " + thisConcert.datetime);
            })
        }
    )
}