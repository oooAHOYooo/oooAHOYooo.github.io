  document.addEventListener('DOMContentLoaded', function() {
        function toggleSidebars() {
          var sidedock = document.getElementById('sidedock');
          var rightSidebar = document.getElementById('right-sidebar');
          if (window.innerWidth > 1024) {
            sidedock.style.left = '0px';
            rightSidebar.style.display = 'block';
          } else {
            sidedock.style.left = '-100%';
            rightSidebar.style.display = 'none';
          }
        }

        toggleSidebars();
        window.addEventListener('resize', toggleSidebars);

        document.getElementById('toggle-button').addEventListener('click', function() {
          if (sidedock.style.left === '0px') {
            sidedock.style.left = '-100%'; // Hide sidebar
          } else {
            sidedock.style.left = '0px'; // Show sidebar
          }
        });

        document.getElementById('right-toggle-button').addEventListener('click', function() {
          if (rightSidebar.style.display === 'block') {
            rightSidebar.style.display = 'none'; // Hide sidebar
          } else {
            rightSidebar.style.display = 'block'; // Show sidebar
          }
        });
      });