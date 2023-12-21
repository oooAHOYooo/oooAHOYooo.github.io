document.addEventListener("DOMContentLoaded", function () {
  function playMedia(videoUrl) {
    const playerContainer = document.querySelector("#media-tab video");
    const source = document.querySelector("#media-tab video > source");

    // Update the source element's src attribute
    source.src = videoUrl;

    // Load the new source into the video element
    playerContainer.load();
    playerContainer.play();
  }

  fetch("data/mediaCollection.json")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#mediaTable tbody");

      data.forEach((item) => {
        const row = document.createElement("tr");

        // Thumbnail Cell
        const thumbnailCell = document.createElement("td");
        const thumbnail = document.createElement("img");
        thumbnail.src = item.thumbnail_link;
        thumbnail.alt = item.display_title;
        thumbnail.style.width = "50px";
        thumbnailCell.appendChild(thumbnail);
        row.appendChild(thumbnailCell);

        // Title Cell
        const titleCell = document.createElement("td");
        titleCell.textContent = item.display_title;
        titleCell.classList.add("media-title");
        row.appendChild(titleCell);

        // Play Button Cell
        const playButtonCell = document.createElement("td");
        const playButton = document.createElement("button");
        playButton.textContent = "▶";
        playButton.classList.add("compact-play-button");
        playButton.onclick = function () {
          playMedia(item.video_url);
        };
        playButtonCell.appendChild(playButton);
        row.appendChild(playButtonCell);

        // Artist Cell
        const artistCell = document.createElement("td");
        artistCell.textContent = item.artist;
        row.appendChild(artistCell);

        // Duration Cell
        const durationCell = document.createElement("td");
        durationCell.textContent = item.duration;
        row.appendChild(durationCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error:", error));
});

document.addEventListener("DOMContentLoaded", function () {
  function playMedia(videoUrl) {
    const playerContainer = document.querySelector("#jw-player-container");

    // Remove any existing video elements
    while (playerContainer.firstChild) {
      playerContainer.firstChild.remove();
    }

    // Create a new video element
    const videoElement = document.createElement("video");
    videoElement.src = videoUrl;
    videoElement.controls = true;
    videoElement.autoplay = true;

    // Append the new video element to the player container
    playerContainer.appendChild(videoElement);
  }

  // ... rest of your code ...
});
