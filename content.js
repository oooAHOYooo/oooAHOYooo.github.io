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
  