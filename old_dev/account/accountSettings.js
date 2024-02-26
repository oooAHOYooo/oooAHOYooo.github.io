firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // Display the user's current information
        document.getElementById('displayName').value = user.displayName;
        document.getElementById('email').value = user.email;
    } else {
        // No user is signed in. Redirect to login page or handle appropriately.
        window.location.href = "/login.html"; // assuming your login page is named login.html
    }
});

function updateUserInfo() {
    var user = firebase.auth().currentUser;

    if (user) {
        var newDisplayName = document.getElementById('displayName').value;
        
        user.updateProfile({
            displayName: newDisplayName
        }).then(function() {
            alert("Profile updated successfully!");
        }).catch(function(error) {
            alert("Error updating profile: " + error.message);
        });
    }
}
