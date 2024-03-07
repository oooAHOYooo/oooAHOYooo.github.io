// Function to load and display podcasts from podcastCollection.json
function loadPodcasts() {
  fetch("data/podcastCollection.json")
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("podcast-table").querySelector("tbody");

      data.podcasts.forEach((podcast, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><button class="control-button" id="podcast-play-${index}" onclick="togglePlayPausePodcast('${podcast.mp3url}', '${podcast.thumbnail}', '${podcast.title}', '${podcast.description}', ${index})"><i class="fas fa-play"></i></button></td>
          <td><img src="${podcast.thumbnail}" alt="${podcast.title}" class="thumbnail"></td>
          <td>${podcast.title}</td>
          <td>${podcast.description}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error("Error loading podcasts:", error));
}

// Function to toggle play/pause for the selected podcast and update the UI accordingly
function togglePlayPausePodcast(url, thumbnail, title, description, index) {
  const audioPlayer = document.getElementById("audio-player");
  const playPauseBtn = document.getElementById(`podcast-play-${index}`);
  const featuredImageContainer = document.getElementById("podcast-featured-image-container");
  const songTitle = document.getElementById("current-song-title");
  const songArtist = document.getElementById("current-song-artist");
  const songInfo = document.getElementById("song-info");

  // Check if the selected podcast is already playing
  if (audioPlayer.src === url && !audioPlayer.paused) {
    // Pause the podcast
    audioPlayer.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>'; // Change to play icon
  } else {
    // Play the selected podcast
    audioPlayer.src = url;
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>'; // Change to pause icon

    // Update the featured image
    featuredImageContainer.innerHTML = `<img src="${thumbnail}" alt="${title}" class="the-featured-podcast-image">`;

    // Update song title, artist (description in this case), and additional info
    songTitle.textContent = title;
    songArtist.textContent = description; // Assuming you want to show the description as the artist
    songInfo.textContent = `${title} - ${description}`; // Update the bottom song display with title and description
  }

  // Update play/pause icons for all podcasts
  document.querySelectorAll('.control-button').forEach((button, btnIndex) => {
    if (btnIndex !== index) {
      button.innerHTML = '<i class="fas fa-play"></i>'; // Reset other buttons to play icon
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("podcast-table")) {
    loadPodcasts();
  }
});