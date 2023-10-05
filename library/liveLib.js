// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBq_IQRwkjh2o-jUkS8tI8wcEek5yMIwmo",
  authDomain: "ahoy-indie-media-da86d.firebaseapp.com",
  projectId: "ahoy-indie-media-da86d",
  storageBucket: "ahoy-indie-media-da86d.appspot.com",
  messagingSenderId: "179901301547",
  appId: "1:179901301547:web:599159f9efb826f464bb6e",
  measurementId: "G-K3QN161BVX",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Firebase Auth
const auth = firebase.auth();

// Sign in function
function signIn(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}

// Sign out function
function signOut() {
  auth.signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

// Auth state observer
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    // ...
  } else {
    // User is signed out
    // ...
  }
});

// Initialize Firestore
const db = firebase.firestore();

// Function to create a new playlist
function createPlaylist(playlistName, songs) {
    // Get the current user
    const user = auth.currentUser;
  
    // If there's no user signed in, we can't create a playlist
    if (!user) {
      console.error('No user signed in');
      return;
    }
  
    // Add a new document in collection "playlists"
    db.collection('playlists').add({
      userId: user.uid,
      name: playlistName,
      songs: songs,
    })
    .then((docRef) => {
      console.log('Playlist created with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
  }

  // Function to add a song to a playlist
function addSongToPlaylist(playlistId, song) {
    // Get the current user
    const user = auth.currentUser;
  
    // If there's no user signed in, we can't add a song to a playlist
    if (!user) {
      console.error('No user signed in');
      return;
    }
  
    // Add a song to a playlist in Firestore
    db.collection('playlists').doc(playlistId).update({
      songs: firebase.firestore.FieldValue.arrayUnion(song),
    })
    .then(() => {
      console.log('Song added to playlist');
    })
    .catch((error) => {
      console.error('Error adding song to playlist: ', error);
    });
  }