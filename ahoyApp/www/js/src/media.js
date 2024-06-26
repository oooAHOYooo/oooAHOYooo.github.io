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
      // Sort the data by 'id' in descending order
      data.sort((a, b) => b.id - a.id);

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

function searchMedia() {
  const searchText = document.getElementById('search-input').value.toLowerCase();
  const tableBody = document.querySelector("#mediaTable tbody");
  const rows = tableBody.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    let titleCell = rows[i].getElementsByTagName('td')[3]; // Assuming the title is in the fourth column
    let artistCell = rows[i].getElementsByTagName('td')[2]; // Assuming the artist is in the third column
    if (titleCell || artistCell) {
      let title = titleCell.textContent || titleCell.innerText;
      let artist = artistCell.textContent || artistCell.innerText;
      if (title.toLowerCase().indexOf(searchText) > -1 || artist.toLowerCase().indexOf(searchText) > -1) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }       
  }
}

// Add event listener for enter key in the search input
document.getElementById('search-input').addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    searchMedia();
  }
});

// Event listener for the clear search button
document.getElementById('clear-search').addEventListener("click", function() {
  // Clear the search input
  document.getElementById('search-input').value = '';

  // Reset the display of all rows to make them visible
  const tableBody = document.querySelector("#mediaTable tbody");
  const rows = tableBody.getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    rows[i].style.display = "";
  }
});