// Initialize Supabase client
const supabaseUrl = "https://ornjxycoizoybvdhhowp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ybmp4eWNvaXpveWJ2ZGhob3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzNTA4ODEsImV4cCI6MjAxNzkyNjg4MX0.SIgYEybVeKQ5xGnplA-elTOw0oC5tZIv5nGRUZf-vS8"; // Replace with your Supabase anon key
const supabase = Supabase.createClient(supabaseUrl, supabaseAnonKey);
// Login function
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    setMessage("Email and password are required", "error");
    return;
  }

  const { user, error } = await supabase.auth.signIn({ email, password });

  if (error) {
    setMessage(error.message, "error");
  } else {
    setMessage("Login successful! Redirecting...", "success");
    window.location.href = "../index.html"; // Redirect to the index page
  }
}

// Signup function
async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    setMessage("Email and password are required", "error");
    return;
  }

  const { user, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    setMessage(error.message, "error");
  } else {
    setMessage(
      "Signup successful! Check your email for a confirmation link.",
      "success"
    );
    window.location.href = "/index.html"; // Redirect to the index page
  }
}

// Utility function to display messages
function setMessage(message, type) {
  const messageElement = document.getElementById("message");
  messageElement.textContent = message;
  messageElement.className = type; // Use this class to style your message (e.g., error, success)
}

// ... In your login function
if (user) {
  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "/index.html"; // Redirect to the index page
}

// ... In your signup function
if (user) {
  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "/index.html"; // Redirect to the index page
}

document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const usernameDisplay = document.getElementById("usernameDisplay");
    usernameDisplay.textContent = `Welcome, ${user.email}`; // Display the user's email as username
  }
});
