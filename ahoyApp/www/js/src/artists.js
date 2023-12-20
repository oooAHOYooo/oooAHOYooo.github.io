        function loadArtists() {
            fetch('data/artistCollection.json') // Changed from 'artistData.json' to 'artistCollection.json'
                .then(response => response.json())
                .then(data => {
                    const artists = data.artists;
                    const artistList = document.getElementById('artist-list');
                    artists.forEach(artist => {
                        const artistItem = document.createElement('li');
                        artistItem.className = 'list-item';
                        artistItem.innerHTML = `
                <div class="artist-item">
                    <div class="artist-info">
                        <strong><a href="${artist.artistUrl}">${artist.name}</a></strong><br>
                        Location: ${artist.location}<br>
                        <a href="${artist.supportLink}">Support</a> |
                        <a href="${artist.shareLink}">Share</a> |
                        <a href="${artist.messageLink}">Message</a>
                    </div>
                </div>
            `;
                        artistList.appendChild(artistItem);
                    });
                })
                .catch(error => console.error('Error:', error));
        }

        document.addEventListener('DOMContentLoaded', (event) => {
            loadArtists();
        });