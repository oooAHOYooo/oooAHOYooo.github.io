// This function loads podcast data and populates the table
function loadPodcasts() {
  fetch("data/podcastCollection.json")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.getElementById("podcast-table").querySelector("tbody");
      let mostRecentPodcast = data.podcasts[0]; // Assume the first one is the most recent initially

      data.podcasts.forEach((podcast, index) => {
        if (podcast.id > mostRecentPodcast.id) {
          mostRecentPodcast = podcast;
        }

        const row = document.createElement("tr");
        row.addEventListener('click', () => {
          togglePlayPause(podcast.mp3url, podcast.title, index);
          updateFeaturedImage(podcast.thumbnail, podcast.title, podcast.mp3url);
        });
        row.innerHTML = `
          <td><button class="control-button" id="play-pause-${index}"><i class="fas fa-play"></i></button></td>
          <td><img src="${podcast.thumbnail}" alt="${podcast.title}" class="thumbnail" style="width: 62px; height: 62px;"></td>
          <td>${podcast.title}</td>
          <td>${podcast.description}</td>
        `;
        tableBody.appendChild(row);
      });

      updateFeaturedImage(mostRecentPodcast.thumbnail, mostRecentPodcast.title, mostRecentPodcast.mp3url);
    })
    .catch((error) => console.error("Error loading podcasts:", error));
}

function updateFeaturedImage(thumbnail, title, mp3url) {
  const featuredImageContainer = document.querySelector(".podcast-featured-image-container");
  featuredImageContainer.innerHTML = `<img src="${thumbnail}" alt="${title}" class="the-featured-podcast-image" style="max-width: 400px; display: block; margin: 0 auto;">`;
  featuredImageContainer.onclick = () => togglePlayPause(mp3url, title);
}

// This function toggles play/pause on the selected podcast and updates the featured image
function togglePlayPause(url, title, index = null) {
  const audioPlayer = document.getElementById("audio-player");
  const playPauseButton = index !== null ? document.getElementById(`play-pause-${index}`) : null;
  const playPauseIcon = playPauseButton ? playPauseButton.querySelector("i") : null;

  if (audioPlayer.src === url && !audioPlayer.paused) {
    audioPlayer.pause();
    if (playPauseIcon) playPauseIcon.className = "fas fa-play";
  } else {
    document.querySelectorAll('.control-button i').forEach(icon => {
      icon.className = "fas fa-play";
    });
    if (playPauseIcon) playPauseIcon.className = "fas fa-pause";

    audioPlayer.src = url;
    audioPlayer.play();
    document.getElementById("song-title").textContent = title;
    document.getElementById("current-song-title").textContent = title;
    document.getElementById("current-song-artist").textContent = "Podcast";
    document.getElementById("artist-name").textContent = "Podcast";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("podcast-table")) {
    loadPodcasts();
  }
});