// script.js
const songs = [
    {
        "id": 1,
        "artist": "Samuel Dylan Witch",
        "songTitle": "Seen Better Days",
        "mp3url": "https://ahoycollection.s3.us-east-2.amazonaws.com/01%20I%27ve%20Seen%20Better%20Days.mp3",
        "coverArt": "https://i.ytimg.com/vi/XDH0X-dF4GM/maxresdefault.jpg"
    },
    {
        "id": 2,
        "artist": "Samuel Dylan Witch",
        "songTitle": "Beneath the Willow Tree",
        "mp3url": "https://ahoycollection.s3.us-east-2.amazonaws.com/Beneath+the+Willow+Tree.mp3",
        "coverArt": "https://i.ytimg.com/vi/koPyEhqksBk/maxresdefault.jpg"
    },
    // ... other songs ...
];

let currentSongIndex = 0;

const audioPlayer = document.getElementById('audioPlayer');
const songTitle = document.getElementById('songTitle');
const artist = document.getElementById('artist');
const coverArt = document.getElementById('coverArt');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function loadSong(song) {
    songTitle.textContent = song.songTitle;
    artist.textContent = song.artist;
    coverArt.src = song.coverArt;
    audioPlayer.src = song.mp3url;
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(songs[currentSongIndex]);
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(songs[currentSongIndex]);
}

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Load the first song initially
loadSong(songs[currentSongIndex]);