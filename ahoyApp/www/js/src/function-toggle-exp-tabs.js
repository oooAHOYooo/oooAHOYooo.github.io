function toggleExperimentalFeatures() {
    const isExperimentalEnabled = document.getElementById('experimental-toggle').checked;
    const experimentalTabs = ['game-tab', 'account-tab', 'search-tab'];
    const experimentalDockIcons = ['game-dock-icon', 'account-dock-icon', 'search-dock-icon'];

    experimentalTabs.forEach(tabId => {
        const tab = document.getElementById(tabId);
        if (tab) {
            tab.style.display = isExperimentalEnabled ? 'block' : 'none';
        }
    });

    experimentalDockIcons.forEach(iconId => {
        const icon = document.getElementById(iconId);
        if (icon) {
            icon.style.display = isExperimentalEnabled ? 'block' : 'none';
        }
    });
}

// Initialize the visibility based on the toggle state on page load
document.addEventListener('DOMContentLoaded', () => {
    toggleExperimentalFeatures();
});