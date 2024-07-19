// Global variable to track the current podcast index
let currentPodcastIndex = 0;
let podcasts = []; // This will hold the fetched podcast data

function loadPodcasts() {
    const url = "https://api.jsonbin.io/v3/b/662f022dacd3cb34a8400e3e";
    const accessKey = '$2a$10$4GRuokwTdv4sRnqIwYDyGOWZ2CZgDkefsKy7OFlmTydfnDvXBomtC';
    const fallbackUrl = 'data/podcastCollection.json';

    fetch(url, {
        headers: {
            'X-Access-Key': accessKey
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        podcasts = data.record.podcasts; // Store podcasts globally
        populatePodcastTable();
    })
    .catch(error => {
        console.error("Error loading podcasts from JSON bin:", error);
        // Fallback to local JSON file
        fetch(fallbackUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                podcasts = data.podcasts; // Store podcasts globally
                populatePodcastTable();
            })
            .catch(fallbackError => {
                console.error("Error loading podcasts from fallback JSON:", fallbackError);
            });
    });
}

function populatePodcastTable(filteredPodcasts = podcasts) {
    const tableBody = document.getElementById("podcast-table").querySelector("tbody");
    tableBody.innerHTML = ''; // Clear existing rows

    filteredPodcasts.forEach((podcast, index) => {
        const row = document.createElement("tr");
        row.classList.add('podcast-row'); // Add class for consistent row height
        
        const artworkCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = podcast.thumbnail;
        img.classList.add('album-art'); // Add class for album art
        img.onclick = function() { togglePlayPausePodcast(index); }; // Play podcast on thumbnail click
        artworkCell.appendChild(img);
        
        const infoCell = document.createElement('td');
        infoCell.classList.add('info-cell'); // Add class for larger cell
        const titleDiv = document.createElement('div');
        titleDiv.classList.add('podcast-title');
        titleDiv.textContent = podcast.title;
        infoCell.appendChild(titleDiv);
        
        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('podcast-description');
        descriptionDiv.textContent = podcast.description;
        infoCell.appendChild(descriptionDiv);

        if (podcast.date) {
            const dateDiv = document.createElement('div');
            dateDiv.classList.add('podcast-details');
            dateDiv.textContent = podcast.date;
            infoCell.appendChild(dateDiv);
        }

        const actionCell = document.createElement('td');
        actionCell.classList.add('action-cell'); // Add class for action cell
        actionCell.classList.add('action-cell-flex'); // Add flex class for inline display
        actionCell.style.textAlign = 'right'; // Align buttons to the right

        const playButton = document.createElement('button');
        playButton.innerHTML = '<i class="fas fa-play"></i>'; // Changed to icon
        playButton.id = `play-btn-${index}`; // Unique ID for each play button
        playButton.classList.add('custom-play-button'); // Add custom class
        playButton.onclick = function() {
            togglePlayPausePodcast(index);
        };
        const addButton = document.createElement('button');
        addButton.innerHTML = '<i class="fas fa-plus"></i>'; 
        addButton.id = `add-btn-${index}`; 
        addButton.onclick = function() { };

        // Styling for inline display of buttons
        playButton.classList.add('action-button'); // Add class for action button
        addButton.classList.add('action-button'); // Add class for action button
        actionCell.appendChild(playButton);
        actionCell.appendChild(addButton);

        row.appendChild(artworkCell);
        row.appendChild(infoCell);
        row.appendChild(actionCell);
        
        tableBody.appendChild(row);
    });
}

function togglePlayPausePodcast(index) {
    const podcast = podcasts[index];
    const audioPlayer = document.getElementById('audio-player');
    const currentIcon = document.getElementById(`podcast-play-${index}`).querySelector('i');

    // Pause any currently playing podcast and update the icon
    if (currentPodcastIndex !== index && !audioPlayer.paused) {
        const currentPlayingIcon = document.getElementById(`podcast-play-${currentPodcastIndex}`).querySelector('i');
        currentPlayingIcon.className = 'fas fa-play';
        audioPlayer.pause();
    }

    // Toggle play/pause for the selected podcast
    if (audioPlayer.src !== podcast.mp3url || audioPlayer.paused) {
        audioPlayer.src = podcast.mp3url;
        audioPlayer.play();
        currentIcon.className = 'fas fa-pause';
    } else {
        audioPlayer.pause();
        currentIcon.className = 'fas fa-play';
    }

    // Update the current podcast index
    currentPodcastIndex = index;

    // Update the currently playing text if needed
    const currentPlaying = document.getElementById('thisOne');
    currentPlaying.textContent = podcast.title;
}

function playPreviousPodcast() {
    if (currentPodcastIndex > 0) {
        togglePlayPausePodcast(currentPodcastIndex - 1);
    }
}

function playNextPodcast() {
    if (currentPodcastIndex < podcasts.length - 1) {
        togglePlayPausePodcast(currentPodcastIndex + 1);
    }
}

function searchPodcasts() {
    const searchText = document.getElementById('podcast-search-input').value.toLowerCase();
    const filteredPodcasts = podcasts.filter(podcast => podcast.title.toLowerCase().includes(searchText));
    populatePodcastTable(filteredPodcasts);
}

function clearPodcastSearch() {
    document.getElementById('podcast-search-input').value = '';
    populatePodcastTable(podcasts);
}

document.getElementById('podcast-search-button').addEventListener("click", searchPodcasts);
document.getElementById('podcast-clear-search').addEventListener("click", clearPodcastSearch);

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("podcast-table")) {
        document.getElementById("podcast-table").classList.add('full-width-table'); // Add class to podcast table
        loadPodcasts();
    }
    if (document.getElementById("song-table")) {
        document.getElementById("song-table").classList.add('full-width-table'); // Add class to song table
    }
});