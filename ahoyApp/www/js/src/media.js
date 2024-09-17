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

    updateNavBar(titleName, artistName); // Update the navigation bar with the current video
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
        row.className = "superMediaRow"; // Added class
        row.style.backgroundImage = `url(${item.thumbnail_link})`; // Set background image
        row.style.backgroundSize = "cover"; // Ensure the background covers the row
        row.style.backgroundPosition = "center"; // Center the background image
        row.style.color = "white"; // Change text color for better visibility
        row.style.position = "relative"; // Set position for overlay positioning
        row.onclick = function () {
          loadVideoInJWPlayer(item.mp4_link, item.thumbnail_link, item.artist, item.display_title);
          window.scrollTo(0, 0); // Scroll back to the top of the page
        };

        // Create an overlay for better text visibility
        const overlay = document.createElement("div");
        overlay.style.position = "absolute";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.right = "0";
        overlay.style.bottom = "0";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Dark overlay for contrast
        row.appendChild(overlay);

        // Play Button
        const playButton = document.createElement("button");
        playButton.className = "superMediaPlayButton";
        playButton.textContent = "▶";
        playButton.style.position = "absolute";
        playButton.style.left = "10px";
        playButton.style.top = "10px";
        playButton.style.zIndex = "10";
        playButton.onclick = function(event) {
          event.stopPropagation(); // Prevent row click event
          loadVideoInJWPlayer(item.mp4_link, item.thumbnail_link, item.artist, item.display_title);
        };
        row.appendChild(playButton);

        const artistCell = document.createElement("td");
        artistCell.className = "superMediaArtist"; // Added class
        artistCell.textContent = item.artist;
        row.appendChild(artistCell);

        const titleCell = document.createElement("td");
        titleCell.className = "superMediaTitle"; // Added class
        titleCell.textContent = item.display_title;
        row.appendChild(titleCell);

        tableBody.appendChild(row);
      });

      // Lazy load the thumbnails
      lazyLoadThumbnails();
    })
    .catch((error) => console.error("Error:", error));

  function lazyLoadThumbnails() {
    const lazyThumbnails = document.querySelectorAll(".lazy-thumbnail");

    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const thumbnail = entry.target;
          thumbnail.src = thumbnail.dataset.src; // Load the actual image
          thumbnail.classList.remove("lazy-thumbnail");
          observer.unobserve(thumbnail);
        }
      });
    });

    lazyThumbnails.forEach(thumbnail => {
      // Check if the thumbnail is already in the viewport
      if (thumbnail.getBoundingClientRect().top < window.innerHeight) {
        thumbnail.src = thumbnail.dataset.src; // Load the actual image
        thumbnail.classList.remove("lazy-thumbnail");
      } else {
        lazyLoadObserver.observe(thumbnail);
      }
    });
  }
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
