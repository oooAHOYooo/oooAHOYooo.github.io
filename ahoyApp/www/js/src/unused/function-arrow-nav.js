document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-content'); // Select all tabs
    let currentTabIndex = 0; // Start with the first tab
    const tabIndicator = document.querySelector('.tab-indicator'); // Select the tab indicator

    // Function to show a specific tab and hide others
    function showTab(index) {
        tabs.forEach((tab, i) => {
            tab.classList.toggle('active', i === index);
            if (i === index) {
                tabIndicator.style.left = `${tab.offsetLeft}px`; // Update the tab indicator's position
                tabIndicator.style.width = `${tab.offsetWidth}px`; // Update the tab indicator's width
            }
        });
    }

    // Function to find the index of the Home tab
    function findHomeTabIndex() {
        return Array.from(tabs).findIndex(tab => tab.id === 'home-tab');
    }

    // Set the Home tab as the default active tab
    currentTabIndex = findHomeTabIndex();
    showTab(currentTabIndex);

    // Attach event listeners to left and right arrow buttons
    document.getElementById('super-left-arrow').addEventListener('click', function () {
        currentTabIndex = (currentTabIndex - 1 + tabs.length) % tabs.length; // Move to the previous tab, wrapping around
        showTab(currentTabIndex);
    });

    document.getElementById('super-right-arrow').addEventListener('click', function () {
        currentTabIndex = (currentTabIndex + 1) % tabs.length; // Move to the next tab, wrapping around
        showTab(currentTabIndex);
    });
});