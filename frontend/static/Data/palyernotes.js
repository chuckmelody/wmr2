// Set up the Mixcloud API script var widgetApiScript =
document.createElement('script'); 
widgetApiScript.src ='//widget.mixcloud.com/media/js/widgetApi.js'; 
widgetApiScript.type ='text/javascript'; 
document.body.appendChild(widgetApiScript); // Define theplayer options 
var playerOptions = { hide_cover: true, hide_tracklist: true, mini: true, hide_artwork: false, light: false }; // Define the playlist array
var playlist = []; // Fetch the Mixcloud API data
fetch('https://api.mixcloud.com/wafflemedia/feed/') .then(response => response.json()) .then(data => { // Loop through the API data and add each track to the playlist array 
    data.data.forEach(track => { playlist.push({ key: track.key, title: track.name, artwork: track.pictures.large }); 
}); 
// Create the Mixcloud player widget 
var widget = Mixcloud.PlayerWidget(document.getElementById('my-widget-iframe'));
widget.ready.then(() => { // Set the initial track to the first item in theplaylist 
widget.load(playlist[0].key); // Display the track title 
var trackTitle = document.getElementById('track-title'); 
trackTitle.innerHTML = playlist[0].title; // Display the track artwork 
var trackArtwork = document.getElementById('track-artwork'); 
trackArtwork.src = playlist[0].artwork; // Display the current and duration times 
var currentTime = document.getElementById('current-time'); 
var duration = document.getElementById('duration'); 

setInterval(() => { 
    widget.getPosition().then(position => { currentTime.innerHTML = formatTime(position); }); 
    widget.getDuration().then(dur => {duration.innerHTML = formatTime(dur); }); 
}, 1000); // Set up the play/pause button 
var playPauseButton = document.getElementById('play-pause');