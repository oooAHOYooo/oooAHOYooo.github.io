  document.addEventListener('DOMContentLoaded', function() {
    const commitsList = document.getElementById('commits-list');
    let currentPage = 1; // Initialize current page to 1

    // Function to fetch commits and update the DOM
    function fetchCommits(page) {
      const url = `https://api.github.com/repos/oooAHOYooo/oooAHOYooo.github.io/commits?sha=main&per_page=250&page=${page}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          data.forEach(commit => {
            const listItem = document.createElement('li');
            listItem.textContent = `${commit.commit.author.name}: ${commit.commit.message}`;
            commitsList.appendChild(listItem);
          });

          // Check if there are more commits to load
          if (data.length === 250) {
            createLoadMoreButton();
          }
        })
        .catch(error => console.error('Error fetching commits:', error));
    }

    // Function to create and handle the Load More button
    function createLoadMoreButton() {
      let loadMoreBtn = document.getElementById('load-more-commits');
      if (!loadMoreBtn) {
        loadMoreBtn = document.createElement('button');
        loadMoreBtn.id = 'load-more-commits';
        loadMoreBtn.textContent = 'Load More';
        document.body.appendChild(loadMoreBtn);

        loadMoreBtn.addEventListener('click', () => {
          currentPage++;
          fetchCommits(currentPage);
          loadMoreBtn.remove(); // Remove the button after it's clicked
        });
      }
    }

    // Call the function to fetch initial commits
    fetchCommits(currentPage);
  });