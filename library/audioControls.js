import { songs } from './songData.js';

let currentSongIndex = 0; // Initialize current song index

function playNextSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
        currentSongIndex = 0; // Loop back to the first song if we've reached the end of the queue
    }
    let nextSong = songs[currentSongIndex].mp3url;
    let audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.src = nextSong;
    audioPlayer.play();
}

document.getElementById('nextButton').addEventListener('click', playNextSong);