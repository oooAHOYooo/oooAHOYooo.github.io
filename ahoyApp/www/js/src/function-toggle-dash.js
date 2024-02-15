function toggleLeftDashboard() {
    const leftDashboard = document.querySelector('.left-dashboard');
    // Check if the dashboard is already hidden or not
    if (leftDashboard.style.display === 'none') {
        // If hidden, show the dashboard and apply styles for visible state
        leftDashboard.style.display = 'block';
        leftDashboard.style.width = '50px'; // Width when visible
        leftDashboard.style.transition = 'width 0.5s'; // Smooth transition for width
        leftDashboard.classList.add('glow'); // Add any additional styling
    } else {
        // If visible, hide the dashboard
        leftDashboard.style.display = 'none';
        leftDashboard.style.width = '0'; // Collapse width
        leftDashboard.style.transition = 'width 0.5s'; // Smooth transition for width
        leftDashboard.classList.remove('glow'); // Remove styling specific to visible state
    }
}


