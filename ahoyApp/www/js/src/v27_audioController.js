import GlobalState from './globalState.js';
import { playSong, shuffleArray, updateSongListUI, songsArray } from './newSuperSong.js'; // Import necessary functions and variables

document.getElementById('v27-play-pause-button').addEventListener('click', function() {
    const player = document.getElementById('v27-audio-player');
    const playPauseIcon = document.getElementById('v27-play-pause-icon');
    const currentSong = songsArray[GlobalState.currentSongIndex]; // Use GlobalState to track current song index

    if (player.paused) {
        player.play();
        playPauseIcon.className = 'fas fa-pause';
    } else {
        player.pause();
        playPauseIcon.className = 'fas fa-play';
    }
});

document.getElementById('v27-shuffle-button').addEventListener('click', function() {
    if (songsArray.length > 0) {
        shuffleArray(songsArray);
        updateSongListUI();
    }
});

document.getElementById('v27-volume-control').addEventListener('input', function() {
    const player = document.getElementById('audio-player');
    player.volume = this.value / 100;
});

document.getElementById('audio-player').addEventListener('timeupdate', function() {
    const progress = document.getElementById('v27-track-progress');
    const value = (this.currentTime / this.duration) * 100;
    progress.value = value;

    // Display current song details
    const currentSong = songsArray[GlobalState.currentSongIndex]; // Use GlobalState to track current song
    console.log(`Now playing: ${currentSong.songTitle} by ${currentSong.artist}`);
});

document.getElementById('v27-track-progress').addEventListener('input', function() {
    const player = document.getElementById('v27-audio-player');
    const value = (this.value / 100) * player.duration;
    player.currentTime = value;
});
