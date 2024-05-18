document.addEventListener("DOMContentLoaded", () => {
    // Check if the loading screen should be displayed
    if (!localStorage.getItem('loadingDisplayed')) {
        // Create loading screen elements
        const loadingScreen = document.createElement('div');
        loadingScreen.id = 'loading-screen';
        loadingScreen.style.position = 'fixed';
        loadingScreen.style.width = '100%';
        loadingScreen.style.height = '100%';
        loadingScreen.style.top = '0';
        loadingScreen.style.left = '0';
        loadingScreen.style.backgroundColor = 'rgba(0,0,0,0.5)'; // Semi-transparent background
        loadingScreen.style.zIndex = '1000'; // Make sure it covers other content
        loadingScreen.style.display = 'flex';
        loadingScreen.style.justifyContent = 'center';
        loadingScreen.style.alignItems = 'center';

        const logo = document.createElement('img');
        logo.src = './img/assets/u_ahoy23.png';
        loadingScreen.appendChild(logo);

        const spinner = document.createElement('div');
        spinner.className = 'spinner';
        loadingScreen.appendChild(spinner);

        document.body.appendChild(loadingScreen);

        // Ensure the loading screen is displayed for at least 2 seconds
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            localStorage.setItem('loadingDisplayed', 'true'); // Set flag as displayed
        }, 5000);
    }
});

// Reset the loading display flag on page unload so it shows again on refresh
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('loadingDisplayed');
});
});
