// Fetch the changelog data from the JSON file
fetch('./local_data/changelog.json')
  .then(response => response.json())
  .then(changelogEntries => {
    const changelogContainer = document.getElementById('changelog-container');

    if (changelogContainer) {
      changelogEntries.forEach(entry => {
        const entryElement = document.createElement('div');
        entryElement.classList.add('changelog-entry');

        // Create date element
        const dateElement = document.createElement('div');
        dateElement.classList.add('changelog-date');
        dateElement.textContent = entry.date.toUpperCase();

        // Create description element
        const descriptionElement = document.createElement('div');
        descriptionElement.classList.add('changelog-description');
        descriptionElement.textContent = entry.description;

        // Create build element
        const buildElement = document.createElement('div');
        buildElement.classList.add('changelog-build');
        buildElement.textContent = `Present Build: ${entry.build.present}`;

        // Append date, description, and build to entry
        entryElement.appendChild(dateElement);
        entryElement.appendChild(descriptionElement);
        entryElement.appendChild(buildElement);

        // Append entry to container
        changelogContainer.appendChild(entryElement);
      });
    } else {
      console.error('Changelog container not found');
    }
  })
  .catch(error => console.error('Error fetching changelog:', error));