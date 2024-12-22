// Initialize video player and event listeners on page load
document.addEventListener("DOMContentLoaded", () => {
    setupEventListeners();
    loadPlaylistForTimeOfDay(); // Load the playlist based on the current time
});

let currentMediaIndex = 0;
let currentBlockFiles = [];
let isBroadcasting = false;
let currentTime = 0;

// Setup event listeners for broadcast and control buttons
function setupEventListeners() {
    const playPauseButton = document.getElementById("play-pause-button");
    playPauseButton.addEventListener("click", toggleBroadcast); // Use play button for broadcast

    const controlButtons = [
        { id: "prev-button", action: playPrevious },
        { id: "next-button", action: playNext },
        { id: "rewind-button", action: rewind },
        { id: "shuffle-button", action: shufflePlaylist },
        { id: "fullscreen-button", action: toggleFullscreen },
        { id: "mute-button", action: toggleMute },
        { id: "volume-down", action: volumeDown },
        { id: "volume-up", action: volumeUp }
    ];

    controlButtons.forEach(({ id, action }) => {
        document.getElementById(id).addEventListener("click", () => {
            if (isBroadcasting) action();
        });
    });
}

// Toggle the broadcast state using the play button
function toggleBroadcast() {
    const playPauseButton = document.getElementById("play-pause-button");
    const videoElement = document.getElementById("video-broadcast-container");

    if (isBroadcasting) {
        currentTime = videoElement.currentTime; // Save the current time
        videoElement.pause();
        playPauseButton.textContent = "[► PLAY]";
    } else {
        if (currentBlockFiles.length > 0) {
            videoElement.currentTime = currentTime; // Resume from saved time
            videoElement.play();
        } else {
            // Load the first video when starting the broadcast
            prepareVideo(currentMediaIndex);
            videoElement.play();
        }
        playPauseButton.textContent = "[❚❚ PAUSE]";
    }

    isBroadcasting = !isBroadcasting;
}

// Load a playlist based on the time of day
async function loadPlaylistForTimeOfDay() {
    try {
        const now = new Date();
        const isThanksgiving = now.getMonth() === 10 && now.getDate() >= 28 && now.getDate() <= 30;
        const isHolidaySpecial = now.getFullYear() === 2024 && now.getMonth() === 11 && now.getDate() >= 20 && now.getDate() <= 30;

        if (isThanksgiving) {
            loadPlaylistFromJSON('./local_data/vintage-broadcast/special_playlists/palbot2_thanksgiving.json', "Pal-bot 2 Thanksgiving Marathon");
        } else if (isHolidaySpecial) {
            loadPlaylistFromJSON('./local_data/vintage-broadcast/special_playlists/holiday_special.json', "Holiday Special Broadcast");
        } else {
            const response = await fetch('./local_data/vintage-broadcast/schedule.json');
            const { blocks } = await response.json();
            const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
            const selectedBlock = blocks.slice().reverse().find(block => currentTime >= block.time) || blocks[0];
            const playlistUrl = `./local_data/vintage-broadcast/${selectedBlock.block_files[0]}`;
            loadPlaylistFromJSON(playlistUrl, selectedBlock.title);
        }
    } catch (error) {
        console.error("Error loading schedule:", error);
    }
}

// Load a playlist from a JSON file
async function loadPlaylistFromJSON(url, blockTitle) {
    try {
        const response = await fetch(url);
        const { media } = await response.json();

        if (media?.length) {
            media.sort((a, b) => a.order - b.order);
            currentMediaIndex = 0;
            currentBlockFiles = media;
            setThumbnailAndTitle(media[0], blockTitle);
            prepareVideo(currentMediaIndex);
        } else {
            console.warn("No media found in playlist.");
        }
    } catch (error) {
        console.error("Error loading playlist:", error);
    }
}

// Set video thumbnail and title
function setThumbnailAndTitle(mediaItem, blockTitle) {
    const videoElement = document.getElementById("video-broadcast-container");
    const sourceElement = document.getElementById("video-source");
    sourceElement.src = mediaItem.file;
    videoElement.poster = mediaItem.thumbnail;
    document.getElementById("broadcast-media-title").textContent = blockTitle;
}

// Prepare the video but do not play it immediately
function prepareVideo(index) {
    const videoElement = document.getElementById("video-broadcast-container");
    const sourceElement = document.getElementById("video-source");
    sourceElement.src = currentBlockFiles[index].file;
    videoElement.load();
    document.getElementById("broadcast-media-title").textContent = currentBlockFiles[index].title;
    videoElement.poster = currentBlockFiles[index].thumbnail; // Set the thumbnail

    // Remove auto-play logic
    // videoElement.play();

    videoElement.onended = () => {
        currentMediaIndex = (currentMediaIndex + 1) % currentBlockFiles.length;
        prepareVideo(currentMediaIndex);
    };
}

// Video control functions
function togglePlayPause() {
    const videoElement = document.getElementById("video-broadcast-container");
    videoElement.paused ? videoElement.play() : videoElement.pause();
}

function playNext() {
    currentMediaIndex = (currentMediaIndex + 1) % currentBlockFiles.length;
    prepareVideo(currentMediaIndex);
}

function rewind() {
    const videoElement = document.getElementById("video-broadcast-container");
    videoElement.currentTime -= 10;
}

function shufflePlaylist() {
    currentBlockFiles.sort(() => Math.random() - 0.5);
    currentMediaIndex = 0;
    prepareVideo(currentMediaIndex);
}

function toggleFullscreen() {
    const videoElement = document.getElementById("video-broadcast-container");
    if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
    } else if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
    } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
    } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
    }
}

function toggleMute() {
    const videoElement = document.getElementById("video-broadcast-container");
    videoElement.muted = !videoElement.muted;
}

function volumeDown() {
    const videoElement = document.getElementById("video-broadcast-container");
    videoElement.volume = Math.max(0, videoElement.volume - 0.1);
}

function volumeUp() {
    const videoElement = document.getElementById("video-broadcast-container");
    videoElement.volume = Math.min(1, videoElement.volume + 0.1);
}

// New function to play the previous clip
function playPrevious() {
    currentMediaIndex = (currentMediaIndex - 1 + currentBlockFiles.length) % currentBlockFiles.length;
    prepareVideo(currentMediaIndex);
}