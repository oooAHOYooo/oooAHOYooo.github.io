// Function to sort songs based on different criteria
function sortSongs(songs, criteria) {
    switch (criteria) {
        case 'recent':
            return songs.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
        case 'random':
            return songs.sort(() => Math.random() - 0.5);
        case 'title':
            return songs.sort((a, b) => a.songTitle.localeCompare(b.songTitle));
        case 'artist':
            return songs.sort((a, b) => a.artist.localeCompare(b.artist));
        default:
            return songs;
    }
}

// Export the function for use in other modules
export { sortSongs };