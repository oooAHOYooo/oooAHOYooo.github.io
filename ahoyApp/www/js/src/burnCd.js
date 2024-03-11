document.getElementById('burn-cd-button').addEventListener('click', function() {
  // Simulate burning process
  document.getElementById('burn-status').textContent = 'Processing your CD burn request...';

  // Simulate email sending (replace with actual backend call)
  setTimeout(() => {
    document.getElementById('burn-status').textContent = 'Your CD burn request has been received. You will be contacted for payment and shipping details.';
    // Here you would typically make an AJAX call to your backend to send the email
  }, 2000);
});

// Example usage: Load this script in your index.html