document.addEventListener("DOMContentLoaded", function () {
    const dailyShuffleList = document.getElementById("daily-shuffle-list");
    const audioPlayer = document.getElementById("audio-player");
    let currentSongIndex = 0;
    let shuffledSongs = [];

    function getDailySeed() {
        const today = new Date();
        const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
        return seed;
    }

    function seededShuffle(array, seed) {
        let currentIndex = array.length, temporaryValue, randomIndex;
        let random = () => {
            var x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };

        while (0 !== currentIndex) {
            randomIndex = Math.floor(random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    function shuffleSongs(songs) {
        const dailySeed = getDailySeed();
        return seededShuffle(songs, dailySeed);
    }

    function populateDailyShuffleList(songs) {
        let htmlContent = `<table class="song-table full-width-song-table daily-shuffle-table">
                            <thead>
                                <tr>
                                    <th style="text-align: right;">Artist</th>
                                    <th>Song</th>
                                </tr>
                            </thead>
                            <tbody>`;
        songs.forEach((song, index) => {
            htmlContent += `<tr style="pointer-events: none; cursor: default;">
            htmlContent += `<tr>
                                <td class="song-artist" style="text-align: right;">${song.artist}</td>
                                <td class="song-title">${song.songTitle}</td>
                            </tr>`;
        });
        htmlContent += `</tbody></table>`;
        dailyShuffleList.innerHTML = htmlContent;

        setupPlayButtons(); // Call this function after populating the list
    }

    function playSongAtIndex(index) {
        if (index < shuffledSongs.length) {
            const song = shuffledSongs[index];
            audioPlayer.src = song.mp3url;
            audioPlayer.play();
            currentSongIndex = index;
            // Update play button icon to pause for the current song
            updatePlayButtonIcon(document.querySelector(`.play-button[data-index="${index}"]`), "fas fa-pause");
        }
    }

    fetch("./data/songCollection.json")
        .then((response) => response.json())
        .then((data) => {
            shuffledSongs = shuffleSongs(data.songs).slice(0, 10); // Limit to 10 songs
            populateDailyShuffleList(shuffledSongs);
        });

    document.getElementById("play-daily-shuffle").addEventListener("click", function() {
        if (shuffledSongs.length > 0 && currentSongIndex < shuffledSongs.length) {
            playSongAtIndex(currentSongIndex); // Corrected to use the right function
        }
    });

    audioPlayer.addEventListener("ended", function() {
        currentSongIndex++;
        if (currentSongIndex < shuffledSongs.length) {
            playSongAtIndex(currentSongIndex);
        } else {
            currentSongIndex = 0; // Optionally loop the playlist
        }
    });

    // Expose playSongAtIndex globally to be accessible from the inline onclick handler
    window.playSongAtIndex = playSongAtIndex;
    window.updatePlayButtonIcon = updatePlayButtonIcon; // Assuming this function is global
});