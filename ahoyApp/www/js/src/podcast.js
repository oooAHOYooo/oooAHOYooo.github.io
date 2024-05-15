// Function to load and display podcasts from jsonbin.io
function loadPodcasts() {
    const url = "https://api.jsonbin.io/v3/b/662f022dacd3cb34a8400e3e";
    const accessKey = '$2a$10$4GRuokwTdv4sRnqIwYDyGOWZ2CZgDkefsKy7OFlmTydfnDvXBomtC'; // Use your read-only access key here

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
        const tableBody = document.getElementById("podcast-table").querySelector("tbody");
        data.record.podcasts.forEach(podcast => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><button class="control-button-podcast" id="podcast-play-${podcast.id}" onclick="togglePlayPausePodcast('${podcast.mp3url}', '${podcast.title}')"><i class="fas fa-play"></i></button></td>
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

// Adjust the togglePlayPausePodcast function to use podcast.id instead of index
function togglePlayPausePodcast(url, title) {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseIcon = document.getElementById('v27-play-pause-icon');
    const currentPlaying = document.getElementById('thisOne');

    // Check if the current URL is already loaded
    if (audioPlayer.src !== url) {
        audioPlayer.src = url; // Change the source
        audioPlayer.play(); // Play new podcast
        playPauseIcon.className = 'fas fa-pause'; // Change to pause icon
        currentPlaying.textContent = title; // Update the currently playing title
    } else {
        // Toggle play/pause on the same podcast
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseIcon.className = 'fas fa-pause';
        } else {
            audioPlayer.pause();
            playPauseIcon.className = 'fas fa-play';
        }
    }

    // Event listeners to toggle play/pause icon
    audioPlayer.addEventListener('play', () => {
        playPauseIcon.className = 'fas fa-pause';
    });

    audioPlayer.addEventListener('pause', () => {
        playPauseIcon.className = 'fas fa-play';
    });
}

document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("podcast-table")) {
        loadPodcasts();
    }
});

