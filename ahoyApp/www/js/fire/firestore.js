// Import the Firebase instances
import { auth, db } from './firebase-config.js';

window.saveUserData = async function(username, email, plan) {
    try {
        console.log("Checking if username is taken:", username);
        const usernameCheck = await db.collection("users").where("username", "==", username).get();
        if (!usernameCheck.empty) {
            alert("Username already taken, please choose another.");
            return;
        }

        console.log("Saving user data for:", email);
        await db.collection("users").doc(email).set({
            username: username,
            email: email,
            plan: plan,
            joinedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        console.log("User data saved successfully for:", email);
        alert("Profile saved successfully!");
    } catch (error) {
        console.error("Error saving user data:", error);
        alert("Error saving data, please try again.");
    }
}