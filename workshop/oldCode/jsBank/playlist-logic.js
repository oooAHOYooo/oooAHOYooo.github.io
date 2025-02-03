// Initialize Supabase client (Make sure to replace with your actual Supabase URL and Anon Key)
const supabaseUrl = 'https://ornjxycoizoybvdhhowp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ybmp4eWNvaXpveWJ2ZGhob3dwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzNTA4ODEsImV4cCI6MjAxNzkyNjg4MX0.SIgYEybVeKQ5xGnplA-elTOw0oC5tZIv5nGRUZf-vS8';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Function to create a new playlist in Supabase
async function createPlaylistInSupabase(name, items) {
    const { data, error } = await supabase
        .from('playlists')
        .insert([{ name, items }]);
    if (error) throw error;
    return data;
}

// Function to fetch playlists from Supabase
async function fetchPlaylistsFromSupabase() {
    const { data, error } = await supabase
        .from('playlists')
        .select('*');
    if (error) throw error;
    return data;
}

// Function to update a playlist in Supabase
async function updatePlaylistInSupabase(id, updatedFields) {
    const { data, error } = await supabase
        .from('playlists')
        .update(updatedFields)
        .match({ id });
    if (error) throw error;
    return data;
}

// Function to delete a playlist in Supabase
async function deletePlaylistInSupabase(id) {
    const { data, error } = await supabase
        .from('playlists')
        .delete()
        .match({ id });
    if (error) throw error;
    return data;
}

// Function to display playlists in a grid
function displayPlaylists(playlists) {
    const playlistGrid = document.getElementById('playlist-grid');
    playlistGrid.innerHTML = ''; // Clear existing playlists

    playlists.forEach(playlist => {
        const playlistElement = document.createElement('div');
        playlistElement.className = 'playlist-item';
        playlistElement.innerHTML = `
            <h3>${playlist.name}</h3>
            <div class="media-icons">
                ${playlist.items.map(item => `<i class="${getIconClassForType(item.type)}"></i>`).join('')}
            </div>
            <button onclick="sharePlaylist('${playlist.name}')">Share</button>
            <button onclick="deletePlaylistInSupabase(${playlist.id})">Delete</button>
        `;
        playlistGrid.appendChild(playlistElement);
    });
}

// Helper function to get icon class based on media type
function getIconClassForType(type) {
    const iconTypes = {
        podcast: 'fas fa-podcast',
        music: 'fas fa-music',
        video: 'fas fa-video'
    };
    return iconTypes[type] || 'fas fa-file';
}

// Function to share a playlist
function sharePlaylist(playlistName) {
    const playlist = userPlaylists.find(p => p.name === playlistName);
    if (!playlist) {
        alert('Playlist not found!');
        return;
    }

    if (navigator.share) {
        navigator.share({
            title: `Check out my playlist: ${playlist.name}`,
            url: generatePlaylistShareLink(playlist)
        }).then(() => {
            console.log('Playlist shared successfully!');
        }).catch(console.error);
    } else {
        // Fallback for browsers that do not support the Web Share API
        prompt('Copy this link to share your playlist:', generatePlaylistShareLink(playlist));
    }
}

// Function to generate a shareable link for a playlist
function generatePlaylistShareLink(playlist) {
    return `https://ahoy.ooo/playlists/${encodeURIComponent(playlist.name)}`;
}

// Load and display playlists on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const playlists = await fetchPlaylistsFromSupabase();
        displayPlaylists(playlists);
    } catch (error) {
        console.error('Failed to load playlists:', error);
    }

    // Function to create a form for playlist creation
    async function createPlaylistForm() {
        const musicCollection = await fetch('../../data/songCollection.json').then(res => res.json());
        const podcastCollection = await fetch('../../data/podcastCollection.json').then(res => res.json());
        const mediaCollection = await fetch('../../data/mediaCollection.json').then(res => res.json());

        const allItems = [
            ...musicCollection.songs.map(song => ({ ...song, type: 'music' })),
            ...podcastCollection.podcasts.map(podcast => ({ ...podcast, type: 'podcast' })),
            ...mediaCollection.map(media => ({ ...media, type: 'media' }))
        ];

        const form = document.createElement('form');
        form.id = 'playlistCreationForm';
        form.innerHTML = `
            <input type="text" id="playlistName" placeholder="Playlist Name" required>
            <table>
                <thead>
                    <tr>
                        <th>Select</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Artist</th>
                    </tr>
                </thead>
                <tbody>
                    ${allItems.map(item => `
                        <tr>
                            <td><input type="checkbox" name="item" value="${item.id}" data-type="${item.type}"></td>
                            <td>${item.songTitle || item.title || item.display_title}</td>
                            <td>${item.type}</td>
                            <td>${item.artist || 'N/A'}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <button type="submit">Create Playlist</button>
        `;

        form.onsubmit = async (e) => {
            e.preventDefault();
            const name = document.getElementById('playlistName').value;
            const selectedItems = Array.from(form.querySelectorAll('input[name="item"]:checked')).map(input => ({
                id: input.value,
                type: input.dataset.type
            }));

            await createPlaylistInSupabase(name, selectedItems);
            alert('Playlist created successfully!');
            form.reset(); // Reset form after submission
            // Refresh or update the playlist display
            const playlists = await fetchPlaylistsFromSupabase();
            displayPlaylists(playlists);
        };

        document.body.appendChild(form); // Append form to the body or to a specific div if needed
    }

    // Attach event listener to the "Create Playlist" button
    document.getElementById('createPlaylistButton').addEventListener('click', createPlaylistForm);

    // Initial call to load and display existing playlists
    const playlists = await fetchPlaylistsFromSupabase();
    displayPlaylists(playlists);
});


async function testDisplayPlaylists() {
    const playlists = await fetchPlaylistsFromSupabase();
    console.log(playlists); // Check if playlists are fetched correctly
    displayPlaylists(playlists);
    alert('Display Playlists function works correctly!');
}