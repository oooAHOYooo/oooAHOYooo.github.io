// Function to load and display songs from songCollection.json
function loadSongs() {
  fetch("./data/songCollection.json")
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById("song-list");
      let htmlContent = `<table class="song-table">
                            <thead>
                              <tr>
                                <th>Play</th>
                                <th>Artist</th>
                                <th>Song</th>
                                <th>Burn</th>
                              </tr>
                            </thead>
                            <tbody>`;

      data.songs.forEach((song) => {
        htmlContent += `<tr>
                          <td><button class="play-button" data-url="${song.mp3url}" data-id="${song.id}"><i class="fas fa-play"></i></button></td>
                          <td>${song.artist}</td>
                          <td>${song.songTitle}</td>
                          <td><button class="burn-button" data-song-id="${song.id}"><i class="fas fa-fire"></i></button></td>
                        </tr>`;
      });

      htmlContent += `</tbody></table>`;
      tableBody.innerHTML = htmlContent;

      setupPlayButtons();
    })
    .catch(error => console.error("Error loading songs:", error));
}

// Function to set up play buttons
function setupPlayButtons() {
  const playButtons = document.querySelectorAll(".play-button");
  playButtons.forEach(button => {
    button.addEventListener("click", function() {
      const songUrl = this.getAttribute("data-url");
      playSong(songUrl);
    });
  });
}

// Function to play a song
function playSong(url) {
  const audioPlayer = document.getElementById("audio-player");
  audioPlayer.src = url;
  audioPlayer.play();
  updatePlayPauseIcons(url);
}

// Function to update play/pause icons
function updatePlayPauseIcons(currentUrl) {
  const playButtons = document.querySelectorAll(".play-button");
  playButtons.forEach(button => {
    if (button.getAttribute("data-url") === currentUrl) {
      button.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      button.innerHTML = '<i class="fas fa-play"></i>';
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("song-list")) {
    loadSongs();
  }
});