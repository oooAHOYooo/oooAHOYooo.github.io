document.addEventListener('DOMContentLoaded', function() {

  // Fetch and display playlists
  fetch('./data/featured-playlist.json')
    .then(response => response.json())
    .then(data => {
      const playlists = data.playlists;
      const playlistContainer = document.getElementById('sidedock-middle');
      playlists.forEach((playlist, index) => {
        const playlistItem = document.createElement('div');
        playlistItem.className = 'playlist-item';
        playlistItem.innerHTML = `<a href="#" data-index="${index}">${playlist.name}</a>`;
        playlistContainer.insertBefore(playlistItem, playlistContainer.lastElementChild);
      });

      // Add event listeners to playlist items
      document.querySelectorAll('.playlist-item a').forEach(item => {
        item.addEventListener('click', function(event) {
          event.preventDefault();
          const index = this.getAttribute('data-index');
          showPlaylistModal(playlists[index]);
        });
      });
    });

  // Modal functionality
  const modal = document.getElementById('add-songs-modal');
  const closeModal = document.querySelector('.modal .close');
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  function showPlaylistModal(playlist) {
    document.getElementById('modal-title').textContent = playlist.name;
    const songList = document.getElementById('song-list');
    songList.innerHTML = '';
    playlist.songs.forEach(song => {
      const songItem = document.createElement('li');
      songItem.textContent = `${song.title} by ${song.artist}`;
      songList.appendChild(songItem);
    });
    modal.style.display = 'block';
  }
});
