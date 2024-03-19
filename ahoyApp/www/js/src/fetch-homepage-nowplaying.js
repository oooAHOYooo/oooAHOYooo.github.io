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

          const playButton = document.createElement('button');
          playButton.id = 'recently-added-homepage-song';
          playButton.className = 'control-button';
          playButton.innerHTML = '<i class="fas fa-play"></i>';
          // Fetch and set the correct MP3 URL for the play button
          getMp3Url(item).then(mp3Url => {
            playButton.onclick = function() { loadAndPlaySong(mp3Url); };
          });

          songInfoDiv.appendChild(albumArtImg);
          songInfoDiv.appendChild(songTitleH2);
          songInfoDiv.appendChild(artistH3);
          songInfoDiv.appendChild(playButton);

          nowPlayingContainer.appendChild(songInfoDiv);
        });
      })
      .catch(error => console.error('Error loading now playing data:', error));
}

// Function to fetch the correct MP3 URL based on the item's tag
async function getMp3Url(item) {
  let collectionUrl = item.tag === 'podcast' ? './data/podcastCollection.json' : './data/songCollection.json';
  let response = await fetch(collectionUrl);
  let data = await response.json();
  let collection = item.tag === 'podcast' ? data.podcasts : data.songs;
  let foundItem = collection.find(collectionItem => collectionItem.id.toString() === item.id);
  return foundItem ? foundItem.mp3url : null;
}

// Existing navigateToTag and loadAndPlaySong functions remain unchanged

// Call the function to populate now playing when the page loads
document.addEventListener('DOMContentLoaded', populateNowPlaying);