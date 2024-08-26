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

// Load classical playlist from JSON file
fetch('js/data/classical_playlist.json')
  .then(response => response.json())
  .then(data => {
    songs = data.songs;
    populatePlaylist(songs);
  })
  .catch(error => console.error('Error loading playlist:', error));

function populatePlaylist(tracks) {
  playlist.innerHTML = '';
  tracks.forEach((track, index) => {
    const li = document.createElement('li');
    li.textContent = `${track.composer} - ${track.songTitle}`;
    li.addEventListener('click', () => playTrack(index));
    playlist.appendChild(li);
  });
}

function playTrack(index) {
  currentSongIndex = index;
  const track = songs[currentSongIndex];
  audioPlayer.src = track.mp3url;
  audioPlayer.play();
  updateNowPlaying();
}

function updateNowPlaying() {
  const track = songs[currentSongIndex];
  document.getElementById('now-playing').textContent = `Now Playing: ${track.composer} - ${track.songTitle}`;
}

function playNextTrack() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  playTrack(currentSongIndex);
}

audioPlayer.addEventListener('ended', playNextTrack);

playAllButton.addEventListener('click', () => {
  currentSongIndex = 0;
  playTrack(currentSongIndex);
});

shuffleButton.addEventListener('click', () => {
  songs = shuffleArray(songs);
  populatePlaylist(songs);
  currentSongIndex = 0;
  playTrack(currentSongIndex);
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

updateDisplay();