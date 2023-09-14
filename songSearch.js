new Vue({
    el: '#songSearchApp',
    data: {
      songs: [
        {
            artist: 'Samuel Dylan Witch',
            songTitle: 'Willow Tree Blues',
            artistThumbnail: 'UNSPLASH_URL_FOR_ARTIST_1',
            albumArtwork: 'UNSPLASH_URL_FOR_ALBUM_1',
            play: false
          },
        {
            artist: 'Artist Name 1',
            songTitle: 'Song Title 1',
            artistThumbnail: 'https://unsplash.com/photos/random_person_image2',
            albumArtwork: 'https://unsplash.com/photos/random_nautical_image2',
            mp3url: 'https://ahoycollection.s3.us-east-2.amazonaws.com/Campbell+Rice-+From+Here.mp3',
            play: false
          },

          {
              artist: 'Cambell Rice',
              songTitle: 'Far From Here',
              artistThumbnail: 'https://unsplash.com/photos/random_person_image2',
              albumArtwork: 'https://unsplash.com/photos/random_nautical_image2',
              mp3url: 'https://ahoycollection.s3.us-east-2.amazonaws.com/Campbell+Rice-+From+Here.mp3',
              play: false
            },
          {
              artist: 'Youth XL',
              songTitle: 'Another Data',
              artistThumbnail: 'UNSPLASH_URL_FOR_ARTIST_3',
              albumArtwork: 'UNSPLASH_URL_FOR_ALBUM_3',
              mp3url: 'https://ahoycollection.s3.us-east-2.amazonaws.com/Campbell+Rice-+From+Here.mp3',
              play: false
            },
            {
                artist: 'Clones of Clarence',
                songTitle: 'I Believe in Love',
                artistThumbnail: 'UNSPLASH_URL_FOR_ARTIST_4',
                albumArtwork: 'UNSPLASH_URL_FOR_ALBUM_4',
                mp3url: 'https://ahoycollection.s3.us-east-2.amazonaws.com/Campbell+Rice-+From+Here.mp3',
                play: false
              },
              {
                  artist: 'Samuel Dylan Witch',
                  songTitle: "I've Seen Better Days",
                  artistThumbnail: 'UNSPLASH_URL_FOR_ARTIST_5',
                  albumArtwork: 'UNSPLASH_URL_FOR_ALBUM_5',
                  mp3url: 'https://ahoycollection.s3.us-east-2.amazonaws.com/Campbell+Rice-+From+Here.mp3',
                  play: false
              },
              {
                artist: 'Samuel Dylan Witch',
                songTitle: "Sweet Three Chord Melody",
                artistThumbnail: 'https://unsplash.com/photos/your_new_selected_artist_image.png',
                mp3url: 'https://ahoycollection.s3.us-east-2.amazonaws.com/Campbell+Rice-+From+Here.mp3',
                albumArtwork: '/getOn/cambellrice.png',
                play: false
            },
              {
                  artist: 'Cambell Rice',
                  songTitle: 'Lonely Thoughts in a Crowded Room',
                  artistThumbnail: 'UNSPLASH_URL_FOR_ARTIST_6',
                  albumArtwork: 'UNSPLASH_URL_FOR_ALBUM_6',
                  mp3url: 'https://ahoycollection.s3.us-east-2.amazonaws.com/Campbell+Rice-+From+Here.mp3',
                  play: false
              },
              {
                artist: 'Sara-Joy Liebig',
                songTitle: 'Woman from Waimea',
                artistThumbnail: 'UNSPLASH_URL_FOR_ARTIST_6',
                albumArtwork: 'UNSPLASH_URL_FOR_ALBUM_6',
                mp3url: 'https://ahoycollection.s3.us-east-2.amazonaws.com/Sara-Joy+Liebig+%7C+Woman+from+Waimea+%7C+.mp3',
                play: false
            },
            {
              artist: 'Youth XL',
              songTitle: 'Text Your Friends',
              artistThumbnail: 'UNSPLASH_URL_FOR_ARTIST_6',
              albumArtwork: 'UNSPLASH_URL_FOR_ALBUM_6',
              mp3url: 'https://ahoycollection.s3.us-east-2.amazonaws.com/Youth+XL+-+Text+Your+Friends.mp3',
              play: false
          },
          {
            artist: 'Youth XL',
            songTitle: 'Gypsy Gia',
            artistThumbnail: 'UNSPLASH_URL_FOR_ARTIST_6',
            albumArtwork: 'UNSPLASH_URL_FOR_ALBUM_6',
            mp3url: 'https://ahoycollection.s3.us-east-2.amazonaws.com/Youth+XL+-+Gypsy+Gia.mp3',
            play: false
        },
        {
          artist: 'Justin Arena',
          songTitle: 'Oceans',
          artistThumbnail: 'UNSPLASH_URL_FOR_ARTIST_6',
          albumArtwork: 'UNSPLASH_URL_FOR_ALBUM_6',
          mp3url: 'https://ahoycollection.s3.us-east-2.amazonaws.com/Justin+Arena+-+Oceans.mp3',
          play: false
      },

              
      ],
      searchTerm: '',
      filteredSongs: []
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
  source.src = song.mp3url; // assuming song.mp3url contains the URL of the song
  audioPlayer.load();
  audioPlayer.play();
      }
    }
});