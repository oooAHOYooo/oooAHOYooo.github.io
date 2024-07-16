// ... existing code ...

document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('jwplayer-fullscreen-modal');
  var closeBtn = document.getElementsByClassName('jwplayer-close')[0];
  var rightSidebar = document.getElementById('right-sidebar');
  var docks = document.querySelectorAll('.dock, .sidebar');

  // Function to open the modal
  function openJWPlayerModal(videoUrl) {
    modal.style.display = 'block';
    jwplayer('jwplayer-container').setup({
      file: videoUrl,
      width: '100%',
      height: '100%'
    });
    closeAllDocksAndSidebars();
  }

  // Function to close the modal
  closeBtn.onclick = function () {
    modal.style.display = 'none';
    jwplayer('jwplayer-container').remove();
  }

  // Close the modal when clicking outside of the modal content
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = 'none';
      jwplayer('jwplayer-container').remove();
    }
  }

  // Function to close all docks and sidebars
  function closeAllDocksAndSidebars() {
    rightSidebar.style.display = 'none';
    docks.forEach(function(dock) {
      dock.style.display = 'none';
    });
  }

  // Add event listener to the "Play FullScreen" button
  document.getElementById('play-fullscreen-button').addEventListener('click', function () {
    var videoUrl = 'https://path/to/your/video.mp4'; // Replace with your video URL
    openJWPlayerModal(videoUrl);
  });
});

// ... existing code ...