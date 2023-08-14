let jsonData = {
    "songs": [
    {
            "id": 1,
            "name": "Sample Song 1",
            "artist": "Artist 1",
            "thumbnail": "path_to_img1.jpg",
            "url": "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
            "buyLink": "http://buySong1.com"
        },
        {
            "id": 2,
            "name": "Sample Song 2",
            "artist": "Artist 2",
            "thumbnail": "path_to_img2.jpg",
            "url": "http://techslides.com/demos/samples/sample.mp3",
            "buyLink": "http://buySong2.com"
        },

        {
            "id": 20,
            "name": "Sample Song 20",
            "artist": "Artist 20",
            "thumbnail": "path_to_img20.jpg",
            "url": "path_to_song20.mp3",
            "buyLink": "http://buySong20.com"
        },
        {
            "id": 16,
            "name": "Sample Song Eric",
            "artist": "Artist 13",
            "thumbnail": "path_to_img1.jpg",
            "url": "https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3",
            "buyLink": "http://buySong1.com"
        },
        {
            "id": 21,
            "name": "Sample Song Derek",
            "artist": "Artist 22",
            "thumbnail": "path_to_img2.jpg",
            "url": "http://techslides.com/demos/samples/sample.mp3",
            "buyLink": "http://buySong2.com"
        },

        {
            "id": 220,
            "name": "Sample Song LEREK",
            "artist": "Artist 250",
            "thumbnail": "path_to_img20.jpg",
            "url": "path_to_song20.mp3",
            "buyLink": "http://buySong20.com"
        },
        {
            "id": 31,
            "name": "Weeping Willow",
            "artist": "Samuel Dylan Witch",
            "thumbnail": "path_to_img2.jpg",
            "url": "http://techslides.com/demos/samples/sample.mp3",
            "buyLink": "http://buySong2.com"
        },

        {
            "id": 120,
            "name": "I believe in love",
            "artist": "Clones of Clarence",
            "thumbnail": "path_to_img20.jpg",
            "url": "path_to_song20.mp3",
            "buyLink": "http://buySong20.com"
        }
    ]
};

// Extract unique artist names and their details from the JSON
let artists = [];
jsonData.songs.forEach(song => {
    if (!artists.some(artist => artist.name === song.artist)) {
        artists.push({ name: song.artist, bio: "" }); // Assuming the bio is empty for now since the JSON doesn't provide it.
    }
});

// Sort artists by name
artists.sort((a, b) => a.name.localeCompare(b.name));

// Render function
function renderArtists() {
    const artistsDiv = document.getElementById("artists");
    let html = '';

    artists.forEach(artist => {
        html += `
        <div class="artist-item">
            <h3 class="artist-name">${artist.name}</h3>
            <p class="artist-bio" style="display: none;">${artist.bio || "Bio not available."}</p>
        </div>`;
    });

    artistsDiv.innerHTML = html;
}

// Event listener to show/hide bio on artist click
document.addEventListener('click', function(e) {
    if (e.target && e.target.classList.contains('artist-name')) {
        const bio = e.target.nextElementSibling;
        bio.style.display = bio.style.display === 'none' ? 'block' : 'none';
    }
});

// Initialize render
window.onload = renderArtists;