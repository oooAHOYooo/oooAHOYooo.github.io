function artistDirectory() {
    return {
      searchQuery: '', // User's search input
      artists: [ // Artist data with sample images and links
        { 
          name: "Samuel Dylan Witch", 
          songs: ["Seen Better Days", "Beneath the Willow Tree", "Put Me on the Run", "You Know Me", "Watching Her Fly"], 
          image: "https://i.ytimg.com/vi/XDH0X-dF4GM/maxresdefault.jpg",
          donationLink: "https://donate.samuel.com",
          merchLink: "https://merch.samuel.com",
          externalLink: "https://samuel.com"
        },
        { name: "Cambell Rice", songs: ["Far From Here", "Sunflower", "To Play Guitar in a Huge Room"], image: "https://m.media-amazon.com/images/I/61APLxryThL._UXNaN_FMjpg_QL85_.jpg" },
        { name: "Youth XL", songs: ["Summer Bummer", "Yoga", "Text Your Friends", "Gypsy Gia"], image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyBXIMTxuYsGbaO23UEDr-TeH57LhPKid4ohwt85HyZgtprWiecvV_iFk0dYCMMJnT3ys&usqp=CAU" },
        { name: "Fella Gazelle", songs: ["Reasons"], image: "https://m.media-amazon.com/images/I/61NpQ4vCxOL._UXNaN_FMjpg_QL85_.jpg" },
        { name: "Riddle M", songs: ["Glued in the Nude", "Honeydew", "Daisies", "Garden Girl", "Magic Man", "Melted Side", "Snout", "Mustard Seed"], image: "https://i.ytimg.com/vi/O2SV8BikOjA/maxresdefault.jpg" },
        { name: "Justin Arena", songs: ["Oceans", "When You Wake Up", "Crash The Party", "Framework", "Fruit In The Shower", "No 1"], image: "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/ef/9c/aa/ef9caad8-3001-3554-ff16-a8caf4863e91/artwork.jpg/592x592bf.webp" },
        { name: "Clones of Clarence", songs: ["Lost Time", "Salty Salsa", "Proj 17", "3AM"], image: "https://is1-ssl.mzstatic.com/image/thumb/Music114/v4/8b/4d/cc/8b4dcc19-b47c-5478-b2de-18587dc0c4b3/artwork.jpg/592x592bf.webp" },
        { name: "Coral Reefer", songs: ["Electro"], image: "https://i.ytimg.com/vi/XDH0X-dF4GM/maxresdefault.jpg" },
        { name: "My Own Grenade", songs: ["My Own Grenade", "Frustrated", "My Parents' Couch (Live Cut)", "Spacegirl With A Headset", "Special", "Today Is In My Way"], image: "https://ahoycollection.s3.us-east-2.amazonaws.com/my+own+grenade.jpeg" },
        { name: "S.G. Carlson", songs: ["How I Got Fat While Living Skinny"], image: "https://ahoycollection.s3.us-east-2.amazonaws.com/SGCarlson-AhoyIndieMedia.png" },
        { name: "The Tines", songs: ["Know By Feel", "Chokecherries", "Moon Views"], image: "https://ahoycollection.s3.us-east-2.amazonaws.com/ready_theTinesAlbumArtwork.jpg" },
        { name: "Jake Custer", songs: ["Better Halves", "By Myself", "I'm Fine", "It's a Mad,Mad World", "You Love to See It"], image: "https://storage.googleapis.com/ahoy-song-collection/ahoy_jake-custer.jpg" },
        { name: "Spider in Stereo", songs: ["Float"], image: "https://storage.googleapis.com/ahoy-song-collection/Spider%20in%20Stereo%20-%20Float.jpg" },
        { name: "mintea", songs: ["7eleven", "weird", "fairy wings", "clown girl"], image: "https://storage.googleapis.com/ahoy-song-collection/mintea%20-%20The%20Lost%20Clause%20-%20Album%20Cover.jpg" }
      ],
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