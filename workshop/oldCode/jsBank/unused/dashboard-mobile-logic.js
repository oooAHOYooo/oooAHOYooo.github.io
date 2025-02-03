document.addEventListener('DOMContentLoaded', function() {
    // Check if the device is mobile
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        let hoverTimeout;

        const leftDashboard = document.querySelector('.left-dashboard');
        const rightDashboard = document.querySelector('.right-dashboard');

        // Function to remove expanded class
        const removeExpanded = () => {
            leftDashboard.classList.remove('expanded');
            rightDashboard.classList.remove('expanded');
        };

        // Add touchstart event listeners to both dashboards
        [leftDashboard, rightDashboard].forEach(dashboard => {
            dashboard.addEventListener('touchstart', () => {
                // Add 'expanded' class on touch
                dashboard.classList.add('expanded');

                // Clear any existing timeout to prevent premature removal
                clearTimeout(hoverTimeout);

                // Set timeout to remove 'expanded' class after 1 second of inactivity
                hoverTimeout = setTimeout(() => {
                    removeExpanded();
                }, 1000); // 1 second delay
            });
        });

        // Optional: Add touchmove event listener if you want to collapse the dashboards when the user scrolls
        document.addEventListener('touchmove', () => {
            clearTimeout(hoverTimeout);
            removeExpanded();
        });
    }
});