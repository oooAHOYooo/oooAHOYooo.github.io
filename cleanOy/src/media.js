   fetch('data/mediaCollection.json')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.querySelector('#mediaTable tbody');

                data.forEach(item => {
                    const row = document.createElement('tr');

                    const thumbnailCell = document.createElement('td');
                    const thumbnail = document.createElement('img');
                    thumbnail.src = item.thumbnail_link;
                    thumbnail.alt = item.display_title;
                    thumbnail.style.width = '50px'; // You can adjust the size as needed
                    thumbnailCell.appendChild(thumbnail);
                    row.appendChild(thumbnailCell);

                    const titleCell = document.createElement('td');
                    titleCell.textContent = item.display_title;
                    row.appendChild(titleCell);

                    const artistCell = document.createElement('td');
                    artistCell.textContent = item.artist;
                    row.appendChild(artistCell);

                    const durationCell = document.createElement('td');
                    durationCell.textContent = item.duration;
                    row.appendChild(durationCell);

                    tableBody.appendChild(row);
                });
            })
            .catch(error => console.error('Error:', error));