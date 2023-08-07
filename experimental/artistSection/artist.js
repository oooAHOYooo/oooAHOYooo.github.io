    const artists = [
      {
        name: "Artist A",
        area: "Painting",
        works: [
          { title: "Artwork 1", link: "#" },
          { title: "Artwork 2", link: "#" },
        ],
      },
      {
        name: "Artist B",
        area: "Sculpture",
        works: [
          { title: "Artwork 3", link: "#" },
          { title: "Artwork 4", link: "#" },
        ],
      },
      {
        name: "Artist C",
        area: "Photography",
        works: [
          { title: "Artwork 5", link: "#" },
          { title: "Artwork 6", link: "#" },
        ],
      },
      {
        name: "Artist D",
        area: "Installation",
        works: [
          { title: "Artwork 7", link: "#" },
          { title: "Artwork 8", link: "#" },
        ],
      },
      {
        name: "Artist E",
        area: "Mixed Media",
        works: [
          { title: "Artwork 9", link: "#" },
          { title: "Artwork 10", link: "#" },
        ],
      },
      {
        name: "Samuel Dylan Witch",
        area: "Musician",
        description: "samuel dylan witch is the best",
        works: [
          { title: "Artwork 9", link: "#" },
          { title: "Artwork 10", link: "#" },
        ],
      },
    ];

    function populateLeftMenu() {
      const leftMenu = document.getElementById("leftMenu");
      artists.forEach((artist) => {
        const artistLink = document.createElement("a");
        artistLink.href = "#";
        artistLink.textContent = artist.name;
        artistLink.addEventListener("click", () => {
          showArtist(artist);
        });
        leftMenu.appendChild(artistLink);
      });
    }

    function showArtist(artist) {
      const content = document.getElementById("content");
      content.innerHTML = "";

      const artistCard = document.createElement("div");
      artistCard.className = "artist-card";

      const artistName = document.createElement("h2");
      artistName.className = "artist-name";
      artistName.textContent = artist.name;

      const artistArea = document.createElement("p");
      artistArea.className = "artist-area";
      artistArea.textContent = `Area: ${artist.area}`;

      const artistWorks = document.createElement("div");
      artistWorks.className = "artist-works";
      artist.works.forEach((work) => {
        const workBlock = document.createElement("div");

        const workTitle = document.createElement("h3");
        workTitle.textContent = work.title;

        const workLink = document.createElement("a");
        workLink.href = work.link;
        workLink.textContent = "View Artwork";

        workBlock.appendChild(workTitle);
        workBlock.appendChild(workLink);
        artistWorks.appendChild(workBlock);
      });

      artistCard.appendChild(artistName);
      artistCard.appendChild(artistArea);
      artistCard.appendChild(artistWorks);
      content.appendChild(artistCard);
    }

    function search() {
      const searchTerm = document.getElementById("searchBar").value;
      // Perform search logic here
      console.log(`Search term: ${searchTerm}`);
    }

    populateLeftMenu();