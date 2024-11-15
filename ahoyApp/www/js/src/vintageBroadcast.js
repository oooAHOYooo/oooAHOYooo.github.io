// Initialize video player in the broadcast container on page load
document.addEventListener("DOMContentLoaded", () => {
    const broadcastButton = document.getElementById("broadcast-on-button");
    broadcastButton.addEventListener("click", toggleBroadcast);
    loadPlaylistForTimeOfDay(); // Load the playlist on page load

    // Add event listeners for remote control buttons
    document.getElementById("play-pause-button").addEventListener("click", () => {
        if (isBroadcasting) togglePlayPause();
    });
    document.getElementById("fast-forward-button").addEventListener("click", () => {
        if (isBroadcasting) fastForward();
    });
    document.getElementById("next-button").addEventListener("click", () => {
        if (isBroadcasting) playNext();
    });
    document.getElementById("rewind-button").addEventListener("click", () => {
        if (isBroadcasting) rewind();
    });
    document.getElementById("shuffle-button").addEventListener("click", () => {
        if (isBroadcasting) shufflePlaylist();
    });
    document.getElementById("fullscreen-button").addEventListener("click", () => {
        if (isBroadcasting) toggleFullscreen();
    });
    document.getElementById("mute-button").addEventListener("click", () => {
        if (isBroadcasting) toggleMute();
    });
    document.getElementById("volume-down").addEventListener("click", () => {
        if (isBroadcasting) volumeDown();
    });
    document.getElementById("volume-up").addEventListener("click", () => {
        if (isBroadcasting) volumeUp();
    });
});

let currentMediaIndex = 0;
let currentBlockFiles = [];
let isBroadcasting = false;
let currentTime = 0;

// Function to toggle the broadcast
function toggleBroadcast() {
    const broadcastButton = document.getElementById("broadcast-on-button");
    const videoElement = document.getElementById("video-broadcast-container");

    if (isBroadcasting) {
        currentTime = videoElement.currentTime; // Save the current time
        videoElement.pause();
        broadcastButton.classList.remove("active-broadcast");
        broadcastButton.textContent = "Resume Broadcast"; // Change button text
    } else {
        if (currentBlockFiles.length > 0) {
            videoElement.currentTime = currentTime; // Resume from saved time
            videoElement.play();
        } else {
            loadPlaylistForTimeOfDay();
        }
        broadcastButton.classList.add("active-broadcast");
        broadcastButton.textContent = "Pause Broadcast"; // Change button text
    }

    isBroadcasting = !isBroadcasting;
}

// Load a playlist from a JSON file
async function loadPlaylistFromJSON(url, blockTitle) {
    try {
        const response = await fetch(url);
        const { media } = await response.json();
        
        if (media?.length) {
            // Sort media by order
            media.sort((a, b) => a.order - b.order);

            currentMediaIndex = 0;
            currentBlockFiles = media;
            setThumbnailAndTitle(media[0], blockTitle); // Set thumbnail and title
            playVideo(currentMediaIndex);
        } else {
            console.warn("No media found in playlist.");
        }
    } catch (error) {
        console.error("Error loading playlist:", error);
    }
}

function setThumbnailAndTitle(mediaItem, blockTitle) {
    const videoElement = document.getElementById("video-broadcast-container");
    const sourceElement = document.getElementById("video-source");
    sourceElement.src = mediaItem.file; // Assuming mediaItem.file contains the video URL
    videoElement.poster = mediaItem.thumbnail; // Assuming mediaItem.thumbnail contains the thumbnail URL
    document.getElementById("broadcast-media-title").textContent = blockTitle;
}

function playVideo(index) {
    const videoElement = document.getElementById("video-broadcast-container");
    const sourceElement = document.getElementById("video-source");
    sourceElement.src = currentBlockFiles[index].file; // Assuming media[index].file contains the video URL
    videoElement.load();
    document.getElementById("broadcast-media-title").textContent = currentBlockFiles[index].title;
    videoElement.play();

    videoElement.onended = () => {
        currentMediaIndex = (currentMediaIndex + 1) % currentBlockFiles.length;
        playVideo(currentMediaIndex);
    };
}

// Select the appropriate playlist based on the time of day
async function loadPlaylistForTimeOfDay() {
    try {
        const response = await fetch('./local_data/vintage-broadcast/schedule.json');
        const { blocks } = await response.json();

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        // Find the latest block matching or earlier than the current time
        const selectedBlock = blocks.slice().reverse().find(block => currentTime >= block.time) || blocks[0];

        // Assuming the first file in block_files is the playlist JSON
        const playlistUrl = `./local_data/vintage-broadcast/${selectedBlock.block_files[0]}`;
        loadPlaylistFromJSON(playlistUrl, selectedBlock.title);

    } catch (error) {
        console.error("Error loading schedule:", error);
    }
}

// Function to toggle play/pause
function togglePlayPause() {
    const videoElement = document.getElementById("video-broadcast-container");
    if (videoElement.paused) {
        videoElement.play();
    } else {
        videoElement.pause();
    }
}

// Function to fast forward the video by 10 seconds
function fastForward() {
    const videoElement = document.getElementById("video-broadcast-container");
    videoElement.currentTime += 10;
}

// Function to play the next video in the playlist
function playNext() {
    currentMediaIndex = (currentMediaIndex + 1) % currentBlockFiles.length;
    playVideo(currentMediaIndex);
}

// Function to rewind the video by 10 seconds
function rewind() {
    const videoElement = document.getElementById("video-broadcast-container");
    videoElement.currentTime -= 10;
}

// Function to shuffle the playlist
function shufflePlaylist() {
    currentBlockFiles.sort(() => Math.random() - 0.5);
    currentMediaIndex = 0;
    playVideo(currentMediaIndex);
}

// Function to toggle fullscreen mode
function toggleFullscreen() {
    const videoElement = document.getElementById("video-broadcast-container");
    if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) { // Firefox
        videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
        videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) { // IE/Edge
        videoElement.msRequestFullscreen();
    }
}

// Function to toggle mute
function toggleMute() {
    const videoElement = document.getElementById("video-broadcast-container");
    videoElement.muted = !videoElement.muted;
}

// Function to decrease volume
function volumeDown() {
    const videoElement = document.getElementById("video-broadcast-container");
    videoElement.volume = Math.max(0, videoElement.volume - 0.1);
}

// Function to increase volume
function volumeUp() {
    const videoElement = document.getElementById("video-broadcast-container");
    videoElement.volume = Math.min(1, videoElement.volume + 0.1);
}