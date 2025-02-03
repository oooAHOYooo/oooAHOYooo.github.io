document.addEventListener("DOMContentLoaded", function () {
    setupProgressBar();
});

function setupProgressBar() {
    const audioPlayer = document.getElementById("audio-player");
    const progressBar = document.getElementById("song-progress");
    const currentTimeDisplay = document.getElementById("current-time");

    audioPlayer.addEventListener('timeupdate', function() {
        const percentage = (this.currentTime / this.duration) * 100;
        progressBar.value = percentage;
        currentTimeDisplay.textContent = formatTime(this.currentTime);
    });

    audioPlayer.addEventListener('loadeddata', function() {
        progressBar.max = 100; // Since it's a percentage
        progressBar.value = 0; // Reset to start
        currentTimeDisplay.textContent = "0:00";
    });

    progressBar.addEventListener('input', function() {
        const time = (this.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = time;
    });

    progressBar.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    });
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsPart = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secondsPart}`;
}