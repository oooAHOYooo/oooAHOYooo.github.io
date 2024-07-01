document.addEventListener('DOMContentLoaded', function() {
  let currentSongIndex = -1; // Track the current song index
  let currentPlaylist = []; // This will hold the current playlist songs

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

    // Create table for songs
    const table = document.createElement('table');
    table.className = 'song-table';
    const tbody = document.createElement('tbody');

    playlist.songs.forEach((song, index) => {
      const row = document.createElement('tr');
      const songCell = document.createElement('td');
      songCell.textContent = `${song.title} by ${song.artist}`;
      const playButtonCell = document.createElement('td');
      const playButton = document.createElement('button');
      playButton.innerHTML = '<i class="fas fa-play"></i>'; // Changed to icon
      playButton.id = `play-btn-${index}`; // Unique ID for each play button
      playButton.addEventListener('click', () => togglePlayPauseSong(index, playlist.songs));
      playButtonCell.appendChild(playButton);
      row.appendChild(songCell);
      row.appendChild(playButtonCell);
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    songList.appendChild(table);

    // Add Play All button
    const playAllButton = document.createElement('button');
    playAllButton.textContent = 'Play All';
    playAllButton.addEventListener('click', () => playAllSongs(playlist.songs));
    songList.appendChild(playAllButton);

    // Add options to add to playlist or burn to CD
    const addToPlaylistButton = document.createElement('button');
    addToPlaylistButton.textContent = 'Add to Playlist';
    addToPlaylistButton.addEventListener('click', () => addToPlaylist(playlist.songs));
    songList.appendChild(addToPlaylistButton);

    const burnToCDButton = document.createElement('button');
    burnToCDButton.textContent = 'Burn to CD';
    burnToCDButton.addEventListener('click', () => burnToCD(playlist.songs));
    songList.appendChild(burnToCDButton);

    modal.style.display = 'block';
  }

  function togglePlayPauseSong(index, songs) {
    const song = songs[index];
    const audioPlayer = document.getElementById('audio-player');
    const currentIcon = document.getElementById(`play-btn-${index}`).querySelector('i');

    // Pause any currently playing song and update the icon
    if (currentSongIndex !== -1 && currentSongIndex !== index && !audioPlayer.paused) {
      const currentPlayingIcon = document.getElementById(`play-btn-${currentSongIndex}`).querySelector('i');
      currentPlayingIcon.className = 'fas fa-play';
      audioPlayer.pause();
    }

    // Toggle play/pause for the selected song
    if (audioPlayer.src !== song.url || audioPlayer.paused) { // Use url from JSON
      audioPlayer.src = song.url; // Update to use url
      audioPlayer.play();
      currentIcon.className = 'fas fa-pause';
    } else {
      audioPlayer.pause();
      currentIcon.className = 'fas fa-play';
    }

    // Update the current song index
    currentSongIndex = index;

    // Update the currently playing text in the sidebar
    const sidebarCurrentTrack = document.getElementById('current-track');
    sidebarCurrentTrack.innerHTML = `${song.title} - ${song.artist}`;
  }

  function playAllSongs(songs) {
    let index = 0;
    const audioPlayer = document.getElementById('audio-player');

    function playNext() {
      if (index < songs.length) {
        audioPlayer.src = songs[index].url;
        audioPlayer.play();
        audioPlayer.onended = playNext;
        index++;
      }
    }
    playNext();
  }

  function addToPlaylist(songs) {
    // Implement functionality to add songs to user's playlist
    console.log('Adding to playlist:', songs);
  }

  function burnToCD(songs) {
    // Implement functionality to burn songs to CD
    console.log('Burning to CD:', songs);
  }
});

