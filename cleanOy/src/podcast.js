function loadPodcasts() {
  fetch("./data/podcastCollection.json")
    .then((response) => response.json())
    .then((data) => {
      const tableBody = document
        .getElementById("podcast-table")
        .querySelector("tbody");
      data.podcasts.forEach((podcast) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><button class="control-button" onclick="playPodcast('${podcast.mp3url}', '${podcast.title}')"><i class="fas fa-play"></i></button></td> 
            <td><img src="${podcast.thumbnail}" alt="${podcast.title}" class="thumbnail" style="width: 32px; height: 32px;"></td>
            <td>${podcast.title}</td>
            <td>${podcast.description}</td>
            <td><button class="like-button"><i class="fas fa-heart"></i></button></td>
        `;
        tableBody.appendChild(row);
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

          // Show the full podcast cover
          const fullCover = new Image();
          fullCover.src = this.src;
          fullCover.alt = this.alt;
          fullCover.style.width = "100%";
          fullCover.style.height = "auto";
          fullCover.style.maxWidth = "80%";
          fullCover.style.maxHeight = "80%";

          lightbox.appendChild(fullCover);
          document.body.appendChild(lightbox);

          // Remove the lightbox when clicked
          lightbox.addEventListener("click", function () {
            document.body.removeChild(lightbox);
          });
        });
      });

      // Add event listener to like buttons
      const likeButtons = document.querySelectorAll(".like-button");
      likeButtons.forEach((button) => {
        button.addEventListener("click", function () {
          this.classList.toggle("liked");
          const likedPodcastsTable =
            document.getElementById("liked-songs-table");
          const podcastRow = this.parentElement.parentElement.cloneNode(true);
          podcastRow.querySelector(".like-button").remove();
          if (this.classList.contains("liked")) {
            // Add a remove button
            const removeButton = document.createElement("button");
            removeButton.innerHTML = '<i class="fas fa-trash"></i>';
            removeButton.classList.add("remove-button");
            removeButton.addEventListener("click", function () {
              this.parentElement.parentElement.remove();
            });
            const removeCell = document.createElement("td");
            removeCell.appendChild(removeButton);
            podcastRow.appendChild(removeCell);
            likedPodcastsTable.appendChild(podcastRow);
          } else {
            const rows = Array.from(likedPodcastsTable.children);
            const index = rows.findIndex(
              (tr) => tr.textContent === podcastRow.textContent
            );
            likedPodcastsTable.removeChild(rows[index]);
          }
        });
      });
    })
    .catch((error) => console.error("Error:", error));
}

function playPodcast(url, title) {
  const audioPlayer = document.getElementById("audio-player");
  audioPlayer.src = url;
  audioPlayer.play();

  // Update bottom controller and now playing tab
  document.getElementById("song-title").textContent = title;
  document.getElementById("current-song-title").textContent = title;
  document.getElementById("current-song-artist").textContent = "";
  document.getElementById("artist-name").textContent = "";
}

// Call the function to load podcasts when the page loads
window.onload = loadPodcasts;
