document.addEventListener('DOMContentLoaded', function() {
  initInteractiveCheckpoints();
  initQueueManagement();
  enableDragAndDrop();
});

function initInteractiveCheckpoints() {
  // This might contain other initializations as needed
}

function initQueueManagement() {
  // Other queue management features could go here
}

function enableDragAndDrop() {
  const burnList = document.getElementById("burn-list");
  // Make each row draggable
  burnList.addEventListener('dragstart', (e) => {
    e.target.classList.add('dragging');
  });

  burnList.addEventListener('dragend', (e) => {
    e.target.classList.remove('dragging');
    updateOrderNumbers();
  });

  burnList.addEventListener('dragover', (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(burnList, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null) {
      burnList.appendChild(draggable);
    } else {
      burnList.insertBefore(draggable, afterElement);
    }
  });
}

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.burn-entry:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function updateOrderNumbers() {
  const rows = document.getElementById("burn-list").getElementsByTagName("tr");
  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[0].innerText = i + 1; // Update the order number
  }
}

// Function to add song to the burn list
function addSongToBurnList(songUrl, songTitle, artistName) {
  const burnList = document.getElementById("burn-list");
  const entry = document.createElement("tr");
  entry.className = "burn-entry";
  entry.setAttribute('draggable', true); // Make the row draggable
  
  entry.innerHTML = `
    <td>${burnList.getElementsByTagName("tr").length + 1}</td>
    <td>${songTitle} by ${artistName}</td>
    <td><button onclick="removeSongFromBurnList(this)"><i class="fa fa-remove"></i></button></td>
  `;
  
  burnList.appendChild(entry);
}

// Function to remove a song from the burn list
function removeSongFromBurnList(button) {
  const entry = button.parentNode.parentNode;
  entry.parentNode.removeChild(entry);
  updateOrderNumbers(); // Update the order numbers after removal
}

// Event listener for the "Burn CD" button
document.getElementById('burn-cd-button').addEventListener('click', function() {
  console.log('Preparing to send email...');
  alert('Congrats! You have sent your playlist.');
});
