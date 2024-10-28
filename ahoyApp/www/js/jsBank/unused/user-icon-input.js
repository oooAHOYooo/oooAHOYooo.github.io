let lastBackgroundImageUrl = null; // Store the last background image URL

document.getElementById('user-icon-input').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // Set the src attribute for the user icon
      document.getElementById('user-icon').src = e.target.result;
      // Update the background image
      updateBackgroundImage(e.target.result);
    };
    reader.readAsDataURL(file);
  }
});

// Function to update the background image
function updateBackgroundImage(imageUrl) {
  lastBackgroundImageUrl = imageUrl; // Store the last image URL
  document.body.style.backgroundImage = `url('${imageUrl}')`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundPosition = 'center';
}

// Function to toggle the background image
function toggleBackgroundImage() {
  if (document.body.style.backgroundImage !== 'none') {
    // If there's a background image, clear it
    document.body.style.backgroundImage = 'none';
  } else if (lastBackgroundImageUrl) {
    // If there's a stored image URL, reapply it
    updateBackgroundImage(lastBackgroundImageUrl);
  } else {
    // If there's no stored image URL, prompt the user to select an image
    document.getElementById('user-icon-input').click();
  }
}

// Add the toggleBackgroundImage function to the window object to make it accessible from the HTML
window.toggleBackgroundImage = toggleBackgroundImage;
