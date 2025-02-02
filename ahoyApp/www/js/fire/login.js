async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const statusBar = document.getElementById('login-status-bar');

    if (!email || !password) {
        statusBar.innerText = "Please enter both email and password.";
        statusBar.style.display = 'block';
        return;
    }

    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        statusBar.innerText = "Login successful! Redirecting...";
        statusBar.style.display = 'block';

        // Redirect after a short delay to allow users to see the message
        setTimeout(() => {
            window.location.href = "index.html";
        }, 2000);
    } catch (error) {
        console.error("Error logging in:", error);
        statusBar.innerText = `Error logging in: ${error.message}`;
        statusBar.style.display = 'block';
    }
}

async function logout() {
    try {
        await auth.signOut();
        alert("User logged out successfully!");
    } catch (error) {
        console.error("Logout failed:", error);
    }
}

document.getElementById('toggle-password').addEventListener('change', function() {
    const passwordField = document.getElementById('login-password');
    passwordField.type = this.checked ? 'text' : 'password';
});

// Make login and logout functions available to the window object
window.login = login;
window.logout = logout;