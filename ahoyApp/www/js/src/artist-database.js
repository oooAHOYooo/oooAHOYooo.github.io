function artistDirectory() {
    return {
      searchQuery: '', // User's search input
      artists: [ // Artist data with sample images
        { name: "Samuel Dylan Witch", songs: ["Seen Better Days", "Beneath the Willow Tree", "Put Me on the Run", "You Know Me", "Watching Her Fly"], image: "path/to/samuel-dylan-witch.jpg" },
        { name: "Cambell Rice", songs: ["Far From Here", "Sunflower", "To Play Guitar in a Huge Room"], image: "path/to/cambell-rice.jpg" },
        { name: "Youth XL", songs: ["Summer Bummer", "Yoga", "Text Your Friends", "Gypsy Gia"], image: "path/to/youth-xl.jpg" },
        { name: "Fella Gazelle", songs: ["Reasons"], image: "path/to/fella-gazelle.jpg" },
        { name: "Riddle M", songs: ["Glued in the Nude", "Honeydew", "Daisies", "Garden Girl", "Magic Man", "Melted Side", "Snout", "Mustard Seed"], image: "path/to/riddle-m.jpg" },
        { name: "Justin Arena", songs: ["Oceans", "When You Wake Up", "Crash The Party", "Framework", "Fruit In The Shower", "No 1"], image: "path/to/justin-arena.jpg" },
        { name: "Clones of Clarence", songs: ["Lost Time", "Salty Salsa", "Proj 17", "3AM"], image: "path/to/clones-of-clarence.jpg" },
        { name: "Coral Reefer", songs: ["Electro"], image: "path/to/coral-reefer.jpg" },
        { name: "My Own Grenade", songs: ["My Own Grenade", "Frustrated", "My Parents' Couch (Live Cut)", "Spacegirl With A Headset", "Special", "Today Is In My Way"], image: "path/to/my-own-grenade.jpg" },
        { name: "S.G. Carlson", songs: ["How I Got Fat While Living Skinny"], image: "path/to/sg-carlson.jpg" },
        { name: "The Tines", songs: ["Know By Feel", "Chokecherries", "Moon Views"], image: "path/to/the-tines.jpg" },
        { name: "Jake Custer", songs: ["Better Halves", "By Myself", "I'm Fine", "It's a Mad,Mad World", "You Love to See It"], image: "path/to/jake-custer.jpg" },
        { name: "Spider in Stereo", songs: ["Float"], image: "path/to/spider-in-stereo.jpg" },
        { name: "mintea", songs: ["7eleven", "weird", "fairy wings", "clown girl"], image: "path/to/mintea.jpg" }
      ],
      // Computed property: Filtered Artists
      get filteredArtists() {
        if (!this.searchQuery) return this.artists;

        const query = this.searchQuery.toLowerCase();
        return this.artists.filter(artist =>
          artist.name.toLowerCase().includes(query) || 
          artist.songs.some(song => song.toLowerCase().includes(query))
        );
      }
    }
  }