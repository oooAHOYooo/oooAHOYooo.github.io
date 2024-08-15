//█████████████████████████████████████████████████████████████████████████████
//██                                                                         ██
//██  VHS-STYLE RECENT ITEMS TRACKER                                         ██
//██  Model: JS-1985                                                         ██
//██  Serial: 0123456789                                                     ██
//██                                                                         ██
//█████████████████████████████████████████████████████████████████████████████

// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
// TRACK 1: REWIND AND PLAY LATEST ITEMS
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
function getLatestItems(jsonData, key, count = 5) {
  return jsonData[key]
    .sort((a, b) => b.id - a.id)
    .slice(0, count);
}

// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
// TRACK 2: RECORD NEW LIST ON TAPE
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
function createRecentItemsList(items, type) {
  const ul = document.createElement('ul');
  ul.className = `recent-${type}`;
  
  items.forEach(item => {
    const li = document.createElement('li');
    li.textContent = type === 'songs' 
      ? `${item.artist} - ${item.songTitle}`
      : `${item.title}`;
    li.addEventListener('click', () => playAudio(item.url));
    li.style.cursor = 'pointer';
    ul.appendChild(li);
  });
  
  return ul;
}

// New function to handle audio playback
function playAudio(url) {
  const audio = new Audio(url);
  audio.play();
}

// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
// TRACK 3: ADJUST TRACKING FOR CLEAR PICTURE
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
function updateNewsletterMenu(songsData, podcastsData) {
  const container = document.querySelector('.newsletter-menu-container');
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

// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
// TRACK 4: PRESS PLAY TO START RECORDING
// ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀
Promise.all([
  fetch('data/true-radioPlay.json').then(response => response.json()),
  fetch('data/podcastCollection.json').then(response => response.json())
])
  .then(([songsData, podcastsData]) => {
    updateNewsletterMenu(songsData, podcastsData);
  })
  .catch(error => console.error('Error fetching JSON:', error));

//█████████████████████████████████████████████████████████████████████████████
//██                                                                         ██
//██  END OF TAPE                                                            ██
//██                                                                         ██
//█████████████████████████████████████████████████████████████████████████████