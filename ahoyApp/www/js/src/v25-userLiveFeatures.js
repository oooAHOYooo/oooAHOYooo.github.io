document.addEventListener('DOMContentLoaded', function() {
    const lastLoginTime = localStorage.getItem('lastLoginTime');
    const lastLoginDisplay = document.getElementById('last-login-time');
    if (lastLoginTime) {
        lastLoginDisplay.textContent = `Last Login: ${new Date(lastLoginTime).toLocaleString()}`;
    } else {
        lastLoginDisplay.textContent = 'Last Login: Never';
    }
});

window.login = async function() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Login successful
        setMessage("Login successful! Redirecting...", "success");
        // Store last login time
        localStorage.setItem('lastLoginTime', new Date().toISOString());
        setTimeout(() => {
            window.location.href = "../index.html"; // Adjust this path as needed
        }, 2000);
    } catch (error) {
        setMessage(error.message, "error");
    }
}