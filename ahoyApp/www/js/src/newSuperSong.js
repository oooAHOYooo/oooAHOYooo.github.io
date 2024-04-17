// Function to play a song and update now-playing details including cover art
function playSong(songUrl, songTitle, artistName, buttonElement) {
  const audioPlayer = document.getElementById("audio-player");
  const nowPlayingSongDetails = document.getElementById("now-playing-song-details");
  const nowPlayingSongTitle = document.getElementById("now-playing-song-title");
  const nowPlayingSongArtist = document.getElementById("now-playing-song-artist");
  const nowPlayingAlbumArt = document.getElementById("now-playing-album-art"); // Ensure this ID matches your album art img element
  const v24SongInfo = document.getElementById("song-info"); // Add this line

  // Toggle play/pause based on the current song URL
  if (audioPlayer.src === songUrl && !audioPlayer.paused) {
    audioPlayer.pause();
    buttonElement.innerHTML = '<i class="fas fa-play"></i>'; // Change to play icon
  } else {
    audioPlayer.src = songUrl;
    audioPlayer.play();
    buttonElement.innerHTML = '<i class="fas fa-pause"></i>'; // Change to pause icon

    // Update now-playing song details
    nowPlayingSongTitle.textContent = songTitle;
    nowPlayingSongArtist.textContent = artistName;
    v24SongInfo.textContent = `${artistName} - ${songTitle}`; // Update this line

    // Fetch the song details from songCollection.json to get the coverArt URL
    fetch("data/songCollection.json")
      .then(response => response.json())
      .then(data => {
        const song = data.songs.find(s => s.mp3url === songUrl);
        if (song && song.coverArt) {
          nowPlayingAlbumArt.src = song.coverArt; // Update album art
          nowPlayingAlbumArt.alt = `Album art for ${songTitle}`;
        }
      })
      .catch(error => console.error("Error loading song details:", error));

    // Scroll the now-playing song details into view
    nowPlayingSongDetails.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Set currentSongIndex based on the songUrl
    currentSongIndex = songsArray.findIndex(s => s.mp3url === songUrl);
  }
}

// Function to load and display songs from songCollection.json with updated table structure
function loadSongs() {
  fetch("data/songCollection.json")
    .then(response => response.json())
    .then(data => {
      songsArray = data.songs; // Store the songs array globally
      const tableBody = document.getElementById("song-list"); // Ensure this is a <tbody> inside your table
      tableBody.innerHTML = ''; // Clear existing content

      data.songs.forEach((song, index) => {
        const row = document.createElement("tr");
        row.className = 'table-row'; // Add class for styling
        row.innerHTML = `
          <td>
            <button onclick="playSong('${song.mp3url}', '${song.songTitle}', '${song.artist}', this)">
              <i class="fas fa-play"></i>
            </button>
          </td>
          <td>
            <img src="${song.coverArt}" alt="${song.songTitle}" class="thumbnail">
          </td>
          <td>${song.artist}</td>
          <td>${song.songTitle}</td>
          <td>
      
            <button class="burn-button-overlay" onclick="burnSong('${song.mp3url}', '${song.songTitle}', '${song.artist}', this)">
              <i class="fas fa-fire"></i>
            </button>
          </td>
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

let currentSongIndex = null;
let songsArray = [];
