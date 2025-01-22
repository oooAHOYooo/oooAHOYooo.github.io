async function saveUserData(username, email, plan) {
    try {
        const usernameCheck = await db.collection("users").where("username", "==", username).get();
        if (!usernameCheck.empty) {
            alert("Username already taken, please choose another.");
            return;
        }

        await db.collection("users").doc(email).set({
            username: username,
            email: email,
            plan: plan,
            sms: document.getElementById('sms').checked,
            games: Array.from(document.getElementById('games').selectedOptions).map(option => option.value),
            joinedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("Profile saved successfully!");
    } catch (error) {
        console.error("Error saving user data:", error);
        alert("Error saving data, please try again.");
    }
}
