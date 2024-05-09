async function loadClassicalMusic() {
    const response = await fetch('./data/classical_music.json');
    const musicList = await response.json();
    const table = document.createElement('table');
    table.innerHTML = `
        <tr>
            <th>Play</th>
            <th>Title</th>
            <th>Composer</th>
            <th>Length</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Performed By</th>
        </tr>
    `;

    musicList.forEach(music => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><button onclick="playMusic('${music.mp3_url}')"><i class="fas fa-play"></i></button></td>
            <td>${music.title}</td>
            <td>${music.composer}</td>
            <td>${music.length}</td>
            <td>${music.year}</td>
            <td>${music.genre}</td>
            <td>${music.performed_by}</td>
        `;
        table.appendChild(row);
    });

    const listContainer = document.getElementById('classical-music-list');
    listContainer.innerHTML = ''; // Clear previous content
    listContainer.appendChild(table);
}

function playMusic(url) {
    const audio = new Audio(url);
    audio.play();
}

document.getElementById('classical-mode-button').addEventListener('click', loadClassicalMusic);
document.getElementById('classical-mode-button').addEventListener('click', loadClassicalMusic);