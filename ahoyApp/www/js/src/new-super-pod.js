document.addEventListener("DOMContentLoaded", function() {
    const podcastListBody = document.getElementById('podcastListBody');
    const podcastTitle = document.getElementById('podcast-title');
    const podcastDescription = document.getElementById('podcast-description');
    const podcastThumbnail = document.getElementById('podcast-thumbnail');
    const audioPlayer = document.getElementById('podcastAudioPlayer');
    const playPodcastBtn = document.getElementById('playPodcastBtn');
    const backwardPodcastBtn = document.getElementById('podcast-backward15sBtn');
    const nextPodcastBtn = document.getElementById('podcast-nextBtn');
    const durationBar = document.getElementById('podcastDurationBar');
    const forward15sBtn = document.getElementById('podcast-forward15sBtn');

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

        // Remove the automatic play call
        // playPodcast();
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

    // Play the next podcast in a loop
    nextPodcastBtn.addEventListener('click', () => {
        currentPodcastIndex = (currentPodcastIndex + 1) % podcasts.length;
        loadPodcast(currentPodcastIndex);
        audioPlayer.play();
    });

    // Get the podcast audio player element from index.html
    const podcastAudioPlayer = document.getElementById('podcast-audio-player');

    // Check if the podcast audio player element exists
    if (podcastAudioPlayer) {
        // Update the audio player source
        podcastAudioPlayer.src = podcasts[currentPodcastIndex].audioSrc;

        // Add event listener to play/pause button
        playPodcastBtn.addEventListener('click', () => {
            if (podcastAudioPlayer.paused) {
                podcastAudioPlayer.play();
                playPodcastBtn.textContent = '[❚❚ PAUSE]';
            } else {
                podcastAudioPlayer.pause();
                playPodcastBtn.textContent = '[► PLAY]';
            }
        });

        // Add event listener to update the duration bar
        podcastAudioPlayer.addEventListener('timeupdate', () => {
            const progress = (podcastAudioPlayer.currentTime / podcastAudioPlayer.duration) * 100;
            durationBar.value = progress;

            // Display remaining time
            const remainingTime = podcastAudioPlayer.duration - podcastAudioPlayer.currentTime;
            const minutes = Math.floor(remainingTime / 60);
            const seconds = Math.floor(remainingTime % 60).toString().padStart(2, '0');
            document.getElementById('remaining-time').textContent = `${minutes}:${seconds}`;
        });

        // Allow scrubbing through the podcast
        durationBar.addEventListener('input', () => {
            const scrubTime = (durationBar.value / 100) * podcastAudioPlayer.duration;
            podcastAudioPlayer.currentTime = scrubTime;
        });

        // Update the forward 15 seconds button event listener
        document.getElementById('podcast-forward15sBtn').addEventListener('click', () => {
            podcastAudioPlayer.currentTime = Math.min(podcastAudioPlayer.currentTime + 15, podcastAudioPlayer.duration);
        });

        // Update the backward 15 seconds button event listener
        document.getElementById('podcast-backward15sBtn').addEventListener('click', () => {
            podcastAudioPlayer.currentTime = Math.max(podcastAudioPlayer.currentTime - 15, 0);
        });
    } else {
        console.error('Podcast audio player element not found in index.html');
    }

    // Update the duration bar as the podcast plays
    audioPlayer.addEventListener('timeupdate', () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        durationBar.value = progress;

        // Display remaining time
        const remainingTime = audioPlayer.duration - audioPlayer.currentTime;
        const minutes = Math.floor(remainingTime / 60);
        const seconds = Math.floor(remainingTime % 60).toString().padStart(2, '0');
        document.getElementById('remaining-time').textContent = `${minutes}:${seconds}`;

        // Save progress periodically
        saveProgress();
    });

    // Allow scrubbing through the podcast
    durationBar.addEventListener('input', () => {
        const scrubTime = (durationBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = scrubTime;
    });

    // Update the forward 15 seconds button event listener
    document.getElementById('podcast-forward15sBtn').addEventListener('click', () => {
        audioPlayer.currentTime = Math.min(audioPlayer.currentTime + 15, audioPlayer.duration);
    });
});
