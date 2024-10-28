// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get the warning banner element
    var banner = document.getElementById('warning-banner');
    
    if (banner) {
      // Show the banner immediately
      banner.classList.add('show');

      // Hide the banner after 4 seconds
      setTimeout(function() {
        // Add a class to trigger a smooth exit animation
        banner.classList.add('exit');
        
        // After the exit animation (500ms), remove the banner from the DOM
        setTimeout(function() {
          banner.parentNode.removeChild(banner);
        }, 500);
      }, 4000);
  
      // Add click event listener to the close button
      banner.querySelector('button').addEventListener('click', function() {
        // Add the exit class to start the smooth exit animation
        banner.classList.add('exit');
        
        // After the exit animation (500ms), remove the banner from the DOM
        setTimeout(function() {
          banner.parentNode.removeChild(banner);
        }, 500);
      });
    }
});