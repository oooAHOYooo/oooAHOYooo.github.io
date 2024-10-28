document.addEventListener('DOMContentLoaded', function() {
    fetchPlaylists(); // Fetch playlists when the document is ready

    // Add event listener to the "Add Playlist" button
    const addPlaylistButton = document.querySelector('.add-playlist-button');
    if (addPlaylistButton) {
        addPlaylistButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior
            showAddPlaylistModal();
        });
    }

    // Add event listener to the "Create Playlist" button in the modal
    const createPlaylistButton = document.getElementById('create-playlist-button');
    if (createPlaylistButton) {
        createPlaylistButton.addEventListener('click', function() {
            const playlistName = document.getElementById('new-playlist-name').value;
            if (playlistName) {
                createNewPlaylist(playlistName).then(newPlaylistId => {
                    alert("New playlist created successfully!");
                    hideAddPlaylistModal();
                });
            } else {
                alert("Please enter a playlist name.");
            }
        });
    }

    // Add event listener to close the modal
    const closeModalButtons = document.querySelectorAll('.addPlaylist_modal .addPlaylist_modal-close');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            hideAddPlaylistModal();
        });
    });
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

function createNewPlaylist(playlistName) {
    return db.collection('playlists').add({
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

        return docRef.id; // Return the new playlist ID
    })
    .catch(error => {
        console.error("Error adding document: ", error);
    });
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

function showAddPlaylistModal() {
    const modal = document.getElementById('add-playlist-modal');
    modal.style.display = 'block';
}

function hideAddPlaylistModal() {
    const modal = document.getElementById('add-playlist-modal');
    modal.style.display = 'none';
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
    const addPlaylistModal = document.getElementById('add-playlist-modal');
    const addSongsModal = document.getElementById('add-songs-modal');
    if (event.target == addPlaylistModal) {
        addPlaylistModal.style.display = "none";
    }
    if (event.target == addSongsModal) {
        addSongsModal.style.display = "none";
    }
}

function checkUserPlaylists() {
    return db.collection('playlists').get().then(querySnapshot => {
        return querySnapshot.size > 0;
    });
}