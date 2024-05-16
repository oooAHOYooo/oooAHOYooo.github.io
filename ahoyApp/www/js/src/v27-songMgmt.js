class SongManager {
    constructor() {
        this.songsArray = [];
        this.playlists = {};
        this.currentPlaylist = [];
        this.currentSongIndex = 0;
        this.isShuffle = false;
        this.audioPlayer = document.getElementById("audio-player");
        this.displayElement = document.getElementById('thisOne'); // Element to update with song title
        this.initAudioPlayer();
    }

    fetchSongs() {
        const url = "https://api.jsonbin.io/v3/b/662f0278acd3cb34a8400e67";
        const accessKey = '$2a$10$4GRuokwTdv4sRnqIwYDyGOWZ2CZgDkefsKy7OFlmTydfnDvXBomtC';
        return fetch(url, {
            headers: { 'X-Access-Key': accessKey }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        }).then(data => {
            this.songsArray = data.record.songs;
            this.loadSongsToUI();
        }).catch(error => {
            console.error("Failed to fetch songs: ", error);
        });
    }

    playSong(index) {
        const song = this.currentPlaylist.length > 0 ? this.currentPlaylist[index] : this.songsArray[index];
        if (!song) return;

        this.audioPlayer.src = song.mp3url;
        this.audioPlayer.play();
        this.updateNowPlayingDetails(song);
        this.currentSongIndex = index;

        // Update the display element with the current song title
        if (this.displayElement) {
            this.displayElement.textContent = song.songTitle;
        }
    }

    pauseSong() {
        if (this.audioPlayer) {
            this.audioPlayer.pause();
            this.updatePlayPauseIcon(false);
        }
    }

    updateNowPlayingDetails(song) {
        document.getElementById("now-playing-album-art").src = song.coverArt;
        document.getElementById("now-playing-song-title").textContent = song.songTitle;
        document.getElementById("now-playing-song-artist").textContent = song.artist;
    }

    initAudioPlayer() {
        this.audioPlayer.onerror = () => {
            console.error("Error occurred during song playback.");
        };
    }

    loadSongsToUI() {
        const tableBody = document.getElementById("song-list");
        tableBody.innerHTML = '';
        this.songsArray.forEach((song, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><button onclick="songManager.playSong(${index})"><i class="fas fa-play"></i></button></td>
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

        // Assuming song object has all the necessary details
        window.addSongToBurnList(song.mp3url, song.songTitle, song.artist, song.lengthInSeconds);

        // Update UI to replace the burn icon with a checkmark icon
        const tableBody = document.getElementById("song-list");
        const rows = tableBody.getElementsByTagName("tr");
        const burnIconCell = rows[index].getElementsByClassName("burn-icon")[0]; // Ensure you have a class 'burn-icon' on the burn icon element
        burnIconCell.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';

        // Reset the icon back to the burn icon after 1 second
        setTimeout(() => {
            burnIconCell.innerHTML = '<i class="fa fa-fire" aria-hidden="true"></i>';
        }, 1000);

        console.log(`Burned: ${song.songTitle} by ${song.artist}`);
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
        const icon = document.querySelector('#pause-btn i');
        if (icon) {
            icon.className = isPlaying ? 'fa fa-pause' : 'fa fa-play';
        }
    }
}

const songManager = new SongManager();
document.addEventListener("DOMContentLoaded", function () {
    songManager.fetchSongs();
    songManager.addPlaylist('default', [0, 1, 2, 3]); // Default playlist using indices

    const pauseButton = document.getElementById('pause-btn');
    pauseButton.addEventListener('click', function() {
        songManager.pauseSong();
    });
});
