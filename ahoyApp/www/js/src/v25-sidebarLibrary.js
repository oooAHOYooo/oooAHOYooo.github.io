document.addEventListener('DOMContentLoaded', function() {
    fetchPlaylists(); // Fetch playlists when the document is ready
});

// Your web app's Firebase configuration
const firebaseConfig = {
    // ... existing code ...
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

            // Also add to the sidebar list
            const sidebarPlaylistList = document.querySelector('.list-unstyled.components');
            const newSidebarPlaylist = document.createElement('li');
            const newSidebarPlaylistLink = document.createElement('a');
            newSidebarPlaylistLink.href = "#";
            newSidebarPlaylistLink.textContent = playlistName;
            newSidebarPlaylistLink.onclick = () => displayPlaylist(docRef.id);
            newSidebarPlaylist.appendChild(newSidebarPlaylistLink);
            sidebarPlaylistList.appendChild(newSidebarPlaylist);

            // Show the modal to add songs
            showAddSongsModal(docRef.id, playlistName);
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

function showAddSongsModal(playlistId, playlistName) {
    const modal = document.getElementById('add-songs-modal');
    const modalTitle = document.getElementById('modal-title');
    modalTitle.textContent = `Add songs to ${playlistName}`;
    modal.style.display = 'block';

    const addSongButton = document.getElementById('add-song-button');
    addSongButton.onclick = () => addSongToPlaylist(playlistId);
}

function addSongToPlaylist(playlistId) {
    const songName = prompt("Enter the name of the song:");
    if (songName) {
        db.collection('playlists').doc(playlistId).collection('songs').add({
            name: songName
        })
        .then(() => {
            console.log("Song added to playlist");
            // Update the modal with the new song
            const songList = document.getElementById('song-list');
            const songItem = document.createElement('li');
            songItem.textContent = songName;
            songList.appendChild(songItem);
        })
        .catch(error => {
            console.error("Error adding song: ", error);
        });
    }
}

// Close the modal when the user clicks outside of it
window.onclick = function(event) {
    const modal = document.getElementById('add-songs-modal');
    if (event.target == modal) {
        modal.style.display = "none";
    }
}