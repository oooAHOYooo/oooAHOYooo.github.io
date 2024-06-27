document.addEventListener('DOMContentLoaded', function() {
  fetch('./data/songCollection.json')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('song-table-body');
      const audioPlayer = document.getElementById('audio-player'); // Assuming the audio player ID is 'audio-player'
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
        const playButton = document.createElement('button');
        playButton.textContent = 'Play';
        playButton.id = `play-btn-${index}`; // Unique ID for each play button
        playButton.onclick = function() {
          audioPlayer.src = song.audioFile; // Assuming each song object has an 'audioFile' property with the URL
          audioPlayer.play();
        };
        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Playlist';
        addButton.id = `add-btn-${index}`; // Unique ID for each add button
        addButton.onclick = function() { /* Add to playlist functionality */ };
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