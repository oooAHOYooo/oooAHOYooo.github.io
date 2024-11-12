// Initialize video player in the broadcast container on page load
document.addEventListener("DOMContentLoaded", () => {
    loadPlaylistForTimeOfDay();
});

let currentMediaIndex = 0;
let currentBlockFiles = [];

// Load a playlist from a JSON file
async function loadPlaylistFromJSON(url) {
    try {
        const response = await fetch(url);
        const { media } = await response.json();
        
        if (media?.length) {
            currentMediaIndex = 0;
            currentBlockFiles = media;
            playVideo(currentMediaIndex);
        } else {
            console.warn("No media found in playlist.");
        }
    } catch (error) {
        console.error("Error loading playlist:", error);
    }
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
        loadPlaylistFromJSON(playlistUrl);
        
    } catch (error) {
        console.error("Error loading schedule:", error);
    }
}