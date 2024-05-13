import GlobalState from './globalState.js';

document.getElementById('v27-play-pause-button').addEventListener('click', function() {
    const player = document.getElementById('v27-audio-player');
    if (player.paused) {
        player.play();
        document.getElementById('v27-play-pause-icon').className = 'fas fa-pause';
    } else {
        player.pause();
        document.getElementById('v27-play-pause-icon').className = 'fas fa-play';
    }
});



document.getElementById('v27-shuffle-button').addEventListener('click', function() {
    if (typeof songsArray !== 'undefined' && songsArray.length > 0) {
        shuffleArray(songsArray);
        updateSongListUI(); // This function should update the UI with the new order
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
    const currentSong = GlobalState.getCurrentSong();
    console.log(`Now playing: ${currentSong.title} by ${currentSong.artist}`);
});

document.getElementById('v27-track-progress').addEventListener('input', function() {
    const player = document.getElementById('v27-audio-player');
    const value = (this.value / 100) * player.duration;
    player.currentTime = value;
});
