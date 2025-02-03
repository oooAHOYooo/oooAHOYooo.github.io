// Function to toggle login modal visibility
function toggleLoginModal() {
    const modal = document.getElementById('login-modal');
    modal.style.display = (modal.style.display === 'none' || !modal.style.display) ? 'block' : 'none';
}

// Function to update dock on user login
function updateUserDock(username, avatarUrl) {
    const loginIcon = document.getElementById('login-dock-icon');
    const userIcon = document.getElementById('user-dock-icon');
    const usernameDisplay = document.getElementById('dock-username');
    const userAvatar = document.getElementById('user-avatar'); // Assuming this element exists for the avatar

    if (username) {
        loginIcon.style.display = 'none';
        userIcon.style.display = 'flex';
        usernameDisplay.textContent = username;
        userAvatar.style.backgroundImage = `url(${avatarUrl})`; // Set user avatar image
        userAvatar.style.display = 'block'; // Ensure the avatar is visible
    } else {
        loginIcon.style.display = 'flex';
        userIcon.style.display = 'none';
        userAvatar.style.display = 'none'; // Hide the avatar when logged out
    }
}

// Function to toggle user account dock visibility
function toggleUserAccountDock() {
    const dock = document.getElementById('user-account-dock');
    dock.style.display = (dock.style.display === 'none' || !dock.style.display) ? 'block' : 'none';
}

// Function to update user dock with detailed information
function updateUserDockDetails(user) {
    const { username, avatarUrl, likes, comments, lastLogin, funFact, online } = user;
    const userAvatar = document.getElementById('user-avatar');
    const usernameDisplay = document.getElementById('dock-username');
    const userLikes = document.getElementById('user-likes-count');
    const userComments = document.getElementById('user-comments-count');
    const userLastLogin = document.getElementById('user-last-login');
    const userFunFact = document.getElementById('user-fun-fact');
    const userStatus = document.getElementById('user-online-status');

    usernameDisplay.textContent = username;
    userAvatar.style.backgroundImage = `url(${avatarUrl})`;
    userLikes.textContent = likes;
    userComments.textContent = comments;
    userLastLogin.textContent = lastLogin;
    userFunFact.textContent = funFact;
    userStatus.textContent = online ? 'Online' : 'Offline';
}

// Example usage after login
// updateUserDock('JohnDoe', 'path_to_avatar_image.jpg'); // Call this after successful login

// Example usage
// updateUserDockDetails({
//     username: 'JohnDoe',
//     avatarUrl: 'path_to_avatar_image.jpg',
//     likes: 120,
//     comments: 45,
//     lastLogin: 'Yesterday',
//     funFact: 'Loves coding at night!',
//     online: true
// });

document.getElementById('user-avatar').addEventListener('click', function() {
    const infoPopup = document.getElementById('user-info');
    infoPopup.style.display = (infoPopup.style.display === 'none' || !infoPopup.style.display) ? 'block' : 'none';
});