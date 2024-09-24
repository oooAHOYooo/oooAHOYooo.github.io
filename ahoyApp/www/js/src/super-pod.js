// Function to fetch podcast data and populate the table
async function populatePodcastTable() {
  try {
    // Fetch the podcast JSON file from the updated path
    const response = await fetch('data/podcastCollection.json'); // Updated URL
    const data = await response.json();

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
      const titleParagraph = document.createElement('p');
      titleParagraph.textContent = podcast.title;
      titleCell.appendChild(titleParagraph);
      row.appendChild(titleCell);

      // Create a cell for the play button
      const playButtonCell = document.createElement('td');
      const playButton = document.createElement('button');
      playButton.textContent = "Play";
      playButton.addEventListener('click', () => {
        playPodcast(podcast.mp3url, podcast.title, podcast.thumbnail);
      });
      playButtonCell.appendChild(playButton);
      row.appendChild(playButtonCell);

      // Append the row to the table body
      podcastTableBody.appendChild(row);
    });
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
}

// Call the function to populate the table on page load
document.addEventListener('DOMContentLoaded', populatePodcastTable);
