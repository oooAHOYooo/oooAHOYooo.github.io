let currentSongIndex = 0;
let songs = [];
let currentPlaylist = [];

const audioPlayer = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');

function playPauseSong() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.innerText = "Pause";
    } else {
        audioPlayer.pause();
        playPauseButton.innerText = "Play";
    }
}

function playSongFromList(index) {
    currentSongIndex = index;
    audioPlayer.src = songs[currentSongIndex].mp3url;
    audioPlayer.play();
    playPauseButton.innerText = "Pause";
    document.getElementById('currentArtist').textContent = songs[currentSongIndex].artist || "";
    document.getElementById('currentSong').textContent = songs[currentSongIndex].songTitle || songs[currentSongIndex].title || "";
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSongFromList(currentSongIndex);
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSongFromList(currentSongIndex);
}

function adjustVolume() {
    const volume = document.getElementById('volumeControl').value;
    audioPlayer.volume = volume;
}

function updateProgressBar() {
    const progressBar = document.querySelector("#progressBar div");
    const percentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.style.width = percentage + "%";
}

function populateSongs() {
    const songList = document.getElementById('songList');
    songList.innerHTML = '';
    songs.forEach((song, index) => {
        const songRow = `
            <tr>
                <td>${song.artist}</td>
                <td>${song.songTitle}</td>
                <td><button onclick="playSongFromList(${index})">Play</button></td>
                <td><button onclick="addToPlaylist(${index})">Add to Playlist</button></td>
                <td><button onclick="addToQueue(${index})">Add to Queue</button></td>
                <td><button onclick="likeSong(${index})">${song.liked ? 'Liked' : 'Like'}</button></td>
            </tr>
        `;
        songList.innerHTML += songRow;
    });
}

function addToPlaylist(index) {
    currentPlaylist.push(songs[index]);
    populatePlaylist();
}

function populatePlaylist() {
    const playlistList = document.getElementById('playlistList');
    playlistList.innerHTML = '';
    currentPlaylist.forEach((song, index) => {
        const songRow = `
            <tr>
                <td>${song.artist}</td>
                <td>${song.songTitle}</td>
                <td><button onclick="playSongFromList(${index})">Play</button></td>
                <td><button onclick="removeFromPlaylist(${index})">Remove</button></td>
                <td><button onclick="addToQueue(${index})">Add to Queue</button></td>
                <td><button onclick="likeSong(${index})">Like</button></td>
            </tr>
        `;
        playlistList.innerHTML += songRow;
    });
}

function removeFromPlaylist(index) {
    currentPlaylist.splice(index, 1);
    populatePlaylist();
}

function likeSong(index) {
    songs[index].liked = !songs[index].liked;
    populateSongs();
}

function addToQueue(index) {
    // Logic for adding song to queue
    console.log(`Song ${index + 1} added to Queue`);
}

fetch('l4.json')
    .then(response => response.json())
    .then(data => {
        songs = songs.concat(data.songs);
        populateSongs();
    })
    .catch(error => {
        console.error("Error fetching songs from l4.json:", error);
    });

// On page load
document.addEventListener('DOMContentLoaded', function() {
    populateSongs();
});
