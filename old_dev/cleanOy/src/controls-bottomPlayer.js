document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audio-player");
  const progressBar = document.getElementById("progress-bar");
  const progressBarContainer = document.getElementById(
    "progress-bar-container"
  );
  const playhead = document.getElementById("playhead");
  const currentTimeDisplay = document.getElementById("current-time");
  const totalDurationDisplay =
    document.getElementById("total-duration");
  let isDragging = false;

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsPart = Math.floor(seconds % 60);
    return minutes + ":" + (secondsPart < 10 ? "0" : "") + secondsPart;
  }

  function updateProgressBar() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration || 0;
    const progressPercentage = (currentTime / duration) * 100;
    progressBar.style.width = progressPercentage + "%";
    playhead.style.left = progressPercentage + "%";

    // Update time displays
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalDurationDisplay.textContent = formatTime(duration);
  }

  function seek(event) {
    const bounds = progressBarContainer.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const totalWidth = bounds.width;
    const clickTime = (x / totalWidth) * audioPlayer.duration;
    audioPlayer.currentTime = clickTime;
    updateProgressBar(); // Ensure the progress bar and playhead are updated
  }

  progressBarContainer.addEventListener("mousedown", function (event) {
    isDragging = true;
    seek(event);
  });

  window.addEventListener("mouseup", function () {
    isDragging = false;
  });

  window.addEventListener("mousemove", function (event) {
    if (isDragging) {
      seek(event);
    }
  });

  audioPlayer.addEventListener("timeupdate", updateProgressBar);

  audioPlayer.addEventListener("loadedmetadata", function () {
    totalDurationDisplay.textContent = formatTime(audioPlayer.duration);
  });

  // Rest of your JavaScript code...
});