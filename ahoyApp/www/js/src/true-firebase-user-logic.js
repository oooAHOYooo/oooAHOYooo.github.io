// Initialize Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile, setPersistence, browserSessionPersistence, signOut } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics'; // Importing Firebase Analytics

// Updated Firebase configuration with actual project details and measurement ID
const firebaseConfig = {
    apiKey: "AIzaSyBq_IQRwkjh2o-jUkS8tI8wcEek5yMIwmo",
    authDomain: "ahoy-indie-media-da86d.firebaseapp.com",
    projectId: "ahoy-indie-media-da86d",
    storageBucket: "ahoy-indie-media-da86d.appspot.com",
    messagingSenderId: "179901301547",
    appId: "1:179901301547:web:599159f9efb826f464bb6e",
    measurementId: "G-K3QN161BVX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app); // Initialize Firebase Analytics

// Utility functions
function validateEmail(email) {
    const isValid = /\S+@\S+\.\S+/.test(email);
    console.log(`validateEmail: ${email} is ${isValid ? 'valid' : 'invalid'}`);
    return isValid;
}

function showLoading(isLoading) {
    const loadingSpinner = document.getElementById('loadingSpinner');
    loadingSpinner.style.display = isLoading ? 'block' : 'none';
    console.log(`showLoading: Display is ${isLoading ? 'block' : 'none'}`);
}

function showSuccessMessage(message) {
    const successMessage = document.getElementById('successMessage');
    successMessage.textContent = message; // Display custom message
    successMessage.style.display = 'block';
    setTimeout(() => {
        window.location.href = "../index.html"; // Redirect after login/register
    }, 3000);
    console.log(`showSuccessMessage: ${message}`);
}

function showErrorMessage(error) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = error;
    errorMessage.style.display = 'block';
    console.log(`showErrorMessage: ${error}`);
}

// Registration function
function registerUser(email, password, confirmPassword, name) {
    if (!email || !password || password.length < 8 || password !== confirmPassword || !validateEmail(email)) {
        alert('Please ensure all fields are correctly filled and password is at least 8 characters.');
        return;
    }

    showLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log('User registered:', user);

        // Update profile with name
        updateProfile(user, {
            displayName: name
        }).then(() => {
            // Send verification email
            sendEmailVerification(user)
            .then(() => {
                showSuccessMessage('Verification email sent. Please check your inbox.');
            });
        });

    })
    .catch((error) => {
        showErrorMessage(`Registration failed: ${error.message}`);
    })
    .finally(() => {
        showLoading(false);
    });
    console.log(`registerUser: Attempting to register ${email}`);
}

// Login function
function loginUser(email, password) {
    if (!validateEmail(email)) {
        showErrorMessage('Invalid email format.');
        return;
    }

    showLoading(true);

    setPersistence(auth, browserSessionPersistence)
    .then(() => {
        return signInWithEmailAndPassword(auth, email, password);
    })
    .then((userCredential) => {
        console.log('User logged in:', userCredential.user);
        showSuccessMessage('Logged in successfully. Redirecting...');
    })
    .catch((error) => {
        showErrorMessage(`Login failed: ${error.message}`);
    })
    .finally(() => {
        showLoading(false);
    });
    console.log(`loginUser: Attempting to login ${email}`);
}

// Reset password function
function resetPassword(email) {
    if (!validateEmail(email)) {
        showErrorMessage('Invalid email format.');
        return;
    }

    sendPasswordResetEmail(auth, email)
    .then(() => {
        showSuccessMessage('Password reset email sent. Please check your inbox.');
    })
    .catch((error) => {
        showErrorMessage(`Error: ${error.message}`);
    });
    console.log(`resetPassword: Attempting to reset password for ${email}`);
}

// Logout function
function logoutUser() {
    signOut(auth).then(() => {
        window.location.href = "/login.html";
    }).catch((error) => {
        showErrorMessage(`Error: ${error.message}`);
    });
    console.log('logoutUser: Attempting to logout');
}

// Event listeners
document.getElementById('registerButton').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const name = document.getElementById('name').value;

    registerUser(email, password, confirmPassword, name);
});

document.getElementById('loginButton').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    loginUser(email, password);
});

document.getElementById('resetPasswordButton').addEventListener('click', () => {
    const email = document.getElementById('reset-email').value;
    resetPassword(email);
});

document.getElementById('logoutButton').addEventListener('click', logoutUser);

// Redirect logic based on authentication state
auth.onAuthStateChanged((user) => {
    if (user) {
        console.log(`onAuthStateChanged: User is signed in, redirecting to dashboard`);
        // User is signed in, redirect to dashboard
        window.location.href = "/dashboard.html";
    } else {
        console.log('onAuthStateChanged: User is signed out, redirecting to login');
        // User is signed out
        window.location.href = "/login.html";
    }
});
