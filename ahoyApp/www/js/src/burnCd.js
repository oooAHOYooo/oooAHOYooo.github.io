document.addEventListener('DOMContentLoaded', function() {
  // Correct the path to match the location of the JSON file
  fetch('data_static/cdBurn-instructions.json')
    .then(response => response.json())
    .then(data => {
      displayInstructions(data.instructions);
      // Assuming you want to handle the confirmation message as well
      handleConfirmation(data.confirmation);
    })
    .catch(error => console.error('Error loading CD burn instructions:', error));

  // Initialize interactive checkpoints and queue management features
  initInteractiveCheckpoints();
  initQueueManagement();
});

function displayInstructions(instructions) {
  const instructionsElement = document.getElementById('burn-instructions');
  instructions.forEach(instruction => {
    const step = document.createElement('li');
    step.textContent = instruction;
    instructionsElement.appendChild(step);
  });
}

function handleConfirmation(confirmationMessage) {
  // Implement how you want to handle/display the confirmation message
  const confirmationElement = document.getElementById('burn-confirmation');
  confirmationElement.textContent = confirmationMessage;
}

function initInteractiveCheckpoints() {
  // Implement interactive checkpoints here
}

function initQueueManagement() {
  // Implement queue management features here
}

// Existing event listener for the "Burn CD" button
document.getElementById('burn-cd-button').addEventListener('click', function() {
  // Implementation for submitting the CD burn request
});
