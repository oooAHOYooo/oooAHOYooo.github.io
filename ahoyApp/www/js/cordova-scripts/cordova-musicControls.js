// cordova-musicControls.js

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  // Create music controls
  MusicControls.create(
    {
      track: "Track Title", // Provide a default or the current track title
      artist: "Artist Name", // Provide the artist name
      cover: "cover.jpg", // Path to cover image
      isPlaying: true, // Playback status
      dismissable: true, // Whether the notification can be dismissed

      // Add other options as needed...
    },
    onSuccess,
    onError
  );

  // Subscribe to music control events
  MusicControls.subscribe(musicControlsEventListener);
  MusicControls.listen();
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
      // Implement what happens when the user presses 'next'
      break;
    case "music-controls-previous":
      // Implement what happens when the user presses 'previous'
      break;
    case "music-controls-pause":
      // Implement what happens when the user presses 'pause'
      break;
    case "music-controls-play":
      // Implement what happens when the user presses 'play'
      break;
    case "music-controls-destroy":
      // Implement what happens when the notification is dismissed
      break;
    // Add cases for other actions as needed
  }
}