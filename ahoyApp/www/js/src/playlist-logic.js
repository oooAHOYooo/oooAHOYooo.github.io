// Initialize Supabase client (Make sure to replace with your actual Supabase URL and Anon Key)
const supabaseUrl = 'your_supabase_url';
const supabaseKey = 'your_supabase_anon_key';
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
    // Implement your link generation logic here
    return `https://yourwebsite.com/playlists/${encodeURIComponent(playlist.name)}`;
}

// Load and display playlists on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const playlists = await fetchPlaylistsFromSupabase();
        displayPlaylists(playlists);
    } catch (error) {
        console.error('Failed to load playlists:', error);
    }
});

// Make sure to handle user interaction events such as form submissions to call these functions
