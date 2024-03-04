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

function setupPlayButtons() {
    const audioPlayer = document.getElementById("audio-player");
    const playButtons = document.querySelectorAll(".play-button");
    const songInfoDisplay = document.getElementById("song-info"); // Element to display song info
    const songDisplay = document.querySelector(".song-display"); // Get the song display container

    // Initially hide the song display
    songDisplay.style.display = 'none';

    playButtons.forEach((button) => {
        button.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent triggering row click
            const url = this.dataset.url;
            const artist = this.dataset.artist;
            const title = this.dataset.title;

            // Update song info display
            songInfoDisplay.textContent = `${artist} - ${title}`;

            // Show the song display when a song is selected
            songDisplay.style.display = 'flex'; // Make sure to use 'flex' to keep the flexbox layout

            if (audioPlayer.src !== url) {
                audioPlayer.src = url;
            }
            if (audioPlayer.paused) {
                audioPlayer.play();
                updatePlayButtonIcon(this, "fas fa-pause");
            } else {
                audioPlayer.pause();
                updatePlayButtonIcon(this, "fas fa-play");
                // Optionally hide the song display when no song is playing
                // songDisplay.style.display = 'none';
            }
        });
    });

    // Optionally, listen to the audioPlayer's 'ended' event to hide the song display when the song finishes
    audioPlayer.addEventListener('ended', function() {
        songDisplay.style.display = 'none'; // Hide the song display when the song ends
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