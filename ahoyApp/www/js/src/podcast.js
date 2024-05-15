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
    const playPauseIcon = document.getElementById('v27-play-pause-icon');
    const currentPlaying = document.getElementById('thisOne');

    currentPodcastIndex = index; // Update the current index

    if (audioPlayer.src !== podcast.mp3url) {
        audioPlayer.src = podcast.mp3url;
        audioPlayer.play();
        playPauseIcon.className = 'fas fa-pause';
        currentPlaying.textContent = podcast.title;
    } else {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseIcon.className = 'fas fa-pause';
        } else {
            audioPlayer.pause();
            playPauseIcon.className = 'fas fa-play';
        }
    }
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

