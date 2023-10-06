// firebaseActions.js


const db = firebase.firestore();

export function loadPlaylists(userId) {
  return db.collection('userPlaylists').doc(userId).get()
    .then(doc => {
      if (doc.exists) {
        return doc.data().playlists;
      } else {
        return {};
      }
    })
    .catch(error => {
      console.error("Error getting document:", error);
      return {};
    });
}

export function savePlaylists(userId, playlists) {
  return db.collection('userPlaylists').doc(userId).set({ playlists })
    .catch(error => {
      console.error("Error writing document: ", error);
    });
}
