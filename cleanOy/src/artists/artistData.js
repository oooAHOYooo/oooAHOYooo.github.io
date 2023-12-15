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
});
