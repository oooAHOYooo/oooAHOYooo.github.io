// Function to load and display podcasts from podcastCollection.json
function loadPodcasts() {
  fetch("data/podcastCollection.json")
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("podcast-table").querySelector("tbody");

      data.podcasts.forEach((podcast, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><button class="control-button" onclick="playPodcast('${podcast.mp3url}', '${podcast.thumbnail}', '${podcast.title}', '${podcast.description}')"><i class="fas fa-play"></i></button></td>
          <td><img src="${podcast.thumbnail}" alt="${podcast.title}" class="thumbnail"></td>
          <td>${podcast.title}</td>
          <td>${podcast.description}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error("Error loading podcasts:", error));
}

// Function to play the selected podcast and update the UI accordingly
function playPodcast(url, thumbnail, title, description) {
  const audioPlayer = document.getElementById("audio-player");
  const featuredImageContainer = document.getElementById("podcast-featured-image-container");
  const songTitle = document.getElementById("current-song-title");
  const songArtist = document.getElementById("current-song-artist");

  // Update the audio source and play
  audioPlayer.src = url;
  audioPlayer.play();

  // Update the featured image
  featuredImageContainer.innerHTML = `<img src="${thumbnail}" alt="${title}" class="the-featured-podcast-image">`;

  // Update song title and artist (description in this case)
  songTitle.textContent = title;
  songArtist.textContent = description; // Assuming you want to show the description as the artist
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("podcast-table")) {
    loadPodcasts();
  }
});