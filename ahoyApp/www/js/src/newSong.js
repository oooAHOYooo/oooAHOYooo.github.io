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
                                    <td><button class="play-button" data-url="${song.mp3url}" data-artist="${song.artist}" data-title="${song.songTitle}"><i class="fas fa-play"></i></button></td>
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

let currentPlayingButton = null; // Keep track of the currently playing button

function setupPlayButtons() {
    const audioPlayer = document.getElementById("audio-player");
    const playButtons = document.querySelectorAll(".play-button");
    const songInfoDisplay = document.getElementById("song-info");
    const songDisplay = document.querySelector(".song-display");

    // Initially hide the song display
    songDisplay.style.display = 'none';

    playButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const url = this.dataset.url;
            const artist = this.dataset.artist;
            const title = this.dataset.title;

            // Check if another song is playing, if so, stop it and reset its icon
            if (currentPlayingButton && currentPlayingButton !== this) {
                updatePlayButtonIcon(currentPlayingButton, "fas fa-play");
            }

            songInfoDisplay.textContent = `${artist} - ${title}`;
            songDisplay.style.display = 'flex'; // Show the song display

            if (audioPlayer.src !== url || audioPlayer.paused) {
                audioPlayer.src = url;
                audioPlayer.play();
                updatePlayButtonIcon(this, "fas fa-pause");
                currentPlayingButton = this; // Update the currently playing button
            } else {
                audioPlayer.pause();
                updatePlayButtonIcon(this, "fas fa-play");
                currentPlayingButton = null; // Reset the currently playing button
            }
        });
    });

    audioPlayer.addEventListener('ended', function() {
        songDisplay.style.display = 'none'; // Hide the song display when the song ends
        if (currentPlayingButton) {
            updatePlayButtonIcon(currentPlayingButton, "fas fa-play"); // Reset the play button icon
            currentPlayingButton = null; // Reset the currently playing button
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