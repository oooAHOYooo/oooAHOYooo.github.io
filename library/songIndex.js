let currentSongIndex = 0;

// Function to change the song details
function changeSong(song) {
    document.getElementById('songTitle').innerText = song.songTitle;
    const audioPlayer = document.getElementById('audioPlayer');
    const mp3Source = document.getElementById('mp3Source');
    mp3Source.src = song.mp3url;
    audioPlayer.load();
}

// Function to play the next song
function playNextSong() {
    if (currentSongIndex < songs.length - 1) {
        currentSongIndex++;
        changeSong(songs[currentSongIndex]);
    } else {
        currentSongIndex = 0;
        changeSong(songs[currentSongIndex]);
    }
}
// Function to play the previous song
function playPreviousSong() {
    if (currentSongIndex > 0) {
        currentSongIndex--;
    } else {
        currentSongIndex = songs.length - 1;
    }
    changeSong(songs[currentSongIndex]);
}
// Initialize the player with the first song
window.addEventListener('load', () => {
    changeSong(songs[currentSongIndex]);

    // Add event listener for the "Next" button
    document.getElementById('nextButton').addEventListener('click', playNextSong);
    // Add event listener for the "Previous" button
    document.getElementById('previousButton').addEventListener('click', playPreviousSong);
});
