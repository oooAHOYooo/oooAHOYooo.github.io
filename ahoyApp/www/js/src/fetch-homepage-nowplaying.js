// Fetch the now playing data from the JSON file and dynamically create the HTML elements
function populateNowPlaying() {
    fetch('./data/nowPlaying.json')
      .then(response => response.json())
      .then(data => {
        const nowPlayingContainer = document.getElementById('now-playing-container');
        nowPlayingContainer.innerHTML = ''; // Clear existing content
  
        data.nowPlaying.forEach(song => {
          const songInfoDiv = document.createElement('div');
          songInfoDiv.className = 'song-info';
          songInfoDiv.id = song.id;
  
          const albumArtImg = document.createElement('img');
          albumArtImg.id = 'album-art';
          albumArtImg.src = song.albumArt;
          albumArtImg.alt = 'Album Art';
  
          const songTitleH2 = document.createElement('h2');
          songTitleH2.id = 'current-song-title';
          songTitleH2.textContent = `"${song.songTitle}"`;
  
          const artistH3 = document.createElement('h3');
          artistH3.id = 'current-song-artist';
          artistH3.textContent = song.artist;
  
          const playButton = document.createElement('button');
          playButton.id = 'recently-added-homepage-song';
          playButton.className = 'control-button';
          playButton.innerHTML = '<i class="fas fa-play"></i>';
  
          songInfoDiv.appendChild(albumArtImg);
          songInfoDiv.appendChild(songTitleH2);
          songInfoDiv.appendChild(artistH3);
          songInfoDiv.appendChild(playButton);
  
          nowPlayingContainer.appendChild(songInfoDiv);
        });
      })
      .catch(error => console.error('Error loading now playing data:', error));
  }
  
  // Call the function to populate now playing when the page loads
  document.addEventListener('DOMContentLoaded', populateNowPlaying);