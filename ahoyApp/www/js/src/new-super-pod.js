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

    const podcastDataUrl = "https://api.npoint.io/4a8a3966abf035799dbb"; 

    // Fetch podcast data
    async function fetchPodcasts() {
        try {
            const response = await fetch(podcastDataUrl);
            const data = await response.json();
            console.log('Fetched podcast data:', data);
            podcasts = data.podcasts;
            podcasts.sort((a, b) => b.id - a.id);

            // Store podcasts in local storage
            localStorage.setItem('podcasts', JSON.stringify(podcasts));

            // Retrieve current podcast index from local storage or default to 0
            currentPodcastIndex = parseInt(localStorage.getItem('currentPodcastIndex')) || 0;

            loadPodcast(currentPodcastIndex);
            populatePodcastList();
        } catch (error) {
            console.error('Error fetching podcast data:', error);
        }
    }

    // Populate podcast list
    function populatePodcastList() {
        podcastListBody.innerHTML = ''; // Clear existing list
        podcasts.forEach((podcast, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${podcast.thumbnail}" alt="${podcast.title}" width="50"></td>
                <td>${podcast.title}</td>
                <td><button class="listen-btn-podcast" data-index="${index}">Listen</button></td>
            `;
            podcastListBody.appendChild(row);

            // Make the entire row clickable
            row.addEventListener('click', function() {
                loadPodcast(index);
                audioPlayer.play();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        });

        document.querySelectorAll('.listen-btn-podcast').forEach(button => {
            button.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent the row click event from firing
                const podcastIndex = this.getAttribute('data-index');
                loadPodcast(parseInt(podcastIndex));
                audioPlayer.play();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
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

        // Store current podcast index in local storage
        localStorage.setItem('currentPodcastIndex', index);
    }

    // Play podcast
    function playPodcast() {
        audioPlayer.play().then(() => {
            playPodcastBtn.textContent = '[❚❚ PAUSE]';
            podcastThumbnail.classList.add('glow-border'); // Add glow effect
        }).catch(error => console.error('Error playing podcast:', error));
    }

    // Toggle play/pause
    function togglePlayPause() {
        if (audioPlayer.paused) {
            playPodcast();
        } else {
            audioPlayer.pause();
            playPodcastBtn.textContent = '[ PLAY]';
            podcastThumbnail.classList.remove('glow-border'); // Remove glow effect
        }
    }

    // Event listeners
    playPodcastBtn.addEventListener('click', togglePlayPause);
    podcastThumbnail.addEventListener('click', togglePlayPause);

    // Save progress when the podcast is paused
    audioPlayer.addEventListener('pause', () => {
        localStorage.setItem('currentPlaybackTime', audioPlayer.currentTime);
    });

    // Save progress when the user navigates away
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('currentPlaybackTime', audioPlayer.currentTime);
    });

    // Play the previous podcast by ID
    backwardPodcastBtn.addEventListener('click', () => {
        currentPodcastIndex = (currentPodcastIndex - 1 + podcasts.length) % podcasts.length;
        loadPodcast(currentPodcastIndex);
        audioPlayer.play();
    });

    // Play the next podcast in a loop
    nextPodcastBtn.addEventListener('click', () => {
        currentPodcastIndex = (currentPodcastIndex + 1) % podcasts.length;
        loadPodcast(currentPodcastIndex);
        audioPlayer.play();
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

    // Update the forward 15 seconds button event listener
    forward15sBtn.addEventListener('click', () => {
        audioPlayer.currentTime = Math.min(audioPlayer.currentTime + 15, audioPlayer.duration);
    });

    // Search podcasts
    function searchPodcasts(query) {
        const lowerCaseQuery = query.toLowerCase();
        const filteredPodcasts = podcasts.filter(podcast => 
            podcast.title.toLowerCase().includes(lowerCaseQuery) || 
            podcast.description.toLowerCase().includes(lowerCaseQuery)
        );
        updatePodcastList(filteredPodcasts);
    }

    // Event listener for search button
    document.getElementById('podcastSearchBtn').addEventListener('click', () => {
        const query = document.getElementById('podcastSearch').value;
        searchPodcasts(query);
    });

    // Event listener for clear search button
    document.getElementById('clear-search').addEventListener('click', () => {
        document.getElementById('podcastSearch').value = '';
        updatePodcastList(podcasts);
    });

    // Update podcast list display
    function updatePodcastList(podcastArray) {
        podcastListBody.innerHTML = ''; // Clear existing list
        podcastArray.forEach((podcast, index) => {
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

    // Sort podcasts by title
    document.getElementById('podcast-sort-title-az').addEventListener('click', () => {
        podcasts.sort((a, b) => a.title.localeCompare(b.title));
        updatePodcastList(podcasts);
    });

    // Sort podcasts by most recent
    document.getElementById('podcast-sort-recent').addEventListener('click', () => {
        podcasts.sort((a, b) => new Date(b.date) - new Date(a.date));
        updatePodcastList(podcasts);
    });

    // Sort podcasts randomly
    document.getElementById('podcast-sort-random').addEventListener('click', () => {
        podcasts.sort(() => Math.random() - 0.5);
        updatePodcastList(podcasts);
    });

    // Call the fetch function once the page loads
    const storedPodcasts = localStorage.getItem('podcasts');
    if (storedPodcasts) {
        podcasts = JSON.parse(storedPodcasts);
        currentPodcastIndex = parseInt(localStorage.getItem('currentPodcastIndex')) || 0;
        loadPodcast(currentPodcastIndex);
        populatePodcastList();
    } else {
        fetchPodcasts();
    }
});
