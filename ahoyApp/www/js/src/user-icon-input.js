document.getElementById('user-icon-input').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      // Set the src attribute for the user icon
      document.getElementById('user-icon').src = e.target.result;
      // Also set the background image of the tab
      document.body.style.backgroundImage = `url('${e.target.result}')`;
    };
    reader.readAsDataURL(file);
  }
});
