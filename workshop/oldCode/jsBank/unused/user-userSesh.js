// Check for user authentication state
firebase.auth().onAuthStateChanged(async function(user) {
  if (user) {
    // User is signed in, check for saved playback position
    const savedMedia = localStorage.getItem('savedMedia');
    if (savedMedia) {
      const media = JSON.parse(savedMedia);
      await loadAndPlaySong(media.url, media.position);
    }
  } else {
    // No user is signed in. Clear saved media position.
    clearSavedMedia();
  }
});

// Function to load and play a song from a specific position
async function loadAndPlaySong(songUrl, startPosition = 0) {
  const audio = document.getElementById('audio-player');
  if (!audio) return; // Exit if audio player is not found

  // Check if the song URL is valid
  try {
    const response = await fetch(songUrl, { method: 'HEAD' });
    if (!response.ok) throw new Error('Media not found');
    
    audio.src = songUrl;
    audio.currentTime = startPosition;
    audio.play();
    document.getElementById('recently-added-homepage-song').innerHTML = '<i class="fas fa-pause"></i>';

    // Update saved media position periodically
    audio.ontimeupdate = () => {
      const savedMedia = {
        url: songUrl,
        position: audio.currentTime
      };
      localStorage.setItem('savedMedia', JSON.stringify(savedMedia));
    };

    // Clear saved media when playback ends
    audio.onended = clearSavedMedia;
  } catch (error) {
    console.error('Error loading media:', error.message);
    clearSavedMedia(); // Clear saved media if there's an error
  }
}

// Function to clear saved media from localStorage
function clearSavedMedia() {
  localStorage.removeItem('savedMedia');
}

// Optional: Function to manually clear saved media and stop playback
function stopAndClearMedia() {
  const audio = document.getElementById('audio-player');
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  clearSavedMedia();
}