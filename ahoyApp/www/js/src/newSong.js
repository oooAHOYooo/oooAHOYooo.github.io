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
                                    <td><button class="play-button" data-url="${song.mp3url}" data-artist="${song.artist}" data-title="${song.songTitle}" data-album-art="${song.albumArt}"><i class="fas fa-play"></i></button></td>
                                    <td class="song-artist">${song.artist}</td>
                                    <td class="song-title">${song.songTitle}</td>
                                    <td><button class="burn-button" data-song-id="${song.id}"><i class="fas fa-fire"></i></button></td>
                                </tr>`;
            });
            htmlContent += `</tbody></table>`;
            songList.innerHTML = htmlContent;

            setupPlayButtons();
            setupProgressBar();
            // Assuming setupBurnButtons function exists and is relevant
            // setupBurnButtons(data);
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
            const albumArt = this.dataset.albumArt;

            if (currentPlayingButton && currentPlayingButton !== this) {
                updatePlayButtonIcon(currentPlayingButton, "fas fa-play");
            }

            nowPlayingAlbumArt.src = albumArt;
            nowPlayingSongTitle.textContent = title;
            nowPlayingSongArtist.textContent = artist;

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
