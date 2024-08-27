document.addEventListener('DOMContentLoaded', function() {
  const rightToggleButton = document.getElementById('right-toggle-button');
  const rightSidebar = document.getElementById('right-sidebar');

  function toggleRightSidebar() {
    if (window.innerWidth > 1024) {
      rightSidebar.style.display = 'block';
      rightSidebar.style.right = '0';
    } else {
      rightSidebar.style.display = 'none';
      rightSidebar.style.right = '-250px';
    }
  }

  toggleRightSidebar();
  window.addEventListener('resize', toggleRightSidebar);

  rightToggleButton.addEventListener('click', function() {
    if (rightSidebar.style.display === 'none' || rightSidebar.style.right === '-250px') {
      rightSidebar.style.display = 'block';
      rightSidebar.style.right = '0';
    } else {
      rightSidebar.style.right = '-250px';
      setTimeout(() => {
        rightSidebar.style.display = 'none';
      }, 300); // Match this to your CSS transition time
    }
  });
});
