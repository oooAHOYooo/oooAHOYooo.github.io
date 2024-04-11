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
    // Map tags to tab IDs
    const tagToTabId = {
        'pop': '#songs-tab', // Assuming 'pop' songs go under the general 'songs-tab'
        'rock': '#songs-tab', // Assuming 'rock' songs also go under 'songs-tab'
        'jazz': '#songs-tab', // Assuming 'jazz' songs also go under 'songs-tab'
        'classical': '#songs-tab', // Assuming 'classical' songs also go under 'songs-tab'
        'new song': '#songs-tab', // Direct 'new song' tag to 'songs-tab'
        'podcast': '#podcasts-tab', // Direct 'podcast' tag to 'podcasts-tab'
        'media': '#media-tab-a' // Direct 'media' tag to 'media-tab-a'
        // Add more mappings as necessary
    };

    // Default tab if the tag is not found
    const defaultTab = '#home-tab';

    // Find the tab ID based on the tag or fallback to default
    const tabId = tagToTabId[tag] || defaultTab;

    // Navigate to the tab
    navigateToTab(tabId.substring(1)); // Remove '#' for navigateToTab function
}

// Assuming navigateToTab function exists and works like this:
function navigateToTab(tabName) {
    // Logic to navigate to the specified tab by tabName
    // This is just a placeholder. Implement the actual logic based on your app's structure.
    console.log(`Navigating to tab: ${tabName}`);
}

// Call the function to populate now playing when the page loads
document.addEventListener('DOMContentLoaded', populateNowPlaying);
