function navigateToTab(tabId) {
  // Hide all tabs
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });
  // Show the selected tab
  const selectedTab = document.getElementById(tabId);
  selectedTab.style.display = 'block';

  // Scroll the selected tab into view at the top of the viewport
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Highlight the active tab icon and flash the label on mobile
  document.querySelectorAll('.left-dashboard button, .right-dashboard button').forEach(button => {
    const icon = button.querySelector('i');
    const label = button.querySelector('span');
    if (button.getAttribute('onclick').includes(tabId)) {
      // Highlight icon
      icon.style.color = '#FFD700'; // Gold color for the active icon
      // Flash label
      label.style.visibility = 'visible';
      label.style.opacity = '1';
      setTimeout(() => {
        label.style.opacity = '0';
        setTimeout(() => {
          label.style.visibility = 'hidden';
        }, 500); // Wait for half a second before hiding the label
      }, 1000); // Label visible for 1 second
    } else {
      // Reset other icons and labels
      icon.style.color = ''; // Reset to default color
      label.style.visibility = 'hidden';
      label.style.opacity = '0';
    }
  });

  // Update tab indicator
  const tabIndicator = document.getElementById('tab-indicator');
  if (tabIndicator) {
    // Extracting a more readable name from the tabId, assuming the naming convention is 'xxx-tab'
    const readableName = tabId.replace('-tab', '').replace(/-/g, ' ');
    tabIndicator.textContent = readableName.charAt(0).toUpperCase() + readableName.slice(1);
  }
}