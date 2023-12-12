const supabaseUrl = "https://ornjxycoizoybvdhhowp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ybmp4eWNvaXpveWJ2ZGhob3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzNTA4ODEsImV4cCI6MjAxNzkyNjg4MX0.SIgYEybVeKQ5xGnplA-elTOw0oC5tZIv5nGRUZf-vS8";
const supabase = Supabase.createClient(supabaseUrl, supabaseAnonKey);

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { user, error } = await supabase.auth.signIn({ email, password });

  if (error) {
    setMessage(error.message, "error");
  } else {
    setMessage("Login successful!", "success");
    // Redirect user to another page or perform further actions
  }
}

async function signup() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const { user, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    setMessage(error.message, "error");
  } else {
    setMessage(
      "Signup successful! Check your email for a confirmation link.",
      "success"
    );
  }
}

function setMessage(message, type) {
  const messageParagraph = document.getElementById("message");
  messageParagraph.textContent = message;
  messageParagraph.className = type; // Set class for styling purposes
}
