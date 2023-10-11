let currentSongIndex = 0;
let songs = [];
let currentPlaylist = [];
let favorites = [];
let queue = [];


const audioPlayer = document.getElementById('audioPlayer');
const playPauseButton = document.getElementById('playPauseButton');







function playSongFromQueue(queueIndex) {
    const songIndexInLibrary = songs.findIndex(s => s.id === queue[queueIndex].id);
    playSongFromList(songIndexInLibrary);
    // Remove the played song from the queue
    queue.splice(queueIndex, 1);
    populateQueue();
}

function removeFromQueue(queueIndex) {
    queue.splice(queueIndex, 1);
    populateQueue();
}

function populateQueue() {
    const queueList = document.getElementById('queueList');
    queueList.innerHTML = '';
    queue.forEach((song, index) => {
        const songRow = `
            <tr>
                <td>${index + 1}</td>
                <td>${song.artist}</td>
                <td>${song.songTitle}</td>
                <td><button onclick="playSongFromQueue(${index})">Play</button></td>
                <td><button onclick="removeFromQueue(${index})">Remove</button></td>
                <td><button onclick="likeSongFromQueue(${index})">Like</button></td>
            </tr>
        `;
        queueList.innerHTML += songRow;
    });
}

function likeSongFromQueue(index) {
    const songIndexInLibrary = songs.findIndex(s => s.id === queue[index].id);
    likeSong(songIndexInLibrary);
}


function likeSong(index) {
    // Check if the song is already in favorites
    let songIndexInFavorites = favorites.findIndex(favSong => favSong.id === songs[index].id);

    if (songIndexInFavorites === -1) { // Song is not in favorites
        favorites.push(songs[index]);
    } else { // Song is already in favorites, so remove it
        favorites.splice(songIndexInFavorites, 1);
    }
    populateSongs();  // Refresh the main song list
    populateFavorites(); // Refresh the favorite songs list
}

function populateFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = ''; // Clear previous data

    favorites.forEach((song, index) => {
        const songRow = `
            <tr>
                <td>${song.artist}</td>
                <td>${song.songTitle}</td>
                <td><button onclick="playSongFromFavorites(${index})">Play</button></td>
                <td><button onclick="removeFromFavorites(${index})">Remove</button></td>
                <td><button onclick="addToPlaylistFromFavorites(${index})">Add to Playlist</button></td>
                <td><button onclick="addToQueueFromFavorites(${index})">Add to Queue</button></td>
            </tr>
        `;
        favoritesList.innerHTML += songRow;
    });
}

function playSongFromFavorites(index) {
    const songIndexInLibrary = songs.findIndex(s => s.id === favorites[index].id);
    playSong(songIndexInLibrary); // Use your existing playSong function
}

function removeFromFavorites(index) {
    favorites.splice(index, 1);
    populateFavorites();
}


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

// Fetch songs and populate on page load
fetch('l4.json')
    .then(response => response.json())
    .then(data => {
        songs = songs.concat(data.songs);
        populateSongs();
    })
    .catch(error => {
        console.error("Error fetching songs from l4.json:", error);
    });

document.addEventListener('DOMContentLoaded', function() {
    populateSongs();
});

// ... your existing variable declarations ...

function likeSong(index) {
    let songIndexInFavorites = favorites.findIndex(favSong => favSong.id === songs[index].id);

    if (songIndexInFavorites === -1) {
        favorites.push(songs[index]);
    } else {
        favorites.splice(songIndexInFavorites, 1);
    }
    populateSongs();
    populateFavorites();
}

function populateFavorites() {
    const favoritesList = document.getElementById('favoritesList');
    favoritesList.innerHTML = '';
    favorites.forEach((song, index) => {
        const songRow = `
            <tr>
                <td>${song.artist}</td>
                <td>${song.songTitle}</td>
                <td><button onclick="playSongFromFavorites(${index})">Play</button></td>
                <td><button onclick="removeFromFavorites(${index})">Remove</button></td>
                <td><button onclick="addToPlaylistFromFavorites(${index})">Add to Playlist</button></td>
                <td><button onclick="addToQueueFromFavorites(${index})">Add to Queue</button></td>
            </tr>
        `;
        favoritesList.innerHTML += songRow;
    });
}

// ... rest of your existing functions ...

function populateSongs() {
    const songList = document.getElementById('songList');
    songList.innerHTML = '';
    songs.forEach((song, index) => {
        const isLiked = favorites.some(favSong => favSong.id === song.id);
        const likeButtonText = isLiked ? 'Unlike' : 'Like';
        const songRow = `
            <tr>
                <td>${song.artist}</td>
                <td>${song.songTitle}</td>
                <td><button onclick="playSongFromList(${index})">Play</button></td>
                <td><button onclick="addToPlaylist(${index})">Add to Playlist</button></td>
                <td><button onclick="addToQueue(${index})">Add to Queue</button></td>
                <td><button onclick="likeSong(${index})">${likeButtonText}</button></td>
            </tr>
        `;
        songList.innerHTML += songRow;
    });
}

// ... your fetch function and event listener ...

// Add an event listener to the progress bar for drag-and-drop functionality
const progressBar = document.querySelector("#progressBar");
const progressThumb = document.querySelector("#progressThumb");
let isDragging = false;

progressThumb.addEventListener("mousedown", (e) => {
  isDragging = true;
  progressBar.classList.add("dragging");
  updateProgress(e);
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    updateProgress(e);
  }
});

document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    progressBar.classList.remove("dragging");
  }
});

function updateProgress(e) {
  const progressBarRect = progressBar.getBoundingClientRect();
  const clickX = e.clientX - progressBarRect.left;
  const progressBarWidth = progressBarRect.width;

  // Calculate the percentage of the clicked position
  const percentage = (clickX / progressBarWidth) * 100;

  // Update the visual position of the progress thumb
  progressThumb.style.left = percentage + "%";

  // Update the audio player's current time based on the percentage
  const newTime = (percentage / 100) * audioPlayer.duration;
  audioPlayer.currentTime = newTime;
}

// Rest of your code...

// ... Rest of your variable and function declarations ...

function addToQueue(index) {
    queue.push(songs[index]);
    populateQueue();
}

function playSongFromQueue(queueIndex) {
    const songIndexInLibrary = songs.findIndex(s => s.id === queue[queueIndex].id);
    playSongFromList(songIndexInLibrary);
    queue.splice(queueIndex, 1); // Remove the played song from the queue
    populateQueue();
}

function removeFromQueue(queueIndex) {
    queue.splice(queueIndex, 1);
    populateQueue();
}

function populateQueue() {
    const queueList = document.getElementById('queueList');
    queueList.innerHTML = '';
    queue.forEach((song, index) => {
        const songRow = `
            <tr>
                <td>${index + 1}</td>
                <td>${song.artist}</td>
                <td>${song.songTitle}</td>
                <td><button onclick="playSongFromQueue(${index})">Play</button></td>
                <td><button onclick="removeFromQueue(${index})">Remove</button></td>
                <td><button onclick="likeSongFromQueue(${index})">Like</button></td>
            </tr>
        `;
        queueList.innerHTML += songRow;
    });
}

function likeSongFromQueue(index) {
    const songIndexInLibrary = songs.findIndex(s => s.id === queue[index].id);
    likeSong(songIndexInLibrary);
}

// ... Existing JavaScript ...

let playingQueue = false; // Flag to determine if we're currently playing from the queue

function playQueue() {
    if (queue.length > 0) {
        playingQueue = true;
        playSongFromQueue(0); // Start playing from the first song in the queue
        document.getElementById('queueButton').innerText = "Queue Playing";
    }
}

function playSongFromQueue(queueIndex) {
    if (playingQueue) {
        const songIndexInLibrary = songs.findIndex(s => s.id === queue[queueIndex].id);
        playSongFromList(songIndexInLibrary);
    }
}

audioPlayer.addEventListener("ended", function() {
    if (playingQueue && queue.length > 1) {
        queue.shift(); // Remove the song that just finished playing from the queue
        playQueue(); // Continue playing the next song
    } else {
        playingQueue = false; // If no more songs in the queue or not playing from queue, reset the flag
        document.getElementById('queueButton').innerText = "Play Queue";
    }
});

function nextSongInQueue() {
    if (playingQueue && queue.length > 1) {
        queue.shift(); // Remove the current song from the queue
        playQueue(); // Play the next song
    } else {
        playingQueue = false; // If no more songs in the queue, reset the flag
        document.getElementById('queueButton').innerText = "Play Queue";
    }
}


function populateQueue() {
    const queueList = document.getElementById('queueList');
    queueList.innerHTML = '';
    queue.forEach((song, index) => {
        const songRow = `
            <tr>
                <td><input type="number" value="${index + 1}" onchange="reorderQueue(${index}, this.value)"></td>
                <td>${song.artist}</td>
                <td>${song.songTitle}</td>
                <td><button onclick="playSongFromQueue(${index})">Play</button></td>
                <td><button onclick="removeFromQueue(${index})">Remove</button></td>
                
            </tr>
        `;
        queueList.innerHTML += songRow;
    });
}

function reorderQueue(currentIndex, newPosition) {
    if (newPosition <= 0 || newPosition > queue.length) {
        alert("Invalid position.");
        populateQueue(); // Refresh queue to reset positions
        return;
    }
    
    const movedSong = queue[currentIndex];
    queue.splice(currentIndex, 1); // Remove song from current position
    queue.splice(newPosition - 1, 0, movedSong); // Insert song at the new position
    populateQueue();
}

// ... Rest of your JavaScript ...
