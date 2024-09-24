document.addEventListener("DOMContentLoaded", () => {
    // Check if the loading screen should be displayed
    if (!localStorage.getItem('loadingDisplayed')) {
        // Create loading screen elements
        const loadingScreen = document.createElement('div');
        loadingScreen.id = 'loading-screen';
        loadingScreen.style.cssText = `
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(0,0,0,0.5); /* Dark background */
            backdrop-filter: blur(8px); /* Glass effect */
            z-index: 1000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        `;

        const logo = document.createElement('img');
        logo.src = './img/assets/u_ahoy23.png';
        logo.style.marginBottom = '20px'; // Space between logo and message
        loadingScreen.appendChild(logo);

        const message = document.createElement('div');
        message.textContent = " ";
        message.className = 'loading-message';
        message.style.color = 'white'; // Ensuring text is visible on dark background
        loadingScreen.appendChild(message);

        document.body.appendChild(loadingScreen);

        // Use window load event to ensure everything is loaded
        window.addEventListener('load', () => {
            loadingScreen.style.display = 'none';
            localStorage.setItem('loadingDisplayed', 'true'); // Set flag as displayed
        });
    }
});

// Reset the loading display flag on page unload so it shows again on refresh
window.addEventListener('beforeunload', () => {
    localStorage.removeItem('loadingDisplayed');
});
