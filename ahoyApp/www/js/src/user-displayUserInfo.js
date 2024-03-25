// Assuming Firebase is correctly initialized earlier in your code
firebase.auth().onAuthStateChanged(function(user) {
    var userInfoDisplay = document.getElementById('user-info-display');
    // If the userInfoDisplay element does not exist, create it
    if (!userInfoDisplay) {
      userInfoDisplay = document.createElement('div');
      userInfoDisplay.id = 'user-info-display'; // Assign a unique ID for CSS styling
      document.body.appendChild(userInfoDisplay); // Append it to the body or a specific container
    }
  
    if (user) {
      // User is signed in, display the user's name or email
      var name = user.displayName || user.email; // Use displayName if available, otherwise email
      userInfoDisplay.textContent = name; // Update the content in userInfoDisplay
  
      // Additionally, update the user's name in the account tab
      var accountUserNameElement = document.querySelector('.account-user-name');
      if (accountUserNameElement) {
        accountUserNameElement.textContent = name;
      }
    } else {
      // No user is signed in.
      userInfoDisplay.textContent = 'YOUR ACTUAL REAL LIFE NAME'; // Update to show a default message
      // Optionally, update the account tab to show a default message or clear the previous name
      var accountUserNameElement = document.querySelector('.account-user-name');
      if (accountUserNameElement) {
        accountUserNameElement.textContent = 'Not Logged In';
      }
    }
  });