// This function loads podcast data and populates the table
function loadPodcasts() {
  fetch("data/podcastCollection.json")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document
        .getElementById("podcast-table")
        .querySelector("tbody");
      
      data.podcasts.forEach((podcast, index) => {
        const row = document.createElement("tr");
        // Add an event listener to the entire row for playing the podcast
        row.addEventListener('click', () => togglePlayPause(podcast.mp3url, podcast.title, index));
        row.innerHTML = `
          <td><button class="control-button" id="play-pause-${index}"><i class="fas fa-play"></i></button></td>
          <td><img src="${podcast.thumbnail}" alt="${podcast.title}" class="thumbnail" style="width: 62px; height: 62px;"></td>
          <td>${podcast.title}</td>
          <td>${podcast.description}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error loading podcasts:", error));
}

// This function toggles play/pause on the selected podcast and updates the featured image
function togglePlayPause(url, title, index) {
  const audioPlayer = document.getElementById("audio-player");
  const playPauseButton = document.getElementById(`play-pause-${index}`);
  const playPauseIcon = playPauseButton ? playPauseButton.querySelector("i") : null;
  const featuredImageElement = document.querySelector("#podcasts-tab .media-col-2");

  if (audioPlayer.src === url && !audioPlayer.paused) {
    audioPlayer.pause();
    if (playPauseIcon) playPauseIcon.className = "fas fa-play";
  } else {
    // Update all play buttons to show the play icon
    document.querySelectorAll('.control-button i').forEach(icon => {
      icon.className = "fas fa-play";
    });
    // Then update the clicked button to show the pause icon, if it exists
    if (playPauseIcon) playPauseIcon.className = "fas fa-pause";

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
        featuredImageElement.innerHTML = `<img src="${featuredImage}" alt="${title}" class="featured-podcast-image" style="width: 100%;">`;
      });
  }
}

// Load podcasts when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("podcast-table")) {
    loadPodcasts();
  }
});

// Load podcasts and set the featured image of the most recent podcast when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Fetch the podcast data
  fetch("data/podcastCollection.json")
    .then((response) => response.json())
    .then((data) => {
      // Find the most recent podcast by looking for the highest id
      const mostRecentPodcast = data.podcasts.reduce((prev, current) => (prev.id > current.id) ? prev : current);

      // Update the featured image to the most recent podcast's thumbnail
      const featuredImageElement = document.querySelector("#podcasts-tab .media-col-2");
      featuredImageElement.innerHTML = `<img src="${mostRecentPodcast.thumbnail}" alt="${mostRecentPodcast.title}" class="featured-podcast-image" style="width: 100%;">`;
    })
    .catch((error) => console.error("Error loading podcasts:", error));
});