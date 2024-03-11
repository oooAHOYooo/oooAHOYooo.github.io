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
                                        <th>Burn</th> <!-- Added Burn column -->
                                    </tr>
                                </thead>
                                <tbody>`;
            data.songs.forEach((song) => {
                htmlContent += `<tr>
                                    <td><button class="play-button" data-url="${song.mp3url}" data-artist="${song.artist}" data-title="${song.songTitle}"><i class="fas fa-play"></i></button></td>
                                    <td class="song-artist">${song.artist}</td>
                                    <td class="song-title">${song.songTitle}</td>
                                    <td><button class="burn-button" data-song-id="${song.id}"><i class="fas fa-fire"></i></button></td> <!-- Added Burn button -->
                                </tr>`;
            });
            htmlContent += `</tbody></table>`;
            songList.innerHTML = htmlContent;

            setupPlayButtons();
            setupProgressBar();
            setupBurnButtons(data); // Setup burn buttons
        });
});

let currentPlayingButton = null; // Keep track of the currently playing button

function setupPlayButtons() {
    const audioPlayer = document.getElementById("audio-player");
    const playButtons = document.querySelectorAll(".play-button");
    const songInfoDisplay = document.getElementById("song-info");
    const songDisplay = document.querySelector(".song-display");

    songDisplay.style.display = 'none'; // Initially hide the song display

    playButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const url = this.dataset.url;
            const artist = this.dataset.artist;
            const title = this.dataset.title;

            if (currentPlayingButton && currentPlayingButton !== this) {
                updatePlayButtonIcon(currentPlayingButton, "fas fa-play");
            }

            songInfoDisplay.textContent = `${artist} - ${title}`;
            songDisplay.style.display = 'flex'; // Show the song display

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
        songDisplay.style.display = 'none';
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

function setupBurnButtons(data) {
    document.querySelectorAll('.burn-button').forEach(button => {
        button.addEventListener('click', function() {
            const songId = this.getAttribute('data-song-id');
            const song = data.songs.find(s => s.id == songId);
            addToBurnList(song);
        });
    });
}

function addToBurnList(song) {
    const burnList = document.getElementById('burn-list');
    const item = document.createElement('div');
    item.textContent = `${song.artist} - ${song.songTitle}`;
    burnList.appendChild(item);
}