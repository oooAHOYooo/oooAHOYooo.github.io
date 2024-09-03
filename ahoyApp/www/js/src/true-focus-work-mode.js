let timer;
let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;
let isRunning = false;
let currentSongIndex = 0;
let songs = [];

const timerDisplay = document.querySelector('.timer-display');
const timerProgress = document.querySelector('.timer-progress');
const timerControlBtn = document.querySelector('.timer-control-btn');
const resetButton = document.getElementById('reset-timer');
const playlist = document.getElementById('classical-playlist');
const playAllButton = document.getElementById('play-all');
const shuffleButton = document.getElementById('shuffle-playlist');
const audioPlayer = new Audio();

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playBtn = document.getElementById('playBtn');
const songTitle = document.getElementById('songTitle');
const artist = document.getElementById('artist');
const coverArt = document.getElementById('coverArt');

// Load classical playlist from JSON file
fetch('./data/classicalMusic.json')
  .then(response => response.json())
  .then(data => {
    songs = data.songs.filter(song => song.active);
    populatePlaylist(songs);
    if (songs.length > 0) {
      loadSong(songs[currentSongIndex]);
    } else {
      console.log("No active songs available.");
    }
  })
  .catch(error => console.error('Error loading playlist:', error));

function updateDisplay() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  timerDisplay.textContent = formattedTime;
  updateCircularProgress();
}

function updateCircularProgress() {
  const progress = (totalSeconds - remainingSeconds) / totalSeconds;
  const circumference = 2 * Math.PI * 145;
  const offset = circumference * (1 - progress);
  timerProgress.style.strokeDasharray = `${circumference} ${circumference}`;
  timerProgress.style.strokeDashoffset = offset;
}

function toggleTimer() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    document.querySelector('.play-icon').style.display = 'none';
    document.querySelector('.pause-icon').style.display = 'block';
    timer = setInterval(() => {
      if (remainingSeconds > 0) {
        remainingSeconds--;
        updateDisplay();
      } else {
        clearInterval(timer);
        isRunning = false;
        document.querySelector('.play-icon').style.display = 'block';
        document.querySelector('.pause-icon').style.display = 'none';
        alert('Time is up!');
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  document.querySelector('.play-icon').style.display = 'block';
  document.querySelector('.pause-icon').style.display = 'none';
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  remainingSeconds = totalSeconds;
  updateDisplay();
  document.querySelector('.play-icon').style.display = 'block';
  document.querySelector('.pause-icon').style.display = 'none';
}

timerControlBtn.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);

function populatePlaylist(tracks) {
  playlist.innerHTML = '';
  tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.id = `tf-playlist-item-${index}`;
    li.className = 'tf-playlist-item';
    li.innerHTML = `
      <div id="tf-song-info-${index}" class="tf-song-info">
        <div id="tf-song-title-${index}" class="tf-song-title">${track.songTitle}</div>
        <div id="tf-song-artist-${index}" class="tf-song-artist">${track.composer}</div>
      </div>
      <button id="tf-play-song-btn-${index}" class="tf-play-song-btn" data-index="${index}">
        <i class="fas fa-play"></i>
      </button>
    `;
    li.querySelector('.tf-play-song-btn').addEventListener('click', () => playSongFromList(index));
    playlist.appendChild(li);
  });
}

function loadSong(song) {
  songTitle.textContent = song.songTitle;
  artist.textContent = song.composer;
  coverArt.src = song.coverArt;
  coverArt.alt = `${song.composer} - ${song.songTitle}`;
  audioPlayer.src = song.mp3url;
  updatePlayButton();
}

function playSongFromList(index) {
  currentSongIndex = index;
  loadSong(songs[currentSongIndex]);
  // Remove autoplay
  // audioPlayer.play();
  updatePlayButton();
}

function togglePlay() {
  if (audioPlayer.paused) {
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
  updatePlayButton();
}

function updatePlayButton() {
  playBtn.innerHTML = audioPlayer.paused ? '<i class="fas fa-play"></i>' : '<i class="fas fa-pause"></i>';
}

function prevSong() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  audioPlayer.play();
}

function nextSong() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  audioPlayer.play();
}

function shufflePlaylist() {
  songs = shuffleArray(songs);
  populatePlaylist(songs);
  currentSongIndex = 0;
  loadSong(songs[currentSongIndex]);
  // Remove autoplay
  // audioPlayer.play();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

playAllButton.addEventListener('click', () => {
  currentSongIndex = 0;
  loadSong(songs[currentSongIndex]);
  // Remove autoplay
  // audioPlayer.play();
});

shuffleButton.addEventListener('click', shufflePlaylist);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
playBtn.addEventListener('click', togglePlay);

audioPlayer.addEventListener('ended', nextSong);

// ... existing updateDisplay() call ...

function initializeFocusWorkMode() {
  if (!FOCUS_WORK_MODE_ACTIVE) {
    console.log("Focus Work Mode is currently inactive.");
    document.getElementById('focus-work-mode-tab').innerHTML = '<p>Focus Work Mode is currently unavailable.</p>';
    return;
  }

  // Modify the fetch function inside initializeFocusWorkMode as well
  fetch('./data/classicalMusic.json')
    .then(response => response.json())
    .then(data => {
      songs = data.songs.filter(song => song.active);
      populatePlaylist(songs);
      if (songs.length > 0) {
        loadSong(songs[currentSongIndex]);
      } else {
        console.log("No active songs available.");
        document.getElementById('focus-work-mode-tab').innerHTML = '<p>No active songs available in the playlist.</p>';
      }
    })
    .catch(error => console.error('Error loading playlist:', error));

  // ... rest of the existing code ...
}

// ... existing code ...