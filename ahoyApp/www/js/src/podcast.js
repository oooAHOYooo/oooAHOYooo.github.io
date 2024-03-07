// Function to load and display podcasts with play/pause toggle and featured image update
function loadPodcasts() {
  fetch("data/podcastCollection.json")
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("podcast-table").querySelector("tbody");

      data.podcasts.forEach((podcast, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><button class="control-button" id="play-pause-${index}"><i class="fas fa-play"></i></button></td>
          <td><img src="${podcast.thumbnail}" alt="${podcast.title}" class="thumbnail"></td>
          <td>${podcast.title}</td>
          <td>${podcast.description}</td>
        `;
        tableBody.appendChild(row);

        // Event listener for play/pause toggle and featured image update
        document.getElementById(`play-pause-${index}`).addEventListener('click', (event) => {
          event.stopPropagation(); // Prevent row click event
          togglePlayPause(podcast.mp3url, podcast.title, index, podcast.thumbnail);
        });
      });
    })
    .catch(error => console.error("Error loading podcasts:", error));
}

// Toggles play/pause on the selected podcast, updates the UI, and updates the featured image
function togglePlayPause(url, title, index, thumbnail) {
  const audioPlayer = document.getElementById("audio-player");
  const playPauseButton = document.getElementById(`play-pause-${index}`);
  const playPauseIcon = playPauseButton.querySelector("i");

  if (audioPlayer.src === url && !audioPlayer.paused) {
    audioPlayer.pause();
    playPauseIcon.className = "fas fa-play";
  } else {
    document.querySelectorAll('.control-button i').forEach(icon => {
      icon.className = "fas fa-play";
    });
    playPauseIcon.className = "fas fa-pause";

    audioPlayer.src = url;
    audioPlayer.play();
    updateMetadata(title);
    updateFeaturedImage(thumbnail, title);
  }
}

// Updates the UI with the podcast's metadata
function updateMetadata(title) {
  document.getElementById("song-title").textContent = title;
  document.getElementById("current-song-title").textContent = title;
  document.getElementById("current-song-artist").textContent = "Podcast";
  document.getElementById("artist-name").textContent = "Podcast";
}

// Updates the featured image based on the podcast selected
function updateFeaturedImage(thumbnail, title) {
  const featuredImageContainer = document.getElementById("podcast-featured-image-container");
  featuredImageContainer.innerHTML = `<img src="${thumbnail}" alt="${title}" class="the-featured-podcast-image">`;
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("podcast-table")) {
    loadPodcasts();
  }
});