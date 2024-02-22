 // Function to load artist data and populate the table
 function loadArtistData() {
    fetch('./data/artistCollection.json')
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('artists-table').querySelector('tbody');
        data.artists.forEach(artist => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td><a href="${artist.artistUrl}" target="_blank">${artist.name}</a></td>
            <td>${artist.location}</td>
            <td>
              <a href="${artist.supportLink}" target="_blank">Support</a> | 
              <a href="${artist.shareLink}" target="_blank">Share</a> | 
              <a href="${artist.messageLink}" target="_blank">Message</a>
            </td>
          `;
          tableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Error loading artist data:', error));
  }

  // Call the function to load artist data when the document is ready
  document.addEventListener('DOMContentLoaded', loadArtistData);