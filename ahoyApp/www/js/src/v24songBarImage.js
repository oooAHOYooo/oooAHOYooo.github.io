async function fetchData(url) {
    const response = await fetch(url);
    return response.json();
}

async function loadArtwork() {
    const songData = await fetchData('data/songCollection.json');
    const podcastData = await fetchData('data/podcastCollection.json');
    const mediaData = await fetchData('data/mediaCollection.json');

    // Example: Load the first song's cover art
    const artworkUrl = songData.songs[0].coverArt;
    document.getElementById('playerArtwork').style.backgroundImage = `url(${artworkUrl})`;

    // Add more logic here to cycle through artwork or select based on user interaction
}

function togglePlayerSize() {
    const player = document.getElementById('v24ahoyPlayer');
    player.classList.toggle('minimized');
}

document.getElementById('minimizePlayer').addEventListener('click', togglePlayerSize);

// Initial load
loadArtwork();