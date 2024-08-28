// Function to get 'n' random elements from an array
function getRandom(arr, n) {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);

  if (n > len) {
    throw new RangeError("getRandom: more elements taken than available");
  }

  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }

  return result;
}

// Function to load and display featured media
function loadFeaturedMedia() {
  fetch("./data/featuredMedia.json") 
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("featured-media");
      container.innerHTML = ""; // Clear previous content

      // Get 3 random items
      const randomData = getRandom(data, 3);

      // Add the random items to the DOM
      randomData.forEach((item) => {
        const mediaItem = document.createElement("div");
        mediaItem.className = "media-item";
        mediaItem.innerHTML = `
                        <div class="media-img">
                            <img src="${item.imgSrc}" alt="${item.altText}" class="thumbnail">
                            <p class="media-description">${item.description}</p>
                        </div>
                    `;
        container.appendChild(mediaItem);
      });

      // Add event listener to thumbnails
      const thumbnails = document.querySelectorAll(".thumbnail");
      thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", function () {
          // Create a lightbox
          const lightbox = document.createElement("div");
          lightbox.style.position = "fixed";
          lightbox.style.top = "0";
          lightbox.style.right = "0";
          lightbox.style.bottom = "0";
          lightbox.style.left = "0";
          lightbox.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
          lightbox.style.display = "flex";
          lightbox.style.justifyContent = "center";
          lightbox.style.alignItems = "center";
          lightbox.style.zIndex = "1000";

          // Show the full media cover
          const fullCover = new Image();
          fullCover.src = this.src;
          fullCover.alt = this.alt;
          fullCover.style.width = "100%";
          fullCover.style.height = "auto";
          fullCover.style.maxWidth = "80%";

          // Stop propagation of click event on the fullCover
          fullCover.addEventListener("click", function (event) {
            event.stopPropagation();
          });

          lightbox.appendChild(fullCover);
          document.body.appendChild(lightbox);

          // Remove the lightbox when clicked
          lightbox.addEventListener("click", function () {
            document.body.removeChild(lightbox);
          });
        });
      });
    })
    .catch((error) => console.error("Failed to load featured media:", error));
}

// Function to load and display featured playlists
function loadFeaturedPlaylists() {
  fetch("./data/featured-playlist.json")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("left-sidebar-middle");
      container.innerHTML = "<h3>Featured Playlists</h3>"; // Clear previous content and add title

      // Display all playlists
      data.playlists.forEach((playlist, index) => {
        const playlistItem = document.createElement("div");
        playlistItem.className = "featured-playlist";
        playlistItem.innerHTML = `
          <button class="toggle-playlist" data-playlist="${index}">
            <i class="fas fa-list"></i> ${playlist.name}
          </button>
        `;
        container.appendChild(playlistItem);
      });

      // Add event listeners to toggle buttons
      const toggleButtons = document.querySelectorAll(".toggle-playlist");
      toggleButtons.forEach((button) => {
        button.addEventListener("click", function(event) {
          event.stopPropagation(); // Prevent event from bubbling up
          const playlistIndex = this.getAttribute("data-playlist");
          showPlaylistPopup(data.playlists[playlistIndex], this);
        });
      });
    })
    .catch((error) => console.error("Failed to load featured playlists:", error));
}

function showPlaylistPopup(playlist, button) {
  // Remove existing popup if any
  const existingPopup = document.querySelector(".playlist-popup");
  if (existingPopup) {
    existingPopup.remove();
  }

  // Create popup
  const popup = document.createElement("div");
  popup.className = "playlist-popup";
  popup.innerHTML = `
    <h3>${playlist.name}</h3>
    <button class="play-all"><i class="fas fa-play-circle"></i></button>
    <ul>
      ${playlist.songs.map((song, index) => `
        <li>
          <span>${song.title} - ${song.artist}</span>
          <button class="play-song" data-index="${index}"><i class="fas fa-play"></i></button>
        </li>
      `).join('')}
    </ul>
    <button class="close-popup"><i class="fas fa-times"></i></button>
  `;

  // Position the popup next to the button
  const buttonRect = button.getBoundingClientRect();
  popup.style.position = 'absolute';
  popup.style.left = `${buttonRect.right + 10}px`;
  popup.style.top = `${buttonRect.top}px`;

  // Add popup to the body
  document.body.appendChild(popup);

  // Add event listener to close button
  popup.querySelector(".close-popup").addEventListener("click", () => popup.remove());

  // Add event listeners to play buttons
  const playButtons = popup.querySelectorAll(".play-song");
  playButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const songIndex = this.getAttribute("data-index");
      playSong(playlist.songs[songIndex]);
    });
  });

  // Add event listener to play all button
  popup.querySelector(".play-all").addEventListener("click", () => playAllSongs(playlist.songs));
}

function playSong(song) {
  // Implement your audio playing logic here
  console.log(`Playing: ${song.title} by ${song.artist}`);
  // Example: 
  // const audio = new Audio(song.mp3url);
  // audio.play();
}

function playAllSongs(songs) {
  // Implement your logic to play all songs in the playlist
  console.log("Playing all songs in the playlist");
  // Example:
  // songs.forEach((song, index) => {
  //   setTimeout(() => playSong(song), index * 1000); // Play each song with a 1-second delay
  // });
}

// Execute when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedMedia();
  loadFeaturedPlaylists();
});
