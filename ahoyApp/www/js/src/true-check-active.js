document.addEventListener('DOMContentLoaded', function() {
    const dockIcons = document.querySelectorAll('.v25-dock-icon');
    const tabContents = document.querySelectorAll('.tab-content');
    const currentTrackElement = document.getElementById('current-track');
    const coverArtElement = document.getElementById('sidedock-cover-art');
    const playPauseButton = document.getElementById('sidedock-play-pause');
    const bottomMainDisplay = document.getElementById('bottom-main-display');

    const accountLikedSongsList = document.getElementById('accountLikedSongsList');
    const accountLikedSongsCount = document.getElementById('accountLikedSongsCount');
    const likedPodcastsList = document.getElementById('likedPodcastsList');
    const likedPodcastsCount = document.getElementById('likedPodcastsCount');

    function updateActiveTab(clickedTabId) {
        // Remove active class from all tabs and dock icons
        tabContents.forEach(tab => tab.classList.remove('active'));
        dockIcons.forEach(icon => icon.classList.remove('active'));

        // Add active class to the clicked tab and corresponding dock icon
        const activeTab = document.getElementById(clickedTabId);
        if (activeTab) {
            activeTab.classList.add('active');
            const activeIcon = document.querySelector(`.v25-dock-icon[onclick*="${clickedTabId}"]`);
            if (activeIcon) {
                activeIcon.classList.add('active');
            }
        }
    }

    // Add click event listeners to dock icons
    dockIcons.forEach(icon => {
        icon.addEventListener('click', function(event) {
            event.preventDefault();
            const clickedTabId = this.getAttribute('onclick').match(/['"]([^'"]+)['"]/)[1];
            updateActiveTab(clickedTabId);
        });
    });

    // Set initial active tab (assuming 'news-tab' is the default)
    updateActiveTab('news-tab');

    // Function to update the currently playing track
    function updateCurrentlyPlaying() {
        const podcastPlayer = document.getElementById('podcastPlayer');
        const audioPlayer = document.getElementById('audioPlayer');

        if (podcastPlayer && !podcastPlayer.paused) {
            // Podcast is playing
            const podcastTitle = document.getElementById('podcast-title');
            const podcastCoverArt = document.getElementById('podcast-cover-art');
            if (podcastTitle) {
                currentTrackElement.textContent = podcastTitle.textContent.replace('PODCAST TITLE: ', '');
                bottomMainDisplay.textContent = `PODCAST: ${currentTrackElement.textContent}`;
            }
            if (podcastCoverArt) {
                coverArtElement.src = podcastCoverArt.src;
            }
            updatePlayPauseButton(true);
        } else if (audioPlayer && !audioPlayer.paused) {
            // Song is playing
            const songTitle = document.getElementById('songTitle');
            const artist = document.getElementById('artist');
            const coverArt = document.getElementById('coverArt');
            if (songTitle && artist) {
                const songText = songTitle.textContent.replace('SONG TITLE: ', '');
                const artistText = artist.textContent.replace('ARTIST: ', '');
                currentTrackElement.textContent = `${songText} - ${artistText}`;
                bottomMainDisplay.textContent = `NOW PLAYING: ${songText} by ${artistText}`;
            }
            if (coverArt) {
                coverArtElement.src = coverArt.src;
            }
            updatePlayPauseButton(true);
        } else if (podcastPlayer && podcastPlayer.paused && podcastPlayer.currentTime > 0) {
            // Podcast is paused
            const podcastTitle = document.getElementById('podcast-title');
            if (podcastTitle) {
                const title = podcastTitle.textContent.replace('PODCAST TITLE: ', '');
                bottomMainDisplay.textContent = `PAUSED: ${title}`;
            }
            updatePlayPauseButton(false);
        } else if (audioPlayer && audioPlayer.paused && audioPlayer.currentTime > 0) {
            // Song is paused
            const songTitle = document.getElementById('songTitle');
            const artist = document.getElementById('artist');
            if (songTitle && artist) {
                const songText = songTitle.textContent.replace('SONG TITLE: ', '');
                const artistText = artist.textContent.replace('ARTIST: ', '');
                bottomMainDisplay.textContent = `PAUSED: ${songText} by ${artistText}`;
            }
            updatePlayPauseButton(false);
        } else {
            currentTrackElement.textContent = 'No track selected';
            bottomMainDisplay.textContent = 'DYLM?';
            coverArtElement.src = './img/assets/default-cover.png'; // Add a default cover image
            updatePlayPauseButton(false);
        }

        // Add click event listener to bottomMainDisplay
        bottomMainDisplay.addEventListener('click', togglePlayPause);
    }

    function updatePlayPauseButton(isPlaying) {
        playPauseButton.innerHTML = isPlaying ? '&#10074;&#10074;' : '&#9658;';
    }

    function togglePlayPause() {
        const podcastPlayer = document.getElementById('podcastPlayer');
        const audioPlayer = document.getElementById('audioPlayer');

        if (podcastPlayer && !podcastPlayer.paused) {
            podcastPlayer.pause();
        } else if (audioPlayer && !audioPlayer.paused) {
            audioPlayer.pause();
        } else if (podcastPlayer && podcastPlayer.paused && podcastPlayer.currentTime > 0) {
            podcastPlayer.play();
        } else if (audioPlayer && audioPlayer.paused && audioPlayer.currentTime > 0) {
            audioPlayer.play();
        }
        updateCurrentlyPlaying();
    }

    playPauseButton.addEventListener('click', togglePlayPause);

    // Set up event listeners for audio players
    const podcastPlayer = document.getElementById('podcastPlayer');
    const audioPlayer = document.getElementById('audioPlayer');

    if (podcastPlayer) {
        podcastPlayer.addEventListener('play', updateCurrentlyPlaying);
        podcastPlayer.addEventListener('pause', updateCurrentlyPlaying);
    }

    if (audioPlayer) {
        audioPlayer.addEventListener('play', updateCurrentlyPlaying);
        audioPlayer.addEventListener('pause', updateCurrentlyPlaying);
    }

    // Update currently playing track every second
    setInterval(updateCurrentlyPlaying, 1000);

    // Initial update
    updateCurrentlyPlaying();

    function updateLikedSongs() {
        const likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
        accountLikedSongsList.innerHTML = '';
        accountLikedSongsCount.textContent = likedSongs.length;

        likedSongs.forEach((song, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${song.songTitle} - ${song.artist}</span>
                <div style="margin: 10px 0;">
                    <button class="play-btn responsive-play-btn" aria-label="Play song" style="margin-right: 10px; font-size: 1em; padding: 8px 12px; border: 2px solid #4CAF50; border-radius: 5px;">
                        <i class="fas fa-play" style="font-size: 1.2em;"></i>
                    </button>
                    <button class="delete-btn" aria-label="Remove from liked songs" style="background: none; border: none; color: #999; opacity: 0.6; font-size: 0.9em; padding: 5px; cursor: pointer; transition: opacity 0.3s ease;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            const playBtn = li.querySelector('.play-btn');
            const deleteBtn = li.querySelector('.delete-btn');
            playBtn.addEventListener('click', () => playSongFromLiked(index));
            deleteBtn.addEventListener('click', () => removeLikedSong(index));
            accountLikedSongsList.appendChild(li);
        });
    }

    function updateLikedPodcasts() {
        const likedPodcasts = JSON.parse(localStorage.getItem('likedPodcasts')) || [];
        likedPodcastsList.innerHTML = '';
        likedPodcastsCount.textContent = likedPodcasts.length;

        likedPodcasts.forEach((podcast, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${podcast.podcastTitle} - ${podcast.episodeTitle}</span>
                <div style="margin: 10px 0;">
                    <button class="play-btn responsive-play-btn" aria-label="Play podcast" style="margin-right: 10px; font-size: 1em; padding: 8px 12px; border: 2px solid #4CAF50; border-radius: 5px;">
                        <i class="fas fa-play" style="font-size: 1.2em;"></i>
                    </button>
                    <button class="delete-btn" aria-label="Remove from liked podcasts" style="background: none; border: none; color: #999; opacity: 0.6; font-size: 0.9em; padding: 5px; cursor: pointer; transition: opacity 0.3s ease;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            const playBtn = li.querySelector('.play-btn');
            const deleteBtn = li.querySelector('.delete-btn');
            playBtn.addEventListener('click', () => playPodcastFromLiked(index));
            deleteBtn.addEventListener('click', () => removeLikedPodcast(index));
            likedPodcastsList.appendChild(li);
        });
    }

    function playSongFromLiked(index) {
        const likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
        const songToPlay = likedSongs[index];
        if (songToPlay) {
            const audioPlayer = document.getElementById('audioPlayer');
            if (audioPlayer) {
                // Set the audio source
                audioPlayer.src = songToPlay.audioSrc;
                // Update the UI elements
                document.getElementById('songTitle').textContent = `SONG TITLE: ${songToPlay.songTitle}`;
                document.getElementById('artist').textContent = `ARTIST: ${songToPlay.artist}`;
                document.getElementById('coverArt').src = songToPlay.coverArt;
                // Play the song
                audioPlayer.play();
                // Update the currently playing display
                updateCurrentlyPlaying();
            } else {
                console.error('Audio player not found');
            }
        }
    }

    function removeLikedSong(index) {
        const likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
        likedSongs.splice(index, 1);
        localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
        updateLikedSongs();
    }

    function addLikedSong(song) {
        const likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
        
        // Check if the song already exists in the liked songs list
        const isDuplicate = likedSongs.some(likedSong => 
            likedSong.songTitle === song.songTitle && likedSong.artist === song.artist
        );

        if (!isDuplicate) {
            likedSongs.push(song);
            localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
            updateLikedSongs();
        } else {
            console.log('Song already in liked list');
            // Optionally, you can show a message to the user that the song is already liked
        }
    }

    function playPodcastFromLiked(index) {
        const likedPodcasts = JSON.parse(localStorage.getItem('likedPodcasts')) || [];
        const podcastToPlay = likedPodcasts[index];
        if (podcastToPlay) {
            const podcastPlayer = document.getElementById('podcastPlayer');
            if (podcastPlayer) {
                // Set the audio source
                podcastPlayer.src = podcastToPlay.audioSrc;
                // Update the UI elements
                document.getElementById('podcast-title').textContent = `PODCAST TITLE: ${podcastToPlay.podcastTitle}`;
                document.getElementById('podcast-description').textContent = `DESCRIPTION: ${podcastToPlay.episodeTitle}`;
                document.getElementById('podcast-thumbnail').src = podcastToPlay.thumbnailSrc;
                // Play the podcast
                podcastPlayer.play();
                // Update the currently playing display
                updateCurrentlyPlaying();
            } else {
                console.error('Podcast player not found');
            }
        }
    }

    function removeLikedPodcast(index) {
        const likedPodcasts = JSON.parse(localStorage.getItem('likedPodcasts')) || [];
        likedPodcasts.splice(index, 1);
        localStorage.setItem('likedPodcasts', JSON.stringify(likedPodcasts));
        updateLikedPodcasts();
    }

    function addLikedPodcast(podcast) {
        const likedPodcasts = JSON.parse(localStorage.getItem('likedPodcasts')) || [];
        
        // Check if the podcast already exists in the liked podcasts list
        const isDuplicate = likedPodcasts.some(likedPodcast => 
            likedPodcast.podcastTitle === podcast.podcastTitle && likedPodcast.episodeTitle === podcast.episodeTitle
        );

        if (!isDuplicate) {
            likedPodcasts.push(podcast);
            localStorage.setItem('likedPodcasts', JSON.stringify(likedPodcasts));
            updateLikedPodcasts();
        } else {
            console.log('Podcast already in liked list');
            // Optionally, you can show a message to the user that the podcast is already liked
        }
    }

    // Call updateLikedSongs and updateLikedPodcasts initially and whenever the liked items change
    updateLikedSongs();
    updateLikedPodcasts();

    // Add an event listener for changes in localStorage
    window.addEventListener('storage', function(e) {
        if (e.key === 'likedSongs') {
            updateLikedSongs();
        } else if (e.key === 'likedPodcasts') {
            updateLikedPodcasts();
        }
    });
});