      document.addEventListener('DOMContentLoaded', async () => {
        const { data, error } = await supabase
          .from('songs')
          .select('*');

        if (error) {
          console.error('Error fetching songs:', error);
          return;
        }

        // Assuming you have a container with the id 'song-list' where you want to display the songs
        const songListContainer = document.getElementById('song-list');

        // Clear existing content
        songListContainer.innerHTML = '';

        // Create and append songs to the container
        data.forEach(song => {
          const songElement = document.createElement('div');
          songElement.classList.add('song');
          songElement.innerHTML = `
      <div class="song-thumbnail">
        <img src="${song.thumbnail_url}" alt="${song.songTitle}">
      </div>
      <div class="song-details">
        <h3>${song.songTitle}</h3>
        <p>Artist: ${song.artist}</p>
        <p><a href="${song.artistUrl}" target="_blank">Artist Page</a></p>
        <p><a href="${song.mp3url}" target="_blank">Listen</a></p>
        <p>Duration: ${song.duration}</p>
        ${song.available_for_purchase ? `<a href="${song.buy_url}" class="buy-song" target="_blank">Buy</a>` : ''}
      </div>
    `;
          songListContainer.appendChild(songElement);
        });
      });