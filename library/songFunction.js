import { songs } from './songData.js';


new Vue({
    el: '#songSearchApp',
    data: {
      currentSong: null,
      currentArtist: '',
      songs: songs, 
      searchTerm: '',
      filteredSongs: [],
      currentSong: null,
      currentSongTitle: '', // New property for song title
      currentArtist: '',
      playlists: {}, // Initialize empty playlists object
      selectedPlaylist: null, // Initialize selectedPlaylist to null
    },
    mounted() {
      this.filteredSongs = this.songs;
    },
    methods: {
      searchSongs() {
        if (this.searchTerm.trim() === '') {
          this.filteredSongs = this.songs;
          return;
        }
  
        this.filteredSongs = this.songs.filter(song => {
          return Object.values(song).some(value => 
            value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        });
      },
      togglePlay(song) {
        const audioPlayer = document.getElementById('audioPlayer');
        const source = audioPlayer.querySelector('source');
        if (this.currentSong === song.mp3url) {
            if (audioPlayer.paused) {
                audioPlayer.play();
                song.play = true;
                this.currentSong.play = true;
            } else {
                audioPlayer.pause();
                song.play = false;
                this.currentSong.play = false;
            }
        } else {
            source.src = song.mp3url;
            audioPlayer.load();
            audioPlayer.play();
            this.currentSong = song.mp3url; // Change the current song to the clicked one
            this.currentArtist = song.artist; // Update the current artist
            this.currentSongTitle = song.songTitle; // Update the current song title
            song.play = true;
        }
        
    }, // Closing brace for togglePlay method
      createPlaylist() {
        const newPlaylistName = document.getElementById("newPlaylistName").value;
        if (newPlaylistName.trim() !== '') {
            Vue.set(this.playlists, newPlaylistName, []);
            this.selectedPlaylist = newPlaylistName;  // Automatically select the newly created playlist
        }
    },
    addToPlaylist(song) {
        if (this.selectedPlaylist) {
            if (!this.playlists[this.selectedPlaylist]) {
                this.playlists[this.selectedPlaylist] = []; // Initialize if not already
            }
            this.playlists[this.selectedPlaylist].push(song);
        }
    },
    // ... (other parts remain unchanged)
},
watch: {
    playlists: {
        deep: true, // Watch object deeply
        handler() {
            this.selectedPlaylist = Object.keys(this.playlists)[0] || null; // Automatically set to first playlist if not selected
        }
    }
}
});




  
  
  
  
  
  