let timer;
let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;
let isRunning = false;
let currentSongIndex = 0;
let classicalSongs = []; // Rename 'songs' to 'classicalSongs'

const timerDisplay = document.querySelector('.timer-display');
const timerProgress = document.querySelector('.timer-progress');
const timerControlBtn = document.querySelector('.timer-control-btn');
const resetButton = document.getElementById('reset-timer');
const playlist = document.getElementById('classical-playlist');
const playAllButton = document.getElementById('play-all');
// const shuffleButton = document.getElementById('shuffle-playlist');
const audioPlayer = new Audio();

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const playBtn = document.getElementById('playBtn');
const songTitle = document.getElementById('songTitle');
const artist = document.getElementById('artist');
const coverArt = document.getElementById('coverArt');

// Add these lines near the top of the file, with the other constant declarations
const pauseFocusMusicBtn = document.getElementById('pause-focus-music');

// Load classical playlist from JSON file
fetch('./data/classicalMusic.json')
  .then(response => response.json())
  .then(data => {
    classicalSongs = data.songs; // Use 'classicalSongs' instead of 'songs'
    classicPopulatePlaylist(classicalSongs);
    classicLoadSong(classicalSongs[currentSongIndex]);
  })
  .catch(error => console.error('Error loading classical playlist:', error));

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

function classicPopulatePlaylist(tracks) {
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
    li.querySelector('.tf-play-song-btn').addEventListener('click', () => classicPlaySongFromList(index));
    playlist.appendChild(li);
  });
}

function classicLoadSong(song) {
  songTitle.textContent = song.songTitle;
  artist.textContent = song.composer;
  coverArt.src = song.coverArt;
  coverArt.alt = `${song.composer} - ${song.songTitle}`;
  audioPlayer.src = song.mp3url;
  classicUpdatePlayButton();
}

function classicPlaySongFromList(index) {
  currentSongIndex = index;
  classicLoadSong(classicalSongs[currentSongIndex]);
  audioPlayer.play();
  classicUpdatePlayButton();
}

function classicTogglePlay() {
  if (audioPlayer.paused) {
    currentSongIndex = 0; // Reset to the first song
    classicLoadSong(classicalSongs[currentSongIndex]);
    audioPlayer.play();
  } else {
    audioPlayer.pause();
  }
  classicUpdatePlayButton();
}

function classicUpdatePlayButton() {
  const isPaused = audioPlayer.paused;
  const playIcon = '<i class="fas fa-play"></i>';
  const pauseIcon = '<i class="fas fa-pause"></i>';
  
  playBtn.innerHTML = isPaused ? playIcon : pauseIcon;
  pauseBtn.innerHTML = isPaused ? playIcon : pauseIcon;
  pauseFocusMusicBtn.textContent = isPaused ? 'Resume' : 'Pause';
  
  // Update the play button in the playlist
  document.querySelectorAll('.tf-play-song-btn').forEach((btn, index) => {
    btn.innerHTML = index === currentSongIndex && !isPaused ? pauseIcon : playIcon;
  });
}

function classicPrevSong() {
  currentSongIndex = (currentSongIndex - 1 + classicalSongs.length) % classicalSongs.length;
  classicLoadSong(classicalSongs[currentSongIndex]);
  audioPlayer.play();
}

function classicNextSong() {
  currentSongIndex = (currentSongIndex + 1) % classicalSongs.length;
  classicLoadSong(classicalSongs[currentSongIndex]);
  audioPlayer.play();
}

// Remove the classicShufflePlaylist and classicShuffleArray functions

// Update event listeners
playAllButton.addEventListener('click', classicTogglePlay);

// Remove the shuffleButton event listener
// shuffleButton.addEventListener('click', classicShufflePlaylist);

prevBtn.addEventListener('click', classicPrevSong);
nextBtn.addEventListener('click', classicNextSong);
playBtn.addEventListener('click', classicTogglePlay);

audioPlayer.addEventListener('ended', classicNextSong);

// Add this function to handle pausing and resuming the music
function togglePauseFocusMusic() {
  if (audioPlayer.paused) {
    audioPlayer.play();
    pauseFocusMusicBtn.textContent = 'Pause';
  } else {
    audioPlayer.pause();
    pauseFocusMusicBtn.textContent = 'Resume';
  }
  classicUpdatePlayButton();
}

// Add this event listener near the bottom of the file, with the other event listeners
pauseFocusMusicBtn.addEventListener('click', togglePauseFocusMusic);

// ... existing updateDisplay() call ...