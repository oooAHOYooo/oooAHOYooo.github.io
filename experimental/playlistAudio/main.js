// Search functions
function searchSongs() {
    // ... [unchanged content] ...
}

function handleKeyPress(event) {
    // ... [unchanged content] ...
}

window.onload = function() {
    renderArtists();
    searchSongs(); // This will display all songs by default
};

function toggleBigBottom() {
    // ... [unchanged content] ...
}

// Winamp playlist functions
function loadWinampPlaylist() {
    // ... [unchanged content] ...
}

let songsA = [];
fetch('masterMusic.json')
    .then(response => response.json())
    .then(data => {
        songsA = data.songs;
        loadWinampPlaylist();
    })
    .catch(error => {
        console.error("There was an error loading the song data:", error);
    });

// Clock function
function displayClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.getElementById('clockDisplay').innerText = `${hours}:${minutes}:${seconds}`;
    setTimeout(displayClock, 1000);
}

// Light/Dark mode toggle
document.getElementById('themeToggle').addEventListener('click', function() {
    if (document.body.classList.contains('dark-mode')) {
        document.body.classList.remove('dark-mode');
    } else {
        document.body.classList.add('dark-mode');
    }
});
