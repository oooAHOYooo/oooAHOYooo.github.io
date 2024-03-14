document.addEventListener("DOMContentLoaded", function () {
    fetch("./data/songCollection.json")
        .then((response) => response.json())
        .then((data) => {
            const songList = document.getElementById("song-list");
            let htmlContent = `<table class="song-table full-width-song-table">
                                <thead>
                                    <tr>
                                        <th>Play</th>
                                        <th>Artist</th>
                                        <th>Song</th>
                                        <th>Burn</th>
                                    </tr>
                                </thead>
                                <tbody>`;
            data.songs.forEach((song) => {
                htmlContent += `<tr>
                                    <td><button class="play-button" data-url="${song.mp3url}" data-artist="${song.artist}" data-title="${song.songTitle}" data-album-art="${song.coverArt || 'https://via.placeholder.com/500'}"><i class="fas fa-play"></i></button></td>
                                    <td class="song-artist">${song.artist}</td>
                                    <td class="song-title">${song.songTitle}</td>
                                    <td><button class="burn-button" data-song-id="${song.id}"><i class="fas fa-fire"></i></button></td>
                                </tr>`;
            });
            htmlContent += `</tbody></table>`;
            songList.innerHTML = htmlContent;

            setupPlayButtons();
            setupProgressBar();

            // Load a random song into the "now playing song container"
            const randomSong = selectRandomSong(data.songs);
            updateNowPlaying(randomSong);
        });
});

let currentPlayingButton = null; // Keep track of the currently playing button

function setupPlayButtons() {
    const audioPlayer = document.getElementById("audio-player");
    const playButtons = document.querySelectorAll(".play-button");
    const nowPlayingAlbumArt = document.getElementById("now-playing-album-art");
    const nowPlayingSongTitle = document.getElementById("now-playing-song-title");
    const nowPlayingSongArtist = document.getElementById("now-playing-song-artist");

    playButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const url = this.dataset.url;
            const artist = this.dataset.artist;
            const title = this.dataset.title;
            const albumArt = this.dataset.albumArt || 'https://via.placeholder.com/500';

            if (currentPlayingButton && currentPlayingButton !== this) {
                updatePlayButtonIcon(currentPlayingButton, "fas fa-play");
            }

            nowPlayingAlbumArt.src = albumArt;
            nowPlayingSongTitle.textContent = title;
            nowPlayingSongArtist.textContent = artist;

            // Update the bottom display with the current song's artist and title
            const songInfoDisplay = document.getElementById("song-info");
            songInfoDisplay.textContent = `${artist} - ${title}`;

            if (audioPlayer.src !== url || audioPlayer.paused) {
                audioPlayer.src = url;
                audioPlayer.play();
                updatePlayButtonIcon(this, "fas fa-pause");
                currentPlayingButton = this;
            } else {
                audioPlayer.pause();
                updatePlayButtonIcon(this, "fas fa-play");
                currentPlayingButton = null;
            }
        });
    });

    audioPlayer.addEventListener('ended', function() {
        if (currentPlayingButton) {
            updatePlayButtonIcon(currentPlayingButton, "fas fa-play");
            currentPlayingButton = null;
        }
    });
}

function setupProgressBar() {
    const audioPlayer = document.getElementById("audio-player");
    const progressBar = document.getElementById("song-progress");
    audioPlayer.addEventListener('timeupdate', function() {
        const percentage = (this.currentTime / this.duration) * 100;
        progressBar.value = percentage;
    });

    audioPlayer.addEventListener('loadeddata', function() {
        progressBar.max = audioPlayer.duration;
    });
}

function updatePlayButtonIcon(button, iconClass) {
    button.querySelector("i").className = iconClass;
}
function selectRandomSong(songs) {
    const randomIndex = Math.floor(Math.random() * songs.length);
    return songs[randomIndex];
}

function updateNowPlaying(song) {
    const nowPlayingAlbumArt = document.getElementById("now-playing-album-art");
    const nowPlayingSongTitle = document.getElementById("now-playing-song-title");
    const nowPlayingSongArtist = document.getElementById("now-playing-song-artist");
    const featuredPlayPauseButton = document.getElementById("featured-play-pause-button");

    // Use coverArt if available, otherwise use a default placeholder image
    const albumArtSrc = song.coverArt || 'https://via.placeholder.com/500';

    nowPlayingAlbumArt.src = albumArtSrc;
    nowPlayingSongTitle.textContent = song.songTitle;
    nowPlayingSongArtist.textContent = song.artist;

    // Set up the play/pause button for the featured song
    featuredPlayPauseButton.dataset.url = song.mp3url;
    featuredPlayPauseButton.dataset.artist = song.artist;
    featuredPlayPauseButton.dataset.title = song.songTitle;
    featuredPlayPauseButton.dataset.albumArt = albumArtSrc;

    // Ensure the button has the correct icon (play or pause) based on the audio player's state
    const audioPlayer = document.getElementById("audio-player");
    if (audioPlayer.src === song.mp3url && !audioPlayer.paused) {
        updatePlayButtonIcon(featuredPlayPauseButton, "fas fa-pause");
    } else {
        updatePlayButtonIcon(featuredPlayPauseButton, "fas fa-play");
    }

    // Add click event listener to toggle play/pause
    featuredPlayPauseButton.onclick = function() {
        const url = this.dataset.url;
        const artist = this.dataset.artist;
        const title = this.dataset.title;
        const albumArt = this.dataset.albumArt;

        if (currentPlayingButton && currentPlayingButton !== this) {
            updatePlayButtonIcon(currentPlayingButton, "fas fa-play");
        }

        nowPlayingAlbumArt.src = albumArt;
        nowPlayingSongTitle.textContent = title;
        nowPlayingSongArtist.textContent = artist;

        // Update the bottom display with the current song's artist and title
        const songInfoDisplay = document.getElementById("song-info");
        songInfoDisplay.textContent = `${artist} - ${title}`;

        if (audioPlayer.src !== url || audioPlayer.paused) {
            audioPlayer.src = url;
            audioPlayer.play();
            updatePlayButtonIcon(this, "fas fa-pause");
            currentPlayingButton = this;
        } else {
            audioPlayer.pause();
            updatePlayButtonIcon(this, "fas fa-play");
            currentPlayingButton = null;
        }
    };
}