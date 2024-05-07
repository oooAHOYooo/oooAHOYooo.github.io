// Assuming you have a global currentSong object that gets updated when a new song is played
let currentSong = {
    url: '',
    title: 'Song Title',
    artist: 'Artist Name',
    albumArt: './path/to/album/art.jpg',
    duration: 200 // Duration in seconds
};

function updateUI() {
    const songTitle = document.getElementById('now-playing-song-title');
    const songArtist = document.getElementById('now-playing-song-artist');
    const albumArt = document.getElementById('now-playing-album-art');
    const totalTime = document.getElementById('total-time-v25');

    songTitle.textContent = currentSong.title;
    songArtist.textContent = currentSong.artist;
    albumArt.src = currentSong.albumArt;
    albumArt.alt = `Album art for ${currentSong.title}`;
    totalTime.textContent = formatTime(currentSong.duration);
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

function updateProgressBar() {
    const progressBar = document.getElementById('song-progress-bar');
    const currentTimeDisplay = document.getElementById('current-time-v25');
    const audioPlayer = document.getElementById('audio-player');

    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime;
        const progressValue = (currentTime / currentSong.duration) * 100;
        progressBar.value = progressValue;
        currentTimeDisplay.textContent = formatTime(currentTime);
    });
}

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

document.getElementById('audio-player').src = currentSong.url; // Set the initial source for the audio element
updateUI(); // Update UI when the page loads or when a new song is set
updateProgressBar(); // Call this function to initialize the progress bar update
updateProgressBar(); // Call this function to initialize the progress bar update