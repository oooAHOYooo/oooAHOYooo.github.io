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
                <td><button class="listen-btn" data-index="${index}">Listen</button></td>
            `;
            podcastListBody.appendChild(row);
        });

        // Add event listeners to all listen buttons
        document.querySelectorAll('.listen-btn').forEach(button => {
            button.addEventListener('click', function() {
                const podcastIndex = this.getAttribute('data-index');
                loadPodcast(parseInt(podcastIndex));
            });
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

        // Ensure the podcast plays immediately
        audioPlayer.play().catch(error => console.error('Error playing podcast:', error));

        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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
