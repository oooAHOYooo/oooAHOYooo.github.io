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

        // Create a play button for each song
        const playButton = document.createElement('button');
        playButton.innerHTML = '<i class="fas fa-play"></i>'; // Use Font Awesome play icon
        playButton.className = 'play-daily-shuffle'; // Assign the video game-like button class
        playButton.onclick = function() {
          // Toggle play/pause icon
          if (playButton.innerHTML.includes('fa-play')) {
            playButton.innerHTML = '<i class="fas fa-pause"></i>'; // Change to pause icon
            console.log(`Playing ${song.songTitle} by ${song.artist}`);
          } else {
            playButton.innerHTML = '<i class="fas fa-play"></i>'; // Change back to play icon
            console.log(`Paused ${song.songTitle} by ${song.artist}`);
          }
        };

        listItem.appendChild(playButton); // Append the play button to the list item
        listElement.appendChild(listItem);
      });
    } catch (error) {
      console.error('Failed to load and display the daily shuffle super mix:', error);
    }
  }

  // Call the function to load and display the daily shuffle super mix
  window.onload = () => {
    loadDailyShuffleSuperMix();
  };