// globalAudioManager.js

let globalAudioState = {
    currentMedia: {
        url: '',
        title: '',
        artist: '',
        duration: 0,
        type: '' // 'music' or 'podcast'
    },
    isPlaying: false
};

function togglePlayPause() {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseIcon = document.getElementById('play-pause-icon');
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseIcon.className = 'fas fa-pause';
        globalAudioState.isPlaying = true;
    } else {
        audioPlayer.pause();
        playPauseIcon.className = 'fas fa-play';
        globalAudioState.isPlaying = false;
    }
}

function loadMedia(url, title, artist, duration, type) {
    globalAudioState.currentMedia = { url, title, artist, duration, type };
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = url;
    updateUI(); // Ensure this function is adapted to read from globalAudioState
}

function updateUI() {
    // Update UI elements based on globalAudioState
}

document.addEventListener("DOMContentLoaded", function () {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.addEventListener('timeupdate', handleTimeUpdate);
    updateUI();
});

function handleTimeUpdate() {
    // Handle time update for UI
}