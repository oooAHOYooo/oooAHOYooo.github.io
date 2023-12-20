document.addEventListener("DOMContentLoaded", function () {
  // Extract the artist's name from the data-artist-name attribute
  const artistName = document.body.getAttribute("data-artist-name");

  fetch("../../data/artistCollection.json")
    .then((response) => response.json())
    .then((data) => {
      const artist = data.artists.find((a) => a.name === artistName);
      if (artist) {
        document.getElementById("artist-name").textContent = artist.name;
        document.getElementById("artist-image").src = artist.featuredImage;
        document.getElementById("artist-image").alt = artist.name;
        document.getElementById("artist-location").textContent =
          "Location: " + artist.location;
        document.getElementById("artist-show-dates").textContent =
          "Show Dates: " + artist.showDates.join(", ");
        document.getElementById("artist-support-link").href =
          artist.supportLink;
        document.getElementById("artist-share-link").href = artist.shareLink;
        document.getElementById("artist-message-link").href =
          artist.messageLink;
      }
    })
    .catch((error) => console.error("Error loading artist data:", error));

  // Fetch song data and create a table
  fetch("../../data/songCollection.json")
    .then((response) => response.json())
    .then((data) => {
      const songs = data.songs.filter((song) => song.artist === artistName);
      if (songs.length > 0) {
        const table = document.createElement("table");
        table.className = "song-table";
        songs.forEach((song) => {
          const row = document.createElement("tr");

          // Song title cell
          const titleCell = document.createElement("td");
          titleCell.textContent = song.songTitle;
          row.appendChild(titleCell);

          // Play button cell
          const playCell = document.createElement("td");
          const playButton = document.createElement("button");
          playButton.textContent = "Play";
          playButton.dataset.url = song.mp3url;
          playButton.dataset.artist = song.artist;
          playButton.dataset.title = song.songTitle;
          playButton.onclick = playSong;
          playCell.appendChild(playButton);
          row.appendChild(playCell);

          // Buy button cell
          const buyCell = document.createElement("td");
          const buyButton = document.createElement("button");
          buyButton.textContent = "Buy";
          buyButton.onclick = function () {
            // Code to buy the song
            window.open(song.artistUrl, "_blank");
          };
          buyCell.appendChild(buyButton);
          row.appendChild(buyCell);

          table.appendChild(row);
        });
        document.body.appendChild(table);
      }
    })
    .catch((error) => console.error("Error loading song data:", error));
});

const playSong = function () {
  const url = this.dataset.url;
  const artist = this.dataset.artist;
  const title = this.dataset.title;
  const playButtons = document.querySelectorAll(".play-button");
  const bottomPlayButton = document.querySelector("#play");
  const bottomPlayIcon = bottomPlayButton.querySelector("i");

  if (audioPlayer.src !== url) {
    audioPlayer.src = url;
  }

  if (audioPlayer.paused) {
    audioPlayer.play();
    playButtons.forEach((button) => {
      if (button.dataset.url === url) {
        button.querySelector("i").className = "fas fa-pause";
      }
    });
    bottomPlayIcon.className = "fas fa-pause";
  } else {
    audioPlayer.pause();
    playButtons.forEach((button) => {
      if (button.dataset.url === url) {
        button.querySelector("i").className = "fas fa-play";
      }
    });
    bottomPlayIcon.className = "fas fa-play";
  }
};
