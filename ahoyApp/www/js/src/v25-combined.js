// Combined JavaScript File: ahoyApp/www/js/src/v25-combined.js

// Global variables
let uniqueIsPlaying = false;
let uniqueCurrentTime = 0;
let uniqueTotalTime = 240;
let currentSong = {
    url: '',
    title: 'Song Title or Episode Title',
    artist: 'Artist Name or Podcast Host',
    duration: 200,
    type: 'music' // or 'podcast'
};

// Format time helper function
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Update UI with current song details
function updateUI() {
    // Elements in the main player
    const songTitleMain = document.getElementById('now-playing-song-title');
    const songArtistMain = document.getElementById('now-playing-song-artist');
    const totalTimeMain = document.getElementById('total-time-v25');
    const typeIndicatorMain = document.getElementById('type-indicator');

    // Elements in the bottom audio bar
    const songTitleBottom = document.getElementById('bottom-song-title');
    const songArtistBottom = document.getElementById('bottom-artist-name');

    // Update main player
    songTitleMain.textContent = currentSong.title;
    songArtistMain.textContent = currentSong.artist;
    totalTimeMain.textContent = formatTime(currentSong.duration);
    typeIndicatorMain.textContent = currentSong.type === 'music' ? 'Music' : 'Podcast';

    // Update bottom audio bar
    songTitleBottom.textContent = currentSong.title;
    songArtistBottom.textContent = currentSong.artist;
}

// Update the timeline and time display
function uniqueUpdateTimeline() {
    const audioPlayer = document.getElementById("audio-player");
    const currentTimeDisplay = document.getElementById("unique-current-time");
    const totalTimeDisplay = document.getElementById("unique-total-time");
    const timeline = document.getElementById("unique-song-timeline");

    if (audioPlayer.duration) {
        const currentTime = audioPlayer.currentTime;
        const totalTime = audioPlayer.duration;

        currentTimeDisplay.textContent = formatTime(currentTime);
        totalTimeDisplay.textContent = formatTime(totalTime);
        timeline.max = totalTime;
        timeline.value = currentTime;
    }
}

// Toggle play/pause globally
function toggleGlobalPlayPause() {
    const audio = document.getElementById('audio-player');
    const playPauseIcon = document.getElementById('play-pause-icon');

    if (audio.paused) {
        audio.play();
        playPauseIcon.className = 'fas fa-pause';
    } else {
        audio.pause();
        playPauseIcon.className = 'fas fa-play';
    }
}

// Seek media
function seekMedia(value) {
    const audio = document.getElementById('audio-player');
    audio.currentTime = (audio.duration * value) / 100;
}

// Event listeners for audio player
document.getElementById('audio-player').addEventListener('loadedmetadata', function() {
    const audio = this;
    const totalTimeDisplay = document.getElementById('total-time-v25');
    totalTimeDisplay.textContent = formatTime(audio.duration);
});

document.getElementById('audio-player').addEventListener('timeupdate', function() {
    const audio = this;
    const progressBar = document.getElementById('song-progress-bar');
    const currentTimeDisplay = document.getElementById('current-time-v25');
    const totalTimeDisplay = document.getElementById('total-time-v25');

    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const percentage = (currentTime / duration) * 100;

    progressBar.value = percentage;
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalTimeDisplay.textContent = formatTime(duration);

    // Update from uniqueUpdateTimeline
    uniqueCurrentTime = audio.currentTime;
    uniqueUpdateTimeline();
});

// Initialize the audio player and UI on load
document.getElementById('audio-player').src = currentSong.url;
updateUI();

function setNewSong(url, title, artist, duration, type) {
    currentSong.url = url;
    currentSong.title = title;
    currentSong.artist = artist;
    currentSong.duration = duration;
    currentSong.type = type;

    // Update the audio source
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = url;

    // Update the UI to reflect the new song
    updateUI();
}
