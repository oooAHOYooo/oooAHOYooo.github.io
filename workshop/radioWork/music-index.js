let songs = [];
let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio();

const albumArt = document.querySelector('.album-art');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const shuffleBtn = document.getElementById('shuffle-btn');
const likeBtn = document.getElementById('like-btn');
const progressBar = document.querySelector('.progress');
const songList = document.querySelector('.song-list');

fetch('music-index.json')
    .then(response => response.json())
    .then(data => {
        songs = data.songs;
        displaySongs();
        loadSong(currentSongIndex);
    });

function displaySongs() {
    songList.innerHTML = '';
    songs.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.classList.add('song-item');
        songItem.innerHTML = `
            <img src="${song.coverArt}" alt="${song.songTitle}">
            <div>
                <h3>${song.songTitle}</h3>
                <p>${song.artist}</p>
            </div>
        `;
        songItem.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            playSong();
        });
        songList.appendChild(songItem);
    });
}

function loadSong(index) {
    const song = songs[index];
    albumArt.style.backgroundImage = `url(${song.coverArt})`;
    songTitle.textContent = song.songTitle;
    artistName.textContent = song.artist;
    audio.src = song.mp3url;
}

function playSong() {
    isPlaying = true;
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});

shuffleBtn.addEventListener('click', () => {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    loadSong(currentSongIndex);
    playSong();
});

likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('liked');
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
});

audio.addEventListener('ended', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    playSong();
});