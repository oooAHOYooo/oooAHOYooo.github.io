document.addEventListener("DOMContentLoaded", function () {
  // Function to load video in JWPlayer
  function loadVideoInJWPlayer(videoUrl, thumbnailUrl, artistName, titleName) {
    jwplayer("jw-player-container").setup({
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

  // Fetch and populate media table
  fetch("data/mediaCollection.json")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document.querySelector("#mediaTable tbody");
      tableBody.innerHTML = ''; // Clear existing entries

      data.forEach((item) => {
        const row = document.createElement("tr");
        row.className = "mediaRow";
        row.innerHTML = `
          <td>
            <img src="${item.thumbnail_link}" alt="Thumbnail" class="mediaThumbnailImage lazy-thumbnail" data-src="${item.thumbnail_link}">
          </td>
          <td>
            <p>${item.artist}</p>
            <p>${item.display_title}</p>
          </td>
          <td>
            <button class="playMediaButton" onclick="loadVideoInJWPlayer('${item.mp4_link}', '${item.thumbnail_link}', '${item.artist}', '${item.display_title}')">Play</button>
          </td>
        `;
        tableBody.appendChild(row);
      });

      // Optionally, load the first video
      if (data.length > 0) {
        loadVideoInJWPlayer(data[0].mp4_link, data[0].thumbnail_link, data[0].artist, data[0].display_title);
      }
    })
    .catch((error) => console.error("Error fetching media data:", error));

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
