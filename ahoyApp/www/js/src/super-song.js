const songsDataUrl = './data/true-radioPlay.json'; // Updated path to your JSON file
let currentSongIndex = 0;
let songs = [];

// Function to populate the song list table
function populateSongList() {
  const songListBody = document.getElementById('songListBody');
  songs.forEach((song, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${song.coverArt}" alt="${song.songTitle} cover art" style="width: 50px; height: 50px;"></td>
      <td>${song.artist}</td>
      <td>${song.songTitle}</td>
      <td><button class="listen-btn" data-index="${index}">Listen</button></td>
    `;
    songListBody.appendChild(row);
  });

  // Add event listeners to all listen buttons
  document.querySelectorAll('.listen-btn').forEach(button => {
    button.addEventListener('click', function() {
      const songIndex = this.getAttribute('data-index');
      updateRadioPlayer(parseInt(songIndex));
      document.getElementById('audioPlayer').play();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'  // Optional: Adds a smooth scrolling effect
      });
    });
  });
}

// Fetch the songs data from the JSON file
async function fetchRadioSongs() {
  try {
    const response = await fetch(songsDataUrl);
    const data = await response.json();
    songs = data.songs;
    updateRadioPlayer(currentSongIndex);
    populateSongList(); // Populate the song list after fetching songs
  } catch (error) {
    console.error("Error fetching radio data:", error);
  }
}

// Function to update the radio player with the current song
function updateRadioPlayer(index) {
  const song = songs[index];

  // Update the cover art
  const coverArt = document.getElementById('coverArt');
  coverArt.src = song.coverArt;
  coverArt.alt = `${song.songTitle} cover art`;

  // Update the song title and artist
  document.getElementById('songTitle').textContent = song.songTitle;
  document.getElementById('artist').textContent = song.artist;

  // Set the audio source for the player
  const audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.src = song.mp3url;

  // Reset the progress bar and play button
  document.getElementById('durationBar').value = 0; // Updated to use durationBar

  // Update duration bar max value and reset current value
  audioPlayer.onloadedmetadata = () => {
    document.getElementById('durationBar').max = audioPlayer.duration;
    document.getElementById('durationBar').value = 0;
  };
}

// Function to play or pause the song
function togglePlay() {
  const audioPlayer = document.getElementById('audioPlayer');
  const playBtn = document.getElementById('playBtn');
  
  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.textContent = '[❚❚ PAUSE]';
  } else {
    audioPlayer.pause();
    playBtn.textContent = '[► PLAY]';
  }
}

// Function to go to the next song
function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updateRadioPlayer(currentSongIndex);
  document.getElementById('audioPlayer').play();
}

// Function to go to the previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateRadioPlayer(currentSongIndex);
  document.getElementById('audioPlayer').play();
}

// Function to handle search
function searchSongs() {
    const searchInput = document.getElementById('songSearch').value.toLowerCase();
    const filteredSongs = songs.filter(song => 
        song.songTitle.toLowerCase().includes(searchInput) ||
        song.artist.toLowerCase().includes(searchInput)
    );

    // Clear the current list
    const songListBody = document.getElementById('songListBody');
    songListBody.innerHTML = '';

    // Populate with filtered songs
    filteredSongs.forEach((song, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${song.coverArt}" alt="${song.songTitle} cover art" style="width: 50px; height: 50px;"></td>
            <td>${song.artist}</td>
            <td>${song.songTitle}</td>
            <td><button class="listen-btn" data-index="${index}">Listen</button></td>
        `;
        songListBody.appendChild(row);
    });

    // Re-add event listeners to new listen buttons
    document.querySelectorAll('.listen-btn').forEach(button => {
        button.addEventListener('click', function() {
            const songIndex = this.getAttribute('data-index');
            updateRadioPlayer(parseInt(songIndex));
            document.getElementById('audioPlayer').play();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });
}

// Add event listener to search button
document.getElementById('searchBtn').addEventListener('click', searchSongs);

// Event listeners
document.getElementById('playBtn').addEventListener('click', togglePlay);
document.getElementById('nextBtn').addEventListener('click', nextSong);
document.getElementById('prevBtn').addEventListener('click', prevSong);

// Function to update the duration bar as the song plays
function updateDurationBar() {
  const audioPlayer = document.getElementById('audioPlayer');
  const durationBar = document.getElementById('durationBar');
  durationBar.value = audioPlayer.currentTime;
}

// Event listener for the duration bar to seek in the song
document.getElementById('durationBar').addEventListener('input', function() {
  const audioPlayer = document.getElementById('audioPlayer');
  audioPlayer.currentTime = this.value;
});

// Update the duration bar as the song plays
document.getElementById('audioPlayer').addEventListener('timeupdate', updateDurationBar);

// Call the fetch function once the page loads
document.addEventListener('DOMContentLoaded', fetchRadioSongs);
