document.addEventListener("DOMContentLoaded", function() {
    const podcastListBody = document.getElementById('podcastListBody');
    const podcastTitle = document.getElementById('podcast-title');
    const podcastDescription = document.getElementById('podcast-description');
    const podcastThumbnail = document.getElementById('podcast-thumbnail');
    const audioPlayer = document.getElementById('audioPlayer');
    const playPodcastBtn = document.getElementById('playPodcastBtn');
    const backwardPodcastBtn = document.getElementById('backwardPodcastBtn');
    const forwardPodcastBtn = document.getElementById('forwardPodcastBtn');
    const durationBar = document.getElementById('podcastDurationBar');

    let currentPodcastIndex = 0;
    let podcasts = [];

    // Fetch podcast data
    fetch('./data/podcastCollection.json')
        .then(response => response.json())
        .then(data => {
            podcasts = data.podcasts;
            // Sort podcasts by ID in descending order
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

        // Add event listeners to all listen buttons
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

        // Ensure the podcast plays immediately
        // audioPlayer.play().catch(error => console.error('Error playing podcast:', error));

        // Scroll to the top of the page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
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
    }

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
    forwardPodcastBtn.addEventListener('click', () => {
        const currentPodcastId = podcasts[currentPodcastIndex].id;
        const nextPodcast = podcasts.slice().reverse().find(podcast => podcast.id > currentPodcastId);
        if (nextPodcast) {
            currentPodcastIndex = podcasts.findIndex(podcast => podcast.id === nextPodcast.id);
            loadPodcast(currentPodcastIndex);
            audioPlayer.play();
        }
    });

    // Toggle play/pause when clicking the podcast thumbnail
    podcastThumbnail.addEventListener('click', () => {
        if (audioPlayer.paused) {
            playPodcast();
        } else {
            audioPlayer.pause();
            playPodcastBtn.textContent = '[► PLAY]';
        }
    });

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
});
