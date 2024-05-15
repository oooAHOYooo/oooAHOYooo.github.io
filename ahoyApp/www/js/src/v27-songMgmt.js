class SongManager {
    constructor() {
        this.songsArray = [];
        this.currentSongIndex = 0;
        this.audioPlayer = document.getElementById("audio-player");
        this.initAudioPlayer();
        this.displayElement = document.getElementById('thisOne'); // Element to update with song title
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
        const song = this.songsArray[index];
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
                <td><button class="burn-button-overlay" onclick="songManager.burnSong(${index})"><i class="fas fa-fire"></i></button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    burnSong(index) {
        const song = this.songsArray[index];
        console.log(`Burning song: ${song.songTitle} by ${song.artist}`); // Placeholder for actual burn functionality
    }
}

const songManager = new SongManager();
document.addEventListener("DOMContentLoaded", function () {
    songManager.fetchSongs();
});
