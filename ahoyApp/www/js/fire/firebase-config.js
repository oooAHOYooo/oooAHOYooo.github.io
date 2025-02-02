const firebaseConfig = {
    apiKey: "AIzaSyBq_IQRwkjh2o-jUkS8tI8wcEek5yMIwmo",
    authDomain: "ahoy-indie-media-da86d.firebaseapp.com",
    projectId: "ahoy-indie-media-da86d",
    storageBucket: "ahoy-indie-media-da86d.appspot.com",
    messagingSenderId: "179901301547",
    appId: "1:179901301547:web:599159f9efb826f464bb6e"
};

// Function to display status message
function displayStatusMessage(message, isSuccess) {
    const statusMessage = document.createElement('div');
    statusMessage.id = 'firebase-status';
    statusMessage.innerText = message;
    statusMessage.style.backgroundColor = isSuccess ? '#d4edda' : '#f8d7da';
    statusMessage.style.color = isSuccess ? '#155724' : '#721c24';
    statusMessage.style.padding = '10px';
    statusMessage.style.marginBottom = '10px';
    statusMessage.style.border = isSuccess ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
    statusMessage.style.borderRadius = '5px';
    statusMessage.style.textAlign = 'center';

    // Insert the status message above the top logo
    const logoContainer = document.querySelector('.login__logo-container');
    if (logoContainer) {
        logoContainer.parentNode.insertBefore(statusMessage, logoContainer);
    }
}

// Function to clear cache
function clearCache() {
    if ('caches' in window) {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
    }
}

// Clear cache on page load
clearCache();

// Initialize Firebase and display status
function initializeFirebase() {
    if (!firebase.apps.length) {
        try {
            firebase.initializeApp(firebaseConfig);
            console.log("Firebase initialized successfully.");
            displayStatusMessage("Successfully connected to Firebase. You can log in now.", true);
        } catch (error) {
            console.error("Error initializing Firebase:", error);
            displayStatusMessage("Error initializing Firebase: " + error.message, false);
        }
    } else {
        displayStatusMessage("Firebase already initialized.", true);
    }
}

// Call the initialization function
initializeFirebase();

// Make auth and db available globally
window.auth = firebase.auth();
window.db = firebase.firestore();

// Enable offline persistence for Firestore
window.db.enablePersistence()
    .catch((err) => {
        if (err.code == 'failed-precondition') {
            console.log('Multiple tabs open, persistence can only be enabled in one tab at a time');
        } else if (err.code == 'unimplemented') {
            console.log('The current browser doesn\'t support persistence');
        }
    });