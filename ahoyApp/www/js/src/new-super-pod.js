document.addEventListener("DOMContentLoaded", function() {
    const podcastListBody = document.getElementById('podcastListBody');
    const podcastTitle = document.getElementById('podcast-title');
    const podcastDescription = document.getElementById('podcast-description');
    const podcastThumbnail = document.getElementById('podcast-thumbnail');
    const audioPlayer = document.getElementById('audioPlayer');
    const playPodcastBtn = document.getElementById('playPodcastBtn');
    const backwardPodcastBtn = document.getElementById('backwardPodcastBtn');
    const forwardPodcastBtn = document.getElementById('forwardPodcastBtn');

    let currentPodcastIndex = 0;
    let podcasts = [];

    // Fetch podcast data
    fetch('./data/podcastCollection.json')
        .then(response => response.json())
        .then(data => {
            podcasts = data.podcasts;
            populatePodcastList();
            loadPodcast(currentPodcastIndex);
        })
        .catch(error => console.error('Error fetching podcast data:', error));

    // Populate podcast list
    function populatePodcastList() {
        podcasts.forEach((podcast, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${podcast.thumbnail}" alt="${podcast.title}" width="50"></td>
                <td>${podcast.title}</td>
                <td><button onclick="loadPodcast(${index})">Listen</button></td>
            `;
            podcastListBody.appendChild(row);
        });
    }

    // Load selected podcast
    function loadPodcast(index) {
        const podcast = podcasts[index];
        podcastTitle.textContent = podcast.title;
        podcastDescription.textContent = podcast.description;
        podcastThumbnail.src = podcast.thumbnail;
        audioPlayer.src = podcast.mp3url;
        currentPodcastIndex = index;
        playPodcast();
    }

    // Play podcast
    function playPodcast() {
        audioPlayer.play();
        playPodcastBtn.textContent = '[❚❚ PAUSE]';
    }

    // Play or pause podcast
    playPodcastBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            playPodcast();
        } else {
            audioPlayer.pause();
            playPodcastBtn.textContent = '[► PLAY]';
        }
    });

    // Skip backward
    backwardPodcastBtn.addEventListener('click', () => {
        audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 15);
    });

    // Skip forward
    forwardPodcastBtn.addEventListener('click', () => {
        audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 15);
    });
});
