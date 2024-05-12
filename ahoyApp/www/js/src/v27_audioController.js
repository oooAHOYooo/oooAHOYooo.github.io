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

document.getElementById('v27-next-button').addEventListener('click', function() {
    // Logic to go to the next track
});

document.getElementById('v27-prev-button').addEventListener('click', function() {
    // Logic to go to the previous track
});

document.getElementById('v27-shuffle-button').addEventListener('click', function() {
    // Logic to shuffle the playlist
});

document.getElementById('v27-repeat-button').addEventListener('click', function() {
    // Logic to toggle repeat mode
});

document.getElementById('v27-volume-control').addEventListener('input', function() {
    const player = document.getElementById('v27-audio-player');
    player.volume = this.value / 100;
});

document.getElementById('v27-audio-player').addEventListener('timeupdate', function() {
    const progress = document.getElementById('v27-track-progress');
    const value = (this.currentTime / this.duration) * 100;
    progress.value = value;
});

document.getElementById('v27-track-progress').addEventListener('input', function() {
    const player = document.getElementById('v27-audio-player');
    const value = (this.value / 100) * player.duration;
    player.currentTime = value;
});