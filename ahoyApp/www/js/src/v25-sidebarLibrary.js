function createNewPlaylist() {
    var playlistName = prompt("Enter the name of the new playlist:");
    if (playlistName) {
        var playlistLibrary = document.getElementById('v25-playlist-library');
        var newPlaylist = document.createElement('li');
        newPlaylist.textContent = playlistName;
        playlistLibrary.appendChild(newPlaylist);
    }
}

function displayPlaylist(playlistName) {
    // Logic to display the songs in the playlist
    console.log("Displaying playlist:", playlistName);
    // You would typically update the DOM to show the playlist's songs
}

function populateSidebarWithSamples() {
    var samplePodcasts = ["Podcast Episode 1", "Podcast Episode 2", "Podcast Episode 3"];
    var playlistLibrary = document.getElementById('v25-playlist-library');
    samplePodcasts.forEach(function(podcast) {
        var podcastItem = document.createElement('li');
        podcastItem.textContent = podcast;
        playlistLibrary.appendChild(podcastItem);
    });
}

function toggleSidebar() {
    var sidebar = document.getElementById('v25-sidebar');
    if (sidebar.style.display === 'none' || sidebar.style.display === '') {
        sidebar.style.display = 'block';
        populateSidebarWithSamples(); // Populate sidebar when it is shown
    } else {
        sidebar.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    populateSidebarWithSamples(); // Also populate when the document is ready
});
