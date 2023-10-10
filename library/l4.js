let songs = [];

let currentSongIndex = 0;
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
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    audioPlayer.src = songs[currentSongIndex].mp3url;
    audioPlayer.play();
}

function previousSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    audioPlayer.src = songs[currentSongIndex].mp3url;
    audioPlayer.play();
}

function addToPlaylist(index) {
    console.log(`Add Song ${index + 1} to Playlist`);
}

function addToQueue(index) {
    console.log(`Add Song ${index + 1} to Queue`);
}

function likeSong(index) {
    songs[index].liked = !songs[index].liked;
    populateSongs();
}

function adjustVolume() {
    const volume = document.getElementById('volumeControl').value;
    audioPlayer.volume = volume;
}

function populateSongs() {
    const songList = document.getElementById('songList');
    songList.innerHTML = '';

    songs.forEach((song, index) => {
        const songRow = document.createElement('tr');
        if (song.artist && song.songTitle) {
            songRow.innerHTML = `
                <td>${song.artist}</td>
                <td>${song.songTitle}</td>
                <td><button onclick="playSongFromList(${index})">Play</button></td>
                <td><button onclick="addToPlaylist(${index})">Add to Playlist</button></td>
                <td><button onclick="addToQueue(${index})">Add to Queue</button></td>
                <td><button onclick="likeSong(${index})">${song.play ? 'Liked' : 'Like'}</button></td>
            `;
        } else {
            songRow.innerHTML = `
                <td>${song.title}</td>
                <td><button onclick="playSongFromList(${index})">Play</button></td>
                <td><button onclick="addToPlaylist(${index})">Add to Playlist</button></td>
                <td><button onclick="addToQueue(${index})">Add to Queue</button></td>
                <td><button onclick="likeSong(${index})">${song.liked ? 'Liked' : 'Like'}</button></td>
            `;
        }
        songList.appendChild(songRow);
    });
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
