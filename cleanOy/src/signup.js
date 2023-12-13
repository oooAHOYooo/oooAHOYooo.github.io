// Initialize Supabase
const supabase = supabase.createClient(
  "YOUR_SUPABASE_URL",
  "YOUR_SUPABASE_ANON_KEY"
);

document
  .getElementById("signup-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const plan = document.querySelector('input[name="plan"]:checked').value;

    try {
      const { user, error } = await supabase.auth.signUp({ email, password });

      if (error) throw error;

      // Handle the chosen plan here
      // For example, you might want to store this information in your database
      console.log(`User signed up with ${plan} plan`);

      // Redirect to a different page or show a success message
    } catch (error) {
      console.error("Error during sign-up:", error);
      // Show error message to the user
    }
  });
