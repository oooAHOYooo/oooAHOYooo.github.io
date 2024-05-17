// Global variable to track the current podcast index
let currentPodcastIndex = 0;
let podcasts = []; // This will hold the fetched podcast data

function loadPodcasts() {
    const url = "https://api.jsonbin.io/v3/b/662f022dacd3cb34a8400e3e";
    const accessKey = '$2a$10$4GRuokwTdv4sRnqIwYDyGOWZ2CZgDkefsKy7OFlmTydfnDvXBomtC';

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
        const tableBody = document.getElementById("podcast-table").querySelector("tbody");
        podcasts.forEach((podcast, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><button class="control-button-podcast" id="podcast-play-${index}" onclick="togglePlayPausePodcast(${index})"><i class="fas fa-play"></i></button></td>
                <td><img src="${podcast.thumbnail}" alt="${podcast.title}" class="thumbnail"></td>
                <td>${podcast.title}</td>
                <td>${podcast.description}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error loading podcasts:", error);
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

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("podcast-table")) {
        loadPodcasts();
    }
});

