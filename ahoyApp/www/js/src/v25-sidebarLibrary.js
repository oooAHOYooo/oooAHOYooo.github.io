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

document.addEventListener('DOMContentLoaded', function() {
    populateSidebarWithSamples(); // Also populate when the document is ready
});

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