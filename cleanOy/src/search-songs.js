     document
        .getElementById("search-bar")
        .addEventListener("input", function (e) {
          const searchTerm = e.target.value.toLowerCase();
          const songs = document.querySelectorAll("#song-list li");
          songs.forEach((song) => {
            const title = song.textContent.toLowerCase();
            if (title.includes(searchTerm)) {
              song.style.display = "";
            } else {
              song.style.display = "none";
            }
          });
        });