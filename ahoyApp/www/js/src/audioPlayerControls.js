document.addEventListener("DOMContentLoaded", function () {
    setupProgressBar();
    setupControls();
});

function setupProgressBar() {
    const audioPlayer = document.getElementById("audio-player");
    const progressBar = document.getElementById("song-progress");
    const currentTimeDisplay = document.getElementById("current-time");
    const songInfoDisplay = document.getElementById("song-info"); // Add this line

    audioPlayer.addEventListener('timeupdate', function() {
        const percentage = (this.currentTime / this.duration) * 100;
        progressBar.value = percentage;
        currentTimeDisplay.textContent = formatTime(this.currentTime);
        // Update song info dynamically if needed
        // songInfoDisplay.textContent = "Artist - Song Title"; // Uncomment and update dynamically as needed
    });

    audioPlayer.addEventListener('loadeddata', function() {
        progressBar.max = 100; // Since it's a percentage
        progressBar.value = 0; // Reset to start
        currentTimeDisplay.textContent = "0:00";
        // Update song info when a new song is loaded
        // songInfoDisplay.textContent = "Artist - Song Title"; // Uncomment and update dynamically as needed
    });

    progressBar.addEventListener('input', function() {
        const time = (this.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = time;
    });
}

function setupControls() {
    const audioPlayer = document.getElementById("audio-player");
    const playButton = document.getElementById("play-button");
    const skipButton = document.getElementById("skip-button");

    playButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>'; // Change to pause icon
        } else {
            audioPlayer.pause();
            playButton.innerHTML = '<i class="fas fa-play"></i>'; // Change to play icon
        }
    });

    skipButton.addEventListener('click', function() {
        audioPlayer.currentTime += 15; // Skip forward 15 seconds
        if (audioPlayer.paused) {
            audioPlayer.play();
            playButton.innerHTML = '<i class="fas fa-pause"></i>';
        }
    });
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsPart = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secondsPart}`;
}