// cast.js
// Assuming existence of songCollection, podcastCollection, and videoCollection

// Initialize Cast API
window.__onGCastApiAvailable = function(isAvailable) {
  if (isAvailable) {
    initializeCastApi();
  }
};

function initializeCastApi() {
  const context = cast.framework.CastContext.getInstance();
  context.setOptions({
    receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
  });
  
  document.getElementById('castButton').addEventListener('click', () => {
    context.requestSession().then(() => {
      console.log('Cast session started');
      // Optionally, load media to cast device after session start
    }, error => {
      console.error('Error starting cast session:', error);
    });
  });
}

// Include other functions here (castMedia, saveLastPlayedMedia, getLastPlayedMedia, castSelectedMedia)

// Example to update UI with last played media info
function updateLastPlayedMediaUI() {
  const lastPlayedMedia = getLastPlayedMedia();
  if (lastPlayedMedia) {
    document.getElementById('lastPlayedTitle').textContent = `Title: ${lastPlayedMedia.title}`;
    document.getElementById('lastPlayedType').textContent = `Type: ${lastPlayedMedia.type}`;
  }
}

// Call updateLastPlayedMediaUI to update the UI when the page loads or when a new media is cast
updateLastPlayedMediaUI();