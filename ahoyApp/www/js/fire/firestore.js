async function saveUserData(username, email, plan) {
    try {
        // Check if username already exists in Firestore
        const usernameCheck = await db.collection("users").where("username", "==", username).get();

        if (!usernameCheck.empty) {
            alert("Username already taken, please choose another.");
            return;
        }

        // If username is unique, save the user data
        await db.collection("users").doc(email).set({
            username: username,
            email: email,
            plan: plan,
            sms: document.getElementById('sms').checked,
            games: Array.from(document.getElementById('games').selectedOptions).map(option => option.value),
            joinedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("Profile saved successfully!");
        console.log("User profile stored in Firestore.");
    } catch (error) {
        console.error("Error saving user data:", error);
        alert("Error saving data, please try again.");
    }
}
