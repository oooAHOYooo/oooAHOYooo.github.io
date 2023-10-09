// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBq_IQRwkjh2o-jUkS8tI8wcEek5yMIwmo",
    authDomain: "ahoy-indie-media-da86d.firebaseapp.com",
    projectId: "ahoy-indie-media-da86d",
    storageBucket: "ahoy-indie-media-da86d.appspot.com",
    messagingSenderId: "179901301547",
    appId: "1:179901301547:web:599159f9efb826f464bb6e",
    measurementId: "G-K3QN161BVX"
  };
// TODO: Add your Firebase config here

// Firestore references
const db = firebase.firestore();
const playlistRef = db.collection('playlists');
const songRef = db.collection('songs');

// DOM references
const playlistList = document.getElementById('playlistList');
const songList = document.getElementById('songList');
const audioPlayer = document.getElementById('audioPlayer');

// Fetch playlists
playlistRef.onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    // TODO: Handle playlist changes (add, modify, delete)
  });
});

// Fetch songs
songRef.onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    // TODO: Handle song changes (add, modify, delete)
  });
});

// Create a new playlist
function createPlaylist() {
  // TODO: Create a new playlist in Firestore
}

// Add song to playlist
function addSongToPlaylist(songId, playlistId) {
  // TODO: Add song to playlist in Firestore
}

// Queue playlist to audio player
function queuePlaylist(playlistId) {
  // TODO: Queue songs from playlist to audio player
}
