  function searchSongs() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    const songListDiv = document.getElementById('songList');
    
    let filteredSongs = jsonData.songs.filter(song => {
        return song.name.toLowerCase().includes(searchQuery) || song.artist.toLowerCase().includes(searchQuery);
    });

    let html = '';
    filteredSongs.forEach(song => {
        html += `
            <div class="song-item">
                <h4 class="song-name">${song.name}</h4>
                <p class="song-artist">${song.artist}</p>
            </div>`;
    });

    songListDiv.innerHTML = html;
  }

  // Function to handle the keyup event on the search input
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      searchSongs();
    }
  }

  window.onload = function() {
    renderArtists();
    searchSongs(); // This will display all songs by default
  };
