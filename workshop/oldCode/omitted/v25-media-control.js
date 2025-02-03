// Function to toggle play/pause globally
function toggleGlobalPlayPause() {
  var audio = document.getElementById('audio-player');
  var playPauseIcon = document.getElementById('play-pause-icon');
  if (audio.paused) {
    audio.play();
    playPauseIcon.className = 'fas fa-pause'; // Change to pause icon
  } else {
    audio.pause();
    playPauseIcon.className = 'fas fa-play'; // Change to play icon
  }
}

// Function to seek media
function seekMedia(value) {
  var audio = document.getElementById('audio-player');
  audio.currentTime = (audio.duration * value) / 100;
}

// Update the player controls as the media plays
document.getElementById('audio-player').addEventListener('loadedmetadata', function() {
  var audio = this;
  var totalTimeDisplay = document.getElementById('total-time-v25');
  totalTimeDisplay.textContent = formatTime(audio.duration);
});

document.getElementById('audio-player').addEventListener('timeupdate', function() {
  var audio = this;
  var progressBar = document.getElementById('song-progress-bar');
  var currentTimeDisplay = document.getElementById('current-time-v25');
  var totalTimeDisplay = document.getElementById('total-time-v25');

  var currentTime = audio.currentTime;
  var duration = audio.duration;
  var percentage = (currentTime / duration) * 100;

  progressBar.value = percentage;
  currentTimeDisplay.textContent = formatTime(currentTime);
  totalTimeDisplay.textContent = formatTime(duration);
});

// Helper function to format time in minutes and seconds
function formatTime(time) {
  var minutes = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
}
