document.addEventListener('DOMContentLoaded', function () {
    function playMedia(videoUrl) {
        const playerContainer = document.getElementById('jw-player-container');
        if (playerContainer) {
            playerContainer.innerHTML = ''; // Clear any existing player
            const script = document.createElement('script');
            script.src = `https://cdn.jwplayer.com/players/${videoUrl}-9Gtk2B1J.js`;
            playerContainer.appendChild(script);
        }
    }

    fetch('data/mediaCollection.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#mediaTable tbody');

            data.forEach(item => {
                const row = document.createElement('tr');

                // Thumbnail Cell
                const thumbnailCell = document.createElement('td');
                const thumbnail = document.createElement('img');
                thumbnail.src = item.thumbnail_link;
                thumbnail.alt = item.display_title;
                thumbnail.style.width = '50px';
                thumbnailCell.appendChild(thumbnail);
                row.appendChild(thumbnailCell);

                // Title Cell
                const titleCell = document.createElement('td');
                titleCell.textContent = item.display_title;
                titleCell.classList.add('media-title');
                row.appendChild(titleCell);

                // Play Button Cell
                const playButtonCell = document.createElement('td');
                const playButton = document.createElement('button');
                playButton.textContent = '▶';
                playButton.classList.add('compact-play-button');
                playButton.onclick = function() { playMedia(item.video_url); };
                playButtonCell.appendChild(playButton);
                row.appendChild(playButtonCell);

                // Artist Cell
                const artistCell = document.createElement('td');
                artistCell.textContent = item.artist;
                row.appendChild(artistCell);

                // Duration Cell
                const durationCell = document.createElement('td');
                durationCell.textContent = item.duration;
                row.appendChild(durationCell);

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
});
