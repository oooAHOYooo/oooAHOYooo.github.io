document.addEventListener("DOMContentLoaded", function () {
  const offlineModeButton = document.getElementById('toggle-offline-mode');
  let isOfflineMode = false;

  offlineModeButton.addEventListener('click', function() {
    isOfflineMode = !isOfflineMode;
    offlineModeButton.textContent = `Offline Mode: ${isOfflineMode ? 'On' : 'Off'}`;
    document.dispatchEvent(new CustomEvent('offlineModeChanged', { detail: isOfflineMode }));
  });
});