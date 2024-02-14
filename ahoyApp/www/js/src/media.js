document.addEventListener("DOMContentLoaded", function () {
  // Function to load video in JW Player
  function loadVideoInJWPlayer(videoUrl, thumbnailUrl, artistName, titleName) {
    jwplayer("jw-player-container").setup({
      autostart: false, // Autoplay disabled
      file: videoUrl,
      image: thumbnailUrl,
      width: "100%",
      aspectratio: "16:9",
    });

    // Update the artist name and title name
    document.querySelector("#media-artist-name p").textContent = artistName;
    document.querySelector("#media-title-name p").textContent = titleName;
  }

  // Function to select a random video
  function selectRandomVideo(videos) {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
  }

  // Function to format duration
  function formatDuration(duration) {
    const parts = duration.split(":");
    const minutes = parts[1];
    const seconds = parts[2];
    return minutes + "min " + seconds + "sec";
  }

  // Function to copy video link to clipboard and show a popup
  function copyToClipboardAndShowPopup(text, title, artist) {
    navigator.clipboard.writeText(text).then(() => {
      // Create and show the popup
      const popupContent = `Oy Oy Oy! You have a media item almost ready to share -  ${title} by ${artist} - ${text} is now in your clipboard and ready to share `;
      alert(popupContent);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

  // Fetch and display media data
  fetch("data/mediaCollection.json")
    .then((response) => response.json())
    .then((data) => {
      // Select and load a random video
      const randomVideo = selectRandomVideo(data);
      loadVideoInJWPlayer(randomVideo.mp4_link, randomVideo.thumbnail_link, randomVideo.artist, randomVideo.display_title);

      const tableBody = document.querySelector("#mediaTable tbody");

      data.forEach((item) => {
        const row = document.createElement("tr");

        // Add click event to the entire row
        row.onclick = function () {
          loadVideoInJWPlayer(item.mp4_link, item.thumbnail_link, item.artist, item.display_title);
        };

        // Play Button Cell
        const playButtonCell = document.createElement("td");
        const playButton = document.createElement("button");
        playButton.textContent = "▶";
        playButton.classList.add("compact-play-button", "play-button");
        playButton.style.fontSize = "0.8em"; // Make buttons a tiny bit smaller
        playButtonCell.appendChild(playButton);
        row.appendChild(playButtonCell);

        // Thumbnail Cell
        const thumbnailCell = document.createElement("td");
        const thumbnail = document.createElement("img");
        thumbnail.src = item.thumbnail_link;
        thumbnail.alt = item.display_title;
        thumbnail.style.width = "50px";
        thumbnail.classList.add("thumbnail");
        thumbnailCell.appendChild(thumbnail);
        row.appendChild(thumbnailCell);

        // Artist Cell
        const artistCell = document.createElement("td");
        artistCell.textContent = item.artist;
        artistCell.classList.add("artist");
        row.appendChild(artistCell);

        // Title Cell
        const titleCell = document.createElement("td");
        titleCell.textContent = item.display_title;
        titleCell.classList.add("media-title");
        titleCell.style.width = "200px"; // Fixed width
        titleCell.style.overflowX = "auto"; // Overflow for long titles
        row.appendChild(titleCell);

        // Duration Cell
        const durationCell = document.createElement("td");
        durationCell.textContent = formatDuration(item.duration);
        durationCell.classList.add("duration");
        row.appendChild(durationCell);

        // Save Button Cell
        const saveButtonCell = document.createElement("td");
        const saveButton = document.createElement("button");
        saveButton.classList.add("save-button");
        saveButton.style.fontSize = "0.8em"; // Make buttons a tiny bit smaller
        const saveIcon = document.createElement("i");
        saveIcon.classList.add("fas", "fa-save");
        saveButton.appendChild(saveIcon);
        saveButtonCell.appendChild(saveButton);
        row.appendChild(saveButtonCell);

        // Share Button Cell
        const shareButtonCell = document.createElement("td");
        const shareButton = document.createElement("button");
        shareButton.classList.add("share-button", "unique-share-button"); // Added unique CSS identifier
        shareButton.style.fontSize = "0.8em"; // Make buttons a tiny bit smaller
        const shareIcon = document.createElement("i");
        shareIcon.classList.add("fas", "fa-share-alt");
        shareButton.appendChild(shareIcon);
        shareButton.onclick = function () {
          copyToClipboardAndShowPopup(item.mp4_link, item.display_title, item.artist);
        };
        shareButtonCell.appendChild(shareButton);
        row.appendChild(shareButtonCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error:", error));
});