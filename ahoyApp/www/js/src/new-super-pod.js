document.addEventListener("DOMContentLoaded", function() {
    const podcastListBody = document.getElementById('podcastListBody');
    const podcastTitle = document.getElementById('podcast-title');
    const podcastDescription = document.getElementById('podcast-description');
    const podcastThumbnail = document.getElementById('podcast-thumbnail');
    const audioPlayer = document.getElementById('podcastAudioPlayer');
    const playPodcastBtn = document.getElementById('playPodcastBtn');
    const backwardPodcastBtn = document.getElementById('backwardPodcastBtn');
    const nextPodcastBtn = document.getElementById('nextPodcastBtn');
    const durationBar = document.getElementById('podcastDurationBar');
    const forward15sBtn = document.getElementById('forwardPodcastBtn');

    let currentPodcastIndex = 0;
    let podcasts = [];

    // Fetch podcast data
    fetch('./data/podcastCollection.json')
        .then(response => response.json())
        .then(data => {
            podcasts = data.podcasts;
            podcasts.sort((a, b) => b.id - a.id);
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
                <td><button class="listen-btn-podcast" data-index="${index}">Listen</button></td>
            `;
            podcastListBody.appendChild(row);
        });

        document.querySelectorAll('.listen-btn-podcast').forEach(button => {
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

        // Reset the duration bar
        durationBar.value = 0;

        // Pause other audio players
        document.querySelectorAll('audio').forEach(player => {
            if (player !== audioPlayer) {
                player.pause();
            }
        });

        // Play the podcast
        playPodcast();
    }

    // Play podcast
    function playPodcast() {
        audioPlayer.play().then(() => {
            playPodcastBtn.textContent = '[❚❚ PAUSE]';
        }).catch(error => console.error('Error playing podcast:', error));
    }

    // Toggle play/pause
    function togglePlayPause() {
        if (audioPlayer.paused) {
            playPodcast();
        } else {
            audioPlayer.pause();
            playPodcastBtn.textContent = '[► PLAY]';
        }
    }

    // Event listeners
    playPodcastBtn.addEventListener('click', togglePlayPause);
    podcastThumbnail.addEventListener('click', togglePlayPause);

    // Load saved podcast index and time from local storage
    const savedPodcastIndex = localStorage.getItem('currentPodcastIndex');
    const savedPlaybackTime = localStorage.getItem('currentPlaybackTime');

    if (savedPodcastIndex !== null) {
        currentPodcastIndex = parseInt(savedPodcastIndex);
        loadPodcast(currentPodcastIndex);

        if (savedPlaybackTime !== null) {
            audioPlayer.currentTime = parseFloat(savedPlaybackTime);
        }
    }

    // Save current podcast index and time to local storage
    function saveProgress() {
        localStorage.setItem('currentPodcastIndex', currentPodcastIndex);
        localStorage.setItem('currentPlaybackTime', audioPlayer.currentTime);
    }

    // Save progress when the podcast is paused
    audioPlayer.addEventListener('pause', saveProgress);

    // Save progress when the user navigates away
    window.addEventListener('beforeunload', saveProgress);

    // Play the previous podcast by ID
    backwardPodcastBtn.addEventListener('click', () => {
        const currentPodcastId = podcasts[currentPodcastIndex].id;
        const previousPodcast = podcasts.find(podcast => podcast.id < currentPodcastId);
        if (previousPodcast) {
            currentPodcastIndex = podcasts.findIndex(podcast => podcast.id === previousPodcast.id);
            loadPodcast(currentPodcastIndex);
            audioPlayer.play();
        }
    });

    // Play the next podcast by ID
    nextPodcastBtn.addEventListener('click', () => {
        const currentPodcastId = podcasts[currentPodcastIndex].id;
        const nextPodcast = podcasts.slice().reverse().find(podcast => podcast.id > currentPodcastId);
        if (nextPodcast) {
            currentPodcastIndex = podcasts.findIndex(podcast => podcast.id === nextPodcast.id);
            loadPodcast(currentPodcastIndex);
            audioPlayer.play();
        }
    });

    // Update the duration bar as the podcast plays
    audioPlayer.addEventListener('timeupdate', () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        durationBar.value = progress;

        // Display remaining time
        const remainingTime = audioPlayer.duration - audioPlayer.currentTime;
        const minutes = Math.floor(remainingTime / 60);
        const seconds = Math.floor(remainingTime % 60).toString().padStart(2, '0');
        document.getElementById('remaining-time').textContent = `${minutes}:${seconds}`;
    });

    // Allow scrubbing through the podcast
    durationBar.addEventListener('input', () => {
        const scrubTime = (durationBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = scrubTime;
    });

    // Skip forward 15 seconds
    forward15sBtn.addEventListener('click', () => {
        audioPlayer.currentTime = Math.min(audioPlayer.currentTime + 15, audioPlayer.duration);
    });
});
