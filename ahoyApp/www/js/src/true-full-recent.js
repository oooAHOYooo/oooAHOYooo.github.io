function displayRecentPodcasts() {
  fetch('data/podcastCollection.json')
    .then(response => response.json())
    .then(data => {
      const recentPodcasts = data.podcasts.slice(-20).reverse();
      const podcastList = document.querySelector('#full-recent-podcasts tbody');
      recentPodcasts.forEach((podcast, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><img src="${podcast.thumbnail}" alt="${podcast.title}" width="50" class="glitch-effect"></td>
          <td class="glitch-effect">${podcast.title}</td>
          <td>
            <button class="play-button" onclick="toggleAudio('podcast-${index}')">Play</button>
            <audio id="podcast-${index}" src="${podcast.mp3url}"></audio>
          </td>
        `;
        podcastList.appendChild(row);
      });
    });
}

function displayRecentSongs() {
  fetch('data/true-radioPlay.json')
    .then(response => response.json())
    .then(data => {
      const recentSongs = data.songs.slice(-20).reverse();
      const songList = document.querySelector('#full-recent-songs tbody');
      recentSongs.forEach((song, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><img src="${song.coverArt}" alt="${song.songTitle}" width="50" class="glitch-effect"></td>
          <td class="glitch-effect">${song.artist} - ${song.songTitle}</td>
          <td>
            <button class="play-button" onclick="toggleAudio('song-${index}')">Play</button>
            <audio id="song-${index}" src="${song.mp3url}"></audio>
          </td>
        `;
        songList.appendChild(row);
      });
    });
}

// Add this function to create a VCR-like flicker effect
function addVCREffect() {
  const player = document.getElementById('full-recent-player');
  setInterval(() => {
    player.style.opacity = Math.random() * 0.1 + 0.9;
  }, 100);
}

// Call this function after the content is loaded
window.addEventListener('load', () => {
  displayRecentPodcasts();
  displayRecentSongs();
  addVCREffect();
});