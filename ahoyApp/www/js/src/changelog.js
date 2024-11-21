// Fetch the changelog data from the JSON file
fetch('./local_data/changelog.json')
  .then(response => response.json())
  .then(changelogEntries => {
    const changelogContainer = document.getElementById('changelog-container');

    if (changelogContainer) {
      changelogEntries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('changelog-entry');
        entryElement.innerHTML = `<strong>${entry.date}:</strong> ${entry.description}`;
        changelogContainer.appendChild(entryElement);
      });
    } else {
      console.error('Changelog container not found');
    }
  })
  .catch(error => console.error('Error fetching changelog:', error));