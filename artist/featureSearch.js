window.onload = function() {
  let artists = [];

  fetch('artistData.json')
      .then(response => response.json())
      .then(data => {
          artists = data.artists;
          updateGrid(artists);
      })
      .catch(error => console.error('Error:', error));

  let searchInput = document.querySelector('.search-input');
  searchInput.addEventListener('input', function() {
      let searchTerm = this.value;
      let filteredArtists = artists.filter(artist => artist.name.toLowerCase().includes(searchTerm.toLowerCase()));
      updateGrid(filteredArtists);
  });

  function updateGrid(artists) {
      const gridContainer = document.getElementById('grid-container');
      gridContainer.innerHTML = '';
      artists.forEach(artist => {
          const gridItem = document.createElement('div');
          gridItem.className = 'grid-item';

          const artistLink = document.createElement('a');
          artistLink.href = artist.artistUrl;
          artistLink.innerHTML = artist.name;
          gridItem.appendChild(artistLink);

          gridItem.onclick = function() {
              window.location.href = artist.artistUrl;
          };

          gridContainer.appendChild(gridItem);
      });
  }
};