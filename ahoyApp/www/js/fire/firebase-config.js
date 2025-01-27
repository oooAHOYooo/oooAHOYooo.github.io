const firebaseConfig = {
    apiKey: "AIzaSyBq_IQRwkjh2o-jUkS8tI8wcEek5yMIwmo",
    authDomain: "ahoy-indie-media-da86d.firebaseapp.com",
    projectId: "ahoy-indie-media-da86d",
    storageBucket: "ahoy-indie-media-da86d.appspot.com",
    messagingSenderId: "179901301547",
    appId: "1:179901301547:web:599159f9efb826f464bb6e"
};

// Initialize Firebase only if it hasn't been initialized yet
if (!firebase.apps.length) {
    try {
        firebase.initializeApp(firebaseConfig);
        console.log("Firebase initialized successfully.");
    } catch (error) {
        console.error("Error initializing Firebase:", error);
    }
}

// Export the Firebase instances
const auth = firebase.auth();
const db = firebase.firestore();

// Enable offline persistence for Firestore
db.enablePersistence()
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            console.log('Multiple tabs open, persistence can only be enabled in one tab at a time');
        } else if (err.code == 'unimplemented') {
            console.log('The current browser doesn\'t support persistence');
        }
    });

// Export for use in other files
export { auth, db };