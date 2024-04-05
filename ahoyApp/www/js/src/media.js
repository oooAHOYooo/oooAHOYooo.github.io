document.addEventListener("DOMContentLoaded", function () {
  // Function to load video in JW Player
  function loadVideoInJWPlayer(videoUrl, thumbnailUrl, artistName, titleName) {
    jwplayer("jw-player-container").setup({
      autostart: false,
      file: videoUrl,
      image: thumbnailUrl,
      width: "100%",
      aspectratio: "16:9",
    });

    document.querySelector("#media-artist-name p").textContent = artistName;
    document.querySelector("#media-title-name p").textContent = titleName;
  }

  function selectRandomVideo(videos) {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
  }

  function copyToClipboardAndShowPopup(text, title, artist) {
    navigator.clipboard.writeText(text).then(() => {
      alert(`Oy Oy Oy! You have a media item almost ready to share -  ${title} by ${artist} - ${text} is now in your clipboard and ready to share `);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  }

  fetch("data/mediaCollection.json")
    .then((response) => response.json())
    .then((data) => {
      const randomVideo = selectRandomVideo(data);
      loadVideoInJWPlayer(randomVideo.mp4_link, randomVideo.thumbnail_link, randomVideo.artist, randomVideo.display_title);

      const tableBody = document.querySelector("#mediaTable tbody");

      data.forEach((item) => {
        const row = document.createElement("tr");
        row.onclick = function () {
          loadVideoInJWPlayer(item.mp4_link, item.thumbnail_link, item.artist, item.display_title);
          window.scrollTo(0, 0); // Scroll back to the top of the page
        };

        const playButtonCell = document.createElement("td");
        const playButton = document.createElement("button");
        playButton.textContent = "▶";
        playButtonCell.appendChild(playButton);
        row.appendChild(playButtonCell);

        const thumbnailCell = document.createElement("td");
        const thumbnail = document.createElement("img");
        thumbnail.src = item.thumbnail_link;
        thumbnail.alt = item.display_title;
        thumbnailCell.appendChild(thumbnail);
        row.appendChild(thumbnailCell);

        const artistCell = document.createElement("td");
        artistCell.textContent = item.artist;
        row.appendChild(artistCell);

        const titleCell = document.createElement("td");
        titleCell.textContent = item.display_title;
        row.appendChild(titleCell);

        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Error:", error));
});
