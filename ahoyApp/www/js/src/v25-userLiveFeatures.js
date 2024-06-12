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


document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const loginButton = document.getElementById('login-button');
    const loginMessage = document.getElementById('login-message');
    const viewBenefitsButton = document.getElementById('view-benefits-button'); // Ensure this ID is assigned to your View Benefits button
  
    if (isLoggedIn) {
      loginButton.style.display = 'none';
      loginMessage.style.display = 'block';
      const userProfileDropdown = document.getElementById('user-profile-dropdown');
      userProfileDropdown.style.display = 'block';
  
      // Hide message and button after 5 seconds
      setTimeout(() => {
        loginMessage.style.display = 'none';
      }, 3000);
  
      // Hide message and button when View Benefits is clicked
      viewBenefitsButton.addEventListener('click', function() {
        loginMessage.style.display = 'none';
      });
    } else {
      loginButton.style.display = 'block';
      loginMessage.style.display = 'none';
    }
  });