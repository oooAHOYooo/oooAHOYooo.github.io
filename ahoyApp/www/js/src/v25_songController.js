let uniqueIsPlaying = false;
let uniqueCurrentTime = 0; // Current time in seconds
let uniqueTotalTime = 240; // Total time in seconds (example: 4 minutes)

// Update the timeline and time display
function uniqueUpdateTimeline() {
  const audioPlayer = document.getElementById("audio-player");
  const currentTimeDisplay = document.getElementById("unique-current-time");
  const totalTimeDisplay = document.getElementById("unique-total-time");
  const timeline = document.getElementById("unique-song-timeline");

  if (audioPlayer.duration) {
    const currentTime = audioPlayer.currentTime;
    const totalTime = audioPlayer.duration;

    currentTimeDisplay.textContent = uniqueFormatTime(currentTime);
    totalTimeDisplay.textContent = uniqueFormatTime(totalTime);
    timeline.max = totalTime;
    timeline.value = currentTime;
  }
}

// Format time from seconds to MM:SS
function uniqueFormatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Play/Pause toggle
function uniqueTogglePlayPause() {
  const audioPlayer = document.getElementById("audio-player"); // Get the audio player element
  const playPauseButton = document.getElementById('unique-play-pause-button'); // Assuming this is your play/pause button

  if (!audioPlayer.src) {
    console.log("No song loaded");
    return; // Early return if no song is loaded
  }

  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseButton.innerHTML = '<i class="fas fa-pause"></i>'; // Update button to show pause icon
  } else {
    audioPlayer.pause();
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>'; // Update button to show play icon
  }
}

// Go to the next track
function uniqueNextTrack() {
  if (currentSongIndex !== null && currentSongIndex < songsArray.length - 1) {
    const nextSong = songsArray[currentSongIndex + 1];
    playSong(nextSong.mp3url, nextSong.songTitle, nextSong.artist, document.createElement('button')); // Simulate button element
    uniqueUpdateTimeline();
  } else {
    console.log('This is the last track.');
  }
}

// Go to the previous track
function uniquePrevTrack() {
  if (currentSongIndex !== null && currentSongIndex > 0) {
    const prevSong = songsArray[currentSongIndex - 1];
    playSong(prevSong.mp3url, prevSong.songTitle, prevSong.artist, document.createElement('button')); // Simulate button element
    uniqueUpdateTimeline();
  } else {
    console.log('This is the first track.');
  }
}

// Initialize the timeline and time display
window.onload = function() {
  uniqueUpdateTimeline();
};

const audioPlayer = document.getElementById("audio-player"); // Assuming this is the audio player ID

audioPlayer.addEventListener('timeupdate', function() {
  uniqueCurrentTime = audioPlayer.currentTime;
  uniqueUpdateTimeline();
});

const timeline = document.getElementById('unique-song-timeline');

timeline.addEventListener('input', function() {
  audioPlayer.currentTime = timeline.value;
});

function uniqueFastForward() {
  audioPlayer.currentTime = Math.min(audioPlayer.currentTime + 10, audioPlayer.duration); // Fast forward by 10 seconds
  uniqueUpdateTimeline();
}

function uniqueRewind() {
  audioPlayer.currentTime = Math.max(audioPlayer.currentTime - 10, 0); // Rewind by 10 seconds
  uniqueUpdateTimeline();
}

function uniqueDoubleFastForward() {
  audioPlayer.currentTime = Math.min(audioPlayer.currentTime + 20, audioPlayer.duration); // Skip 20 seconds
  uniqueUpdateTimeline();
}

function uniqueDoubleRewind() {
  audioPlayer.currentTime = Math.max(audioPlayer.currentTime - 20, 0); // Rewind 20 seconds
  uniqueUpdateTimeline();
}