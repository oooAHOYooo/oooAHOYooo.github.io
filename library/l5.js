let currentSongIndex = 0;
let songs = [];
let currentPlaylist = [];
let favorites = [];
let queue = [];
let burnedCDs = 5; // Example data, you can update this based on your actual data.



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

    // Updating Full Player's Song and Artist text
    document.getElementById('currentArtist').textContent = songs[currentSongIndex].artist || "";
    document.getElementById('currentSong').textContent = songs[currentSongIndex].songTitle || songs[currentSongIndex].title || "";

    // Updating Mini Player's Song and Artist text
    document.getElementById('minicurrentArtist').textContent = songs[currentSongIndex].artist || "";
    document.getElementById('minicurrentSong').textContent = songs[currentSongIndex].songTitle || songs[currentSongIndex].title || "";
    document.getElementById('miniSongDisplay').innerHTML = `Now Playing: ${songs[currentSongIndex].artist || ""} - ${songs[currentSongIndex].songTitle || songs[currentSongIndex].title || ""}`;

    

      // Set the href attribute of the artist button and the src attribute of the iframe to the artist's URL
      const artistUrl = songs[currentSongIndex].artistUrl;
      if (artistUrl) {
          artistButton.href = artistUrl;
          artistProfile.src = artistUrl;
          artistButton.textContent = `${songs[currentSongIndex].artist} Artist Page`; // Update the artist page button text
      }
  


}


function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSongFromList(currentSongIndex);
    var nextSong = getNextSong();
    document.getElementById('currentSong').textContent = nextSong.title;
    document.getElementById('currentArtist').textContent = nextSong.artist;
    document.getElementById('minicurrentSong').textContent = nextSong.title;
    document.getElementById('minicurrentArtist').textContent = nextSong.artist;
    // Update mini player display
    document.getElementById('minicurrentArtist').textContent = currentArtist;
    document.getElementById('minicurrentSong').textContent = currentSong;
    // Assume playSong function starts playing the song
    playSong(nextSong);
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

function addToPlaylist() {
    var currentSong = document.getElementById('currentSong').textContent;
    var currentArtist = document.getElementById('currentArtist').textContent;
    // Assuming you have a function to add songs to a playlist
    addSongToPlaylist(currentArtist, currentSong);
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
fetch('l5.json')
    .then(response => response.json())
    .then(data => {
        songs = songs.concat(data.songs);
        populateSongs();
    })
    .catch(error => {
        console.error("Error fetching songs from l5.json:", error);
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



function populateSongs() {
    const songList = document.getElementById('songList');
    songList.innerHTML = '';
    songs.forEach((song, index) => {
        const isLiked = favorites.some(favSong => favSong.id === song.id);
        const likeButtonText = isLiked ? 'Unlike' : 'Like';
        const isNew = song.new ? 'new-song' : '';
        const songRow = `
            <tr class="${isNew}">
                <td><button class="library-que-button" onclick="addToQueue(${index})">+Q</button></td>
                <td><a href="${song.artistUrl}" target="_blank"><button class="library-artist-button">${song.artist}</button></a></td>
                <td onclick="playSongFromList(${index})"><button class="library-song-button">${song.songTitle}</button></td>
                <td><button class="library-like-button" onclick="likeSong(${index})">${likeButtonText}</button></td>
                <td><button class="fas fa-play borderBlue" onclick="playSongFromList(${index})"></button></td>

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
                <td><button class="lib-button" onclick="playSongFromQueue(${index})">Play</button></td>
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


function toggleSections() {
    const sections = document.querySelectorAll('section');
    const visualizer = document.getElementById('musicVisualizer');
    let isHidden = false;

    sections.forEach(section => {
        if (section.style.display === "none") {
            section.style.display = "block";
            isHidden = true;
        } else {
            section.style.display = "none";
        }
    });

    if (isHidden) {
        visualizer.style.display = "none";
    } else {
        visualizer.style.display = "block";
    }
}

function togglePlayer() {
    var player = document.getElementById('player');
    var miniPlayer = document.getElementById('miniPlayer');
    var currentArtist = document.getElementById('currentArtist').textContent;
    var currentSong = document.getElementById('currentSong').textContent;

    if (player.style.display === "none") {
        player.style.display = "block";
        miniPlayer.style.display = "none";
    } else {
        player.style.display = "none";
        miniPlayer.style.display = "block";
        document.getElementById('minicurrentArtist').textContent = currentArtist;
        document.getElementById('minicurrentSong').textContent = currentSong;
        document.getElementById('miniSongDisplay').innerHTML = `Now Playing: ${currentArtist} - ${currentSong}`;
    }
}


function fastForwardAudio() {
    const audioPlayer = document.getElementById('audioPlayer');
    const newTime = audioPlayer.currentTime + 16;
    if (newTime < audioPlayer.duration) {
        audioPlayer.currentTime = newTime;
    } else {
        audioPlayer.currentTime = audioPlayer.duration; // set to the end of the audio
    }
}

function rewindAudio() {
    const audioPlayer = document.getElementById('audioPlayer');
    const newTime = audioPlayer.currentTime - 16;
    if (newTime > 0) {
        audioPlayer.currentTime = newTime;
    } else {
        audioPlayer.currentTime = 0; // set to the start of the audio
    }
}

function shareCurrentSong() {
    const song = songs[currentSongIndex];
    const baseURL = window.location.href.split('?')[0];  // Get the current base URL without parameters
    const shareURL = `${baseURL}?songId=${song.id}`;
    navigator.clipboard.writeText(shareURL).then(function() {
        alert('Song link copied to clipboard!');
    }).catch(function(err) {
        alert('Could not copy text: ', err);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    populateSongs();

    const urlParams = new URLSearchParams(window.location.search);
    const songId = urlParams.get('songId');

    if (songId) {
        const songIndex = songs.findIndex(s => s.id == songId); // Notice we use == for loose comparison as songId from URL is string, while song.id might be number
        if (songIndex !== -1) {
            playSongFromList(songIndex);
            audioPlayer.play().catch(error => {
                console.warn("Playback was not allowed:", error);
                // Display a UI element that encourages the user to manually start playback, if needed
            });
        }
    }
});

audioPlayer.play().catch(error => {
    console.warn("Playback was not allowed:", error);
    // Display a UI element that encourages the user to manually start playback, if needed
});



// ... Your existing variables and functions ...

// Adds a song to the queue
function addToQueueByIndex(index) {
    queue.push(songs[index]);
    populateQueue();
    // If no song is currently playing or if the player is paused, play the queued song immediately
    if (audioPlayer.paused || !audioPlayer.src) {
        playNextInQueue();
    }
}

// Plays the next song in the queue
function playNextInQueue() {
    if (queue.length > 0) {
        const songIndex = songs.findIndex(s => s.id === queue[0].id);
        playSongFromList(songIndex);
        queue.shift(); // Remove the song that's currently playing from the queue
        populateQueue();
    }
}

audioPlayer.addEventListener("ended", playNextInQueue);

document.addEventListener('DOMContentLoaded', function() {
    populateSongs();

    // After songs are populated
    const urlParams = new URLSearchParams(window.location.search);
    const songId = urlParams.get('songId');

    if (songId) {
        const songIndex = songs.findIndex(s => s.id == songId);
        if (songIndex !== -1) {
            playSongFromList(songIndex);
            // Try to auto-play, and handle the potential promise rejection
            audioPlayer.play().catch(error => {
                console.warn("Auto-play was not allowed:", error);
                // Optionally, display a UI element that encourages the user to manually start playback
            });
        }
    }
});

// ... Continue with your remaining existing code...


// ... Your existing variables and functions ...
// ... Your existing JavaScript ...

// Initialize cast API after the page loads
document.addEventListener('DOMContentLoaded', () => {
    if (!chrome.cast || !chrome.cast.isAvailable) {
        setTimeout(initializeCastApi, 1000);
    }
});

function initializeCastApi() {
    const applicationID = 'YOUR_APP_ID';  // Replace with your App ID from the Google Cast SDK Developer Console
    const sessionRequest = new chrome.cast.SessionRequest(applicationID);
    const apiConfig = new chrome.cast.ApiConfig(sessionRequest, sessionListener, receiverListener);

    chrome.cast.initialize(apiConfig, onInitSuccess, onError);
}

function sessionListener(session) {
    console.log('Session Listener:', session);
}

function receiverListener(e) {
    if (e === chrome.cast.ReceiverAvailability.AVAILABLE) {
        console.log('Receiver available');
    }
}

function onInitSuccess() {
    console.log('Initialization succeeded');
}

function onError(e) {
    console.log('Error:', e);
}

// Display the casting popup and fetch available devices
document.getElementById('castButton').addEventListener('click', () => {
    document.getElementById('castPopup').classList.remove('hidden');
    chrome.cast.requestSession(onSessionSuccess, onError);
});

function onSessionSuccess(session) {
    console.log('Successfully created session:', session);
}

// Close the casting popup
document.getElementById('closeCastPopup').addEventListener('click', () => {
    document.getElementById('castPopup').classList.add('hidden');
});


// Get the mute button element
const muteButton = document.getElementById('muteButton');

// Add event listener to the mute button
muteButton.addEventListener('click', function() {
    if (audioPlayer.muted) {
        // If the audio is currently muted, unmute it and change the button text
        audioPlayer.muted = false;
        muteButton.innerText = "Mute";
    } else {
        // If the audio is currently unmuted, mute it and change the button text
        audioPlayer.muted = true;
        muteButton.innerText = "Unmute";
    }
});

// Get the artist button, modal, and close button elements
const artistButton = document.getElementById('artist');
const artistModal = document.getElementById('artistModal');
const closeModal = document.getElementById('closeModal');
const artistProfile = document.getElementById('artistProfile');

// Add event listener to the artist button to open the modal
artistButton.addEventListener('click', function(event) {
    event.preventDefault();  // Prevent the default action (navigation)
    artistModal.style.display = "block";
});

// Add event listener to the close button to close the modal
closeModal.addEventListener('click', function() {
    artistModal.style.display = "none";
});

// Get the save artist button
const saveArtistButton = document.getElementById('saveArtist');

// Add event listener to the save artist button
saveArtistButton.addEventListener('click', function() {
    // Save the current artist to localStorage
    localStorage.setItem('savedArtist', songs[currentSongIndex].artist);
    alert(`Artist ${songs[currentSongIndex].artist} has been saved.`);
});




function goToArtistPage() {
    // Get the current song index
    const currentSongIndex = document.getElementById('currentSong').dataset.index;

    // Get the song data from the songs array
    const songData = songs[currentSongIndex];

    // Check if the song has an artist URL
    if (songData.artistUrl) {
        // Navigate to the artist page
        window.location.href = songData.artistUrl;
    } else {
        alert('No artist page available for this song.');
    }
}

document.getElementById('shuffleButton').addEventListener('click', playRandomSong);
function playRandomSong() {
    // Select a random index from the songs array
    const randomIndex = Math.floor(Math.random() * songs.length);

    // Play the song at the random index
    playSongFromList(randomIndex);
}