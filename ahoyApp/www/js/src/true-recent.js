// Function to fetch and display recently added content
function displayRecentlyAdded() {
  fetch('./data/true-recent.json')
    .then(response => response.json())
    .then(data => {
      const recentlyAddedContainer = document.getElementById('recently-added-container');
      if (!recentlyAddedContainer) {
        console.error('Recently added container not found');
        return;
      }
      recentlyAddedContainer.innerHTML = ''; // Clear existing content

      data.recentlyAdded.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'recently-added-item';
        
        // Format the date
        const date = new Date(item.dateAdded);
        const formattedDate = formatDate(date);
        
        itemElement.innerHTML = `
          <img src="${item.albumArt}" alt="${item.songTitle}" class="recently-added-image">
          <div class="recently-added-info">
            <h3>${item.songTitle}</h3>
            <p>${item.artist}</p>
            <p>Added: ${formattedDate}</p>
            <span class="tag ${item.tag.toLowerCase()}">${item.tag}</span>
          </div>
        `;
        recentlyAddedContainer.appendChild(itemElement);
      });
    })
    .catch(error => console.error('Error fetching recently added content:', error));
}

// Function to format the date
function formatDate(date) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', displayRecentlyAdded);

// Update the content when the news tab is shown
document.addEventListener('DOMContentLoaded', () => {
  const newsTab = document.getElementById('news-tab');
  if (newsTab) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
          if (newsTab.style.display === 'block') {
            displayRecentlyAdded();
          }
        }
      });
    });
    observer.observe(newsTab, { attributes: true });
  }
});