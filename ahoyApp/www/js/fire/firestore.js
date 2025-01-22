async function saveUserData(email, plan) {
    await db.collection("users").doc(email).set({
        plan: plan,
        joinedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    console.log("User saved successfully!");
}
