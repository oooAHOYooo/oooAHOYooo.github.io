function displayRecentPodcasts() {
  fetch('data/podcastCollection.json')
    .then(response => response.json())
    .then(data => {
      const recentPodcasts = data.podcasts.slice(-20).reverse();
      const podcastList = document.querySelector('#full-recent-podcasts tbody');
      recentPodcasts.forEach((podcast, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><img src="${podcast.thumbnail}" alt="${podcast.title}" width="50"></td>
          <td>${podcast.title}</td>
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
          <td><img src="${song.coverArt}" alt="${song.songTitle}" width="50"></td>
          <td>${song.artist} - ${song.songTitle}</td>
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