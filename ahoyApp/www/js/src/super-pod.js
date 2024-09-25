// Function to fetch podcast data and populate the table
async function populatePodcastTable() {
  try {
    // Fetch the podcast JSON file from the updated path
    const response = await fetch('data/podcastCollection.json'); // Updated URL
    const data = await response.json();

    // Sort all podcasts by ID in descending order
    data.podcasts.sort((a, b) => b.id - a.id);

    // Get the table body element
    const podcastTableBody = document.getElementById('podcastListBody');

    // Loop through each podcast in the JSON data
    data.podcasts.forEach(podcast => {
      // Create a new table row
      const row = document.createElement('tr');
      row.className = 'podcast-row'; // Add a class for styling hover

      // Create a cell for the thumbnail
      const thumbnailCell = document.createElement('td');
      const thumbnailImg = document.createElement('img');
      thumbnailImg.src = podcast.thumbnail;
      thumbnailImg.style.width = '100px'; // Set a fixed width for the image
      thumbnailCell.appendChild(thumbnailImg);
      row.appendChild(thumbnailCell);

      // Create the title cell with a paragraph tag
      const titleCell = document.createElement('td');
      titleCell.className = 'podcast-title-cell'; // Add a special class to the td
      const titleParagraph = document.createElement('p');
      titleParagraph.textContent = podcast.title;
      titleCell.appendChild(titleParagraph);
      row.appendChild(titleCell);

      // Create a cell for the play button
      const playButtonCell = document.createElement('td');
      const playButton = document.createElement('button');
      playButton.textContent = "Listen"; // Change button text from "Play" to "Listen"
      playButton.addEventListener('click', () => {
        playPodcast(podcast.mp3url, podcast.title, podcast.thumbnail);
        // Assuming there is a duration bar element with id 'podcastDurationBar'
        updateDurationBar(podcast.duration); // You need to define this function
      });
      playButtonCell.appendChild(playButton);
      row.appendChild(playButtonCell);

      // Append the row to the table body
      podcastTableBody.appendChild(row);
    });

    // Automatically play the latest episode
    if (data.podcasts.length > 0) {
      const latestPodcast = data.podcasts[0]; // First item after sorting by ID descending
      playPodcast(latestPodcast.mp3url, latestPodcast.title, latestPodcast.thumbnail);
      updateDurationBar(latestPodcast.duration);
    }
  } catch (error) {
    console.error('Error fetching or processing the podcast data:', error);
  }
}

// Function to play the selected podcast
function playPodcast(mp3url, title, thumbnail) {
  const audioPlayer = document.getElementById('audioPlayer');
  const podcastTitle = document.getElementById('podcast-title');
  const podcastThumbnail = document.getElementById('podcast-thumbnail');

  // Set the audio player source to the selected podcast's mp3 URL
  audioPlayer.src = mp3url;
  audioPlayer.play();

  // Update the UI with the selected podcast's details
  podcastTitle.textContent = title;
  podcastThumbnail.src = thumbnail;

  // Scroll to the top of the page
  window.scrollTo(0, 0);

  // Update duration bar functionality
  audioPlayer.onloadedmetadata = () => {
    document.getElementById('podcastDurationBar').max = audioPlayer.duration;
    document.getElementById('totalDuration').textContent = formatTime(audioPlayer.duration);
  };
  audioPlayer.ontimeupdate = () => {
    document.getElementById('podcastDurationBar').value = audioPlayer.currentTime;
    document.getElementById('currentTime').textContent = formatTime(audioPlayer.currentTime);
  };
}

// Helper function to format time in minutes and seconds
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Function to update the duration bar (you need to add this)
function updateDurationBar(duration) {
  const durationBar = document.getElementById('podcastDurationBar');
  if (durationBar) {
    durationBar.max = duration;
    durationBar.value = 0; // Reset bar to start
  }
}

// Function to skip forward in the podcast by a specified number of seconds
function skipForward(seconds) {
  const audioPlayer = document.getElementById('audioPlayer');
  if (audioPlayer) {
    audioPlayer.currentTime += seconds; // Increment the current time
  }
}

// Function to skip backward in the podcast by a specified number of seconds
function skipBackward(seconds) {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer) {
        audioPlayer.currentTime -= seconds; // Decrement the current time
    }
}

// Call the function to populate the table on page load
document.addEventListener('DOMContentLoaded', populatePodcastTable);
