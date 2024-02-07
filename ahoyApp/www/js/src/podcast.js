// This function loads podcast data and populates the table
function loadPodcasts() {
  fetch("data/podcastCollection.json")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document
        .getElementById("podcast-table")
        .querySelector("tbody");
      const featuredImageColumn = document
        .getElementById("featured-image-column");
      
      data.podcasts.forEach((podcast, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><button class="control-button" onclick="playPodcast('${podcast.mp3url}', '${podcast.title}', ${index})"><i class="fas fa-play"></i></button></td>
          <td><img src="${podcast.thumbnail}" alt="${podcast.title}" class="thumbnail" style="width: 62px; height: 62px;"></td>
          <td>${podcast.title}</td>
          <td>${podcast.description}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error loading podcasts:", error));
}

// This function plays the selected podcast and updates the featured image
function playPodcast(url, title, index) {
  const audioPlayer = document.getElementById("audio-player");
  audioPlayer.src = url;
  audioPlayer.play();

  // Update now playing information
  document.getElementById("song-title").textContent = title;
  document.getElementById("current-song-title").textContent = title;
  document.getElementById("current-song-artist").textContent = "Podcast";
  document.getElementById("artist-name").textContent = "Podcast";

  // Update the featured image
  fetch("data/podcastCollection.json")
    .then((response) => response.json())
    .then((data) => {
      const featuredImage = data.podcasts[index].thumbnail;
      const featuredImageElement = document.getElementById("featured-image");
      featuredImageElement.src = featuredImage;
    });
}

// Load podcasts when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("podcast-table")) {
    loadPodcasts();
  }
});