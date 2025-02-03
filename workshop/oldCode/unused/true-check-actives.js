document.addEventListener('DOMContentLoaded', function() {
    const dockIcons = document.querySelectorAll('.v25-dock-icon');
    const tabContents = document.querySelectorAll('.tab-content');

    function updateActiveTab() {
        // Find the active tab
        const activeTab = document.querySelector('.tab-content.active');
        if (!activeTab) return;

        // Get the ID of the active tab
        const activeTabId = activeTab.id;

        // Remove active class from all dock icons
        dockIcons.forEach(icon => {
            icon.classList.remove('active');
        });

        // Find the corresponding dock icon and add active class
        const activeIcon = document.querySelector(`.v25-dock-icon[onclick*="${activeTabId}"]`);
        if (activeIcon) {
            activeIcon.classList.add('active');
        }
    }

    // Initial check
    updateActiveTab();

    // Add click event listeners to dock icons
    dockIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            // Small delay to allow for tab change
            setTimeout(updateActiveTab, 50);
        });
    });

    // Optional: If tabs can be changed by other means, you might want to use a MutationObserver
    const observer = new MutationObserver(updateActiveTab);
    tabContents.forEach(tab => {
        observer.observe(tab, { attributes: true, attributeFilter: ['class'] });
    });
});