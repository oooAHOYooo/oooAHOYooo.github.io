const commitsPerPage = 10; // Number of commits per page
let currentPage = 1;

// Function to fetch and display commits
function fetchCommits(page) {
  fetch(`https://api.github.com/repos/oooAHOYooo/oooAHOYooo.github.io/commits?per_page=${commitsPerPage}&page=${page}`)
    .then(response => response.json())
    .then(commits => {
      const changelogContainer = document.getElementById('changelog-container');
      changelogContainer.innerHTML = ''; // Clear previous entries

      if (changelogContainer) {
        commits.forEach(commit => {
          const entryElement = document.createElement('div');
          entryElement.classList.add('changelog-entry');

          // Create date element
          const dateElement = document.createElement('div');
          dateElement.classList.add('changelog-date');
          dateElement.textContent = new Date(commit.commit.author.date).toLocaleDateString();

          // Create description element
          const descriptionElement = document.createElement('div');
          descriptionElement.classList.add('changelog-description');
          descriptionElement.textContent = commit.commit.message;

          // Create author element
          const authorElement = document.createElement('div');
          authorElement.classList.add('changelog-author');
          authorElement.textContent = `Author: ${commit.commit.author.name}`;

          // Append date, description, and author to entry
          entryElement.appendChild(dateElement);
          entryElement.appendChild(descriptionElement);
          entryElement.appendChild(authorElement);

          // Append entry to container
          changelogContainer.appendChild(entryElement);
        });
      } else {
        console.error('Changelog container not found');
      }
    })
    .catch(error => console.error('Error fetching commits:', error));
}

// Function to handle pagination
function setupPagination() {
  const paginationContainer = document.getElementById('pagination-container');
  paginationContainer.innerHTML = ''; // Clear previous pagination

  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.disabled = currentPage === 1;
  prevButton.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      fetchCommits(currentPage);
    }
  };

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.onclick = () => {
    currentPage++;
    fetchCommits(currentPage);
  };

  paginationContainer.appendChild(prevButton);
  paginationContainer.appendChild(nextButton);
}

// Initial fetch and setup
fetchCommits(currentPage);
setupPagination();