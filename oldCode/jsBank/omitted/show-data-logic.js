document.addEventListener("DOMContentLoaded", function () {
  fetch("../data/artistCollection.json")
    .then((response) => response.json())
    .then((data) => {
      const artistsWithShows = data.artists.filter((artist) => artist.shows && artist.shows.length > 0);
      if (artistsWithShows.length > 0) {
        const table = document.createElement("table");
        table.className = "shows-table";
        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        const artistHeader = document.createElement("th");
        artistHeader.textContent = "Artist";
        headerRow.appendChild(artistHeader);

        const showDateHeader = document.createElement("th");
        showDateHeader.textContent = "Show Dates";
        headerRow.appendChild(showDateHeader);

        const locationHeader = document.createElement("th");
        locationHeader.textContent = "Location";
        headerRow.appendChild(locationHeader);

        const linkHeader = document.createElement("th");
        linkHeader.textContent = "More Info";
        headerRow.appendChild(linkHeader);

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement("tbody");

        artistsWithShows.forEach((artist) => {
          artist.shows.forEach((show) => {
            const row = document.createElement("tr");

            const artistCell = document.createElement("td");
            artistCell.textContent = artist.name;
            row.appendChild(artistCell);

            const dateCell = document.createElement("td");
            dateCell.textContent = show.date;
            row.appendChild(dateCell);

            const locationCell = document.createElement("td");
            locationCell.textContent = show.location;
            row.appendChild(locationCell);

            const linkCell = document.createElement("td");
            const infoLink = document.createElement("a");
            infoLink.href = show.link;
            infoLink.textContent = "Info";
            infoLink.target = "_blank";
            linkCell.appendChild(infoLink);
            row.appendChild(linkCell);

            tbody.appendChild(row);
          });
        });

        table.appendChild(tbody);
        document.getElementById("shows-tab").appendChild(table);
      }
    })
    .catch((error) => console.error("Error loading artist shows data:", error));
});