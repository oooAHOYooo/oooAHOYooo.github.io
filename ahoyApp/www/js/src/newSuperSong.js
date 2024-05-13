    // Fetch the song details from JSONBin
    fetchSongs().then(data => {
      const song = data.record.songs.find(s => s.mp3url === songUrl);
      if (song && song.coverArt) {
        nowPlayingAlbumArt.src = song.coverArt; // Update album art
        nowPlayingAlbumArt.alt = `Album art for ${songTitle}`;
      }
    }).catch(error => console.error("Error loading song details:", error));
// Function to play a song and update now-playing details including cover art


function playSong(songUrl, songTitle, artistName, buttonElement) {
  const audioPlayer = document.getElementById("audio-player");
  const nowPlayingSongDetails = document.getElementById("now-playing-song-details");
  const nowPlayingSongTitle = document.getElementById("now-playing-song-title");
  const nowPlayingSongArtist = document.getElementById("now-playing-song-artist");
  const nowPlayingAlbumArt = document.getElementById("now-playing-album-art");
  const v24SongInfo = document.getElementById("song-info");
  const playPauseIcon = document.getElementById("play-pause-icon"); // Ensure this ID matches your play/pause toggle icon
  const displayElement = document.getElementById('thisOne'); // Get the element to update

  // Update the display element with the current song title
  if (displayElement) {
    displayElement.textContent = songTitle;
  }

  // Toggle play/pause based on the current song URL
  if (audioPlayer.src === songUrl && !audioPlayer.paused) {
    audioPlayer.pause();
    buttonElement.innerHTML = '<i class="fas fa-play"></i>'; // Change to play icon
    playPauseIcon.className = 'fas fa-play'; // Update play/pause icon
  } else {
    audioPlayer.src = songUrl;
    audioPlayer.play();
    buttonElement.innerHTML = '<i class="fas fa-pause"></i>'; // Change to pause icon
    playPauseIcon.className = 'fas fa-pause'; // Update play/pause icon

// Assuming there's a function or a variable that holds the current song's name
// For example, let's assume getCurrentMediaFileName() returns the name of the current media file

document.addEventListener('DOMContentLoaded', function() {
  var currentMediaFileName = getCurrentMediaFileName(); // This function needs to be defined or replaced with actual data retrieval logic
  var displayElement = document.getElementById('thisOne');
  if (displayElement) {
      displayElement.textContent = currentMediaFileName;
  }
});


    // Update or insert the Burn button next to the song title
    let burnButton = nowPlayingSongDetails.querySelector('.burn-button');
    if (!burnButton) {
      burnButton = document.createElement('button');
      burnButton.className = 'burn-button';
      burnButton.innerHTML = '<i class="fas fa-fire"></i> Burn';
      nowPlayingSongDetails.appendChild(burnButton);
    }
    burnButton.onclick = () => burnSong(songUrl, songTitle, artistName, burnButton);


    // Set currentSongIndex based on the songUrl
    currentSongIndex = songsArray.findIndex(s => s.mp3url === songUrl);

    // Update currentSong object
    currentSong.url = songUrl;
    currentSong.title = songTitle;
    currentSong.artist = artistName;
    currentSong.albumArt = nowPlayingAlbumArt.src; // Assuming album art is updated here
    currentSong.duration = audioPlayer.duration; // Assuming duration can be fetched here


  }
}

function playNewSong(songUrl) {
    AhoyAudioManager.loadMedia(songUrl);
}

// Enhanced error handling for audio playback
function handlePlaybackError() {
  const audioPlayer = document.getElementById("audio-player");
  audioPlayer.onerror = () => {
    console.error("Error occurred during song playback.");
    // Optionally, display an error message to the user or perform other error handling logic
  };
}

// Function to load and display songs from JSONBin
function loadSongs() {
  fetchSongs().then(data => {
    songsArray = data.record.songs; // Store the songs array globally
    const tableBody = document.getElementById("song-list"); // Ensure this is a <tbody> inside your table
    tableBody.innerHTML = ''; // Clear existing content

    data.record.songs.forEach((song, index) => {
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
  }).catch(error => console.error("Error loading songs:", error));
}

// Helper function to fetch songs from JSONBin
function fetchSongs() {
  const url = "https://api.jsonbin.io/v3/b/662f0278acd3cb34a8400e67";
  const accessKey = '$2a$10$4GRuokwTdv4sRnqIwYDyGOWZ2CZgDkefsKy7OFlmTydfnDvXBomtC';
  return fetch(url, {
    headers: {
      'X-Access-Key': accessKey
    }
  }).then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("song-list")) {
    loadSongs();
    updateProgressBar();
    handlePlaybackError();
  }
});

let currentSongIndex = null;
let songsArray = [];


