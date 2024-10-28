document.addEventListener('DOMContentLoaded', function() {
  initInteractiveCheckpoints();
  initQueueManagement();
  document.getElementById("burn-list").style.width = "100%";
  createInputFieldAndSaveButton();
  setupCdSaveFunctionality(); // Setup the functionality to save CD names
  setupCheckoutFunctionality(); // Setup the functionality for checkout
});


function createInputFieldAndSaveButton() {
  const container = document.getElementById("input-container"); // Assuming there's a div with id="input-container"
  
  // Create input field for song URL
  const songUrlInput = document.createElement("input");
  songUrlInput.setAttribute("type", "text");
  songUrlInput.setAttribute("placeholder", "Song URL");
  songUrlInput.id = "song-url-input";
  
  // Create input field for song title
  const songTitleInput = document.createElement("input");
  songTitleInput.setAttribute("type", "text");
  songTitleInput.setAttribute("placeholder", "Song Title");
  songTitleInput.id = "song-title-input";
  
  // Create input field for artist name
  const artistNameInput = document.createElement("input");
  artistNameInput.setAttribute("type", "text");
  artistNameInput.setAttribute("placeholder", "Artist Name");
  artistNameInput.id = "artist-name-input";
  
  // Create save button
  const saveButton = document.createElement("button");
  saveButton.innerText = "Save Song";
  saveButton.addEventListener("click", function() {
    const songUrl = document.getElementById("song-url-input").value;
    const songTitle = document.getElementById("song-title-input").value;
    const artistName = document.getElementById("artist-name-input").value;
    addSongToBurnList(songUrl, songTitle, artistName);
  });
  
  // Append elements to the container
  container.appendChild(songUrlInput);
  container.appendChild(songTitleInput);
  container.appendChild(artistNameInput);
  container.appendChild(saveButton);
}

function setupCdSaveFunctionality() {
    const saveButton = document.getElementById("save-cd-button");
    saveButton.addEventListener("click", function() {
        const cdNameInput = document.getElementById("cd-name-input");
        const cdName = cdNameInput.value.trim();
        if (cdName) {
            // Display the CD name and its contents
            displayCdAndContents(cdName);
            cdNameInput.value = ''; // Clear input field after saving
        } else {
            alert("Please enter a CD name.");
        }
    });
}

function displayCdAndContents(cdName) {
    const burnList = document.getElementById("burn-list");
    const entries = burnList.getElementsByTagName("tr");
    const displayArea = document.getElementById("cd-display-area"); // Ensure this div exists in your HTML

    // Clear the current display
    displayArea.innerHTML = '';

    // Create elements to display CD name and its contents
    const cdNameElement = document.createElement("h3");
    cdNameElement.textContent = `CD Name: ${cdName}`;
    displayArea.appendChild(cdNameElement);

    const songListElement = document.createElement("ul");

    // Limit the number of songs displayed to 12
    const maxSongs = 12;
    for (let i = 0; i < entries.length && i < maxSongs; i++) {
        const songTitle = entries[i].querySelector("td:nth-child(4)").textContent;
        const songItem = document.createElement("li");
        songItem.textContent = songTitle;
        songListElement.appendChild(songItem);
    }
    displayArea.appendChild(songListElement);
}

function formatLength(totalSeconds) {
    if (totalSeconds <= 0) {
        return '0h 0m 0s'; // Return a default format if the length is zero or undefined
    }
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    const seconds = totalSeconds - (hours * 3600) - (minutes * 60);

    return `${hours}h ${minutes}m ${seconds}s`;
}

function setupCheckoutFunctionality() {
  const checkoutButton = document.getElementById("checkout-button");
  checkoutButton.addEventListener("click", function() {
    const savedCdList = document.getElementById("saved-cd-list");
    const cds = [];
    for (let i = 0; i < savedCdList.children.length; i++) {
      cds.push(savedCdList.children[i].textContent);
    }
    // Here you can handle the checkout process, e.g., sending CD names to a server or redirecting to a payment page
    console.log("CDs to checkout:", cds);
    alert("Checkout process initiated for CDs: " + cds.join(", "));
    // Example: Redirect to a checkout page
    // window.location.href = '/checkout.html?cds=' + encodeURIComponent(cds.join(","));
  });
}

function addSongToBurnList(songUrl, songTitle, artistName, songLengthInSeconds, songIndex) {
  const burnList = document.getElementById("burn-list");
  const entry = document.createElement("tr");
  entry.className = "burn-entry";
  entry.setAttribute("data-length", songLengthInSeconds); // Ensure this attribute is meaningful
  entry.setAttribute("data-song-index", songIndex); // Set the song index

  const songLengthFormatted = formatLength(songLengthInSeconds);

  entry.innerHTML = `
    <td>${burnList.getElementsByTagName("tr").length + 1}</td>
    <td>${songTitle} by ${artistName}</td>
    <td><button onclick="moveSong(this, -1)"><i class="fa fa-arrow-up"></i></button></td>
    <td><button onclick="moveSong(this, 1)"><i class="fa fa-arrow-down"></i></button></td>
    <td><button onclick="removeSongFromBurnList(this)"><i class="fa fa-remove"></i></button></td>
  `;
  
  burnList.appendChild(entry);
}

function moveSong(button, direction) {
  const currentRow = button.parentNode.parentNode;
  let targetRow;
  if (direction === -1) {
    targetRow = currentRow.previousElementSibling;
    if (targetRow) {
      currentRow.parentNode.insertBefore(currentRow, targetRow);
    }
  } else {
    targetRow = currentRow.nextElementSibling;
    if (targetRow) {
      currentRow.parentNode.insertBefore(targetRow, currentRow);
    }
  }
  updateOrderNumbers(); // Update the order numbers after moving
}

function removeSongFromBurnList(button) {
    const entry = button.parentNode.parentNode;
    const songIndex = entry.getAttribute('data-song-index'); // Ensure each entry has a 'data-song-index' attribute corresponding to its index in the song list

    // Remove the song entry from the burn list
    entry.parentNode.removeChild(entry);
    updateOrderNumbers(); // Update the order numbers after removal

    // Reset the burn icon in the song list
    const songListTable = document.getElementById("song-list");
    const songRows = songListTable.getElementsByTagName("tr");
    const burnIconCell = songRows[songIndex].getElementsByClassName("burn-icon")[0];
    burnIconCell.innerHTML = '<i class="fa fa-fire" aria-hidden="true"></i>';
}

function updateOrderNumbers() {
  const rows = document.getElementById("burn-list").getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[0].innerText = i + 1; // Update the order number, now in the first cell
  }
}

// Event listener for the "Burn CD" button
document.getElementById('burn-cd-button').addEventListener('click', function() {
  console.log('Preparing to send email...');
  alert('Congrats! You have sent your playlist.');
});

window.addSongToBurnList = addSongToBurnList;

