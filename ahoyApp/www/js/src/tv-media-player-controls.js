  document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('./data/mediaCollection.json');
    const mediaCollection = await response.json();
    let currentIndex = 0;

    function populateMediaTable() {
      const table = document.getElementById('media-table');
      mediaCollection.forEach((media, index) => {
        const row = table.insertRow();
        const thumbnailCell = row.insertCell(0);
        const titleCell = row.insertCell(1);
        const playCell = row.insertCell(2);

        thumbnailCell.innerHTML = `<img src="${media.thumbnail_link}" alt="${media.display_title}" style="width:100px;">`;
        titleCell.textContent = media.display_title;
        playCell.innerHTML = `<button onclick="loadMedia(${index})">Play</button>`;
      });
    }

    function loadMedia(index) {
      const currentMedia = mediaCollection[index];
      jwplayer("jwplayer-container").setup({
        file: currentMedia.mp4_link,
        image: currentMedia.thumbnail_link,
        title: currentMedia.display_title,
        description: currentMedia.artist,
        width: "100%",
        aspectratio: "16:9"
      });
      document.getElementById('current-title-text').textContent = currentMedia.display_title;
      document.getElementById('current-description-text').textContent = currentMedia.artist;
    }

    document.getElementById('play-pause-button').addEventListener('click', () => {
      const player = jwplayer();
      if (player.getState() === 'playing') {
        player.pause();
        document.getElementById('play-pause-button').innerHTML = '<i class="fas fa-play"></i>';
      } else {
        player.play();
        document.getElementById('play-pause-button').innerHTML = '<i class="fas fa-pause"></i>';
      }
    });

    document.getElementById('rewind-button').addEventListener('click', () => {
      const player = jwplayer();
      player.seek(Math.max(player.getPosition() - 10, 0));
    });

    document.getElementById('fast-forward-button').addEventListener('click', () => {
      const player = jwplayer();
      player.seek(Math.min(player.getPosition() + 10, player.getDuration()));
    });

    document.getElementById('next-button').addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % mediaCollection.length;
      loadMedia(currentIndex);
    });

    document.getElementById('shuffle-button').addEventListener('click', () => {
      currentIndex = Math.floor(Math.random() * mediaCollection.length);
      loadMedia(currentIndex);
    });

    document.getElementById('fullscreen-button').addEventListener('click', () => {
      jwplayer().setFullscreen(true);
    });

    document.getElementById('volume-up').addEventListener('click', () => {
      const currentVolume = jwplayer().getVolume();
      jwplayer().setVolume(Math.min(currentVolume + 10, 100));
    });

    document.getElementById('volume-down').addEventListener('click', () => {
      const currentVolume = jwplayer().getVolume();
      jwplayer().setVolume(Math.max(currentVolume - 10, 0));
    });

    document.getElementById('mute-button').addEventListener('click', () => {
      const player = jwplayer();
      if (player.getMute()) {
        player.setMute(false);
        document.getElementById('mute-button').innerHTML = '<i class="fas fa-volume-mute"></i>';
      } else {
        player.setMute(true);
        document.getElementById('mute-button').innerHTML = '<i class="fas fa-volume-up"></i>';
      }
    });

    // Populate the table when the document is ready
    populateMediaTable();

    // Load the first media item initially
    loadMedia(currentIndex);
  });
