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

  var db = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();

function signInWithGoogle() {
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var user = result.user;
        
        // Display the user's name
        document.getElementById('userName').textContent = user.displayName;
        document.getElementById('welcomeMessage').style.display = 'block';

        console.log("User signed in: ", user);
    }).catch(function(error) {
        console.error("Error during sign in: ", error);
    });
}

// Function to add playlist for a user
function addPlaylistForUser(userId, playlistName, songs) {
    db.collection("users").doc(userId).collection("playlists").add({
        name: playlistName,
        songs: songs
    }).then(function() {
        console.log("Playlist added!");
    }).catch(function(error) {
        console.error("Error adding playlist: ", error);
    });
}

// Function to retrieve playlists for a user
function getPlaylistsForUser(userId) {
    db.collection("users").doc(userId).collection("playlists").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            console.log(doc.id, " => ", doc.data());
        });
    });
}