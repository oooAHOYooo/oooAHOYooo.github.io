document.addEventListener('DOMContentLoaded', function() {
  fetch('../data/featured-playlist.json')
    .then(response => response.json())
    .then(data => {
      const sidebarRight = document.getElementById('sidebar-right');
      data.playlists.forEach(playlist => {
        const section = document.createElement('div');
        section.className = 'playlist-section';

        const header = document.createElement('h3');
        header.textContent = playlist.genre;
        section.appendChild(header);

        const ul = document.createElement('ul');
        playlist.songs.forEach(song => {
          const li = document.createElement('li');
          li.textContent = `${song.title} - ${song.artist}`;
          ul.appendChild(li);
        });
        section.appendChild(ul);

        sidebarRight.appendChild(section);
      });
    })
    .catch(error => console.error('Error fetching the playlists:', error));
});