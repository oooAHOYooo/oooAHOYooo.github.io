function videoApp() {
    return {
      playlists: {},
      selectedCategory: 'episodes',  // default category (for normal library)
      viewMode: 'player',            // 'player' or 'library'
      libraryViewMode: 'grid',       // 'grid' or 'list' (for the comprehensive library)
      currentVideoId: null,          // currently selected video ID
      player: null,
      isPlaying: false,
      microLibraryVisible: false,
      microLibrary: [],
      
      // Load video data from JSON file
      async loadVideoData() {
        try {
          const response = await fetch('video-app.json');
          const data = await response.json();
          console.log("Video data loaded:", data); // Log the loaded data
          this.playlists = this.organizePlaylists(data.videos);
          console.log("Playlists organized:", this.playlists); // Log the organized playlists
          this.initApp();
        } catch (error) {
          console.error("Error loading video data:", error);
        }
      },

      // Organize videos into playlists by category
      organizePlaylists(videos) {
        return videos.reduce((playlists, video) => {
          if (!playlists[video.category.toLowerCase()]) {
            playlists[video.category.toLowerCase()] = [];
          }
          playlists[video.category.toLowerCase()].push(video);
          return playlists;
        }, {});
      },

      // Computed: Comprehensive library (excludes broadcast channel)
      get fullLibrary() {
        return Object.values(this.playlists).flat();
      },

      // Computed: For featured playlists (simple seasonal logic)
      get featuredPlaylists() {
        const month = new Date().getMonth();
        if (month === 11 || month === 0) {
          return this.playlists.promos.slice(0, 2);
        } else if (month >= 5 && month <= 7) {
          return this.playlists.live.slice(0, 2);
        } else {
          return this.playlists.episodes.slice(0, 2);
        }
      },

      // Computed: Get the current video from the full library or broadcast list
      get currentVideo() {
        if (this.selectedCategory === 'broadcast') {
          return this.playlists.broadcast.find(video => video.id === this.currentVideoId) || {};
        }
        return this.fullLibrary.find(video => video.id === this.currentVideoId) || {};
      },

      initApp() {
        if (this.fullLibrary.length > 0) {
          this.currentVideoId = this.fullLibrary[0].id;
        }
        this.player = videojs('video-player');
        this.loadCurrentVideo();
        this.player.on('ended', () => {
          if (this.selectedCategory === 'broadcast') {
            this.startBroadcast();
          } else {
            this.nextVideo();
          }
        });
        this.player.on('play', () => { this.isPlaying = true; });
        this.player.on('pause', () => { this.isPlaying = false; });
      },

      loadCurrentVideo() {
        this.player.pause();
        if (this.currentVideo && this.currentVideo.src) {
          console.log("Loading video:", this.currentVideo.src, "Type:", this.currentVideo.type);
          this.player.src({
            src: this.currentVideo.src,
            type: this.currentVideo.type
          });
          this.player.load();
          this.player.play();
        } else {
          console.error("No valid video source found.");
        }
      },

      selectCategory(category) {
        this.selectedCategory = category;
        if (category !== 'broadcast') {
          let list = this.playlists[category] || [];
          if (list.length > 0) {
            this.currentVideoId = list[0].id;
            this.loadCurrentVideo();
          }
        }
        this.viewMode = 'player';
      },

      selectVideo(id) {
        this.currentVideoId = id;
        this.loadCurrentVideo();
      },

      nextVideo() {
        if (this.selectedCategory === 'broadcast') {
          this.startBroadcast();
          return;
        }
        let index = this.fullLibrary.findIndex(video => video.id === this.currentVideoId);
        index = (index + 1) % this.fullLibrary.length;
        this.currentVideoId = this.fullLibrary[index].id;
        this.loadCurrentVideo();
      },

      prevVideo() {
        if (this.selectedCategory === 'broadcast') {
          this.startBroadcast();
          return;
        }
        let index = this.fullLibrary.findIndex(video => video.id === this.currentVideoId);
        index = (index - 1 + this.fullLibrary.length) % this.fullLibrary.length;
        this.currentVideoId = this.fullLibrary[index].id;
        this.loadCurrentVideo();
      },

      togglePlayPause() {
        if (this.isPlaying) {
          this.player.pause();
        } else {
          this.player.play();
        }
      },

      async togglePip() {
        const videoEl = this.player.tech(true).el();
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else if (videoEl.requestPictureInPicture) {
          try {
            await videoEl.requestPictureInPicture();
          } catch (error) {
            console.error("PIP error:", error);
          }
        }
      },

      toggleFullscreen() {
        const container = document.querySelector('.container');
        if (!document.fullscreenElement) {
          container.requestFullscreen().catch(err => {
            console.error(`Error enabling fullscreen: ${err.message} (${err.name})`);
          });
        } else {
          document.exitFullscreen();
        }
      },

      startBroadcast() {
        this.selectedCategory = 'broadcast';
        const broadcastPlaylist = this.playlists.broadcast;
        if (broadcastPlaylist.length === 0) return;
        let now = new Date();
        let secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
        let totalDuration = broadcastPlaylist.reduce((sum, video) => sum + video.duration, 0);
        let offset = secondsSinceMidnight % totalDuration;
        let cumulative = 0;
        for (let video of broadcastPlaylist) {
          cumulative += video.duration;
          if (offset < cumulative) {
            let videoOffset = offset - (cumulative - video.duration);
            this.currentVideoId = video.id;
            this.player.pause();
            this.player.src({ src: video.src, type: video.type });
            this.player.load();
            this.player.one('loadedmetadata', () => {
              this.player.currentTime(videoOffset);
              this.player.play();
            });
            break;
          }
        }
        this.viewMode = 'player';
      },

      toggleMicroLibrary(playlistId) {
        this.microLibraryVisible = !this.microLibraryVisible;
        if (this.microLibraryVisible) {
          this.microLibrary = this.playlists.clips.filter(video => video.title.includes("Dave Gunn"));
          if (this.microLibrary.length > 0) {
            this.currentVideoId = this.microLibrary[0].id;
            this.loadCurrentVideo();
            this.viewMode = 'player';
          }
        } else {
          this.microLibrary = [];
        }
      }
    }
  }

// Initialize the app and load video data
const app = videoApp();
app.loadVideoData();