     document.addEventListener("DOMContentLoaded", function () {
        fetch("./data/songCollection.json")
          .then((response) => response.json())
          .then((data) => {
            const songList = document.getElementById("song-list");
            songList.innerHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Artist</th>
                            <th>Song</th>
                            <th>Play</th>
                            <th>Like</th>
                        </tr>
                    </thead>
                    <tbody id="song-list-body">
                    </tbody>
                </table>
            `;

            const songListBody = document.getElementById("song-list-body");
            data.songs.forEach((song) => {
              const tr = document.createElement("tr");
              tr.innerHTML = `
                    <td>${song.artist}</td>
                    <td class="song-title" data-url="${song.mp3url}" data-artist="${song.artist}" data-title="${song.songTitle}">${song.songTitle}</td>
                    <td><button class="play-button" data-url="${song.mp3url}" data-artist="${song.artist}" data-title="${song.songTitle}"><i class="fas fa-play"></i></button></td>
                    <td><button class="like-button"><i class="fas fa-heart"></i></button></td>
                `;
              songListBody.appendChild(tr);
            });

            const audioPlayer = document.getElementById("audio-player");
            const playButtons = document.querySelectorAll(".play-button");
            const songTitles = document.querySelectorAll(".song-title");

            //THE PLAY FUNCTION
            const playSong = function () {
              const url = this.dataset.url;
              const artist = this.dataset.artist;
              const title = this.dataset.title;
              const playButtons = document.querySelectorAll(".play-button");
              const bottomPlayButton = document.querySelector("#play");
              const bottomPlayIcon = bottomPlayButton.querySelector("i");

              if (audioPlayer.src === url) {
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
              } else {
                audioPlayer.src = url;
                audioPlayer.play();
                playButtons.forEach((button) => {
                  if (button.dataset.url === url) {
                    button.querySelector("i").className = "fas fa-pause";
                  } else {
                    button.querySelector("i").className = "fas fa-play";
                  }
                });
                bottomPlayIcon.className = "fas fa-pause";
              }

              // Update bottom controller and now playing tab
              document.getElementById("artist-name").textContent = artist;
              document.getElementById("song-title").textContent = title;
              document.getElementById("current-song-title").textContent =
                title;
              document.getElementById("current-song-artist").textContent =
                artist;
            };

            playButtons.forEach((button) => {
              button.addEventListener("click", playSong);
            });

            songTitles.forEach((title) => {
              title.addEventListener("click", playSong);
              title.addEventListener("dblclick", function () {
                if (!audioPlayer.paused) {
                  audioPlayer.pause();
                }
              });
            });

            // Add event listener to bottom controller play button
            const bottomPlayButton = document.querySelector("#play");
            bottomPlayButton.addEventListener("click", function () {
              const playButtons = document.querySelectorAll(".play-button");
              if (audioPlayer.paused) {
                audioPlayer.play();
                this.querySelector("i").className = "fas fa-pause";
                playButtons.forEach((button) => {
                  if (button.dataset.url === audioPlayer.src) {
                    button.querySelector("i").className = "fas fa-pause";
                  }
                });
              } else {
                audioPlayer.pause();
                this.querySelector("i").className = "fas fa-play";
                playButtons.forEach((button) => {
                  if (button.dataset.url === audioPlayer.src) {
                    button.querySelector("i").className = "fas fa-play";
                  }
                });
              }
            });

            // Add event listener for when the song ends
            audioPlayer.addEventListener("ended", function () {
              const playButtons = document.querySelectorAll(".play-button");
              const bottomPlayButton = document.querySelector("#play");
              const bottomPlayIcon = bottomPlayButton.querySelector("i");

              // Change all play button icons in the song list to 'play'
              playButtons.forEach((button) => {
                button.querySelector("i").className = "fas fa-play";
              });

              // Change the bottom controller play button icon to 'play'
              bottomPlayIcon.className = "fas fa-play";
            });

            //END OF PLAY FEATURE

            //NOW PLAYING STUFF//

            // Get the buttons from the "Now Playing" tab
            const nowPlayingPrevButton = document.querySelector(
              "#nowplaying-tab .control-button#prev"
            );
            const nowPlayingPlayPauseButton = document.querySelector(
              "#nowplaying-tab .control-button#play-pause"
            );
            const nowPlayingNextButton = document.querySelector(
              "#nowplaying-tab .control-button#next"
            );

            // Get the buttons from the bottom play controller
            const bottomPrevButton = document.querySelector(
              ".player-button#prev"
            );
            const bottomPlayPauseButton = document.querySelector(
              ".player-button#play"
            );
            const bottomNextButton = document.querySelector(
              ".player-button#next"
            );

            // Add event listeners to the "Now Playing" buttons that trigger the click events of the corresponding bottom play controller buttons
            nowPlayingPrevButton.addEventListener("click", () =>
              bottomPrevButton.click()
            );
            nowPlayingPlayPauseButton.addEventListener("click", () =>
              bottomPlayPauseButton.click()
            );
            nowPlayingNextButton.addEventListener("click", () =>
              bottomNextButton.click()
            );

            //TIMELINE FEATURE (Needs work)

            // Display the timeline and time remaining on songs
            audioPlayer.addEventListener("timeupdate", function () {
              const currentTime = audioPlayer.currentTime;
              const duration = audioPlayer.duration;
              const timeRemaining = duration - currentTime;
              // Display the timeline and time remaining
              document.getElementById("current-time").textContent =
                currentTime;
              document.getElementById("time-remaining").textContent =
                timeRemaining;
            });
          });
      });

      //PREVIOUS AND NEXT FEATURE //

      //LIKE FEATURE //

      // Select like buttons from both song and podcast tables
      const songLikeButtons = document.querySelectorAll(
        "#song-list .like-button"
      );
      const podcastLikeButtons = document.querySelectorAll(
        "#podcast-table .like-button"
      );

      // Combine both NodeLists into an array
      const likeButtons = [...songLikeButtons, ...podcastLikeButtons];

      likeButtons.forEach((button) => {
        button.addEventListener("click", function () {
          this.classList.toggle("liked");
          const likedSongsTable =
            document.getElementById("liked-songs-table");
          const songRow = this.parentElement.parentElement.cloneNode(true);
          songRow.querySelector(".like-button").remove();
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
            songRow.appendChild(removeCell);
            likedSongsTable.appendChild(songRow);

            // Add event listener to play button in the cloned row
            const playButton = songRow.querySelector(".play-button");
            playButton.addEventListener("click", playSong);
          } else {
            const rows = Array.from(likedSongsTable.children);
            const index = rows.findIndex(
              (tr) => tr.textContent === songRow.textContent
            );
            likedSongsTable.removeChild(rows[index]);
          }
        });
      });
