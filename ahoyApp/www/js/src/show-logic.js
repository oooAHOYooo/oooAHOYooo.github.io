document.addEventListener('DOMContentLoaded', function () {
  fetch('./data/artistCollection.json')
    .then(response => response.json())
    .then(data => {
      const artistsWithShows = data.artists.filter(artist => artist.showDates.length > 0);
      populateShowsTable(artistsWithShows);
    })
    .catch(error => console.error('Error loading artist shows:', error));
});

function populateShowsTable(artists) {
  const table = document.getElementById('shows-table');
  artists.forEach(artist => {
    const row = table.insertRow();
    const nameCell = row.insertCell();
    nameCell.textContent = artist.name;
    const locationCell = row.insertCell();
    locationCell.textContent = artist.location;
    const datesCell = row.insertCell();
    datesCell.textContent = artist.showDates.join(', ');
  });
}