window.onload = function() {
    fetch('artistData.json')
        .then(response => response.json())
        .then(data => {
            const gridContainer = document.getElementById('grid-container');
            data.artists.forEach(artist => {
                const gridItem = document.createElement('div');
                gridItem.className = 'grid-item';

                const artistLink = document.createElement('a');
                artistLink.href = artist.artistUrl;
                artistLink.innerHTML = artist.name;
                gridItem.appendChild(artistLink);

                // Set the onclick event of the div block to redirect to the artist's page
                gridItem.onclick = function() {
                    window.location.href = artist.artistUrl;
                };

                gridContainer.appendChild(gridItem);
            });
        })
        .catch(error => console.error('Error:', error));
};