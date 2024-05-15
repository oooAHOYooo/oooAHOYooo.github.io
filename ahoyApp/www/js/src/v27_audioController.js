import GlobalState from './globalState.js';
import { playSong, shuffleArray, updateSongListUI, songsArray } from './newSuperSong.js';

// Cached DOM elements
const player = document.getElementById('audio-player');
const playPauseIcon = document.getElementById('v27-play-pause-icon');
const shuffleButton = document.getElementById('v27-shuffle-button');
const volumeControl = document.getElementById('v27-volume-control');
const trackProgress = document.getElementById('v27-track-progress');
const playPauseButton = document.getElementById('v27-play-pause-button');

// Helper function to update play/pause icon
function updatePlayPauseIcon(isPlaying) {
    playPauseIcon.className = isPlaying ? 'fas fa-pause' : 'fas fa-play';
}

// Play/Pause toggle
playPauseButton.addEventListener('click', function() {
    if (player.paused) {
        player.play();
    } else {
        player.pause();
    }
});

// Update icon based on player state
player.addEventListener('play', () => updatePlayPauseIcon(true));
player.addEventListener('pause', () => updatePlayPauseIcon(false));

// Shuffle songs
shuffleButton.addEventListener('click', function() {
    if (songsArray.length > 0) {
        shuffleArray(songsArray);
        updateSongListUI();
    }
});

// Volume control
volumeControl.addEventListener('input', function() {
    player.volume = this.value / 100;
});

// Track progress
player.addEventListener('timeupdate', function() {
    const value = (this.currentTime / this.duration) * 100;
    trackProgress.value = value;
    const currentSong = songsArray[GlobalState.currentSongIndex];
    console.log(`Now playing: ${currentSong.songTitle} by ${currentSong.artist}`);
});

// Seeking
trackProgress.addEventListener('input', function() {
    player.currentTime = (this.value / 100) * player.duration;
});
