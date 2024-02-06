    function navigateToTab(tabId) {
      // Hide all tabs
      document.querySelectorAll('.tab-content').forEach(tab => {
        tab.style.display = 'none';
      });
      // Show the selected tab
      document.getElementById(tabId).style.display = 'block';
    }

