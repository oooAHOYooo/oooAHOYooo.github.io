class SongManager {
    constructor() {
        this.songsArray = [];
        this.playlists = {};
        this.currentPlaylist = [];
        this.currentSongIndex = 0;
        this.isShuffle = false;
        this.audioPlayer = document.getElementById("audio-player");
        this.displayElement = document.getElementById('thisOne'); // Element to update with song title
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
        const songList = document.getElementById('song-list'); // Assuming there's an element with id 'song-list'
        songList.addEventListener('click', (event) => {
            const songIndex = event.target.getAttribute('data-index');
            if (songIndex) {
                this.togglePlayPause(parseInt(songIndex));
            }
        });
    }

    togglePlayPause(index) {
        if (this.currentSongIndex !== index) {
            this.audioPlayer.src = this.songsArray[index].mp3url;
            this.currentSongIndex = index;
        }
        if (this.audioPlayer.paused) {
            this.audioPlayer.play();
        } else {
            this.audioPlayer.pause();
        }
        this.updatePlayPauseButton();
    }

    updatePlayPauseButton() {
        const playPauseButton = document.getElementById('v27-play-button');
        playPauseButton.textContent = this.audioPlayer.paused ? 'Play' : 'Pause';
    }

    updateNowPlayingDetails(song) {
        this.displayElement.textContent = `Now playing: ${song.title}`;
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
    const playPauseButton = document.getElementById('v27-play-button');
    playPauseButton.addEventListener('click', function() {
        songManager.togglePlayPause(songManager.currentSongIndex);
    });

    // Previous button
    const prevButton = document.getElementById('v27-prev-button');
    prevButton.addEventListener('click', function() {
        if (songManager.currentSongIndex > 0) {
            songManager.togglePlayPause(songManager.currentSongIndex - 1);
        } else {
            songManager.togglePlayPause(songManager.songsArray.length - 1); // Loop to the last song
        }
    });

    // Next button
    const nextButton = document.getElementById('v27-next-button');
    nextButton.addEventListener('click', function() {
        if (songManager.currentSongIndex < songManager.songsArray.length - 1) {
            songManager.togglePlayPause(songManager.currentSongIndex + 1);
        } else {
            songManager.togglePlayPause(0); // Loop back to the first song
        }
    });

    // Settings button
    const settingsButton = document.getElementById('v27-settings-button');
    settingsButton.addEventListener('click', function() {
        navigateToTab('settings-tab'); // Assuming navigateToTab is defined elsewhere
    });
});

