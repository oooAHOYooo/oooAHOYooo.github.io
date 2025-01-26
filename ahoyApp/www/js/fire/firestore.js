// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBq_IQRwkjh2o-jUkS8tI8wcEek5yMIwmo",
    authDomain: "ahoy-indie-media-da86d.firebaseapp.com",
    projectId: "ahoy-indie-media-da86d",
    storageBucket: "ahoy-indie-media-da86d.appspot.com",
    messagingSenderId: "179901301547",
    appId: "1:179901301547:web:599159f9efb826f464bb6e"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

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
