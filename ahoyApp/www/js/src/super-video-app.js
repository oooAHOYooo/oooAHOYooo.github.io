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
	  volume: 1.0, // Default volume level
	  playbackSpeed: 1.0, // Default playback speed
	  useRemoteSource: true, // New property to toggle between local and remote source
	  // Computed property: combine videos from several categories
	  get fullLibrary() {
		return [
		  ...(this.playlists.episodes || []),
		  ...(this.playlists.clips || []),
		  ...(this.playlists.promos || []),
		  ...(this.playlists.music || [])
		];
	  },
	  // // Computed: For featured playlists (optional seasonal logic)
	  // get featuredPlaylists() {
	  //   const month = new Date().getMonth();
	  //   if (month === 11 || month === 0) {
	  //     return this.playlists.promos ? this.playlists.promos.slice(0, 2) : [];
	  //   } else if (month >= 5 && month <= 7) {
	  //     return this.playlists.music ? this.playlists.music.slice(0, 2) : [];
	  //   } else {
	  //     return this.playlists.episodes ? this.playlists.episodes.slice(0, 2) : [];
	  //   }
	  // },
	  // // New computed properties for broadcast
	  // get summerBroadcast() {
	  //   const summerVideos = (this.playlists.broadcast || []).filter(video => video.season.toLowerCase() === 'summer');
	  //   // Randomly pick 3 videos from the summer broadcast videos
	  //   return summerVideos.sort(() => 0.5 - Math.random()).slice(0, 3);
	  // },
	  // get winterBroadcast() {
	  //   const winterVideos = (this.playlists.broadcast || []).filter(video => video.season.toLowerCase() === 'winter');
	  //   return winterVideos.sort(() => 0.5 - Math.random()).slice(0, 3);
	  // },
	  // // Choose which seasonal broadcast playlist to use.
	  // // Here we assume summer is May (month 4) through August (month 7)
	  // get currentBroadcastPlaylist() {
	  //   const month = new Date().getMonth();
	  //   if (month >= 4 && month <= 7) {
	  //     return this.summerBroadcast;
	  //   } else {
	  //     return this.winterBroadcast;
	  //   }
	  // },
	  // Computed: Get the current video from the full library.
	  get currentVideo() {
		return this.fullLibrary.find(video => video.id === this.currentVideoId) || {};
	  },
	  async initApp() {
		const videoElement = document.getElementById('video-player');
		this.player = videoElement;
  
		// Ensure the video element is responsive
		videoElement.style.width = '100%';
		videoElement.style.height = 'auto';
  
		// Fetch your JSON file (ensure it's served from the same server)
		try {
		  const sourceUrl = this.useRemoteSource 
			? 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/ahoy-playlists.json'
			: './ahoy-playlists.json';
		  const response = await fetch(sourceUrl);
		  this.playlists = await response.json();
		  console.log('Playlists loaded:', this.playlists);
		} catch (error) {
		  console.error('Error fetching playlists:', error);
		}
		
		// Shuffle the full library
		this.shuffleLibrary();
		
		// Select a random video from the default category ("clips")
		const categoryVideos = this.playlists[this.selectedCategory] || [];
		if (categoryVideos.length > 0) {
		  const randomIndex = Math.floor(Math.random() * categoryVideos.length);
		  this.currentVideoId = categoryVideos[randomIndex].id;
		}
		
		// Load the featured video starting at 10 seconds without auto-playing
		this.loadCurrentVideo(10);
		
		// Event listeners for updating play state.
		videoElement.addEventListener('play', () => { this.isPlaying = true; });
		videoElement.addEventListener('pause', () => { this.isPlaying = false; });

		// Add click event listener to toggle play/pause
		videoElement.addEventListener('click', () => {
			this.togglePlayPause();
		});

		// Initialize lazy loading for video thumbnails
		this.initLazyLoadThumbnails();
	  },
	  // loadCurrentVideo now accepts an optional startTime (default 0)
	  // It loads the video, sets currentTime if possible, but does NOT auto-play.
	  loadCurrentVideo(startTime = 0) {
		this.player.pause();
		if (this.currentVideo && this.currentVideo.src) {
		  this.player.src = this.currentVideo.src;
		  this.player.load();
		  this.player.onloadedmetadata = () => {
			if (this.player.duration > startTime) {
			  this.player.currentTime = startTime;
			}
			// Do not auto-play: the user must click the big play button.
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
		  this.loadCurrentVideo(); // starts at 0 when manually selected
		}
		this.viewMode = 'player';
		window.scrollTo(0, 0); // Scroll to the top of the page
	  },
	  selectVideo(id) {
		this.currentVideoId = id;
		this.loadCurrentVideo(); // starts at 0 when manually selected
		window.scrollTo(0, 0); // Scroll to the top of the page
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
	  },
	  // NEW: Method to start the broadcast system
	  startBroadcast() {
		this.selectedCategory = 'broadcast';
		const playlist = this.currentBroadcastPlaylist;
		if (playlist.length === 0) return;
		let now = new Date();
		let secondsSinceMidnight = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
		// Calculate total duration of the selected broadcast playlist
		let totalDuration = playlist.reduce((sum, video) => sum + video.duration, 0);
		let offset = secondsSinceMidnight % totalDuration;
		let cumulative = 0;
		for (let video of playlist) {
		  cumulative += video.duration;
		  if (offset < cumulative) {
			let videoOffset = offset - (cumulative - video.duration);
			this.currentVideoId = video.id;
			this.player.pause();
			this.player.src = video.src;
			this.player.load();
			this.player.onloadedmetadata = () => {
			  if (this.player.duration > videoOffset) {
				this.player.currentTime = videoOffset;
			  }
			  this.player.play().catch(err => console.error('Error playing broadcast:', err));
			};
			break;
		  }
		}
		this.viewMode = 'player';
	  },
	  // New method to shuffle the full library
	  shuffleLibrary() {
		for (let i = this.fullLibrary.length - 1; i > 0; i--) {
		  const j = Math.floor(Math.random() * (i + 1));
		  [this.fullLibrary[i], this.fullLibrary[j]] = [this.fullLibrary[j], this.fullLibrary[i]];
		}
	  },
	  // Method to increase volume
	  increaseVolume() {
		this.volume = Math.min(this.volume + 0.1, 1.0);
		this.player.volume = this.volume;
	  },
	  // Method to decrease volume
	  decreaseVolume() {
		this.volume = Math.max(this.volume - 0.1, 0.0);
		this.player.volume = this.volume;
	  },
	  // Method to toggle mute
	  toggleMute() {
		this.player.muted = !this.player.muted;
	  },
	  // Method to change playback speed
	  changePlaybackSpeed(speed) {
		this.playbackSpeed = speed;
		this.player.playbackRate = this.playbackSpeed;
	  },
	  initLazyLoadThumbnails() {
		const options = {
		  root: null, // Use the viewport as the container
		  rootMargin: '0px',
		  threshold: 0.1 // Trigger when 10% of the element is visible
		};

		const observer = new IntersectionObserver((entries, observer) => {
		  entries.forEach(entry => {
			if (entry.isIntersecting) {
			  const img = entry.target;
			  img.src = img.dataset.src; // Load the actual image
			  observer.unobserve(img); // Stop observing once loaded
			}
		  });
		}, options);

		const thumbnails = document.querySelectorAll('.video-thumbnail[data-src]');
		thumbnails.forEach(thumbnail => observer.observe(thumbnail));
	  }
	};
  }
  