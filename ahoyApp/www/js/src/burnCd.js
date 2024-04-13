document.addEventListener('DOMContentLoaded', function() {
  initInteractiveCheckpoints();
  initQueueManagement();
});

function initInteractiveCheckpoints() {
  // This might contain other initializations as needed
}

function initQueueManagement() {
  // Other queue management features could go here
}

// Function to add song to the burn list
function addSongToBurnList(songUrl, songTitle, artistName) {
  const burnList = document.getElementById("burn-list");
  const entry = document.createElement("div");
  entry.className = "burn-entry";
  entry.innerHTML = `<div>${songTitle} by ${artistName}</div><button onclick="removeSongFromBurnList(this)">Remove</button>`;
  burnList.appendChild(entry);
}

// Function to remove a song from the burn list
function removeSongFromBurnList(button) {
  const entry = button.parentNode;
  entry.parentNode.removeChild(entry);
}

// Event listener for the "Burn CD" button
document.getElementById('burn-cd-button').addEventListener('click', function() {
  // This would ideally handle the submission process, including emailing
  // Simulating an email action here with a console log
  console.log('Preparing to send email...');
  alert('Congrats! You have sent your playlist.');
});
