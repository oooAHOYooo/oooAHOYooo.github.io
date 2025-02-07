function videoApp() {
	return {
	  // Set the default category to "clips" so a clip is shown by default
	  playlists: {},
	  selectedCategory: 'clips',
	  viewMode: 'player',             // 'player' or 'library'
	  libraryViewMode: 'grid',        // grid or list
	  currentVideoId: null,           // currently selected video ID
	  player: null,
	  isPlaying: false,
	  microLibraryVisible: false,
	  microLibrary: [],
	  selectedSubCategory: "",
	  // Computed property: combine videos from several categories
	  get fullLibrary() {
		return [
		  ...(this.playlists.episodes || []),
		  ...(this.playlists.clips || []),
		  ...(this.playlists.promos || []),
		  ...(this.playlists.music || [])
		];
	  },
	  // Computed: For featured playlists (optional seasonal logic)
	  get featuredPlaylists() {
		const month = new Date().getMonth();
		if (month === 11 || month === 0) {
		  return this.playlists.promos ? this.playlists.promos.slice(0, 2) : [];
		} else if (month >= 5 && month <= 7) {
		  return this.playlists.music ? this.playlists.music.slice(0, 2) : [];
		} else {
		  return this.playlists.episodes ? this.playlists.episodes.slice(0, 2) : [];
		}
	  },
	  // Computed: Get the current video from the full library.
	  get currentVideo() {
		return this.fullLibrary.find(video => video.id === this.currentVideoId) || {};
	  },
	  async initApp() {
		const videoElement = document.getElementById('video-player');
		this.player = videoElement;
  
		// Fetch the JSON file (ensure it's served from the same server)
		try {
		  const response = await fetch('./ahoy-playlists.json');
		  this.playlists = await response.json();
		  console.log('Playlists loaded:', this.playlists);
		} catch (error) {
		  console.error('Error fetching playlists:', error);
		}
		
		// Select a random video from the default category ("clips")
		const categoryVideos = this.playlists[this.selectedCategory] || [];
		if (categoryVideos.length > 0) {
		  const randomIndex = Math.floor(Math.random() * categoryVideos.length);
		  this.currentVideoId = categoryVideos[randomIndex].id;
		}
		
		// Load the featured video starting at 10 seconds
		this.loadCurrentVideo(10);
		
		// Event listeners to update play state.
		videoElement.addEventListener('play', () => { this.isPlaying = true; });
		videoElement.addEventListener('pause', () => { this.isPlaying = false; });
	  },
	  // The loadCurrentVideo method now accepts a startTime (default 0).
	  // It sets the video's currentTime (if the video is long enough) but does NOT auto-play.
	  loadCurrentVideo(startTime = 0) {
		this.player.pause();
		if (this.currentVideo && this.currentVideo.src) {
		  this.player.src = this.currentVideo.src;
		  this.player.load();
		  this.player.onloadedmetadata = () => {
			if (this.player.duration > startTime) {
			  this.player.currentTime = startTime;
			}
			// Do NOT auto-play: the big play button overlay will prompt the user.
		  };
		} else {
		  console.error("No valid video source found.");
		}
	  },
	  // Filter videos by sub-category (case-insensitive)
	  filterVideosBySubCategory(subCategory) {
		if (!subCategory) return this.fullLibrary;
		return this.fullLibrary.filter(video => video.category.toLowerCase() === subCategory.toLowerCase());
	  },
	  selectCategory(category, subCategory = "") {
		this.selectedCategory = category;
		this.selectedSubCategory = subCategory;
		const categoryVideos = this.filterVideosBySubCategory(subCategory);
		if (categoryVideos.length > 0) {
		  this.currentVideoId = categoryVideos[0].id;
		  this.loadCurrentVideo(); // Starts at 0 when manually selected
		}
		this.viewMode = 'player';
	  },
	  selectVideo(id) {
		this.currentVideoId = id;
		this.loadCurrentVideo(); // Starts at 0 when manually selected
	  },
	  nextVideo() {
		let index = this.fullLibrary.findIndex(video => video.id === this.currentVideoId);
		index = (index + 1) % this.fullLibrary.length;
		this.currentVideoId = this.fullLibrary[index].id;
		this.loadCurrentVideo();
	  },
	  prevVideo() {
		let index = this.fullLibrary.findIndex(video => video.id === this.currentVideoId);
		index = (index - 1 + this.fullLibrary.length) % this.fullLibrary.length;
		this.currentVideoId = this.fullLibrary[index].id;
		this.loadCurrentVideo();
	  },
	  togglePlayPause() {
		if (this.isPlaying) {
		  this.player.pause();
		} else {
		  this.player.play().catch(err => console.error('Error playing video:', err));
		}
	  },
	  async togglePip() {
		if (document.pictureInPictureElement) {
		  await document.exitPictureInPicture();
		} else if (this.player.requestPictureInPicture) {
		  try {
			await this.player.requestPictureInPicture();
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
	  // Casting method remains unchanged (if available)
	  castVideo() {
		if (this.player.chromecast) {
		  this.player.chromecast();
		} else {
		  alert('Cast feature not available.');
		}
	  }
	};
  }
  