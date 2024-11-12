// Initialize video player in the broadcast container on page load
document.addEventListener("DOMContentLoaded", () => {
    const broadcastButton = document.getElementById("broadcast-on-button");
    broadcastButton.addEventListener("click", toggleBroadcast);
    loadPlaylistForTimeOfDay(); // Load the playlist on page load
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