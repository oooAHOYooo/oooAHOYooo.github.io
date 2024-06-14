document.addEventListener('DOMContentLoaded', function() {
    fetchPlaylists(); // Fetch playlists when the document is ready
});

        // Your web app's Firebase configuration
        const firebaseConfig = {
            apiKey: "AIzaSyBq_IQRwkjh2o-jUkS8tI8wcEek5yMIwmo",
            authDomain: "ahoy-indie-media-da86d.firebaseapp.com",
            projectId: "ahoy-indie-media-da86d",
            storageBucket: "ahoy-indie-media-da86d.appspot.com",
            messagingSenderId: "179901301547",
            appId: "1:179901301547:web:599159f9efb826f464bb6e",
            measurementId: "G-K3QN161BVX"
        };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

function fetchPlaylists() {
    db.collection('playlists').get().then((querySnapshot) => {
        const playlistLibrary = document.getElementById('v25-playlist-library');
        let count = 0;
        querySnapshot.forEach((doc) => {
            if (count < 8) { // Display only 8 playlists initially
                const playlist = doc.data();
                const playlistItem = document.createElement('li');
                playlistItem.textContent = playlist.name;
                playlistItem.onclick = () => displayPlaylist(doc.id);
                playlistLibrary.appendChild(playlistItem);
                count++;
            }
        });
        if (querySnapshot.size > 8) {
            const moreButton = document.createElement('button');
            moreButton.textContent = 'Show More';
            moreButton.onclick = () => showMorePlaylists(querySnapshot.docs, 8); // Start from the 9th document
            playlistLibrary.appendChild(moreButton);
        }
    });
}

function showMorePlaylists(docs, startIndex) {
    const playlistLibrary = document.getElementById('v25-playlist-library');
    let count = 0;
    for (let i = startIndex; i < docs.length && count < 8; i++) {
        const doc = docs[i];
        const playlist = doc.data();
        const playlistItem = document.createElement('li');
        playlistItem.textContent = playlist.name;
        playlistItem.onclick = () => displayPlaylist(doc.id);
        playlistLibrary.appendChild(playlistItem);
        count++;
    }
    if (startIndex + 8 < docs.length) {
        const moreButton = document.createElement('button');
        moreButton.textContent = 'Show More';
        moreButton.onclick = () => showMorePlaylists(docs, startIndex + 8);
        playlistLibrary.appendChild(moreButton);
    }
}

function createNewPlaylist() {
    const playlistName = prompt("Enter the name of the new playlist:");
    if (playlistName) {
        db.collection('playlists').add({
            name: playlistName
        })
        .then(docRef => {
            const playlistLibrary = document.getElementById('v25-playlist-library');
            const newPlaylist = document.createElement('li');
            newPlaylist.textContent = playlistName;
            newPlaylist.onclick = () => displayPlaylist(docRef.id);
            playlistLibrary.appendChild(newPlaylist);
        })
        .catch(error => {
            console.error("Error adding document: ", error);
        });
    }
}

function displayPlaylist(playlistId) {
    db.collection('playlists').doc(playlistId).get()
        .then(doc => {
            if (doc.exists) {
                const playlist = doc.data();
                console.log("Displaying playlist:", playlist.name);
                // Update the DOM to show the playlist's songs or details
            } else {
                console.log("No such playlist!");
            }
        })
        .catch(error => {
            console.log("Error getting document:", error);
        });
}

function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    var toggleIcon = document.getElementById('sidebarCollapse').children[0]; // Get the <i> element

    sidebar.classList.toggle('active');

    // Check if the sidebar is active to determine which icon to display
    if (sidebar.classList.contains('active')) {
        toggleIcon.classList.remove('fa-bars');
        toggleIcon.classList.add('fa-times');
    } else {
        toggleIcon.classList.remove('fa-times');
        toggleIcon.classList.add('fa-bars');
    }
}
