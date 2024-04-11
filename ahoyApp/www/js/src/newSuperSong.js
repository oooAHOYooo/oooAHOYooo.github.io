// Function to play a song
function playSong(songUrl, songTitle, artistName, buttonElement) {
  const audioPlayer = document.getElementById("audio-player");
  // Toggle play/pause based on the current song URL
  if (audioPlayer.src === songUrl && !audioPlayer.paused) {
    audioPlayer.pause();
    buttonElement.innerHTML = '<i class="fas fa-play"></i>'; // Change to play icon
  } else {
    audioPlayer.src = songUrl;
    audioPlayer.play();
    buttonElement.innerHTML = '<i class="fas fa-pause"></i>'; // Change to pause icon
  }
}

// Function to load and display songs from songCollection.json
function loadSongs() {
  fetch("data/songCollection.json")
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("song-list"); // Ensure this is a <tbody> inside your table
      tableBody.innerHTML = ''; // Clear existing content

      data.songs.forEach((song, index) => {
        const row = document.createElement("tr");
        row.className = 'table-row'; // Add class for styling
        row.innerHTML = `
          <td><button class="control-button-a" onclick="playSong('${song.mp3url}', '${song.songTitle}', '${song.artist}', this)"><i class="fas fa-play"></i></button></td>
          <td><img src="${song.coverArt}" alt="${song.songTitle}" class="thumbnail"></td>
          <td>${song.artist}</td>
          <td>${song.songTitle}</td>
          <td><button class="control-button-b" onclick="burnSong('${song.mp3url}', '${song.songTitle}', '${song.artist}', this)"><i class="fas fa-fire"></i></button></td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error("Error loading songs:", error));
}

// Adjusted burnSong function
function burnSong(songUrl, songTitle, artistName, buttonElement) {
  addSongToBurnList(songUrl, songTitle, artistName);
  buttonElement.innerHTML = '<i class="fas fa-check"></i>'; // Change to check icon or any icon that indicates "burned"
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("song-list")) {
    loadSongs();
  }
});