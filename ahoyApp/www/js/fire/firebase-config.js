const firebaseConfig = {
    apiKey: "AIzaSyBq_IQRwkjh2o-jUkS8tI8wcEek5yMIwmo",
    authDomain: "ahoy-indie-media-da86d.firebaseapp.com",
    projectId: "ahoy-indie-media-da86d",
    storageBucket: "ahoy-indie-media-da86d.appspot.com",
    messagingSenderId: "179901301547",
    appId: "1:179901301547:web:599159f9efb826f464bb6e"
};

try {
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully.");
} catch (error) {
    console.error("Error initializing Firebase:", error);
}

const auth = firebase.auth();
const db = firebase.firestore();