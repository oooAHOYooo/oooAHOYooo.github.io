fetch('./data/podcastCollection.json')
.then(response => response.json())
.then(data => {
    const podcasts = data.podcasts;
    let currentPodcastIndex = 0;
    const audioPlayer = document.getElementById('audioPlayer');
    const podcastTitle = document.getElementById('podcast-title');
    const podcastDescription = document.getElementById('podcast-description');
    const podcastThumbnail = document.getElementById('podcast-thumbnail');
    const playPodcastBtn = document.getElementById('playPodcastBtn');
    const likePodcastBtn = document.getElementById('likePodcastBtn');
    const prevPodcastBtn = document.getElementById('prevPodcastBtn');
    const nextPodcastBtn = document.getElementById('nextPodcastBtn');
    let likedPodcasts = JSON.parse(localStorage.getItem('likedPodcasts')) || [];

    function loadPodcast(podcast) {
        podcastTitle.textContent = podcast.title;
        podcastDescription.textContent = podcast.description;
        podcastThumbnail.src = podcast.thumbnail;
        audioPlayer.src = podcast.mp3url;
        // Update UI elements
    }

    function togglePlay() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPodcastBtn.textContent = '[❚❚ PAUSE]';
        } else {
            audioPlayer.pause();
            playPodcastBtn.textContent = '[► PLAY]';
        }
    }

    function nextPodcast() {
        currentPodcastIndex = (currentPodcastIndex + 1) % podcasts.length;
        loadPodcast(podcasts[currentPodcastIndex]);
    }

    function prevPodcast() {
        currentPodcastIndex = (currentPodcastIndex - 1 + podcasts.length) % podcasts.length;
        loadPodcast(podcasts[currentPodcastIndex]);
    }

    // Event listeners
    playPodcastBtn.addEventListener('click', togglePlay);
    nextPodcastBtn.addEventListener('click', nextPodcast);
    prevPodcastBtn.addEventListener('click', prevPodcast);

    // Initial load
    loadPodcast(podcasts[currentPodcastIndex]);
})
.catch(error => console.error('Error fetching podcast data:', error));