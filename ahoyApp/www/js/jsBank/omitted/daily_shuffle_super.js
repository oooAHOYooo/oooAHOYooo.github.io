  // Function to shuffle an array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Function to load and display the daily shuffle super mix
  async function loadDailyShuffleSuperMix() {
    try {
      const response = await fetch('data/songCollection.json');
      const data = await response.json();
      const shuffledSongs = shuffleArray(data.songs);

      const listContainer = document.getElementById('daily-shuffle-super-mix');
      listContainer.innerHTML = ''; // Clear previous content
      const listElement = document.createElement('ul');
      listContainer.appendChild(listElement);

      shuffledSongs.forEach(song => {
        const listItem = document.createElement('li');
        listItem.textContent = `${song.artist} - ${song.songTitle}`;
        listElement.appendChild(listItem);
      });

    } catch (error) {
      console.error('Failed to load and display the daily shuffle super mix:', error);
    }
  }

  // Function to play the shuffled songs
  function playShuffle(songs) {
    const audioPlayer = document.getElementById('audio-player');
    const songDisplay = document.getElementById('song-display');
    let currentSongIndex = 0;

    function playSong(index) {
      const song = songs[index];
      audioPlayer.src = song.url; // Assuming each song object has a URL
      songDisplay.textContent = `${song.artist} - ${song.songTitle}`;
      audioPlayer.play();
      console.log(`Playing ${song.songTitle} by ${song.artist}`);
    }

    audioPlayer.onended = function() {
      currentSongIndex++;
      if (currentSongIndex < songs.length) {
        playSong(currentSongIndex);
      } else {
        console.log('Playlist ended');
      }
    };

    playSong(currentSongIndex);
  }

  // Call the function to load and display the daily shuffle super mix
  window.onload = () => {
    loadDailyShuffleSuperMix();
  };