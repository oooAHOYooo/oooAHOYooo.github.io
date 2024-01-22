document.addEventListener("DOMContentLoaded", function () {
    fetch("./data/songCollection.json")
        .then((response) => response.json())
        .then((data) => {
            const songList = document.getElementById("song-list");
            songList.innerHTML = `
                <table class="song-table">
                    <thead>
                        <tr class="song-table-header">
                            <th>Play</th>
                            <th>Artist</th>
                            <th>Song</th>
                            <th>Like</th>
                        </tr>
                    </thead>
                    <tbody id="song-list-body" class="song-table-body">
                    </tbody>
                </table>
            `;
  
           const songListBody = document.getElementById("song-list-body");
            data.songs.forEach((song) => {
                const tr = document.createElement("tr");
                tr.className = "song-row";
                tr.innerHTML = `
                    <td><button class="play-button" data-url="${song.mp3url}"><i class="fas fa-play"></i></button></td>
                    <td class="song-artist">${song.artist}</td>
                    <td class="song-title">${song.songTitle}</td>
                    <td><button class="like-button" data-url="${song.mp3url}" data-artist="${song.artist}" data-title="${song.songTitle}"><i class="fas fa-heart"></i></button></td>
                `;
                songListBody.appendChild(tr);

                tr.addEventListener('click', function (event) {
                    if (!event.target.classList.contains('like-button') && !event.target.classList.contains('play-button')) {
                        const audioPlayer = document.getElementById("audio-player");
                        resetPlayButtonIcons(); // Reset all play button icons
                        audioPlayer.src = song.mp3url;
                        audioPlayer.play();
                        updatePlayButtonIcons(song.mp3url, "fas fa-pause");
                     // Update the background of #song-col-2
                     const songCol2 = document.getElementById("song-col-2");
                     songCol2.style.backgroundImage = `url(${song.backgroundImageUrl})`; // Assuming song object has a property 'backgroundImageUrl'
                    }
                });
            });

  
            setupPlayButtons();
            setupLikeButtons();
        });
  });

function setupPlayButtons() {
  const audioPlayer = document.getElementById("audio-player");
  const playButtons = document.querySelectorAll(".play-button");
  playButtons.forEach((button) => {
      button.addEventListener("click", function () {
          const url = this.dataset.url;
          if (audioPlayer.src !== url) {
              audioPlayer.src = url;
          }
          if (audioPlayer.paused) {
              audioPlayer.play();
              updatePlayButtonIcons(url, "fas fa-pause");
          } else {
              audioPlayer.pause();
              updatePlayButtonIcons(url, "fas fa-play");
          }
      });
  });
}

function updatePlayButtonIcons(url, iconClass) {
  document.querySelectorAll(".play-button").forEach((button) => {
      if (button.dataset.url === url) {
          button.querySelector("i").className = iconClass;
      }
  });
}

function setupLikeButtons() {
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((button) => {
      button.addEventListener("click", function () {
          this.classList.toggle("liked");
          const songData = {
              url: this.dataset.url,
              artist: this.dataset.artist,
              title: this.dataset.title
          };
          if (this.classList.contains("liked")) {
              addSongToLibrary(songData);
          } else {
              removeSongFromLibrary(songData.url);
          }
      });
  });
}

function addSongToLibrary(songData) {
  const libraryGrid = document.getElementById("liked-songs-grid");
  if (Array.from(libraryGrid.children).some(card => card.dataset.url === songData.url)) {
      return;
  }
  const songCard = document.createElement("div");
  songCard.classList.add("song-card");
  songCard.dataset.url = songData.url;
  songCard.innerHTML = `
      <img src="${songData.thumbnail}" alt="${songData.title}" style="width:100px; height:120px;">
      <p>${songData.artist}</p>
      <p>${songData.title}</p>
      <button class="play-button" data-url="${songData.url}"><i class="fas fa-play"></i></button>
      <button class="remove-button" style="display: none;"><i class="fas fa-times"></i></button>
  `;
  libraryGrid.appendChild(songCard);


  songCard.addEventListener("mouseenter", function() {
      this.querySelector(".remove-button").style.display = "block";
  });

  songCard.addEventListener("mouseleave", function() {
      this.querySelector(".remove-button").style.display = "none";
  });

  songCard.querySelector(".remove-button").addEventListener("click", function() {
      removeSongFromLibrary(songData.url);
  });

  songCard.querySelector(".play-button").addEventListener("click", function() {
      const audioPlayer = document.getElementById("audio-player");
      const url = this.dataset.url;
      if (audioPlayer.src !== url) {
          audioPlayer.src = url;
      }
      if (audioPlayer.paused) {
          audioPlayer.play();
      } else {
          audioPlayer.pause();
      }
  });
}

function removeSongFromLibrary(songUrl) {
  const libraryGrid = document.getElementById("liked-songs-grid");
  Array.from(libraryGrid.children).forEach(card => {
      if (card.dataset.url === songUrl) {
          libraryGrid.removeChild(card);
      }
  });
}

function resetPlayButtonIcons() {
    document.querySelectorAll(".play-button i").forEach(icon => {
        icon.className = "fas fa-play";
    });
}
document.addEventListener("DOMContentLoaded", function () {
    const featuredArt = document.getElementById("song-Featured-Art");
  
    featuredArt.addEventListener('mouseover', () => {
      featuredArt.style.backgroundPosition = '0 0'; // Change the position to the top left corner
    });
  
    featuredArt.addEventListener('mouseout', () => {
      featuredArt.style.backgroundPosition = 'center'; // Change the position back to the center
    });
  
    // ... rest of your code
  });

  document.addEventListener("DOMContentLoaded", function () {
    fetch("./data/songCollection.json")
        .then((response) => response.json())
        .then((data) => {
            const songListBody = document.getElementById("song-list-body");
            data.songs.forEach((song) => {
                const tr = document.createElement("tr");
                tr.className = "song-row";
                tr.innerHTML = `
                    <td><button class="play-button" data-url="${song.mp3url}"><i class="fas fa-play"></i></button></td>
                    <td class="song-artist">${song.artist}</td>
                    <td class="song-title">${song.songTitle}</td>
                    <td><button class="like-button" data-url="${song.mp3url}" data-artist="${song.artist}" data-title="${song.songTitle}"><i class="fas fa-heart"></i></button></td>
                `;
                songListBody.appendChild(tr);

                tr.addEventListener('click', function (event) {
                    if (!event.target.classList.contains('like-button') && !event.target.classList.contains('play-button')) {
                        const audioPlayer = document.getElementById("audio-player");
                        resetPlayButtonIcons(); // Reset all play button icons
                        audioPlayer.src = song.mp3url;
                        audioPlayer.play();
                        updatePlayButtonIcons(song.mp3url, "fas fa-pause");

                        // Update the background of #song-col-2
                        const songCol2 = document.getElementById("song-col-2");
                        songCol2.style.backgroundImage = `url(${song.backgroundImageUrl})`;
                    }
                });
            });

            // ... rest of your existing code ...
        });
});

// ... rest of your existing functions ...

function resetPlayButtonIcons() {
    // ... your existing function code ...
}
