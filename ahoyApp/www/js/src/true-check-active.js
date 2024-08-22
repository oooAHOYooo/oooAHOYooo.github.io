document.addEventListener('DOMContentLoaded', function() {
    const dockIcons = document.querySelectorAll('.v25-dock-icon');
    const tabContents = document.querySelectorAll('.tab-content');
    const currentTrackElement = document.getElementById('current-track');
    const coverArtElement = document.getElementById('sidedock-cover-art');
    const playPauseButton = document.getElementById('sidedock-play-pause');
    const bottomMainDisplay = document.getElementById('bottom-main-display');

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
            bottomMainDisplay.textContent = 'NO MEDIA SELECTED';
            coverArtElement.src = './img/assets/default-cover.png'; // Add a default cover image
            updatePlayPauseButton(false);
        }
    }

    function updatePlayPauseButton(isPlaying) {
        playPauseButton.innerHTML = isPlaying ? '&#10074;&#10074;' : '&#9658;';
    }

    playPauseButton.addEventListener('click', function() {
        const podcastPlayer = document.getElementById('podcastPlayer');
        const audioPlayer = document.getElementById('audioPlayer');

        if (podcastPlayer && !podcastPlayer.paused) {
            podcastPlayer.pause();
        } else if (audioPlayer && !audioPlayer.paused) {
            audioPlayer.pause();
        } else if (podcastPlayer) {
            podcastPlayer.play();
        } else if (audioPlayer) {
            audioPlayer.play();
        }
        updateCurrentlyPlaying();
    });

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
});