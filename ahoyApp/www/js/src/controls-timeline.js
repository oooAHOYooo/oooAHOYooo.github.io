document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const audioPlayer = document.getElementById("audio-player");
  const progressBar = document.getElementById("progress-bar");
  const progressBarContainer = document.getElementById("progress-bar-container");
  const playhead = document.getElementById("playhead");
  const currentTimeDisplay = document.getElementById("current-time");
  const totalDurationDisplay = document.getElementById("total-duration");
  const playPauseButton = document.getElementById("play-pause-button"); // Assuming the ID of the global play/pause button
  // Flag to track dragging state and play state
  let isDragging = false;
  let isPlaying = false;

  // Helper function to format time in MM:SS
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsPart = Math.floor(seconds % 60);
    return `${minutes}:${secondsPart < 10 ? "0" : ""}${secondsPart}`;
  }

  // Updates the progress bar and time displays
  function updateProgressBar() {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration || 0;
    const progressPercentage = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    playhead.style.left = `${progressPercentage}%`;
    currentTimeDisplay.textContent = formatTime(currentTime);
    totalDurationDisplay.textContent = formatTime(duration);
  }

  // Seeks to a new position in the media
  function seek(event) {
    const bounds = progressBarContainer.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const totalWidth = bounds.width;
    const clickTime = (x / totalWidth) * audioPlayer.duration;
    audioPlayer.currentTime = clickTime;
    updateProgressBar();
  }

  // Toggles play/pause state
  function togglePlayPause() {
    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }
    isPlaying = !isPlaying;
  }

  // Event listeners for user interactions
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

  // Listen for play/pause button clicks
  playPauseButton.addEventListener("click", function () {
    togglePlayPause();
  });

  // Update progress bar as the media plays
  audioPlayer.addEventListener("timeupdate", updateProgressBar);

  // When media metadata is loaded, update the duration display
  audioPlayer.addEventListener("loadedmetadata", function () {
    totalDurationDisplay.textContent = formatTime(audioPlayer.duration);
  });

  // Additional features or event listeners can be added here
  // For example, handling different media types, updating media titles, etc.
});