document.addEventListener('DOMContentLoaded', function() {
  let currentSongIndex = -1; // Track the current song index
  let playlistSongs = []; // This will hold the songs of the current playlist

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

    // Create table
    const table = document.createElement('table');
    table.className = 'styled-table';
    table.innerHTML = `
      <thead>
        <tr>
          <th>Album Art</th>
          <th>Title</th>
          <th>Artist</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    `;
    songList.appendChild(table);
    const tbody = table.querySelector('tbody');

    playlist.songs.forEach((song, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td><img src="${song.coverArt}" alt="Album Art" style="width: 50px; height: 50px;"></td>
        <td>${song.title}</td>
        <td>${song.artist}</td>
        <td><button id="play-btn-${index}" class="play-btn"><i class="fas fa-play"></i></button></td>
      `;
      tbody.appendChild(row);

      // Add event listener to play button
      document.getElementById(`play-btn-${index}`).addEventListener('click', () => {
        togglePlayPauseSong(index, playlist.songs);
      });
    });

    // Add play all button
    const playAllButton = document.createElement('button');
    playAllButton.textContent = 'Play All';
    playAllButton.addEventListener('click', () => {
      playPlaylist(playlist.songs, playlist.name);
    });
    songList.appendChild(playAllButton);

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
    if (audioPlayer.src !== song.mp3url || audioPlayer.paused) {
      audioPlayer.src = song.mp3url;
      audioPlayer.play();
      currentIcon.className = 'fas fa-pause';
    } else {
      audioPlayer.pause();
      currentIcon.className = 'fas fa-play';
    }

    // Update the current song index
    currentSongIndex = index;

    // Update the currently playing text
    const currentPlaying = document.getElementById('thisOne');
    currentPlaying.innerHTML = `
      <button id="current-pause-btn" style="font-size: 0.8em; margin-right: 5px;"><i class="fas ${audioPlayer.paused ? 'fa-play' : 'fa-pause'}"></i></button>
      <span>${song.title} - ${song.artist}</span>
    `;

    // Add event listener to the div to toggle play/pause
    currentPlaying.onclick = function() {
      togglePlayPauseSong(index, songs);
    };

    // Update the currently playing text in the sidebar
    const sidebarCurrentTrack = document.getElementById('current-track');
    sidebarCurrentTrack.innerHTML = `${song.title} - ${song.artist}`;
  }

  function playPlaylist(songs, playlistName) {
    playlistSongs = songs;
    currentSongIndex = 0;
    playNextSong();

    // Update the "Now Playing" section
    const nowPlaying = document.getElementById('thisOne');
    nowPlaying.innerHTML = `
      <button id="current-pause-btn" style="font-size: 0.8em; margin-right: 5px;"><i class="fas fa-pause"></i></button>
      <span>Playing Playlist: ${playlistName}</span>
    `;

    // Add event listener to the pause button
    document.getElementById('current-pause-btn').onclick = function() {
      const audioPlayer = document.getElementById('audio-player');
      if (audioPlayer.paused) {
        audioPlayer.play();
        this.querySelector('i').className = 'fas fa-pause';
      } else {
        audioPlayer.pause();
        this.querySelector('i').className = 'fas fa-play';
      }
    };
  }

  function playNextSong() {
    if (currentSongIndex < playlistSongs.length) {
      const song = playlistSongs[currentSongIndex];
      const audioPlayer = document.getElementById('audio-player');
      audioPlayer.src = song.mp3url;
      audioPlayer.play();
      currentSongIndex++;
      audioPlayer.onended = playNextSong;
    }
  }
});
