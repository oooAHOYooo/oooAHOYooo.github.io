// Assuming you have a global currentSong object that gets updated when a new song is played
let currentSong = {
    url: '',
    title: 'Song Title or Episode Title',
    artist: 'Artist Name or Podcast Host',
    duration: 200, // Duration in seconds
    type: 'music' // or 'podcast'
};

function updateUI() {
    const songTitle = document.getElementById('now-playing-song-title');
    const songArtist = document.getElementById('now-playing-song-artist');
    const totalTime = document.getElementById('total-time-v25');
    const typeIndicator = document.getElementById('type-indicator');

    // Use currentSong object to update the UI
    songTitle.textContent = currentSong.title;
    songArtist.textContent = currentSong.artist;
    totalTime.textContent = formatTime(currentSong.duration);
    typeIndicator.textContent = currentSong.type === 'music' ? 'Music' : 'Podcast';
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function updateProgressBar() {
    const progressBar = document.getElementById('bottom-song-progress');
    const audioPlayer = document.getElementById('audio-player');
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
}

setInterval(updateProgressBar, 1000); // Update progress every second

function togglePlayPause() {
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

// Ensure this function is called only once to avoid multiple event listeners
document.getElementById('audio-player').src = currentSong.url; // Set the initial source for the audio element
updateUI(); // Update UI when the page loads or when a new song is set
updateProgressBar(); // Initialize the progress bar update
