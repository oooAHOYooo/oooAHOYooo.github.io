function artistDirectory() {
    return {
      searchQuery: '', // User's search input
      artists: [], // Initialize as empty, will be populated from JSON
      selectedArtist: null, // Currently selected artist for expanded view

      // Computed property: Filtered Artists
      get filteredArtists() {
        if (!this.searchQuery) return this.artists;

        const query = this.searchQuery.toLowerCase();
        return this.artists.filter(artist =>
          artist.name.toLowerCase().includes(query) || 
          artist.songs.some(song => song.toLowerCase().includes(query))
        );
      },

      // Method to initialize event listeners and load data
      init() {
        this.loadArtists();
        document.addEventListener('click', this.handleOutsideClick.bind(this));
      },

      // Method to load artists from JSON file
      async loadArtists() {
        try {
          const response = await fetch('path/to/artist-database.json');
          if (!response.ok) throw new Error('Failed to load artist data');
          this.artists = await response.json();
        } catch (error) {
          console.error('Error loading artist data:', error);
        }
      },

      // Method to handle clicks outside the popup
      handleOutsideClick(event) {
        const popup = document.querySelector('.popup-selector'); // Replace with your actual popup selector
        if (this.selectedArtist && popup && !popup.contains(event.target)) {
          this.closeArtistView();
        }
      },

      // Method to select an artist and show options
      selectArtist(artist) {
        this.selectedArtist = artist;
      },

      // Method to close the expanded view
      closeArtistView() {
        this.selectedArtist = null;
      }
    }
}

// Initialize the artist directory
const directory = artistDirectory();
directory.init();

