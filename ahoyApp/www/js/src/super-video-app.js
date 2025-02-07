function videoApp() {
    return {
        // Instead of hardcoding playlists, we start with an empty object
        playlists: {},
        selectedCategory: 'broadcast',  // default category (for normal library)
        viewMode: 'player',             // 'player' or 'library'
        libraryViewMode: 'grid',        // start in grid view instead of list
        currentVideoId: null,          // currently selected video ID
        player: null,
        isPlaying: false,
        microLibraryVisible: false,
        microLibrary: [],
        selectedSubCategory: null,
        // Computed property: combine videos from several categories
        get fullLibrary() {
            return [
                ...(this.playlists.episodes || []),
                ...(this.playlists.clips || []),
                ...(this.playlists.promos || []),
                ...(this.playlists.live || []),
                ...(this.playlists.music || [])
            ];
        },
        // Computed: For featured playlists (simple seasonal logic)
        get featuredPlaylists() {
            const month = new Date().getMonth();
            if (month === 11 || month === 0) {
                return this.playlists.promos ? this.playlists.promos.slice(0, 2) : [];
            } else if (month >= 5 && month <= 7) {
                return this.playlists.live ? this.playlists.live.slice(0, 2) : [];
            } else {
                return this.playlists.episodes ? this.playlists.episodes.slice(0, 2) : [];
            }
        },
        // Computed: Get the current video from the full library or broadcast list
        get currentVideo() {
            if (this.selectedCategory === 'broadcast') {
                return this.playlists.broadcast ? this.playlists.broadcast.find(video => video.id === this.currentVideoId) || {} : {};
            }
            return this.fullLibrary.find(video => video.id === this.currentVideoId) || {};
        },
        async initApp() {
            // Initialize Video.js
            this.player = videojs('video-player');
            
            // Fetch your JSON file (make sure the file is served from the same server)
            try {
                const response = await fetch('./ahoy-playlists.json');
                this.playlists = await response.json();
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
            
            // Select a random video from the default category if available
            const categoryVideos = this.playlists[this.selectedCategory] || [];
            if (categoryVideos.length > 0) {
                const randomIndex = Math.floor(Math.random() * categoryVideos.length);
                this.currentVideoId = categoryVideos[randomIndex].id;
            }
            
            this.loadCurrentVideo();
            
            // Event listeners for video end, play, and pause
            this.player.on('ended', () => {
                if (this.selectedCategory === 'broadcast') {
                    this.startBroadcast();
                } else {
                    this.nextVideo();
                }
            });
            this.player.on('play', () => { this.isPlaying = true; });
            this.player.on('pause', () => { this.isPlaying = false; });
            
            // Initialize Chromecast plugin if available
            if (this.player.chromecast) {
                // Example: this.player.chromecast({ receiverAppId: 'YOUR_CHROMECAST_APP_ID' });
            }
            
            // Ensure broadcast starts playing first
            this.startBroadcast();
        },
        loadCurrentVideo() {
            this.player.pause();
            if (this.currentVideo && this.currentVideo.src) {
                this.player.src({
                    src: this.currentVideo.src,
                    type: this.currentVideo.type
                });
                this.player.load();
                this.player.play();
            }
        },
        // Method to filter videos by sub-category
        filterVideosBySubCategory(subCategory) {
            if (!subCategory) return this.fullLibrary;
            return this.fullLibrary.filter(video => video.category === subCategory);
        },
        selectCategory(category, subCategory = null) {
            this.selectedCategory = category;
            this.selectedSubCategory = subCategory;
    
            // Filter videos based on the selected sub-category
            const categoryVideos = this.filterVideosBySubCategory(subCategory);
    
            if (categoryVideos.length > 0) {
                this.currentVideoId = categoryVideos[0].id;
                this.loadCurrentVideo();
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
            const broadcastPlaylist = this.playlists.broadcast || [];
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
                // Example: include clips that match a certain criteria
                this.microLibrary = this.playlists.clips ? this.playlists.clips.filter(video => video.title.includes("Dave Gunn")) : [];
                if (this.microLibrary.length > 0) {
                    this.currentVideoId = this.microLibrary[0].id;
                    this.loadCurrentVideo();
                    this.viewMode = 'player';
                }
            } else {
                this.microLibrary = [];
            }
        },
        // New casting method using the video.js Chromecast plugin
        castVideo() {
            if (this.player.chromecast) {
                this.player.chromecast();
            } else {
                alert('Cast feature not available.');
            }
        }
    }
}