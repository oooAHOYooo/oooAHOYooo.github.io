// Fetch the now playing data from the JSON file and dynamically create the HTML elements
function populateNowPlaying() {
    fetch('./data/nowPlaying.json')
      .then(response => response.json())
      .then(data => {
        const nowPlayingContainer = document.getElementById('now-playing-container');
        nowPlayingContainer.innerHTML = ''; // Clear existing content

        // Sort the nowPlaying array by dateAdded in descending order
        data.nowPlaying.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

        data.nowPlaying.forEach(item => {
          const songInfoDiv = document.createElement('div');
          songInfoDiv.className = 'song-info';
          songInfoDiv.id = item.id;

          const albumArtImg = document.createElement('img');
          albumArtImg.id = 'album-art';
          albumArtImg.src = item.albumArt;
          albumArtImg.alt = 'Album Art';
          // Add onclick event to navigate based on the tag
          albumArtImg.onclick = function() { navigateToTag(item.tag); };

          const songTitleH2 = document.createElement('h2');
          songTitleH2.id = 'current-song-title';
          songTitleH2.textContent = `"${item.songTitle}"`;

          const artistH3 = document.createElement('h3');
          artistH3.id = 'current-song-artist';
          artistH3.textContent = item.artist;

          // Removed play button logic

          songInfoDiv.appendChild(albumArtImg);
          songInfoDiv.appendChild(songTitleH2);
          songInfoDiv.appendChild(artistH3);

          nowPlayingContainer.appendChild(songInfoDiv);
        });
      })
      .catch(error => console.error('Error loading now playing data:', error));
}



// Implement navigateToTag function if not already done
function navigateToTag(tag) {
    // Assuming there are predefined tags that correspond to specific tabs in the UI
    switch(tag) {
      case 'pop':
        window.location.href = '#pop';
        break;
      case 'rock':
        window.location.href = '#rock';
        break;
      case 'jazz':
        window.location.href = '#jazz';
        break;
      case 'classical':
        window.location.href = '#classical';
        break;
      // Add more cases as needed for other music genres or tags
      default:
        console.log('Unknown tag:', tag);
        // Optionally, navigate to a default tab
        window.location.href = '#default';
        break;
    }
  }

// Call the function to populate now playing when the page loads
document.addEventListener('DOMContentLoaded', populateNowPlaying);