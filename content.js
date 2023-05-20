var robShowUpdates = new Vue({
    el: '#content-robShow',
    data: {
      episodes: [
        {
          season: 2,
          episode: 1,
          name: "Rob Show Season 2 Premiere",
          guest: "Guest Tyler and Dave Gunn",
          videoUrl: "https://example.com/episode1"
        },
        {
          season: 2,
          episode: 2,
          name: "Rob Show Season 2 Episode 2",
          guest: "Guest John Doe",
          videoUrl: "https://example.com/episode2"
        },

        {
          season: 1,
          episode: 12,
          name: "Rob Show Season 1 Episode 12",
          guest: "Guest Josh Kebabian",
          videoUrl: "https://example.com/episode12"
        },
        {
          season: 1,
          episode: 12,
          name: "Rob Show Season 1 Episode 12",
          guest: "Guest Tyler Rice",
          videoUrl: "https://example.com/episode2"
        },
        {
          season: 1,
          episode: 5,
          name: "Rob Show Season 1 Episode 5",
          guest: "Guest Andrew Leverton",
          videoUrl: "https://example.com/episode3"
        }
        // Add more episodes as needed
      ],
      selectedEpisode: null,
      videoUrl: ''
    },
    methods: {
      selectEpisode: function(episode) {
        this.selectedEpisode = episode;
      },
      playVideo: function(url) {
        this.videoUrl = url;
        console.log("Playing video: " + url);
      }
    }
  });
  