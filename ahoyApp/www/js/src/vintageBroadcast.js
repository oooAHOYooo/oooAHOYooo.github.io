// Initialize JWPlayer in the broadcast container on page load
document.addEventListener("DOMContentLoaded", () => {
    jwplayer("jwplayer-broadcast-container").setup({
        width: "100%",
        aspectratio: "16:9",
        autostart: false
    });
    loadPlaylistForTimeOfDay();
});

// Load a playlist from a JSON file
async function loadPlaylistFromJSON(url) {
    try {
        const response = await fetch(url);
        const { media } = await response.json();
        
        if (media?.length) {
            jwplayer("jwplayer-broadcast-container").load(media);
            document.getElementById("broadcast-media-title").textContent = media[0].title;
            jwplayer("jwplayer-broadcast-container").play();
        } else {
            console.warn("No media found in playlist.");
        }
    } catch (error) {
        console.error("Error loading playlist:", error);
    }
}

// Select the appropriate playlist based on the time of day
async function loadPlaylistForTimeOfDay() {
    try {
        const response = await fetch('/local_data/vintage-broadcast/schedule.json');
        const { blocks } = await response.json();

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        // Find the latest block matching or earlier than the current time
        const selectedBlock = blocks.slice().reverse().find(block => currentTime >= block.time) || blocks[0];
        
        const playlistUrl = `/local_data/vintage-broadcast/blocks/${selectedBlock.playlist_id}/${selectedBlock.block_files[0]}`;
        loadPlaylistFromJSON(playlistUrl);
        
    } catch (error) {
        console.error("Error loading schedule:", error);
    }
}