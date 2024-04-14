let uniqueIsPlaying = false;
let uniqueCurrentTime = 0; // Current time in seconds
let uniqueTotalTime = 240; // Total time in seconds (example: 4 minutes)

// Update the timeline and time display
function uniqueUpdateTimeline() {
  const timeline = document.getElementById('unique-song-timeline');
  const currentTimeDisplay = document.getElementById('unique-current-time');
  const totalTimeDisplay = document.getElementById('unique-total-time');

  timeline.max = uniqueTotalTime;
  timeline.value = uniqueCurrentTime;

  currentTimeDisplay.textContent = uniqueFormatTime(uniqueCurrentTime);
  totalTimeDisplay.textContent = uniqueFormatTime(uniqueTotalTime);
}

// Format time from seconds to MM:SS
function uniqueFormatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
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

  uniqueIsPlaying = !uniqueIsPlaying;

  if (uniqueIsPlaying) {
    audioPlayer.play();
    playPauseButton.textContent = 'Pause'; // Update button text to 'Pause'
  } else {
    audioPlayer.pause();
    playPauseButton.textContent = 'Play'; // Update button text to 'Play'
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