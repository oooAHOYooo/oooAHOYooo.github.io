function videoApp() {
    return {
      // Define playlists by category.
      playlists: {
        episodes: [
          {
            id: 1,
            title: "[Tallboyz] - [Episode] - [Season1]-[001]",
            src: "https://storage.googleapis.com/ahoy-videos/episodes/%5Btallboyz%5D-%5Bepisode%5D-%5BSeason1%5D-%5B001%5D.mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Episode+1",
            category: "Episodes"
          },
          {
            id: 2,
            title: "[Tallboyz] - [Episode] - [Season1]-[002]",
            src: "https://storage.googleapis.com/ahoy-videos/episodes/%5Btallboyz%5D-%5Bepisode%5D-%5BSeason1%5D-%5B002%5D.mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Episode+2",
            category: "Episodes"
          },
          {
            id: 3,
            title: "[Tallboyz] - [Episode] - [Season1]-[003]",
            src: "https://storage.googleapis.com/ahoy-videos/episodes/%5Btallboyz%5D-%5Bepisode%5D-%5BSeason1%5D-%5B003%5D.mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Episode+3",
            category: "Episodes"
          }
        ],
        clips: [
          {
            id: 4,
            title: "[Tallboyz] - [Clip] - [Dave Gunn] - [NoMusic] - [001]",
            src: "https://storage.googleapis.com/ahoy-videos/clips/%5Btallboyz%5D-%5Bclip%5D-%5Bdavegunn%5D-%5BnoMusic%5D-%5B001%5D.MOV",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Clip+1",
            category: "Clips"
          },
          {
            id: 5,
            title: "[Tallboyz] - [Clip] - [Random] - [001]",
            src: "https://storage.googleapis.com/ahoy-videos/clips/%5Btallboyz%5D-%5Bclip%5D-%5Brandom%5D-%5B001%5D.mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Clip+2",
            category: "Clips"
          },
          {
            id: 6,
            title: "[Tallboyz] - [Clip] - [Behind the Scenes] - [001]",
            src: "https://storage.googleapis.com/ahoy-videos/clips/%5Btallboyz%5D-%5Bclip%5D-%5Bbehindthescenes%5D-%5B001%5D.mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Clip+3",
            category: "Clips"
          }
        ],
        promos: [
          {
            id: 7,
            title: "[Tallboyz] - [Promo] - [Ahoy NextUP Tallboyz]",
            src: "https://storage.googleapis.com/ahoy-videos/promos/%5Btallboyz%5D-%5Bpromo%5D-Ahoy_NextUP_Tallboyz.mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Promo+1",
            category: "Promos"
          },
          {
            id: 8,
            title: "[Tallboyz] - [Promo] - [Special Announcement]",
            src: "https://storage.googleapis.com/ahoy-videos/promos/%5Btallboyz%5D-%5Bpromo%5D-Special_Announcement.mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Promo+2",
            category: "Promos"
          },
          {
            id: 9,
            title: "[Tallboyz] - [Promo] - [Event Teaser]",
            src: "https://storage.googleapis.com/ahoy-videos/promos/%5Btallboyz%5D-%5Bpromo%5D-Event_Teaser.mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Promo+3",
            category: "Promos"
          }
        ],
        live: [
          {
            id: 10,
            title: "[Tallboyz] - [Live] - [Concert] - [2022]",
            src: "https://storage.googleapis.com/ahoy-videos/live/%5Btallboyz%5D-%5Blive%5D-[Concert]-[2022].mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Live+1",
            category: "Live"
          },
          {
            id: 11,
            title: "[Tallboyz] - [Live] - [Q&A Session] - [2022]",
            src: "https://storage.googleapis.com/ahoy-videos/live/%5Btallboyz%5D-%5Blive%5D-[QA]-[2022].mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Live+2",
            category: "Live"
          },
          {
            id: 12,
            title: "[Tallboyz] - [Live] - [Behind the Scenes] - [2022]",
            src: "https://storage.googleapis.com/ahoy-videos/live/%5Btallboyz%5D-%5Blive%5D-[BTS]-[2022].mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Live+3",
            category: "Live"
          }
        ],
        music: [
          {
            id: 13,
            title: "[Music] - [Video] - Song A",
            src: "https://storage.googleapis.com/ahoy-videos/music/%5Btallboyz%5D-[music]-SongA.mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Music+1",
            category: "Music"
          },
          {
            id: 14,
            title: "[Music] - [Video] - Song B",
            src: "https://storage.googleapis.com/ahoy-videos/music/%5Btallboyz%5D-[music]-SongB.mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Music+2",
            category: "Music"
          },
          {
            id: 15,
            title: "[Music] - [Video] - Song C",
            src: "https://storage.googleapis.com/ahoy-videos/music/%5Btallboyz%5D-[music]-SongC.mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Music+3",
            category: "Music"
          }
        ],
        broadcast: [
          {
            id: 100,
            title: "[Broadcast] - Morning Show",
            src: "https://storage.googleapis.com/ahoy-videos/broadcast/morning_show.mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Broadcast+Morning",
            duration: 300
          },
          {
            id: 101,
            title: "[Broadcast] - Noon News",
            src: "https://storage.googleapis.com/ahoy-videos/broadcast/noon_news.mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Broadcast+Noon",
            duration: 600
          },
          {
            id: 102,
            title: "[Broadcast] - Evening Special",
            src: "https://storage.googleapis.com/ahoy-videos/broadcast/evening_special.mp4",
            type: "video/mp4",
            thumbnail: "https://via.placeholder.com/400x225?text=Broadcast+Evening",
            duration: 900
          }
        ]
      },
      // State for current view and selection
      selectedCategory: 'episodes',  // default category (for normal library)
      viewMode: 'player',            // 'player' or 'library'
      libraryViewMode: 'grid',       // 'grid' or 'list' (for the comprehensive library)
      currentVideoId: null,          // currently selected video ID
      player: null,
      isPlaying: false,
      microLibraryVisible: false,
      microLibrary: [],
      
      // Computed: Comprehensive library (excludes broadcast channel)
      get fullLibrary() {
        return [
          ...this.playlists.episodes,
          ...this.playlists.clips,
          ...this.playlists.promos,
          ...this.playlists.live,
          ...this.playlists.music
        ];
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
        // If in broadcast mode, search the broadcast playlist
        if (this.selectedCategory === 'broadcast') {
          return this.playlists.broadcast.find(video => video.id === this.currentVideoId) || {};
        }
        // Otherwise, search in the comprehensive library
        return this.fullLibrary.find(video => video.id === this.currentVideoId) || {};
      },
      initApp() {
        // For normal categories, start with the first video from the full library.
        if (this.fullLibrary.length > 0) {
          this.currentVideoId = this.fullLibrary[0].id;
        }
        // Initialize Video.js.
        this.player = videojs('video-player');
        this.loadCurrentVideo();
        // When a video ends, if in broadcast mode, re-calc the schedule;
        // otherwise, play the next video.
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
      // Load the selected video into Video.js.
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
      // For normal categories: select a category and load the first video from that category.
      selectCategory(category) {
        this.selectedCategory = category;
        if (category !== 'broadcast') {
          // For non-broadcast categories, pick the first video of that playlist if available.
          let list = this.playlists[category] || [];
          if (list.length > 0) {
            this.currentVideoId = list[0].id;
            this.loadCurrentVideo();
          }
        }
        this.viewMode = 'player';
      },
      // Normal selection of a video.
      selectVideo(id) {
        this.currentVideoId = id;
        this.loadCurrentVideo();
      },
      // Next video (normal mode or broadcast mode).
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
      // Previous video (normal mode or broadcast mode).
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
      // Toggle play/pause.
      togglePlayPause() {
        if (this.isPlaying) {
          this.player.pause();
        } else {
          this.player.play();
        }
      },
      // Toggle Picture-in-Picture.
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
      // Toggle Fullscreen.
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
      // Broadcast feature: calculate a live schedule based on current time.
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
          // Example: Include the "Dave Gunn" clip in the micro library
          this.microLibrary = this.playlists.clips.filter(video => video.title.includes("Dave Gunn"));
          
          // Automatically select and play the first video in the micro library
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