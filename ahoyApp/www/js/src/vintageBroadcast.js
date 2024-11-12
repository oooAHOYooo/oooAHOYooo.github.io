// Function to navigate between tabs
function navigateToTab(tabId) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    
    // Show the selected tab
    document.getElementById(tabId).classList.add('active');
}

// Initialize JWPlayer in the broadcast container
document.addEventListener("DOMContentLoaded", function() {
    jwplayer("jwplayer-broadcast-container").setup({
        width: "100%",
        aspectratio: "16:9",
        autostart: false
    });

    loadPlaylistForTimeOfDay();
});

// Function to load playlist based on the time of day
async function loadPlaylistFromJSON(playlistUrl) {
    try {
        const response = await fetch(playlistUrl);
        const playlistData = await response.json();

        // Load the playlist into the JWPlayer instance in the new tab
        jwplayer("jwplayer-broadcast-container").load(playlistData.media);

        // Optionally, display the title of the first item
        if (playlistData.media.length > 0) {
            document.getElementById("broadcast-media-title").textContent = playlistData.media[0].title;
        }

        // Optionally, play the video automatically
        jwplayer("jwplayer-broadcast-container").play();

    } catch (error) {
        console.error("Error loading playlist:", error);
    }
}

function loadPlaylistForTimeOfDay() {
    const now = new Date();
    const hour = now.getHours();
    let playlistUrl;

    if (hour >= 6 && hour < 12) {
        playlistUrl = "https://your-cdn.com/ahoy_vintage_broadcast/blocks/morning_1.json";
    } else if (hour >= 12 && hour < 18) {
        playlistUrl = "https://your-cdn.com/ahoy_vintage_broadcast/blocks/afternoon_1.json";
    } else if (hour >= 18 && hour < 22) {
        playlistUrl = "https://your-cdn.com/ahoy_vintage_broadcast/blocks/evening_1.json";
    } else {
        playlistUrl = "https://your-cdn.com/ahoy_vintage_broadcast/blocks/late_night_1.json";
    }

    loadPlaylistFromJSON(playlistUrl);
}