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
      table.classList.add('styled-table'); // Add styled-table class

      songs.forEach((song, index) => {
        const row = document.createElement('tr');
        row.classList.add('song-row'); // Add class for consistent row height
        
        const artworkCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = song.coverArt;
        img.classList.add('album-art'); // Add class for album art
        img.onclick = function() { // Play song on album art click
          togglePlayPauseSong(index);
        };
        artworkCell.appendChild(img);
        
        const artistCell = document.createElement('td');
        artistCell.textContent = song.artist;
        
        const songCell = document.createElement('td');
        songCell.classList.add('song-cell'); // Add class for larger cell
        songCell.textContent = song.songTitle;
        
        const actionCell = document.createElement('td');
        actionCell.classList.add('action-cell'); // Add class for action cell
        actionCell.classList.add('action-cell-flex'); // Add flex class for inline display
        actionCell.style.textAlign = 'right'; // Align buttons to the right
        
        const playButton = document.createElement('button');
        playButton.innerHTML = '<i class="fas fa-play"></i>'; // Changed to icon
        playButton.id = `play-btn-${index}`; // Unique ID for each play button
        playButton.classList.add('custom-play-button'); // Add custom class
        playButton.onclick = function() {
          togglePlayPauseSong(index);
        };
        const addButton = document.createElement('button');
        addButton.innerHTML = '<i class="fas fa-plus"></i>'; 
        addButton.id = `add-btn-${index}`; 
        addButton.onclick = function() { };
        
        // Styling for inline display of buttons
        playButton.classList.add('action-button'); // Add class for action button
        addButton.classList.add('action-button'); // Add class for action button
        addButton.classList.add('--action-add'); // Add class for action button
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
    if (audioPlayer.src !== song.mp3url || audioPlayer.paused) { // Use mp3url from JSON
      audioPlayer.src = song.mp3url; // Update to use mp3url
      audioPlayer.play();
      currentIcon.className = 'fas fa-pause';
    } else {
      audioPlayer.pause();
      currentIcon.className = 'fas fa-play';
    }

    // Update the current song index
    currentSongIndex = index;

    // Update the currently playing text and play/pause button in the main content
    const currentPlaying = document.getElementById('thisOne');
    currentPlaying.innerHTML = `
      <button id="current-pause-btn" style="font-size: 0.8em; margin-right: 5px;"><i class="fas ${audioPlayer.paused ? 'fa-play' : 'fa-pause'}"></i></button>
      <span>${song.songTitle} - ${song.artist}</span>
 
    `;

    // Add event listener to the div to toggle play/pause
    currentPlaying.onclick = function() {
      togglePlayPauseSong(index);
    };

    // Update the currently playing text and album art in the sidebar
    const sidebarCurrentTrack = document.getElementById('current-track');
    sidebarCurrentTrack.innerHTML = `
      <img src="${song.coverArt}" alt="Album Art" class="current-album-art">
      <div>
        <span>${song.songTitle}</span><br>
        <span>${song.artist}</span>
        <br>
        <div id="timeline-container">
        <span id="current-time">0:00</span>
        <input type="range" id="timeline" value="0" max="100">
        <span id="total-time">0:00</span>
      </div>

      </div>
    `;

    // Update the album art in the currently playing section
    const bottomAlbumArt = document.getElementById('bottom-album-art');
    bottomAlbumArt.src = song.coverArt;

    // Update the timeline and time display
    const timeline = document.getElementById('timeline');
    const currentTimeDisplay = document.getElementById('current-time');
    const totalTimeDisplay = document.getElementById('total-time');

    audioPlayer.ontimeupdate = function() {
      const currentTime = audioPlayer.currentTime;
      const duration = audioPlayer.duration;
      timeline.value = (currentTime / duration) * 100;
      currentTimeDisplay.textContent = formatTime(currentTime);
      totalTimeDisplay.textContent = formatTime(duration);
    };

    timeline.oninput = function() {
      const duration = audioPlayer.duration;
      audioPlayer.currentTime = (timeline.value / 100) * duration;
    };
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
});