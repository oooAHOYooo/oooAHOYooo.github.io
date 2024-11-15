document.addEventListener("DOMContentLoaded", function () {
  let mediaData = [];

  // Define the URL for fetching media data
  const useLocalData = true; // Set to true for local, false for cloud
  const mediaDataUrl = useLocalData 
    ? "local_data/mediaCollection.json" 
    : "https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/mediaCollection.json";

  // Function to load video in the native HTML5 video player
  function loadVideoInHTML5Player(videoUrl, artistName, titleName) {
    const videoPlayer = document.getElementById("ondemand-video-player");
    const videoSource = document.getElementById("ondemand-video-source");

    videoSource.src = videoUrl;
    videoPlayer.load(); // Reload the video player with the new source

    const artistElement = document.querySelector("#media-artist-name p");
    const titleElement = document.querySelector("#media-title-name p");

    artistElement.textContent = artistName;
    titleElement.textContent = titleName;

    updateNavBar(titleName, artistName); // Update the navigation bar with the current video
  }

  function playVideoAndScrollToSearch(videoUrl, thumbnailUrl, artistName, titleName) {
    loadVideoInHTML5Player(videoUrl, artistName, titleName);
    
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const searchContainer = document.getElementById('search-container');
    if (searchContainer) {
      searchContainer.scrollIntoView({ behavior: 'smooth' }); // Scroll to the search container
    }
  }

  function selectRandomVideo(videos) {
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
  }

  function populateMediaTable(data) {
    const tableBody = document.querySelector("#mediaTable tbody");
    tableBody.innerHTML = ''; // Clear existing entries

    data.forEach((item) => {
      const row = document.createElement("tr");
      row.className = "mediaRow";
      row.innerHTML = `
        <td>
          <img src="${item.thumbnail_link}" alt="Thumbnail" class="mediaThumbnailImage lazy-thumbnail" data-src="${item.thumbnail_link}">
        </td>
        <td>${item.artist}</td>
        <td>${item.display_title}</td>
        <td>
          <button class="playMediaButton">Play</button>
        </td>
      `;
      tableBody.appendChild(row);

      // Add click event listener to the thumbnail
      const thumbnail = row.querySelector(".mediaThumbnailImage");
      thumbnail.addEventListener("click", function() {
        playVideoAndScrollToSearch(item.mp4_link, item.thumbnail_link, item.artist, item.display_title);
      });

      // Add click event listener to the play button
      const playButton = row.querySelector(".playMediaButton");
      playButton.addEventListener("click", function() {
        playVideoAndScrollToSearch(item.mp4_link, item.thumbnail_link, item.artist, item.display_title);
      });
    });

    lazyLoadThumbnails(); // Ensure lazy loading is applied after populating the table
  }

  // Fetch and populate media table
  fetch(mediaDataUrl) // Use the variable to fetch data
    .then((response) => response.json())
    .then((data) => {
      console.log("Fetched media data:", data); // Log the fetched data to the console
      mediaData = data; // Store data for sorting
      sortAndDisplayMedia('random'); // Initially sort by random

      // Load a random video initially
      if (mediaData.length > 0) {
        const randomVideo = selectRandomVideo(mediaData);
        playVideoAndScrollToSearch(randomVideo.mp4_link, randomVideo.thumbnail_link, randomVideo.artist, randomVideo.display_title);
      }
    })
    .catch((error) => console.error("Error fetching media data:", error));

  function sortAndDisplayMedia(criteria) {
    let sortedData = [...mediaData];
    if (criteria === 'recent') {
      sortedData.sort((a, b) => b.id - a.id);
    } else if (criteria === 'artist-az') {
      sortedData.sort((a, b) => a.artist.localeCompare(b.artist));
    } else if (criteria === 'title-az') {
      sortedData.sort((a, b) => a.display_title.localeCompare(b.display_title));
    } else if (criteria === 'random') {
      sortedData.sort(() => Math.random() - 0.5);
    }
    populateMediaTable(sortedData);
  }

  // Event listeners for sorting buttons
  document.getElementById('sort-recent').addEventListener('click', () => sortAndDisplayMedia('recent'));
  document.getElementById('sort-artist-az').addEventListener('click', () => sortAndDisplayMedia('artist-az'));
  document.getElementById('sort-title-az').addEventListener('click', () => sortAndDisplayMedia('title-az'));
  document.getElementById('sort-random').addEventListener('click', () => sortAndDisplayMedia('random'));

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
    let artistCell = rows[i].getElementsByTagName('td')[1]; // Corrected index for artist
    let titleCell = rows[i].getElementsByTagName('td')[2]; // Corrected index for title
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
