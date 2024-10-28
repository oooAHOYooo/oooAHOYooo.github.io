import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";

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

window.login = async function() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = '../www/index.html';
  } catch (error) {
    console.error(error.message);
  }
}

window.setMessage = function(message, type) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
  messageElement.className = type;
}

window.resetPassword = async function() {
  const email = document.getElementById("login-email").value;
  if (!email) {
    setMessage("Please enter your email to reset password.", "error");
    return;
  }
  try {
    await sendPasswordResetEmail(auth, email);
    setMessage("Password reset email sent!", "success");
  } catch (error) {
    setMessage(error.message, "error");
  }
}