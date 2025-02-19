// URLs for JSON data
const remoteSongsDataUrl = 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/radioPlay.json';
const localSongsDataUrl = './local_data/radioPlay.json';

// Set default to remote
let useRemoteData = true;

// Function to toggle data source
function toggleDataSource() {
  useRemoteData = !useRemoteData;
  fetchRadioSongs(); // Re-fetch songs with the new data source
}

let currentSongIndex = 0;
let songs = [];

// Fetch the songs data from the selected JSON file
async function fetchRadioSongs() {
  const songsDataUrl = useRemoteData ? remoteSongsDataUrl : localSongsDataUrl;
  try {
    const response = await fetch(songsDataUrl);
    const data = await response.json();
    songs = data.songs;

    // Randomly shuffle songs as the default order
    shuffleArray(songs);

    // Store songs in local storage
    localStorage.setItem('songs', JSON.stringify(songs));

    // Retrieve current song index from local storage or default to 0
    currentSongIndex = parseInt(localStorage.getItem('currentSongIndex')) || 0;

    updateRadioPlayer(currentSongIndex);
    populateSongList(); // Populate the song list after fetching songs
  } catch (error) {
    console.error("Error fetching radio data:", error);
  }
}

// Function to populate the song list table
function populateSongList() {
  const songListBody = document.getElementById('songListBody');
  songListBody.innerHTML = ''; // Clear existing list

  songs.forEach((song, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${song.coverArt}" alt="${song.songTitle} cover art" style="width: 50px; height: 50px;"></td>
      <td>${song.artist}</td>
      <td>${song.songTitle}</td>
      <td><button class="listen-btn" data-index="${index}">Listen</button></td>
    `;
    songListBody.appendChild(row);

    // Add event listener to the row
    row.addEventListener('click', function() {
      updateRadioPlayer(index);
      document.getElementById('musicAudioPlayer').play();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });

  // Add event listeners to all listen buttons
  document.querySelectorAll('.listen-btn').forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent the row click event from firing
      const songIndex = this.getAttribute('data-index');
      updateRadioPlayer(parseInt(songIndex));
      document.getElementById('musicAudioPlayer').play();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
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
  const audioPlayer = document.getElementById('musicAudioPlayer');
  audioPlayer.src = song.mp3url;

  // Reset the progress bar and play button
  document.getElementById('durationBar').value = 0;

  // Update duration bar max value and reset current value when metadata is loaded
  audioPlayer.onloadedmetadata = () => {
    document.getElementById('durationBar').max = audioPlayer.duration;
    document.getElementById('durationBar').value = 0;
  };

  // Update the playlist UI highlight if it exists
  if (document.getElementById("playlistUI")) {
    updatePlaylistHighlight(index);
  }

  // Store current song index in local storage
  localStorage.setItem('currentSongIndex', index);
}

// Function to play or pause the song
function togglePlay() {
  const audioPlayer = document.getElementById('musicAudioPlayer');
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
  document.getElementById('musicAudioPlayer').play();
}

// Add event listener to play the next song when the current one ends
document.getElementById('musicAudioPlayer').addEventListener('ended', nextSong);

// Function to toggle play/pause when clicking the thumbnail
function togglePlayOnThumbnail() {
  const audioPlayer = document.getElementById('musicAudioPlayer');
  const playBtn = document.getElementById('playBtn');

  if (audioPlayer.paused) {
    audioPlayer.play();
    playBtn.textContent = '[❚❚ PAUSE]';
  } else {
    audioPlayer.pause();
    playBtn.textContent = '[► PLAY]';
  }
}

// Add event listener to the cover art for play/pause toggle
document.getElementById('coverArt').addEventListener('click', togglePlayOnThumbnail);

// Function to go to the previous song
function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updateRadioPlayer(currentSongIndex);
  document.getElementById('musicAudioPlayer').play();
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
            <td><img src="${song.coverArt}" alt="${song.songTitle} cover art" style="width: 50px; height: 50px; object-fit: cover;"></td>
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
            document.getElementById('musicAudioPlayer').play();
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
  const audioPlayer = document.getElementById('musicAudioPlayer');
  const durationBar = document.getElementById('durationBar');
  durationBar.value = audioPlayer.currentTime;
}

// Event listener for the duration bar to seek in the song
document.getElementById('durationBar').addEventListener('input', function() {
  const audioPlayer = document.getElementById('musicAudioPlayer');
  audioPlayer.currentTime = this.value;
});

// Update the duration bar as the song plays
document.getElementById('musicAudioPlayer').addEventListener('timeupdate', updateDurationBar);

// Function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Call the fetch function once the page loads
document.addEventListener('DOMContentLoaded', () => {
  // Check if songs are already in local storage
  const storedSongs = localStorage.getItem('songs');
  if (storedSongs) {
    songs = JSON.parse(storedSongs);
    currentSongIndex = parseInt(localStorage.getItem('currentSongIndex')) || 0;
    
    // Randomly shuffle songs as the default order
    shuffleArray(songs);
    
    updateRadioPlayer(currentSongIndex);
    populateSongList();
  } else {
    fetchRadioSongs();
  }

  // Register the Play All button event if it exists
  const playAllBtn = document.getElementById("playAllBtn");
  if (playAllBtn) {
    playAllBtn.addEventListener("click", playAllSongs);
  }
});

// Function to sort songs based on criteria
function sortSongs(songs, criteria) {
  switch (criteria) {
    case 'recent':
      // Sort by the highest id value first
      return songs.sort((a, b) => b.id - a.id);
    case 'random':
      // Shuffle the songs array
      return songs.sort(() => Math.random() - 0.5);
    case 'title':
      // Sort by song title alphabetically
      return songs.sort((a, b) => a.songTitle.localeCompare(b.songTitle));
    case 'artist':
      // Sort by artist name alphabetically
      return songs.sort((a, b) => a.artist.localeCompare(b.artist));
    default:
      return songs;
  }
}

// Function to sort and display songs
function sortAndDisplaySongs(criteria) {
    songs = sortSongs(songs, criteria);
    populateSongList(); // Repopulate after sorting
}

// Add event listeners for sort buttons
document.getElementById('song-sort-recent').addEventListener('click', () => {
    sortAndDisplaySongs('recent');
});
document.getElementById('song-sort-random').addEventListener('click', () => {
    sortAndDisplaySongs('random');
});
document.getElementById('song-sort-title-az').addEventListener('click', () => {
    sortAndDisplaySongs('title');
});
document.getElementById('song-sort-artist-az').addEventListener('click', () => {
    sortAndDisplaySongs('artist');
});

// Function to clear the search input and repopulate the song list
function clearSearch() {
  document.getElementById('songSearch').value = ''; // Clear the search input
  populateSongList(); // Repopulate the song list with all songs
}

// Add event listener to the clear search button
document.getElementById('clear-search').addEventListener('click', clearSearch);

// Function to skip forward 15 seconds
function skipForward15Seconds() {
  const audioPlayer = document.getElementById('musicAudioPlayer');
  audioPlayer.currentTime = Math.min(audioPlayer.currentTime + 15, audioPlayer.duration);
}

// Add event listener for the "+15 seconds" button
document.getElementById('add15sBtn').addEventListener('click', skipForward15Seconds);

// Add event listener to toggle button
document.getElementById('toggleDataSourceBtn').addEventListener('click', toggleDataSource);

// Function to display the playlist UI
function displayPlaylist(playlist) {
  if (window.Alpine && Alpine.store('playlist')) {
    Alpine.store('playlist').setPlaylist(playlist, currentSongIndex);
  } else {
    // Fallback if Alpine is not available: update the DOM directly.
    const playlistUI = document.getElementById("playlistUI");
    if (!playlistUI) return;
    playlistUI.innerHTML = "";
    const listEl = document.createElement("ol");
    playlist.forEach((song, index) => {
      const li = document.createElement("li");
      li.textContent = `${song.songTitle} - ${song.artist}`;
      li.id = "playlist-item-" + index;
      listEl.appendChild(li);
    });
    playlistUI.appendChild(listEl);
    updatePlaylistHighlight(currentSongIndex);
  }
}

// Function to update the highlighted song in the playlist UI
function updatePlaylistHighlight(activeIndex) {
  const playlistUI = document.getElementById("playlistUI");
  if (!playlistUI) return;
  const items = playlistUI.querySelectorAll("li");
  items.forEach((item, index) => {
    item.classList.toggle("active-playlist-item", index === activeIndex);
  });
}

// Function to play all songs in random order and display the playlist UI
function playAllSongs() {
  if (!songs || songs.length === 0) {
    // If songs are not yet loaded, fetch them then try again
    fetchRadioSongs().then(() => {
      playAllSongs();
    });
    return;
  }
  // Compute today's seed based on the date (YYYYMMDD)
  const todayStr = new Date().toISOString().slice(0,10).replace(/-/g, '');
  const seed = parseInt(todayStr, 10);

  // Create a shuffled copy using the seeded shuffle so that it's the same for everyone today.
  let songsCopy = [...songs];
  seededShuffleArray(songsCopy, seed);

  // Build a playlist long enough for ~1 hour (3600 seconds).
  // We assume that "duration" exists on a song object in seconds.
  // If missing, a default of 180 seconds (3 minutes) is used.
  let playlist = [];
  let totalDuration = 0;
  for (let i = 0; i < songsCopy.length; i++) {
    const duration = songsCopy[i].duration ? parseFloat(songsCopy[i].duration) : 180;
    if (totalDuration < 3600 || playlist.length === 0) {
      playlist.push(songsCopy[i]);
      totalDuration += duration;
    } else {
      break;
    }
  }
  // If there were not enough songs to reach 1 hour, you could choose to loop or just use what we have.
  // For now, we use the accumulated playlist.

  // Update the global songs array to become today's playlist used for "Play All".
  songs = playlist;
  currentSongIndex = 0;
  // Update UI using Alpine store (or fallback DOM)
  displayPlaylist(songs);
  updateRadioPlayer(currentSongIndex);
  document.getElementById("musicAudioPlayer").play();
}

// Expose playAllSongs globally so Alpine (and your HTML) can call it.
window.playAllSongs = playAllSongs;

// ----------- SEEDED SHUFFLE UTILS --------------
// A seeded random generator function: mulberry32
function mulberry32(a) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}

// Shuffle array using a seeded random number generator
function seededShuffleArray(array, seed) {
  let random = mulberry32(seed);
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ----------- ALPINE STORE FOR PLAYLIST --------------
// When Alpine initializes, define a global store called "playlist"
document.addEventListener('alpine:init', () => {
  Alpine.store('playlist', {
    songs: [],
    currentSongIndex: 0,
    setPlaylist(newPlaylist, currentIndex) {
      this.songs = newPlaylist;
      this.currentSongIndex = currentIndex;
    }
  });
});
