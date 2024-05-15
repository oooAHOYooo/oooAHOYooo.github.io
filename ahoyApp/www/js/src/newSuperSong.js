// Initialize currentSongIndex at the start of the file
let currentSongIndex = 0;

// Fetch the song details from JSONBin
fetchSongs().then(data => {
  songsArray = data.record.songs; // Assuming songsArray is declared globally
  const song = songsArray[currentSongIndex]; // Start with the first song
  if (song && song.coverArt) {
    nowPlayingAlbumArt.src = song.coverArt; // Update album art
    nowPlayingAlbumArt.alt = `Album art for ${song.songTitle}`;
  }
}).catch(error => console.error("Error loading song details:", error));
// Function to play a song and update now-playing details including cover art


function playSong(songUrl, songTitle, artistName, buttonElement) {
  const audioPlayer = document.getElementById("audio-player");
  const nowPlayingSongDetails = document.getElementById("now-playing-song-details");
  const nowPlayingSongTitle = document.getElementById("now-playing-song-title");
  const nowPlayingSongArtist = document.getElementById("now-playing-song-artist");
  const nowPlayingAlbumArt = document.getElementById("now-playing-album-art");
  const playPauseIcon = document.getElementById("play-pause-icon");
  const displayElement = document.getElementById('thisOne');

  // Update the display element with the current song title
  if (displayElement) {
    displayElement.textContent = songTitle;
  }

  // Update the global currentSongIndex
  currentSongIndex = songsArray.findIndex(s => s.mp3url === songUrl);

  // Toggle play/pause based on the current song URL
  if (audioPlayer.src === songUrl && !audioPlayer.paused) {
    audioPlayer.pause();
    buttonElement.innerHTML = '<i class="fas fa-play"></i>';
    playPauseIcon.className = 'fas fa-play';
  } else {
    audioPlayer.src = songUrl;
    audioPlayer.play();
    buttonElement.innerHTML = '<i class="fas fa-pause"></i>';
    playPauseIcon.className = 'fas fa-pause';
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
      row.className = 'table-row-27'; // Add class for styling
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

  const nextButton = document.getElementById('next-button'); // Ensure this ID matches your next button ID in the HTML
  const prevButton = document.getElementById('previous-button'); // Ensure this ID matches your previous button ID in the HTML

  if (nextButton) {
    nextButton.addEventListener('click', playNextSong);
  }

  if (prevButton) {
    prevButton.addEventListener('click', playPreviousSong);
  }
});

let songsArray = [];


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}


function updateSongListUI() {
  const tableBody = document.getElementById("song-list");
  if (!tableBody) return;
  tableBody.innerHTML = ''; // Clear existing content

  songsArray.forEach(song => {
      const row = document.createElement("tr");
      row.className = 'table-row';
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
}

function playNextSong() {
  // Pause the current song if it is playing
  const player = document.getElementById('audio-player');
  const playPauseButton = document.querySelector('.play-pause-button');
  const playPauseIcon = document.getElementById('play-pause-icon');

  if (!player.paused) {
    player.pause();
    playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
    playPauseIcon.className = 'fas fa-play';
  }

  // Increment the song index, loop back to the first song if at the end
  currentSongIndex = (currentSongIndex + 1) % songsArray.length;
  const nextSong = songsArray[currentSongIndex];

  // Play the next song
  playSong(nextSong.mp3url, nextSong.songTitle, nextSong.artist, playPauseButton);

  // Update the 'thisOne' element with the new song title
  const displayElement = document.getElementById('thisOne');
  if (displayElement) {
    displayElement.textContent = nextSong.songTitle;
  }
}

function playPreviousSong() {
  // Decrement the song index, loop to the last song if at the beginning
  currentSongIndex = currentSongIndex - 1 < 0 ? songsArray.length - 1 : currentSongIndex - 1;
  const prevSong = songsArray[currentSongIndex];
  playSong(prevSong.mp3url, prevSong.songTitle, prevSong.artist, document.querySelector('.play-pause-button'));
}

document.getElementById('v27-play-pause-button').addEventListener('click', function() {
  const player = document.getElementById('audio-player'); // Ensure this ID matches your actual player ID in the HTML
  if (player.paused) {
    player.play();
    document.getElementById('v27-play-pause-icon').className = 'fas fa-pause';
  } else {
    player.pause();
    document.getElementById('v27-play-pause-icon').className = 'fas fa-play';
  }
});
