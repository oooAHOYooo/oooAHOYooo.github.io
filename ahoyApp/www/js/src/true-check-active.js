document.addEventListener('DOMContentLoaded', function() {
    const dockIcons = document.querySelectorAll('.v25-dock-icon');
    const tabContents = document.querySelectorAll('.tab-content');
    const currentTrackElement = document.getElementById('current-track');
    const coverArtElement = document.getElementById('sidedock-cover-art');
    const playPauseButton = document.getElementById('sidedock-play-pause');
    const bottomMainDisplay = document.getElementById('bottom-main-display');
    const likeButton = document.getElementById('like-button');

    const accountLikedSongsList = document.getElementById('accountLikedSongsList');
    const accountLikedSongsCount = document.getElementById('accountLikedSongsCount');

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

        // Update comments count
        const commentsCount = document.querySelectorAll('#commentsList li').length;
        document.getElementById('commentsCount').textContent = commentsCount;
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

        // Create a dropdown toggle button
        const toggleButton = document.createElement('button');
        toggleButton.textContent = 'Show Liked Songs';
        toggleButton.className = 'dropdown-toggle';

        // Create a container for the list
        const listContainer = document.createElement('div');
        listContainer.style.display = 'none';
        listContainer.style.maxHeight = '200px';
        listContainer.style.overflowY = 'auto';
        listContainer.style.border = '1px solid #444';
        listContainer.style.borderRadius = '4px';
        listContainer.style.padding = '10px';
        listContainer.style.marginTop = '10px';

        toggleButton.addEventListener('click', () => {
            if (listContainer.style.display === 'none') {
                listContainer.style.display = 'block';
                toggleButton.textContent = 'Hide Liked Songs';
            } else {
                listContainer.style.display = 'none';
                toggleButton.textContent = 'Show Liked Songs';
            }
        });

        accountLikedSongsList.appendChild(toggleButton);
        accountLikedSongsList.appendChild(listContainer);

        likedSongs.forEach((song, index) => {
            const li = document.createElement('div');
            li.style.display = 'flex';
            li.style.justifyContent = 'space-between';
            li.style.alignItems = 'center';
            li.style.marginBottom = '10px';
            li.innerHTML = `
                <span>${song.songTitle} - ${song.artist}</span>
                <div>
                    <button class="play-btn" aria-label="Play song" style="margin-right: 10px; background: none; border: none; color: #4CAF50; cursor: pointer;">
                        <i class="fas fa-play"></i>
                    </button>
                    <button class="delete-btn" aria-label="Remove from liked songs" style="background: none; border: none; color: #999; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            const playBtn = li.querySelector('.play-btn');
            const deleteBtn = li.querySelector('.delete-btn');
            playBtn.addEventListener('click', () => playSongFromLiked(index));
            deleteBtn.addEventListener('click', () => removeLikedSong(index));
            listContainer.appendChild(li);
        });
    }

    function playSongFromLiked(index) {
        const likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
        const songToPlay = likedSongs[index];
        if (songToPlay) {
            const audioPlayer = document.getElementById('audioPlayer');
            if (audioPlayer) {
                audioPlayer.src = songToPlay.audioSrc;
                document.getElementById('songTitle').textContent = `SONG TITLE: ${songToPlay.songTitle}`;
                document.getElementById('artist').textContent = `ARTIST: ${songToPlay.artist}`;
                document.getElementById('coverArt').src = songToPlay.coverArt;
                audioPlayer.play();
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

    // Call updateLikedSongs initially and whenever the liked items change
    updateLikedSongs();

    // Add an event listener for changes in localStorage
    window.addEventListener('storage', function(e) {
        if (e.key === 'likedSongs') {
            updateLikedSongs();
        }
    });

    // Add this new function to update the active profile
    function updateActiveProfile() {
        // In a real application, you would fetch this data from a server or local storage
        const userData = {
            username: 'Alex',
            level: 5,
            xp: 1337,
            commentsCount: 42 // Example value
        };

        document.getElementById('username').textContent = userData.username;
        document.getElementById('level').textContent = userData.level;
        document.getElementById('xp').textContent = userData.xp;
        document.getElementById('commentsCount').textContent = userData.commentsCount;
    }

    // Call the function to update the profile
    updateActiveProfile();
});