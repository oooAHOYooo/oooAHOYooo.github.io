document.addEventListener("DOMContentLoaded", function () {
    fetch("./data/artistCollection.json")
      .then((response) => response.json())
      .then((data) => {
        const artistsTableBody = document.querySelector("#artists-table tbody");
        data.artists.forEach((artist) => {
          const row = document.createElement("tr");
  
          const nameCell = document.createElement("td");
          const locationCell = document.createElement("td");
          const typeCell = document.createElement("td");
          const supportCell = document.createElement("td");
  
          nameCell.textContent = artist.name;
          locationCell.textContent = artist.location;
          typeCell.textContent = artist.type; // Changed from showDates to type
  
          const supportLink = document.createElement("a");
          supportLink.href = artist.stripeLink; // Assuming you have a stripeLink field
          supportLink.textContent = "Support";
          supportLink.target = "_blank";
          supportCell.appendChild(supportLink);
  
          row.appendChild(nameCell);
          row.appendChild(locationCell);
          row.appendChild(typeCell);
          row.appendChild(supportCell);
  
          artistsTableBody.appendChild(row);
        });
      })
      .catch((error) => console.error("Error loading artist data:", error));
  });