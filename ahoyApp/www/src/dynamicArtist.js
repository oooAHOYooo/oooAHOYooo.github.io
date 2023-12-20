// Fetch the artist data
fetch("./data/artistCollection.json")
  .then((response) => response.json())
  .then((data) => {
    const artists = data.artists;
    const artistListContainer = document.getElementById("artists-tab");

    // Clear existing content
    artistListContainer.innerHTML = "";

    // Generate HTML for each artist
    artists.forEach((artist) => {
      const artistElement = document.createElement("div");
      artistElement.classList.add("artist-element");
      artistElement.innerHTML = `
        <h2>${artist.name}</h2>
        <img src="${artist.featuredImage}" alt="${artist.name}">
        <p>Location: ${artist.location}</p>
        <p>Show Dates: ${artist.showDates.join(", ")}</p>
        <a href="${artist.supportLink}">Support</a>
        <button class="share-button" onclick="shareArtist('${
          artist.artistUrl
        }')">Share</a>
        <a href="${artist.artistUrl}">Artist Page</a>
      `;
      artistListContainer.appendChild(artistElement);
    });
  })
  .catch((error) => console.error("Error:", error));

function shareArtist(url) {
  if (navigator.share) {
    navigator
      .share({
        title: "Check out this artist on Ahoy Indie Media",
        url: url,
      })
      .then(() => {
        console.log("Thanks for sharing!");
      })
      .catch(console.error);
  } else {
    // Fallback for browsers that do not support the Web Share API
    prompt("Copy this link:", url);
  }
}
