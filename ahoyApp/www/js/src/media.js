document.addEventListener("DOMContentLoaded", function () {
  // Function to load video in JW Player
  function loadVideoInJWPlayer(videoUrl, thumbnailUrl) {
    jwplayer("jw-player-container").setup({
      autostart: false, // Autoplay disabled
      file: videoUrl,
      image: thumbnailUrl,
      width: "100%",
      aspectratio: "16:9",
    });
  }

  // Function to select a random video
  function selectRandomVideo(videos) {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
  }

  // Fetch and display media data
  fetch("data/mediaCollection.json")
    .then((response) => response.json())
    .then((data) => {
      // Select and load a random video
      const randomVideo = selectRandomVideo(data);
      loadVideoInJWPlayer(randomVideo.mp4_link, randomVideo.thumbnail_link);

      const tableBody = document.querySelector("#mediaTable tbody");

      data.forEach((item) => {
        const row = document.createElement("tr");

        // Play Button Cell
        const playButtonCell = document.createElement("td");
        const playButton = document.createElement("button");
        playButton.textContent = "▶";
        playButton.classList.add("compact-play-button");
        playButton.onclick = function () {
          loadVideoInJWPlayer(item.mp4_link, item.thumbnail_link);
        };
        playButtonCell.appendChild(playButton);
        row.appendChild(playButtonCell);

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

        // Artist Cell
        const artistCell = document.createElement("td");
        artistCell.textContent = item.artist;
        row.appendChild(artistCell);

        // Duration Cell
        const durationCell = document.createElement("td");
        // Remove the hour from the duration
        const durationWithoutHour = item.duration.split(":")[1];
        durationCell.textContent = durationWithoutHour;
        row.appendChild(durationCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error:", error));
});
