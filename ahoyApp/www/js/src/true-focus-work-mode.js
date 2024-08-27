let timer;
let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;
let isRunning = false;
let currentSongIndex = 0;
let classicalSongs = [];
let isPlaying = false;

const timerDisplay = document.querySelector('.timer-display');
const timerProgress = document.querySelector('.timer-progress');
const timerControlBtn = document.querySelector('.timer-control-btn');
const resetButton = document.getElementById('reset-timer');
const playlist = document.getElementById('classical-playlist');
const playAllButton = document.getElementById('play-all');
const pauseFocusMusicBtn = document.getElementById('pause-focus-music');
const nowPlayingDiv = document.getElementById('now-playing');
const audioPlayer = new Audio();

// Load classical playlist from JSON file
fetch('./data/classicalMusic.json')
  .then(response => response.json())
  .then(data => {
    classicalSongs = data.songs;
    classicPopulatePlaylist(classicalSongs);
    updateNowPlaying();
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

function classicPopulatePlaylist(tracks) {
  playlist.innerHTML = '';
  tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${track.songTitle} - ${track.composer}</span>
      <button class="play-song-btn" data-index="${index}">Play</button>
    `;
    li.querySelector('.play-song-btn').addEventListener('click', () => classicPlaySongFromList(index));
    playlist.appendChild(li);
  });
}

function classicPlaySongFromList(index) {
  currentSongIndex = index;
  classicLoadSong(classicalSongs[currentSongIndex]);
  audioPlayer.play();
  isPlaying = true;
  updateNowPlaying();
}

function classicLoadSong(song) {
  audioPlayer.src = song.audioUrl;
  updateNowPlaying();
}

function updateNowPlaying() {
  if (classicalSongs.length > 0) {
    const currentSong = classicalSongs[currentSongIndex];
    nowPlayingDiv.textContent = `Now Playing: ${currentSong.songTitle} - ${currentSong.composer}`;
  } else {
    nowPlayingDiv.textContent = 'No song playing';
  }
}

function playAll() {
  if (classicalSongs.length > 0) {
    currentSongIndex = 0;
    classicLoadSong(classicalSongs[currentSongIndex]);
    audioPlayer.play();
    isPlaying = true;
    updateNowPlaying();
  }
}

function pauseMusic() {
  if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
  } else {
    audioPlayer.play();
    isPlaying = true;
  }
  updateNowPlaying();
}

audioPlayer.addEventListener('ended', () => {
  currentSongIndex = (currentSongIndex + 1) % classicalSongs.length;
  classicLoadSong(classicalSongs[currentSongIndex]);
  audioPlayer.play();
  updateNowPlaying();
});

timerControlBtn.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
playAllButton.addEventListener('click', playAll);
pauseFocusMusicBtn.addEventListener('click', pauseMusic);

// Initial display update
updateDisplay();
