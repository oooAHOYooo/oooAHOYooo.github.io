// Function to toggle mute state for audio players
function toggleMute() {
  const musicAudioPlayer = document.getElementById('musicAudioPlayer');
  const podcastAudioPlayer = document.getElementById('podcastAudioPlayer');
  
  // Toggle mute state
  musicAudioPlayer.muted = !musicAudioPlayer.muted;
  podcastAudioPlayer.muted = !podcastAudioPlayer.muted;
  
  // Update button text based on mute state
  const muteButton = document.querySelector('#mute-audio-widget .action-button');
  muteButton.textContent = musicAudioPlayer.muted ? 'Unmute Audio' : 'Mute Audio';
}