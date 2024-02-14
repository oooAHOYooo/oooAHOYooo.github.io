document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const audioPlayer = document.getElementById("audio-player");
  const progressBar = document.getElementById("progress-bar");
  const progressBarContainer = document.getElementById("progress-bar-container");
  const playhead = document.getElementById("playhead");
  const currentTimeDisplay = document.getElementById("current-time");
  const totalDurationDisplay = document.getElementById("total-duration");
  const playPauseButton = document.getElementById("play-pause");
  const playPauseIcon = document.getElementById("play-pause-icon");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  // Media array (example structure, replace with actual media URLs)
  const mediaArray = [
    { type: "song", url: "path/to/song1.mp3" },
    { type: "podcast", url: "path/to/podcast1.mp3" },
    // Add more media objects as needed
  ];
  let currentMediaIndex = 0; // Index of the currently playing media

  // Flag to track dragging state
  let isDragging = false;

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

  // Toggles play/pause state and icon
  function togglePlayPause() {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseIcon.className = "fas fa-pause";
    } else {
      audioPlayer.pause();
      playPauseIcon.className = "fas fa-play";
    }
  }

  // Load and play media
  function loadMedia(index) {
    if (index >= 0 && index < mediaArray.length) {
      audioPlayer.src = mediaArray[index].url;
      audioPlayer.load();
      audioPlayer.play();
      currentMediaIndex = index;
      playPauseIcon.className = "fas fa-pause"; // Update play/pause icon to show pause icon
    }
  }

  // Play the next media in the array
  function nextMedia() {
    const nextIndex = (currentMediaIndex + 1) % mediaArray.length;
    loadMedia(nextIndex);
  }

  // Play the previous media in the array
  function previousMedia() {
    const prevIndex = (currentMediaIndex - 1 + mediaArray.length) % mediaArray.length;
    loadMedia(prevIndex);
  }

  // Event listeners for user interactions
  progressBarContainer.addEventListener("mousedown", function (event) {
    isDragging = true;
    seek(event);
  });

  window.addEventListener("mouseup", function () {
    if (isDragging) {
      isDragging = false;
    }
  });

  window.addEventListener("mousemove", function (event) {
    if (isDragging) {
      seek(event);
    }
  });

  playPauseButton.addEventListener("click", togglePlayPause);
  prevButton.addEventListener("click", previousMedia);
  nextButton.addEventListener("click", nextMedia);

  // Update progress bar as the media plays
  audioPlayer.addEventListener("timeupdate", updateProgressBar);

  // When media metadata is loaded, update the duration display
  audioPlayer.addEventListener("loadedmetadata", updateProgressBar);

  // Automatically go to the next media when the current one ends
  audioPlayer.addEventListener("ended", nextMedia);

  // Load the first media in the array
  // Load the first media in the array
  loadMedia(currentMediaIndex);
});