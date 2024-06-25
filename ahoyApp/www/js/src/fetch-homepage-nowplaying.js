// Fetch the now playing data from the JSON file and dynamically create the HTML elements
function populateNowPlaying() {
    fetch('./data/nowPlaying.json')
      .then(response => response.json())
      .then(data => {
        const nowPlayingContainer = document.getElementById('now-playing-container');
        nowPlayingContainer.innerHTML = ''; // Clear existing content

        // Sort the nowPlaying array by id in descending order
        data.nowPlaying.sort((a, b) => parseInt(b.id) - parseInt(a.id));

        data.nowPlaying.forEach(item => {
          const songInfoDiv = document.createElement('div');
          songInfoDiv.className = 'song-info';
          songInfoDiv.id = item.id;

          // Create a container for the album art
          const albumArtContainer = document.createElement('div');
          albumArtContainer.className = 'album-art-container';
          albumArtContainer.style.position = 'relative';
          albumArtContainer.style.width = '100vw';
          albumArtContainer.style.height = '56.25vw'; // 16:9 Aspect Ratio

          // Blurry background image
          const albumArtBlur = document.createElement('img');
          albumArtBlur.className = 'album-art-blur';
          albumArtBlur.src = item.albumArt;
          albumArtBlur.alt = 'Blurred Album Art';
          albumArtBlur.style.width = '100%';
          albumArtBlur.style.height = '100%';
          albumArtBlur.style.objectFit = 'cover';
          albumArtBlur.style.filter = 'blur(8px)';

          // Clear top image
          const albumArtImg = document.createElement('img');
          albumArtImg.id = `album-art-${item.id}`;
          albumArtImg.src = item.albumArt;
          albumArtImg.alt = 'Album Art';
          albumArtImg.style.width = '50vw'; // Set width to 50% of the viewport width
          albumArtImg.style.height = '50vw'; // Set height equal to the width to maintain a square aspect ratio
          albumArtImg.style.objectFit = 'cover';
          albumArtImg.style.position = 'absolute';
          albumArtImg.style.top = '50%';
          albumArtImg.style.left = '50%';
          albumArtImg.style.transform = 'translate(-50%, -50%)';
          albumArtImg.style.cursor = 'pointer'; // Change cursor to pointer to indicate clickable link
          albumArtImg.onclick = function() { navigateToTag(item.tag); };

          albumArtContainer.appendChild(albumArtBlur);
          albumArtContainer.appendChild(albumArtImg);

          const songTitleH2 = document.createElement('h2');
          songTitleH2.id = 'current-song-title';
          songTitleH2.textContent = `"${item.songTitle}"`;
          songTitleH2.style.marginTop = '20px'; // Add more space
          songTitleH2.style.lineHeight = '1.5'; // Increase line height for better readability
          songTitleH2.style.fontSize = '1.2rem'; // Responsive font size

          const artistH3 = document.createElement('h3');
          artistH3.id = 'current-song-artist';
          artistH3.textContent = item.artist;
          artistH3.style.lineHeight = '1.5'; // Consistent line height with title
          artistH3.style.fontSize = '1rem'; // Slightly smaller font size for artist

          songInfoDiv.appendChild(albumArtContainer);
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
