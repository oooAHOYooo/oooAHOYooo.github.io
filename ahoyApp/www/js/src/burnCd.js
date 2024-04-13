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
  const entry = document.createElement("tr");
  entry.className = "burn-entry";
  
  entry.innerHTML = `
    <td><button onclick="moveSong(this, -1)"><i class="fa fa-arrow-up"></i></button></td>
    <td><button onclick="moveSong(this, 1)"><i class="fa fa-arrow-down"></i></button></td>
    <td>${burnList.getElementsByTagName("tr").length + 1}</td>
    <td>${songTitle} by ${artistName}</td>
    <td><button onclick="removeSongFromBurnList(this)"><i class="fa fa-remove"></i></button></td>
  `;
  
  burnList.appendChild(entry);
}

// Function to move a song up or down
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

// Function to remove a song from the burn list
function removeSongFromBurnList(button) {
  const entry = button.parentNode.parentNode;
  entry.parentNode.removeChild(entry);
  updateOrderNumbers(); // Update the order numbers after removal
}

function updateOrderNumbers() {
  const rows = document.getElementById("burn-list").getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[2].innerText = i + 1; // Update the order number, now in the third cell
  }
}

// Event listener for the "Burn CD" button
document.getElementById('burn-cd-button').addEventListener('click', function() {
  console.log('Preparing to send email...');
  alert('Congrats! You have sent your playlist.');
});
