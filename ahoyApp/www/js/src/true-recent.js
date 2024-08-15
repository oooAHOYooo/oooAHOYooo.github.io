// Function to get the latest items from the JSON data
function getLatestItems(jsonData, key, count = 5) {
  return jsonData[key]
    .sort((a, b) => b.id - a.id)
    .slice(0, count);
}

// Function to create the HTML for the recent items list
function createRecentItemsList(items, type) {
  const ul = document.createElement('ul');
  ul.className = `recent-${type} vcr-list`;
  
  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'vcr-item';
    li.textContent = type === 'songs' 
      ? `${item.artist} - ${item.songTitle}`
      : `${item.title}`;
    ul.appendChild(li);
  });
  
  return ul;
}

// Function to update the newsletter menu container
function updateNewsletterMenu(songsData, podcastsData) {
  const container = document.querySelector('.newsletter-menu-container');
  container.classList.add('vcr-container');
  const songCollection = container.querySelector('p:nth-child(1)');
  const podcastCollection = container.querySelector('p:nth-child(2)');
  
  const latestSongs = getLatestItems(songsData, 'songs');
  const latestPodcasts = getLatestItems(podcastsData, 'podcasts');
  
  const songsList = createRecentItemsList(latestSongs, 'songs');
  const podcastsList = createRecentItemsList(latestPodcasts, 'podcasts');
  
  // Insert the lists after their respective paragraphs
  songCollection.insertAdjacentElement('afterend', songsList);
  podcastCollection.insertAdjacentElement('afterend', podcastsList);
}

// Fetch both JSON files and update the menu
Promise.all([
  fetch('data/true-radioPlay.json').then(response => response.json()),
  fetch('data/podcastCollection.json').then(response => response.json())
])
  .then(([songsData, podcastsData]) => {
    updateNewsletterMenu(songsData, podcastsData);
  })
  .catch(error => console.error('Error fetching JSON:', error));