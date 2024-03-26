document.addEventListener('DOMContentLoaded', async function() {
    const player = document.getElementById('audio-player');
    const auth = firebase.auth();
    const db = firebase.firestore(); // Assuming you're using Firestore
  
    // Fetch and display user information
    auth.onAuthStateChanged(user => {
      if (user) {
        db.collection('Users').doc(user.uid).get().then(doc => {
          if (doc.exists) {
            const userInfo = doc.data().userInfo;
            document.querySelector('.account-user-name').textContent = userInfo.name;
            // Add more fields as needed
          }
        });
      }
    });
  
    // Fetch and display liked songs
    const likedSongsContainer = document.getElementById('liked-tracks').querySelector('tbody');
    likedSongsContainer.innerHTML = ''; // Clear existing songs
  
    const user = auth.currentUser;
    if (user) {
      const likedSongsRef = db.collection('Users').doc(user.uid).collection('likedSongs');
      const snapshot = await likedSongsRef.get();
      snapshot.forEach(doc => {
        const songId = doc.id;
        // Fetch song details using songId
        db.collection('Songs').doc(songId).get().then(songDoc => {
          if (songDoc.exists) {
            const songData = songDoc.data();
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${songData.title}</td>
              <td>${songData.artist}</td>
              <td><button class="play-button" data-track="${songData.trackUrl}">Play</button></td>
            `;
            likedSongsContainer.appendChild(row);
          }
        });
      });
    }
  
    // Play song functionality
    document.querySelectorAll('.play-button').forEach(button => {
      button.addEventListener('click', function() {
        player.src = this.getAttribute('data-track');
        player.play();
      });
    });
});

  // This script checks if a user is logged in and updates the UI accordingly
  window.onload = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is logged in
        document.getElementById('login-section').style.display = 'none'; // Hide the login section
        document.getElementById('logged-in-message').style.display = 'block'; // Show the logged-in message
        // Display the user's email
        document.getElementById('user-email').textContent = `Email: ${user.email}`;
      } else {
        // No user is logged in
        document.getElementById('login-section').style.display = 'block'; // Show the login section
        document.getElementById('logged-in-message').style.display = 'none'; // Hide the logged-in message
      }
    });
  };