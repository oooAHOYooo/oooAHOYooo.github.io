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
  fetch("data/featuredMedia.json") // Make sure the path is correct
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
          lightbox.style.position = "relative";
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

// Execute when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", loadFeaturedMedia);
