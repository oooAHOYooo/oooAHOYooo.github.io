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
                                    </tr>
                                </thead>
                                <tbody>`;
            data.songs.forEach((song) => {
                htmlContent += `<tr>
                                    <td><button class="play-button" data-url="${song.mp3url}"><i class="fas fa-play"></i></button></td>
                                    <td class="song-artist">${song.artist}</td>
                                    <td class="song-title">${song.songTitle}</td>
                                </tr>`;
            });
            htmlContent += `</tbody></table>`;
            songList.innerHTML = htmlContent;

            setupPlayButtons();
            setupProgressBar();
        });
});

function setupPlayButtons() {
    const audioPlayer = document.getElementById("audio-player");
    const playButtons = document.querySelectorAll(".play-button");
    playButtons.forEach((button) => {
        button.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent triggering row click
            const url = this.dataset.url;
            if (audioPlayer.src !== url) {
                audioPlayer.src = url;
            }
            if (audioPlayer.paused) {
                audioPlayer.play();
                updatePlayButtonIcon(this, "fas fa-pause");
            } else {
                audioPlayer.pause();
                updatePlayButtonIcon(this, "fas fa-play");
            }
        });
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