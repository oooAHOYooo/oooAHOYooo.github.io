new Vue({
    el: '#app',
    data: {
      songs: [
        {
            artist: 'Samuel Dylan Witch',
            songTitle: 'Willow Tree Blues',
            artistThumbnail: 'UNSPLASH_URL_FOR_ARTIST_1',
            albumArtwork: 'UNSPLASH_URL_FOR_ALBUM_1',
            play: true
          },
        {
            artist: 'Artist Name 1',
            songTitle: 'Song Title 1',
            artistThumbnail: 'https://unsplash.com/photos/random_person_image2',
            albumArtwork: 'https://unsplash.com/photos/random_nautical_image2',
            mp3url: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
            play: false
          },

          {
              artist: 'Artist Name 2',
              songTitle: 'Song Title 2',
              artistThumbnail: 'https://unsplash.com/photos/random_person_image2',
              albumArtwork: 'https://unsplash.com/photos/random_nautical_image2',
              mp3url: 'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
              play: false
            },
          {
              artist: 'Youth XL',
              songTitle: 'Another Data',
              artistThumbnail: 'UNSPLASH_URL_FOR_ARTIST_3',
              albumArtwork: 'UNSPLASH_URL_FOR_ALBUM_3',
              play: false
            },
            {
                artist: 'Clones of Clarence',
                songTitle: 'I Believe in Love',
                artistThumbnail: 'UNSPLASH_URL_FOR_ARTIST_4',
                albumArtwork: 'UNSPLASH_URL_FOR_ALBUM_4',
                play: false
              },
              {
                  artist: 'Samuel Dylan Witch',
                  songTitle: "I've Seen Better Days",
                  artistThumbnail: 'UNSPLASH_URL_FOR_ARTIST_5',
                  albumArtwork: 'UNSPLASH_URL_FOR_ALBUM_5',
                  play: false
              },
              {
                  artist: 'Cambell Rice',
                  songTitle: 'Lonely Thoughts in a Crowded Room',
                  artistThumbnail: 'UNSPLASH_URL_FOR_ARTIST_6',
                  albumArtwork: 'UNSPLASH_URL_FOR_ALBUM_6',
                  play: false
              },
              
              
            
          





      ],
      searchTerm: '',
      filteredSongs: []
    },
    mounted() {
      // Initialize filteredSongs with all songs
      this.filteredSongs = this.songs;
    },
    methods: {
      searchSongs() {
        if (this.searchTerm.trim() === '') {
          this.filteredSongs = this.songs; // If search is empty, show all songs
          return;
        }
  
        // Filter songs by search term
        this.filteredSongs = this.songs.filter(song => {
          return Object.values(song).some(value => 
            value.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
          );
        });
      },
      togglePlay(song) {


        this.currentSong = song.mp3url; // Change the current song to the clicked one
        this.$nextTick(() => {
          this.$refs.audioPlayer.play(); // Play the audio
        });





      }
    }
  });
  