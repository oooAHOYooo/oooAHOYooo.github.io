document.addEventListener("DOMContentLoaded", function() {
    // DOM element references
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
    const toggleDataSourceBtn = document.getElementById('togglePodcastDataSourceBtn'); // Toggle button element

    let currentPodcastIndex = 0;
    let podcasts = [];

    // Data source URLs
    const remotePodcastDataUrl = 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/podcastCollection.json';
    const localPodcastDataUrl = './local_data/podcastCollection.json';
    
    // Toggle flag for remote fetching, default is true
    let useRemoteFetch = true;

    // Fetch podcast data from the appropriate URL
    async function fetchPodcasts() {
        const podcastDataUrl = useRemoteFetch ? remotePodcastDataUrl : localPodcastDataUrl;
        try {
            const response = await fetch(podcastDataUrl);
            const data = await response.json();
            console.log('Fetched podcast data:', data);
            podcasts = data.podcasts;
            // Sort podcasts by highest id first
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

    // Populate the podcast list table
    function populatePodcastList() {
        podcastListBody.innerHTML = ''; // Clear any existing list
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

        // Add event listeners for the individual listen buttons
        document.querySelectorAll('.listen-btn-podcast').forEach(button => {
            button.addEventListener('click', function(event) {
                event.stopPropagation(); // Prevent the row click event
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

    // Load the selected podcast
    function loadPodcast(index) {
        const podcast = podcasts[index];
        podcastTitle.textContent = podcast.title;
        podcastDescription.textContent = podcast.description;
        podcastThumbnail.src = podcast.thumbnail;
        audioPlayer.src = podcast.mp3url;
        currentPodcastIndex = index;

        // Reset the duration bar
        durationBar.value = 0;

        // Pause any other audio players
        document.querySelectorAll('audio').forEach(player => {
            if (player !== audioPlayer) {
                player.pause();
            }
        });

        // Save the current podcast index in local storage
        localStorage.setItem('currentPodcastIndex', index);
    }

    // Play the podcast with added UI updates
    function playPodcast() {
        audioPlayer.play().then(() => {
            playPodcastBtn.textContent = '[❚❚ PAUSE]';
            podcastThumbnail.classList.add('glow-border'); // Add a glow effect
        }).catch(error => console.error('Error playing podcast:', error));
    }

    // Toggle play/pause for the podcast
    function togglePlayPause() {
        if (audioPlayer.paused) {
            playPodcast();
        } else {
            audioPlayer.pause();
            playPodcastBtn.textContent = '[ PLAY]';
            podcastThumbnail.classList.remove('glow-border'); // Remove the glow effect
        }
    }

    // Toggle between remote and local data sources and re-fetch podcasts
    function togglePodcastDataSource() {
        useRemoteFetch = !useRemoteFetch;
        // Optionally update the button text to reflect the current data source
        toggleDataSourceBtn.textContent = useRemoteFetch ? 'Using Remote Data' : 'Using Local Data';
        // Clear stored podcasts and the current index to force a fresh fetch
        localStorage.removeItem('podcasts');
        localStorage.removeItem('currentPodcastIndex');
        fetchPodcasts();
    }

    // Event listeners for playback controls
    playPodcastBtn.addEventListener('click', togglePlayPause);
    podcastThumbnail.addEventListener('click', togglePlayPause);

    backwardPodcastBtn.addEventListener('click', () => {
        currentPodcastIndex = (currentPodcastIndex - 1 + podcasts.length) % podcasts.length;
        loadPodcast(currentPodcastIndex);
        audioPlayer.play();
    });

    nextPodcastBtn.addEventListener('click', () => {
        currentPodcastIndex = (currentPodcastIndex + 1) % podcasts.length;
        loadPodcast(currentPodcastIndex);
        audioPlayer.play();
    });

    forward15sBtn.addEventListener('click', () => {
        audioPlayer.currentTime = Math.min(audioPlayer.currentTime + 15, audioPlayer.duration);
    });

    // Update the duration bar and display remaining time as the podcast plays
    audioPlayer.addEventListener('timeupdate', () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        durationBar.value = progress;

        const remainingTime = audioPlayer.duration - audioPlayer.currentTime;
        const minutes = Math.floor(remainingTime / 60);
        const seconds = Math.floor(remainingTime % 60).toString().padStart(2, '0');
        document.getElementById('remaining-time').textContent = `${minutes}:${seconds}`;
    });

    // Allow users to scrub through the podcast
    durationBar.addEventListener('input', () => {
        const scrubTime = (durationBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = scrubTime;
    });

    // Save playback progress when the podcast is paused or when navigating away
    audioPlayer.addEventListener('pause', () => {
        localStorage.setItem('currentPlaybackTime', audioPlayer.currentTime);
    });

    window.addEventListener('beforeunload', () => {
        localStorage.setItem('currentPlaybackTime', audioPlayer.currentTime);
    });

    // Search functionality for podcasts
    function searchPodcasts(query) {
        const lowerCaseQuery = query.toLowerCase();
        const filteredPodcasts = podcasts.filter(podcast => 
            podcast.title.toLowerCase().includes(lowerCaseQuery) || 
            podcast.description.toLowerCase().includes(lowerCaseQuery)
        );
        updatePodcastList(filteredPodcasts);
    }

    document.getElementById('podcastSearchBtn').addEventListener('click', () => {
        const query = document.getElementById('podcastSearch').value;
        searchPodcasts(query);
    });

    document.getElementById('clear-search').addEventListener('click', () => {
        document.getElementById('podcastSearch').value = '';
        updatePodcastList(podcasts);
    });

    // Update the podcast list display (used for search results or after sorting)
    function updatePodcastList(podcastArray) {
        podcastListBody.innerHTML = ''; // Clear the current list
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

    // Sorting functionality
    document.getElementById('podcast-sort-title-az').addEventListener('click', () => {
        podcasts.sort((a, b) => a.title.localeCompare(b.title));
        updatePodcastList(podcasts);
    });

    document.getElementById('podcast-sort-recent').addEventListener('click', () => {
        podcasts.sort((a, b) => new Date(b.date) - new Date(a.date));
        updatePodcastList(podcasts);
    });

    document.getElementById('podcast-sort-random').addEventListener('click', () => {
        podcasts.sort(() => Math.random() - 0.5);
        updatePodcastList(podcasts);
    });

    // Attach the toggle data source event listener if the button exists
    if (toggleDataSourceBtn) {
        toggleDataSourceBtn.addEventListener('click', togglePodcastDataSource);
        toggleDataSourceBtn.textContent = useRemoteFetch ? 'Using Remote Data' : 'Using Local Data';
    }

    // Check if podcasts exist in local storage; if so, load them; otherwise, fetch from the current data source
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
