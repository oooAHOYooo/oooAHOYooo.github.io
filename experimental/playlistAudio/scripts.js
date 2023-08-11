let playlists = [];




let songs = [
    { id: 1, name: "Sample Song 1", artist: "Artist 1", thumbnail: "path_to_img1.jpg", url: "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3", buyLink: "http://buySong1.com" },
    { id: 2, name: "Sample Song 2", artist: "Artist 2", thumbnail: "path_to_img2.jpg", url: "http://techslides.com/demos/samples/sample.mp3", buyLink: "http://buySong2.com" },
    { id: 3, name: "Sample Song 3", artist: "Artist 3", thumbnail: "path_to_img3.jpg", url: "path_to_song3.mp3", buyLink: "http://buySong3.com" },
    { id: 4, name: "Sample Song 4", artist: "Artist 4", thumbnail: "path_to_img4.jpg", url: "path_to_song4.mp3", buyLink: "http://buySong4.com" },
    { id: 5, name: "Sample Song 5", artist: "Artist 5", thumbnail: "path_to_img5.jpg", url: "path_to_song5.mp3", buyLink: "http://buySong5.com" },
    { id: 6, name: "Sample Song 6", artist: "Artist 6", thumbnail: "path_to_img6.jpg", url: "path_to_song6.mp3", buyLink: "http://buySong6.com" },
    { id: 7, name: "Sample Song 7", artist: "Artist 7", thumbnail: "path_to_img7.jpg", url: "path_to_song7.mp3", buyLink: "http://buySong7.com" },
    { id: 8, name: "Sample Song 8", artist: "Artist 8", thumbnail: "path_to_img8.jpg", url: "path_to_song8.mp3", buyLink: "http://buySong8.com" },
    { id: 9, name: "Sample Song 9", artist: "Artist 9", thumbnail: "path_to_img9.jpg", url: "path_to_song9.mp3", buyLink: "http://buySong9.com" },
    { id: 10, name: "Sample Song 10", artist: "Artist 10", thumbnail: "path_to_img10.jpg", url: "path_to_song10.mp3", buyLink: "http://buySong10.com" },
    { id: 11, name: "Sample Song 11", artist: "Artist 11", thumbnail: "path_to_img11.jpg", url: "path_to_song11.mp3", buyLink: "http://buySong11.com" },
    { id: 12, name: "Sample Song 12", artist: "Artist 12", thumbnail: "path_to_img12.jpg", url: "path_to_song12.mp3", buyLink: "http://buySong12.com" },
    { id: 13, name: "Sample Song 13", artist: "Artist 13", thumbnail: "path_to_img13.jpg", url: "path_to_song13.mp3", buyLink: "http://buySong13.com" },
    { id: 14, name: "Sample Song 14", artist: "Artist 14", thumbnail: "path_to_img14.jpg", url: "path_to_song14.mp3", buyLink: "http://buySong14.com" },
    { id: 15, name: "Sample Song 15", artist: "Artist 15", thumbnail: "path_to_img15.jpg", url: "path_to_song15.mp3", buyLink: "http://buySong15.com" },
    { id: 16, name: "Sample Song 16", artist: "Artist 16", thumbnail: "path_to_img16.jpg", url: "path_to_song16.mp3", buyLink: "http://buySong16.com" },
    { id: 17, name: "Sample Song 17", artist: "Artist 17", thumbnail: "path_to_img17.jpg", url: "path_to_song17.mp3", buyLink: "http://buySong17.com" },
    { id: 18, name: "Sample Song 18", artist: "Artist 18", thumbnail: "path_to_img18.jpg", url: "path_to_song18.mp3", buyLink: "http://buySong18.com" },
    { id: 19, name: "Sample Song 19", artist: "Artist 19", thumbnail: "path_to_img19.jpg", url: "path_to_song19.mp3", buyLink: "http://buySong19.com" },
    { id: 20, name: "Sample Song 20", artist: "Artist 20", thumbnail: "path_to_img20.jpg", url: "path_to_song20.mp3", buyLink: "http://buySong20.com" }
];


// Function 1: Add a song to a playlist
function addToPlaylist(songId, playlistId) {
    let playlist = playlists.find(p => p.id === playlistId);
    if (!playlist.songs.includes(songId)) {
        playlist.songs.push(songId);
    }
    renderPlaylists();
}

// Function 2: Delete a playlist
function deletePlaylist(playlistId) {
    playlists = playlists.filter(p => p.id !== playlistId);
    renderPlaylists();
}

// Function 3: Save (create) a playlist
function createPlaylist() {
    const name = document.getElementById("newPlaylistName").value;
    if (name) {
        playlists.push({ id: Date.now(), name, songs: [] });
        document.getElementById("newPlaylistName").value = '';
        renderPlaylists();
    }
}

// Function 4: Play a song
function playSong(songUrl) {
    const audio = document.getElementById("audio");
    audio.src = songUrl;
    audio.play();
}

function renderPlaylists() {
    const playlistDiv = document.getElementById("playlists");
    let html = '';

    playlists.forEach(playlist => {
        html += `<div><strong>${playlist.name}</strong> <button onclick="deletePlaylist(${playlist.id})">Delete</button><ul>`;
        playlist.songs.forEach(songId => {
            let song = songs.find(s => s.id === songId);
            html += `<li>${song.name} by ${song.artist}</li>`;
        });
        html += `</ul></div>`;
    });

    html += `<div><h3>Add songs to playlist:</h3><select id="playlistSelector">`;
    playlists.forEach(playlist => {
        html += `<option value="${playlist.id}">${playlist.name}</option>`;
    });
    html += `</select>`;
    songs.forEach(song => {
        html += `<div><label><input type="checkbox" value="${song.id}" class="songCheckbox"> ${song.name} by ${song.artist}</label></div>`;
    });
    html += `<button onclick="addSelectedSongsToPlaylist()">Add to Selected Playlist</button></div>`;

    playlistDiv.innerHTML = html;
}

function addSelectedSongsToPlaylist() {
    const selectedPlaylistId = document.getElementById("playlistSelector").value;
    const checkboxes = document.querySelectorAll(".songCheckbox:checked");
    
    checkboxes.forEach(checkbox => {
        addToPlaylist(parseInt(checkbox.value), parseInt(selectedPlaylistId));
    });

    renderPlaylists();
}

function renderSongs() {
    const songListDiv = document.getElementById("songList");
    let html = '';

    songs.forEach(song => {
        html += `
        <div>
            <img src="${song.thumbnail}" alt="${song.name} thumbnail" width="50">
            ${song.name} by ${song.artist} 
            <button onclick="playSong('${song.url}')">Play</button>
            <a href="${song.buyLink}" target="_blank">Buy</a>
        </div>`;
    });

    songListDiv.innerHTML = html;
}

window.onload = function() {
    renderPlaylists();
    renderSongs();

}

