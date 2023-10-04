var firebaseConfig = {
	apiKey: "YOUR_API_KEY",
	authDomain: "YOUR_AUTH_DOMAIN",
	projectId: "YOUR_PROJECT_ID",
	storageBucket: "YOUR_STORAGE_BUCKET",
	messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
	appId: "YOUR_APP_ID"
  };

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