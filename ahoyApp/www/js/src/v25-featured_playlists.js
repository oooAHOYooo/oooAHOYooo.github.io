document.addEventListener('DOMContentLoaded', function() {
  fetch('../data/featured-playlist.json')
    .then(response => response.json())
    .then(data => {
      const sidebarRight = document.getElementById('sidebar-right');
      sidebarRight.innerHTML = ''; // Clear existing content

      // Create and append the header
      const headerDiv = document.createElement('div');
      headerDiv.className = 'sidebar-header';
      const header = document.createElement('h3');
      header.textContent = 'Featured Playlists';
      headerDiv.appendChild(header);
      sidebarRight.appendChild(headerDiv);

      // Create and append each playlist section
      data.playlists.forEach(playlist => {
        const section = document.createElement('div');
        section.className = 'playlist-section';

        const genreHeader = document.createElement('h3');
        genreHeader.textContent = playlist.genre;
        section.appendChild(genreHeader);

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

  // Add toggle feature
  document.getElementById('sidebarCollapse').addEventListener('click', toggleSidebar);
});

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var toggleIcon = document.getElementById('sidebarCollapse').children[0]; // Get the <i> element

    sidebar.classList.toggle('active');

    // Check if the sidebar is active to determine which icon to display
    if (sidebar.classList.contains('active')) {
        toggleIcon.classList.remove('fa-bars');
        toggleIcon.classList.add('fa-times');
    } else {
        toggleIcon.classList.remove('fa-times');
        toggleIcon.classList.add('fa-bars');
    }
}