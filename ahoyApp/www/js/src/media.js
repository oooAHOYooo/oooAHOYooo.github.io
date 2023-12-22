document.addEventListener("DOMContentLoaded", function () {
  // Function to load video in JW Player
  function loadVideoInJWPlayer(videoUrl, thumbnailUrl) {
    jwplayer("jw-player-container").setup({
      autostart: true,
      file: videoUrl,
      image: thumbnailUrl,
      width: "100%",
      aspectratio: "16:9"
    });
  }

  // Fetch and display media data
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
          loadVideoInJWPlayer(item.mp4_link, item.thumbnail_link);
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
