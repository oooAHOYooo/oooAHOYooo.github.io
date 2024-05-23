class SongManager {
    constructor() {
        this.songsArray = [];
        this.playlists = {};
        this.currentPlaylist = [];
        this.currentSongIndex = 0;
        this.isShuffle = false;
        this.audioPlayer = document.getElementById("audio-player");
        this.displayElement = document.getElementById('thisOne'); 
        this.texts = [
            "hello there - Welcome to Ahoy",
            "Today's Date is - " + new Date().toLocaleDateString(),
            "We are an indie media platform",
            "Based out of New Haven CT",
            "Listen to a song",
            "Listen to a Podcast",
            "Watch a Media",
            "Checkout out our beta marketplace",
            "Send a CD Mixtape to a friend",
            "Create an Account - Lock in",
            "Ahoy Indie Media - is Ad Free",
            "Homegrown",
            "and alive",
            "New Updates all the time",
            "Spread the word - so we can quit our day jobs"
        ];
        this.currentIndex = 0;
        this.textInterval = null;
        this.initAudioPlayer();
        this.setupSongListEvents();
        this.startTextAnimation();
    }

    setupSongListEvents() {
        const songList = document.getElementById('song-list'); 
        songList.addEventListener('click', (event) => {
            const songIndex = event.target.getAttribute('data-index');
            if (songIndex) {
                this.playSong(parseInt(songIndex));
                this.updatePlayPauseButton();
            }
        });
    }

    updatePlayPauseButton() {
        const playPauseButton = document.getElementById('v27-play-button');
        const icon = playPauseButton.querySelector('i'); // Assuming the button contains an <i> element for the icon
        if (this.audioPlayer.paused) {
            icon.className = 'fa fa-play';
            playPauseButton.setAttribute('title', 'Play'); // Optional: updating the tooltip on hover
        } else {
            icon.className = 'fa fa-pause';
            playPauseButton.setAttribute('title', 'Pause'); // Optional: updating the tooltip on hover
        }
    }

    playSong(index) {
        const song = this.currentPlaylist.length > 0 ? this.currentPlaylist[index] : this.songsArray[index];
        if (!song) return;

        if (this.audioPlayer.src !== song.mp3url || this.audioPlayer.paused) {
            this.audioPlayer.src = song.mp3url;
            this.audioPlayer.play();
            this.updateNowPlayingDetails(song);
            this.currentSongIndex = index;
            this.updatePlayPauseIcon(true);
            this.updatePlayPauseButton();
            this.stopTextAnimation(true);
        }
    }

    async fetchSongs() {
        const url = "https://api.jsonbin.io/v3/b/662f0278acd3cb34a8400e67";
        const accessKey = '$2a$10$4GRuokwTdv4sRnqIwYDyGOWZ2CZgDkefsKy7OFlmTydfnDvXBomtC';
        try {
            const response = await fetch(url, {
                headers: { 'X-Access-Key': accessKey }
            });
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            const data = await response.json();
            this.songsArray = data.record.songs;
            this.loadSongsToUI();
        } catch (error) {
            console.error("Failed to fetch songs: ", error);
        }
    }

    pauseSong() {
        if (this.audioPlayer) {
            this.audioPlayer.pause();
            this.updatePlayPauseIcon(false);
            this.startTextAnimation();
        }
    }

    updateNowPlayingDetails(song) {
        document.getElementById("now-playing-album-art").src = song.coverArt;
        document.getElementById("now-playing-song-title").textContent = song.songTitle;
        document.getElementById("now-playing-song-artist").textContent = song.artist;
        this.displayElement.textContent = song.songTitle + " by " + song.artist;
    }

    initAudioPlayer() {
        this.audioPlayer.onerror = () => {
            console.error("Error occurred during song playback.");
        };
        // Initialize audio player events
        this.audioPlayer.addEventListener('play', () => this.updatePlayPauseButton());
        this.audioPlayer.addEventListener('pause', () => this.updatePlayPauseButton());
    }

    loadSongsToUI() {
        const tableBody = document.getElementById("song-list");
        tableBody.innerHTML = '';
        this.songsArray.forEach((song, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><button data-index="${index}"><i class="fas fa-play"></i></button></td>
                <td><img src="${song.coverArt}" alt="${song.songTitle}" class="thumbnail"></td>
                <td>${song.artist}</td>
                <td>${song.songTitle}</td>
                <td class="burn-icon"><button class="burn-button-overlay" onclick="songManager.burnSong(${index})"><i class="fa fa-fire"></i></button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    burnSong(index) {
        const song = this.currentPlaylist.length > 0 ? this.currentPlaylist[index] : this.songsArray[index];
        if (!song) return;

        // Add song to burn list if not already added
        window.addSongToBurnList(song.mp3url, song.songTitle, song.artist, song.lengthInSeconds, index);

        // Toggle the burn icon to a checkmark or back to fire icon
        const tableBody = document.getElementById("song-list");
        const rows = tableBody.getElementsByTagName("tr");
        const burnIconCell = rows[index].getElementsByClassName("burn-icon")[0]; // Ensure you have a class 'burn-icon' on the burn icon element
        const icon = burnIconCell.querySelector('i');

        if (icon.classList.contains('fa-fire')) {
            icon.className = 'fa fa-check';
            icon.parentNode.setAttribute('title', 'Remove from burn list'); // Optional: Change the tooltip
        } else {
            icon.className = 'fa fa-fire';
            icon.parentNode.setAttribute('title', 'Add to burn list'); // Optional: Change the tooltip
        }

        console.log(`Toggled burn status for: ${song.songTitle} by ${song.artist}`);
    }

    addPlaylist(name, songIndexes) {
        this.playlists[name] = songIndexes.map(index => this.songsArray[index]);
    }

    selectPlaylist(name) {
        this.currentPlaylist = this.playlists[name] || [];
        this.currentSongIndex = 0; // Reset index to start of the new playlist
        this.loadSongsToUI(); // Refresh the UI with the selected playlist
    }

    toggleShuffle() {
        this.isShuffle = !this.isShuffle;
        if (this.isShuffle) {
            this.shuffleArray(this.currentPlaylist.length > 0 ? this.currentPlaylist : this.songsArray);
        } else {
            this.currentPlaylist = this.currentPlaylist.length > 0 ? [...this.playlists['default']] : [...this.songsArray];
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    updatePlayPauseIcon(isPlaying) {
        const icon = document.querySelector('#v27-play-button i');
        if (icon) {
            icon.className = isPlaying ? 'fa fa-pause' : 'fa fa-play';
        }
    }

    startTextAnimation() {
        this.stopTextAnimation(); // Clear any existing interval
        this.updateTextContent(); // Set initial text
        this.textInterval = setInterval(() => {
            this.updateTextContent();
        }, 3000);
    }

    stopTextAnimation() {
        clearInterval(this.textInterval);
        this.textInterval = null;
    }

    updateTextContent() {
        this.displayElement.textContent = this.texts[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.texts.length; // Cycle through the texts
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const songManager = new SongManager();
    songManager.fetchSongs();
    songManager.addPlaylist('default', [0, 1, 2, 3]); // Default playlist using indices

    // Play/Pause button
    const pauseButton = document.getElementById('v27-play-button'); // AG Modded here
    pauseButton.addEventListener('click', function() {
        const isPlaying = !songManager.audioPlayer.paused;
        if (isPlaying) {
            songManager.pauseSong();
        } else {
            songManager.playSong(songManager.currentSongIndex);
        }
    });

    // Previous button
    const prevButton = document.getElementById('v27-prev-button');
    prevButton.addEventListener('click', function() {
        if (songManager.currentSongIndex > 0) {
            songManager.playSong(songManager.currentSongIndex - 1);
        } else {
            songManager.playSong(songManager.songsArray.length - 1); // Loop to the last song
        }
    });

    // Next button
    const nextButton = document.getElementById('v27-next-button');
    nextButton.addEventListener('click', function() {
        if (songManager.currentSongIndex < songManager.songsArray.length - 1) {
            songManager.playSong(songManager.currentSongIndex + 1);
        } else {
            songManager.playSong(0); // Loop back to the first song
        }
    });

    // Settings button
    const settingsButton = document.getElementById('v27-settings-button');
    settingsButton.addEventListener('click', function() {
        navigateToTab('settings-tab'); // Assuming navigateToTab is defined elsewhere
    });
});

function handlePlayButtonClick() {
    const isPlaying = !songManager.audioPlayer.paused;
    if (isPlaying) {
        songManager.pauseSong();
    } else {
        songManager.playSong(songManager.currentSongIndex);
    }
}



