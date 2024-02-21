document.getElementById('user-icon-input').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // Set the src attribute for the user icon
      document.getElementById('user-icon').src = e.target.result;
      // Set the background image of the tab and ensure it fills the screen without repeating
      document.body.style.backgroundImage = `url('${e.target.result}')`;
      document.body.style.backgroundSize = 'cover'; // Make the image cover the entire screen
      document.body.style.backgroundRepeat = 'no-repeat'; // Prevent the image from repeating
      document.body.style.backgroundPosition = 'center'; // Center the background image
    };
    reader.readAsDataURL(file);
  }
});
