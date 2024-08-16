  document.addEventListener('DOMContentLoaded', function() {
    const rightToggleButton = document.getElementById('right-toggle-button');
    const rightSidebar = document.getElementById('right-sidebar');

    rightToggleButton.addEventListener('click', function() {
      if (rightSidebar.style.display === 'none') {
        rightSidebar.style.display = 'block';
      } else {
        rightSidebar.style.display = 'none';
      }
    });

    // ... existing event listener for play-fullscreen-button ...
  });