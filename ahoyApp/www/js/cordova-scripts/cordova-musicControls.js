// cordova-musicControls.js

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Create music controls with default values
  updateMusicControls("Track Title", "Artist Name", "cover.jpg", true);

  // Subscribe to music control events
  MusicControls.subscribe(musicControlsEventListener);
  MusicControls.listen();
}

function updateMusicControls(track, artist, cover, isPlaying) {
  MusicControls.create(
    {
      track: track,
      artist: artist,
      cover: cover,
      isPlaying: isPlaying,
      dismissable: true,
    },
    onSuccess,
    onError
  );
}

function onSuccess() {
  console.log("Music Controls Created");
}

function onError(error) {
  console.error("Error creating music controls", error);
}

function musicControlsEventListener(action) {
  const message = JSON.parse(action).message;
  switch (message) {
    case "music-controls-next":
      // Trigger next song or podcast
      if (typeof nextSong === 'function') nextSong();
      if (typeof nextPodcast === 'function') nextPodcast();
      break;
    case "music-controls-previous":
      // Trigger previous song or podcast
      if (typeof prevSong === 'function') prevSong();
      if (typeof prevPodcast === 'function') prevPodcast();
      break;
    case "music-controls-pause":
      // Pause the current audio
      if (typeof togglePlay === 'function') togglePlay();
      if (typeof togglePlayPause === 'function') togglePlayPause();
      break;
    case "music-controls-play":
      // Play the current audio
      if (typeof togglePlay === 'function') togglePlay();
      if (typeof togglePlayPause === 'function') togglePlayPause();
      break;
    case "music-controls-seek-forward":
      // Seek forward in the track
      if (typeof seekForward === 'function') seekForward();
      break;
    case "music-controls-seek-backward":
      // Seek backward in the track
      if (typeof seekBackward === 'function') seekBackward();
      break;
    case "music-controls-volume-up":
      // Increase volume
      if (typeof volumeUp === 'function') volumeUp();
      break;
    case "music-controls-volume-down":
      // Decrease volume
      if (typeof volumeDown === 'function') volumeDown();
      break;
    case "music-controls-toggle-shuffle":
      // Toggle shuffle mode
      if (typeof toggleShuffle === 'function') toggleShuffle();
      break;
    case "music-controls-toggle-repeat":
      // Toggle repeat mode
      if (typeof toggleRepeat === 'function') toggleRepeat();
      break;
  }
}