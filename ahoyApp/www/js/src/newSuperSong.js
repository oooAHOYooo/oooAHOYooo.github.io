// Function to load and display songs from songCollection.json
function loadSongs() {
  fetch("data/songCollection.json")
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("song-list"); // Ensure this is a <tbody> inside your table
      tableBody.innerHTML = ''; // Clear existing content

      data.songs.forEach((song, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><button class="control-button-a" onclick="playSong('${song.mp3url}', '${song.songTitle}', '${song.artist}', this.parentElement.parentElement)">Play</button></td>
          <td><img src="${song.coverArt}" alt="${song.songTitle}" class="thumbnail"></td>
          <td>${song.artist}</td>
          <td>${song.songTitle}</td>
          <td><button class="control-button-b" onclick="burnSong('${song.mp3url}', '${song.songTitle}', '${song.artist}')">Burn</button></td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error("Error loading songs:", error));
}

// Function to play a song, toggle play/pause, and move the song to the top
function playSong(songUrl, songTitle, artistName, songElement) {
  var audio = document.getElementById('audio-player');
  audio.dataset.songTitle = songTitle; // Store song title
  audio.dataset.artistName = artistName; // Store artist name
  togglePlayPause(songUrl, songTitle, artistName); // Use the toggle function defined in index.html
  moveToTop(songElement); // Move the song element to the top of the list
}

// Placeholder function for "Burn" functionality
function burnSong(songUrl, songTitle, artistName) {
  // Implement the functionality to "burn" a song here
  console.log(`Burning song: ${songTitle} by ${artistName}`);
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("song-list")) {
    loadSongs();
  }
});