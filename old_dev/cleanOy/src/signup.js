// Initialize Supabase client
const supabaseUrl = "https://ornjxycoizoybvdhhowp.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ybmp4eWNvaXpveWJ2ZGhob3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzNTA4ODEsImV4cCI6MjAxNzkyNjg4MX0.SIgYEybVeKQ5xGnplA-elTOw0oC5tZIv5nGRUZf-vS8";
const supabase = Supabase.createClient(supabaseUrl, supabaseAnonKey);

document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // Retrieve user input
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const plan = document.querySelector('input[name="plan"]:checked').value;

  // Optional: Handling different plans (expand upon this as needed)
  console.log(`Selected Plan: ${plan}`);

  try {
    // Attempt to create a new user
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    // Display a message indicating the user can close the page
    alert(
      "Signup successful! Please check your email for a confirmation link. You can now close this page."
    );

    // Optionally, remove the redirect to keep the user on the page
    // window.location.href = 'login.html';
  } catch (error) {
    alert(`Signup failed: ${error.message}`);
  }
});
