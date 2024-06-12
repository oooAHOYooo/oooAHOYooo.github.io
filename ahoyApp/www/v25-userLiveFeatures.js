document.addEventListener('DOMContentLoaded', function() {
    const lastLoginTime = localStorage.getItem('lastLoginTime');
    const lastLoginDisplay = document.getElementById('last-login-time');
    if (lastLoginTime) {
        lastLoginDisplay.textContent = `Last Login: ${new Date(lastLoginTime).toLocaleString()}`;
    } else {
        lastLoginDisplay.textContent = 'Last Login: Never';
    }
});