function castToApple() {
    // Check if the browser supports AirPlay
    if (window.WebKitPlaybackTargetAvailabilityEvent) {
      const videoElement = document.querySelector('video');
      // Trigger the native AirPlay picker
      videoElement.webkitShowPlaybackTargetPicker();
    } else {
      alert('AirPlay is not supported in this browser.');
    }
  }

  function castToGoogle() {
    const context = cast.framework.CastContext.getInstance();
    context.requestSession().then(() => {
      // Session established, now you can cast media
      const player = new cast.framework.RemotePlayer();
      const controller = new cast.framework.RemotePlayerController(player);
      player.mediaInfo = new chrome.cast.media.MediaInfo('YOUR_MEDIA_URL', 'video/mp4');
      controller.playOrPause();
    }).catch((error) => {
      console.error('Error casting to Google device:', error);
    });
  }

  function castToOther() {
    // Implement device discovery and control protocols as per the target device specifications
    alert('Casting to other devices is not implemented.');
  }

// Event listeners for casting buttons
document.getElementById('cast-apple').addEventListener('click', castToApple);
document.getElementById('cast-google').addEventListener('click', castToGoogle);
document.getElementById('cast-other').addEventListener('click', castToOther);

console.log("Casting scripts loaded.");