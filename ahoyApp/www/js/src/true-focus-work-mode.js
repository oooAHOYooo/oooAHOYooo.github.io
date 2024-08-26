let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;
let currentSongIndex = 0;
let songs = [];

const timerDisplay = document.querySelector('.timer-display');
const pauseIcon = document.querySelector('.pause-icon');
const startButton = document.getElementById('start-timer');
const pauseButton = document.getElementById('pause-timer');
const resetButton = document.getElementById('reset-timer');
const playlist = document.getElementById('classical-playlist');
const playAllButton = document.getElementById('play-all');
const shuffleButton = document.getElementById('shuffle-playlist');
const audioPlayer = new Audio();

function updateDisplay() {
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  timerDisplay.textContent = formattedTime;
  updateCircularProgress();
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    pauseIcon.style.display = 'none';
    timer = setInterval(() => {
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else {
        clearInterval(timer);
        isRunning = false;
        alert('Time is up!');
      }
      updateDisplay();
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  pauseIcon.style.display = 'block';
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  minutes = 25;
  seconds = 0;
  updateDisplay();
  pauseIcon.style.display = 'none';
}

function updateCircularProgress() {
  const totalSeconds = minutes * 60 + seconds;
  const progress = (1 - totalSeconds / (25 * 60)) * 100;
  document.querySelector('.circular-progress').style.strokeDashoffset = `${440 - (440 * progress) / 100}px`;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
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