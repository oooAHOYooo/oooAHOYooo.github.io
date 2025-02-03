document.addEventListener('DOMContentLoaded', function() {
    fetch('data/songCollection.json')
      .then(response => response.json())
      .then(data => {
        const songs = data.songs;
        const latestSong = songs.reduce((prev, current) => (prev.id > current.id) ? prev : current);
        
        // Assuming the audio player and play/pause button are correctly identified
        const audioPlayer = document.getElementById('audio-player');
        const playPauseButton = document.getElementById('play-pause');
        const recentlyAddedButton = document.getElementById('recently-added-homepage-song');
  
        // Function to toggle play/pause icon
        function togglePlayPauseIcon(isPlaying) {
          const icon = playPauseButton.querySelector('i');
          if (isPlaying) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
          } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
          }
        }
  
        // Load the latest song into the audio player when the "Recently Added" button is clicked
        recentlyAddedButton.addEventListener('click', function() {
          if (audioPlayer.src !== latestSong.mp3url) {
            audioPlayer.src = latestSong.mp3url; // Set the song source
            audioPlayer.play(); // Play the song
            togglePlayPauseIcon(true); // Update the play/pause button icon to "pause"
          } else if (audioPlayer.paused) {
            audioPlayer.play(); // Play the song
            togglePlayPauseIcon(true); // Update the play/pause button icon to "pause"
          } else {
            audioPlayer.pause(); // Pause the song
            togglePlayPauseIcon(false); // Update the play/pause button icon to "play"
          }
        });
  
        // Update the play/pause button icon based on the audio player's state
        audioPlayer.addEventListener('play', () => togglePlayPauseIcon(true));
        audioPlayer.addEventListener('pause', () => togglePlayPauseIcon(false));
      })
      .catch(error => console.error('Error loading song collection:', error));
  });