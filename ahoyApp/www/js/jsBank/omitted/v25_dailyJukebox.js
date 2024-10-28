  // Load the song collection and set a random song as the now playing song
  async function loadRandomSong() {
    try {
      const response = await fetch('./data/songCollection.json');
      const data = await response.json();
      const songs = data.songs;
      if (songs.length > 0) {
        const randomIndex = Math.floor(Math.random() * songs.length);
        const randomSong = songs[randomIndex];
        setNowPlayingSong(randomSong);
      }
    } catch (error) {
      console.error('Failed to load song collection:', error);
    }
  }

  function setNowPlayingSong(song) {
    const albumArtElement = document.getElementById('now-playing-album-art');
    const playButton = document.getElementById('recently-added-homepage-song');
    const songTitleElement = document.getElementById('now-playing-song-title'); // Assuming this is the ID for the song title element
    const songArtistElement = document.getElementById('now-playing-song-artist'); // Assuming this is the ID for the artist name element

    albumArtElement.src = song.coverArt;
    albumArtElement.alt = `Album art for ${song.songTitle} by ${song.artist}`;

    // Update song title and artist name
    songTitleElement.textContent = song.songTitle;
    songArtistElement.textContent = song.artist;

    // Update the onclick function for the play button to play the selected song
    playButton.onclick = function() {
      togglePlayPause(song.mp3url, song.songTitle, song.artist);
    };
  }

  // Call loadRandomSong when the document is fully loaded
  document.addEventListener('DOMContentLoaded', loadRandomSong);
