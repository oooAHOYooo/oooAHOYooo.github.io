document.addEventListener('DOMContentLoaded', function() {
  fetch('./data/songCollection.json')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('song-table-body');
      const audioPlayer = document.getElementById('audio-player'); // Assuming the audio player ID is 'audio-player'
      
      // Ensure the table is full width
      const table = document.getElementById('song-table');
      table.style.width = '100%';

      let currentPlayingButton = null; // Track the currently playing button

      data.songs.forEach((song, index) => {
        const row = document.createElement('tr');
        
        const artworkCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = song.coverArt;
        img.style.width = '100px'; // Set the image size
        artworkCell.appendChild(img);
        
        const artistCell = document.createElement('td');
        artistCell.textContent = song.artist;
        
        const songCell = document.createElement('td');
        songCell.textContent = song.songTitle;
        
        const actionCell = document.createElement('td');
        actionCell.style.display = 'flex'; // Use flexbox to layout action buttons side by side
        actionCell.style.alignItems = 'center'; // Center-align the buttons vertically
        actionCell.style.justifyContent = 'space-between'; // Distribute space between buttons
        
        const playButton = document.createElement('button');
        playButton.innerHTML = '<i class="fas fa-play"></i>'; // Changed to icon
        playButton.id = `play-btn-${index}`; // Unique ID for each play button
        playButton.onclick = function() {
          if (currentPlayingButton && currentPlayingButton !== playButton) {
            audioPlayer.pause(); // Pause the currently playing audio
            currentPlayingButton.innerHTML = '<i class="fas fa-play"></i>'; // Reset the icon of the previous button
          }
          audioPlayer.src = song.audioFile;
          audioPlayer.play().then(() => {
            console.log('Playback started successfully');
            playButton.innerHTML = '<i class="fas fa-pause"></i>'; // Change icon to pause
            currentPlayingButton = playButton; // Update the currently playing button
          }).catch(error => {
            console.error('Playback failed:', error);
            alert('Error: Unable to play the audio. Please check your audio settings.');
          });
        };
        const addButton = document.createElement('button');
        addButton.innerHTML = '<i class="fas fa-plus"></i>'; 
        addButton.id = `add-btn-${index}`; 
        addButton.onclick = function() { };
        
        // Styling for inline display of buttons
        playButton.style.marginRight = '10px'; // Space between buttons
        actionCell.appendChild(playButton);
        actionCell.appendChild(addButton);
        
        row.appendChild(artworkCell);
        row.appendChild(artistCell);
        row.appendChild(songCell);
        row.appendChild(actionCell);
        
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Error loading the song data:', error));
});