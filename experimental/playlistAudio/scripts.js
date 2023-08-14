let playlists = [];






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

