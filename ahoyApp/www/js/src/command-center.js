import appConfig from './appConfig.js'; // Import the configuration

document.addEventListener('DOMContentLoaded', initializeApp);

async function initializeApp() {
  // Use paths from the appConfig file
  const paths = {
    songs: appConfig.jsonPaths.radioPlay,
    media: appConfig.jsonPaths.mediaCollection,
    podcast: appConfig.jsonPaths.podcastCollection,
  };

  try {
    // Load data for each content type
    const [songsData, mediaData, podcastData] = await Promise.all([
      fetchData(paths.songs),
      fetchData(paths.media),
      fetchData(paths.podcast)
    ]);

    // Initialize components
    initializeSongs(songsData.songs || []);
    initializeMedia(mediaData || []);
    initializePodcast(podcastData.podcasts || []);
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}

// Fetch JSON data helper function
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
  return response.json();
}

// Initialize Songs
function initializeSongs(songs) {
  let currentSongIndex = parseInt(localStorage.getItem('currentSongIndex')) || 0;

  // Store in local storage and update UI
  localStorage.setItem('songs', JSON.stringify(songs));
  updateSongPlayer(currentSongIndex, songs);
  populateSongList(songs);
  
  // Add event listeners
  document.getElementById('playBtn').addEventListener('click', toggleSongPlay);
  document.getElementById('nextBtn').addEventListener('click', () => playNextSong(songs));
  document.getElementById('prevBtn').addEventListener('click', () => playPreviousSong(songs));
}

// Populate and update the song list UI
function populateSongList(songs) {
  const songListBody = document.getElementById('songListBody');
  songListBody.innerHTML = '';
  songs.forEach((song, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td><img src="${song.coverArt}" alt="Cover" style="width:50px;height:50px;"></td>
                     <td>${song.artist}</td><td>${song.songTitle}</td>
                     <td><button data-index="${index}" class="listen-btn">Listen</button></td>`;
    songListBody.appendChild(row);
  });

  document.querySelectorAll('.listen-btn').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      updateSongPlayer(index, songs);
      localStorage.setItem('currentSongIndex', index);
      document.getElementById('musicAudioPlayer').play();
    });
  });
}

// Update song player UI and audio source
function updateSongPlayer(index, songs) {
  const song = songs[index];
  if (!song) return;
  document.getElementById('songTitle').textContent = song.songTitle;
  document.getElementById('artist').textContent = song.artist;
  document.getElementById('musicAudioPlayer').src = song.mp3url;
}

// Initialize Media
function initializeMedia(mediaItems) {
  populateMediaTable(mediaItems);
  
  // Initial random media play
  if (mediaItems.length) {
    const randomMedia = mediaItems[Math.floor(Math.random() * mediaItems.length)];
    loadMedia(randomMedia);
  }
}

// Populate media table with media items
function populateMediaTable(mediaItems) {
  const tableBody = document.querySelector('#mediaTable tbody');
  tableBody.innerHTML = '';
  mediaItems.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `<td><img src="${item.thumbnail_link}" class="mediaThumbnailImage lazy-thumbnail"></td>
                     <td>${item.artist}</td><td>${item.display_title}</td>
                     <td><button class="playMediaButton">Play</button></td>`;
    tableBody.appendChild(row);

    row.querySelector('.playMediaButton').addEventListener('click', () => loadMedia(item));
  });
}

// Load media in the media player
function loadMedia(item) {
  const player = jwplayer("jw-player-container").setup({
    file: item.mp4_link,
    image: item.thumbnail_link,
    width: "100%",
    aspectratio: "16:9"
  });
  document.querySelector('#media-artist-name p').textContent = item.artist;
  document.querySelector('#media-title-name p').textContent = item.display_title;
}

// Initialize Podcast
function initializePodcast(podcasts) {
  populatePodcastList(podcasts);
  if (podcasts.length) loadPodcast(podcasts[0], podcasts, 0);
}

// Populate podcast list
function populatePodcastList(podcasts) {
  const podcastListBody = document.getElementById('podcastListBody');
  podcastListBody.innerHTML = '';
  podcasts.forEach((podcast, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td><img src="${podcast.thumbnail}" width="50"></td>
                     <td>${podcast.title}</td>
                     <td><button class="listen-btn-podcast" data-index="${index}">Listen</button></td>`;
    podcastListBody.appendChild(row);

    row.querySelector('.listen-btn-podcast').addEventListener('click', () => loadPodcast(podcast, podcasts, index));
  });
}

// Load and play selected podcast
function loadPodcast(podcast, podcasts, index) {
  document.getElementById('podcast-title').textContent = podcast.title;
  document.getElementById('podcast-description').textContent = podcast.description;
  document.getElementById('podcast-thumbnail').src = podcast.thumbnail;
  const audioPlayer = document.getElementById('podcastAudioPlayer');
  audioPlayer.src = podcast.mp3url;

  audioPlayer.addEventListener('ended', () => loadNextPodcast(podcasts, index));
}

// Load the next podcast
function loadNextPodcast(podcasts, currentIndex) {
  const nextIndex = (currentIndex + 1) % podcasts.length;
  loadPodcast(podcasts[nextIndex], podcasts, nextIndex);
}

// Add play/pause toggle functionality to each media type
function toggleSongPlay() {
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