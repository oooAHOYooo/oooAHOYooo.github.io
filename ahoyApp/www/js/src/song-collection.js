document.addEventListener('DOMContentLoaded', function() {
  let currentSongIndex = -1; // Track the current song index
  let songs = []; // This will hold the fetched song data

  fetch('./data/songCollection.json')
    .then(response => response.json())
    .then(data => {
      songs = data.songs; // Store songs globally
      const tableBody = document.getElementById('song-table-body');
      const audioPlayer = document.getElementById('audio-player'); // Assuming the audio player ID is 'audio-player'
      
      // Ensure the table is full width
      const table = document.getElementById('song-table');
      table.style.width = '100%';

      songs.forEach((song, index) => {
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
          togglePlayPauseSong(index);
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

  function togglePlayPauseSong(index) {
    const song = songs[index];
    const audioPlayer = document.getElementById('audio-player');
    const currentIcon = document.getElementById(`play-btn-${index}`).querySelector('i');

    // Pause any currently playing song and update the icon
    if (currentSongIndex !== -1 && currentSongIndex !== index && !audioPlayer.paused) {
      const currentPlayingIcon = document.getElementById(`play-btn-${currentSongIndex}`).querySelector('i');
      currentPlayingIcon.className = 'fas fa-play';
      audioPlayer.pause();
    }

    // Toggle play/pause for the selected song
    if (audioPlayer.src !== song.audioFile || audioPlayer.paused) {
      audioPlayer.src = song.audioFile;
      audioPlayer.play();
      currentIcon.className = 'fas fa-pause';
    } else {
      audioPlayer.pause();
      currentIcon.className = 'fas fa-play';
    }

    // Update the current song index
    currentSongIndex = index;
  }
});