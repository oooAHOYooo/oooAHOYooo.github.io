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
          <td><button class="control-button-a" onclick="loadAndPlaySong('${song.mp3url}', '${song.songTitle}', '${song.artist}')">Play</button></td>
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

// Function to load a song into the player and play it
function loadAndPlaySong(songUrl, songTitle, artistName) {
  var audio = document.getElementById('audio-player');
  var songInfo = document.getElementById('song-info');
  audio.src = songUrl; // Set the source of the song
  audio.play(); // Play the song
  songInfo.textContent = `${artistName} - ${songTitle}`; // Update song info display
  document.getElementById('play-pause-icon').className = 'fas fa-pause'; // Change to pause icon
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