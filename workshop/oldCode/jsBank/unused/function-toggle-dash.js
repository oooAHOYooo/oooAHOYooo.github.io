function toggleLeftDashboard() {
    const leftDashboard = document.querySelector('.left-dashboard');
    const tabContent = document.querySelectorAll('.tab-content, .tab-content.active');
    // Toggle dashboard visibility
    if (leftDashboard.style.display === 'none') {
        // If hidden, show the dashboard and adjust styles for visible state
        leftDashboard.style.display = 'block';
        leftDashboard.style.width = '50px';
        leftDashboard.style.transition = 'width 0.5s';
        leftDashboard.classList.add('glow');
        // Adjust tab content margin when dashboard is visible again
        tabContent.forEach(tab => {
            tab.style.marginLeft = '52.5px';
        });
    } else {
        // If visible, hide the dashboard and adjust tab content margin
        leftDashboard.style.display = 'none';
        leftDashboard.style.width = '0';
        leftDashboard.style.transition = 'width 0.5s';
        leftDashboard.classList.remove('glow');
        // Reset tab content margin to closer state when dashboard is hidden
        tabContent.forEach(tab => {
            tab.style.marginLeft = '22.5px';
        });
    }
}

function toggleRightDashboard() {
    const rightDashboard = document.querySelector('.right-dashboard');
    const tabContent = document.querySelectorAll('.tab-content, .tab-content.active');
    // Toggle dashboard visibility
    if (rightDashboard.style.display === 'none') {
        // If hidden, show the dashboard and adjust styles for visible state
        rightDashboard.style.display = 'block';
        rightDashboard.style.width = '50px';
        rightDashboard.style.transition = 'width 0.5s';
        rightDashboard.classList.add('glow');
        // Adjust tab content margin when dashboard is visible again
        tabContent.forEach(tab => {
            tab.style.marginRight = '52.5px';
        });
    } else {
        // If visible, hide the dashboard and adjust tab content margin
        rightDashboard.style.display = 'none';
        rightDashboard.style.width = '0';
        rightDashboard.style.transition = 'width 0.5s';
        rightDashboard.classList.remove('glow');
        // Reset tab content margin to closer state when dashboard is hidden
        tabContent.forEach(tab => {
            tab.style.marginRight = '22.5px';
        });
    }
}