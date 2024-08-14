fetch('./data/podcastCollection.json')
    .then(response => response.json())
    .then(data => {
        const podcasts = data.podcasts;
        let currentPodcastIndex = 0;

        const audioPlayer = document.getElementById('podcastPlayer');
        const podcastTitle = document.getElementById('podcast-title');
        const podcastDescription = document.getElementById('podcast-description');
        const podcastThumbnail = document.getElementById('podcast-thumbnail');
        const prevBtn = document.getElementById('prevPodcastBtn');
        const nextBtn = document.getElementById('nextPodcastBtn');
        const likeBtn = document.getElementById('likePodcastBtn');
        const likedPodcastsList = document.getElementById('likedPodcastsList');
        const volumeBar = document.getElementById('podcastVolumeBar');
        const commentInput = document.getElementById('podcastCommentInput');
        const submitCommentBtn = document.getElementById('submitPodcastCommentBtn');
        const commentsList = document.getElementById('podcastCommentsList');
        const playBtn = document.getElementById('playPodcastBtn');
        const podcastSearch = document.getElementById('podcastSearch');
        const searchBtn = document.getElementById('searchPodcastBtn');
        const podcastListBody = document.getElementById('podcastListBody');
        let likedPodcasts = JSON.parse(localStorage.getItem('likedPodcasts')) || [];
        let comments = {};
        let totalComments = 0;

        const likedPodcastsCount = document.getElementById('likedPodcastsCount');
        const commentsCount = document.getElementById('commentsCount');

        function shufflePodcasts() {
            for (let i = podcasts.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [podcasts[i], podcasts[j]] = [podcasts[j], podcasts[i]];
            }
        }

        function togglePlay() {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playBtn.textContent = '[❚❚ PAUSE]';
            } else {
                audioPlayer.pause();
                playBtn.textContent = '[► PLAY]';
            }
        }

        function loadPodcast(podcast) {
            podcastTitle.textContent = `PODCAST TITLE: ${podcast.title}`;
            podcastDescription.textContent = `DESCRIPTION: ${podcast.description}`;
            podcastThumbnail.src = podcast.thumbnail;
            audioPlayer.src = podcast.mp3url;
            updateCommentsList();
            playBtn.textContent = '[► PLAY]';
            populatePodcastList();

            likeBtn.dataset.podcastId = podcast.id;
            updateLikeButtonState(podcast.id);
        }

        function prevPodcast() {
            currentPodcastIndex = (currentPodcastIndex - 1 + podcasts.length) % podcasts.length;
            loadPodcast(podcasts[currentPodcastIndex]);
            audioPlayer.play();
            playBtn.textContent = '[❚❚ PAUSE]';
        }

        function nextPodcast() {
            currentPodcastIndex = (currentPodcastIndex + 1) % podcasts.length;
            loadPodcast(podcasts[currentPodcastIndex]);
            audioPlayer.play();
            playBtn.textContent = '[❚❚ PAUSE]';
        }

        function likePodcast() {
            const currentPodcast = podcasts[currentPodcastIndex];
            if (!likedPodcasts.some(podcast => podcast.id === currentPodcast.id)) {
                likedPodcasts.push(currentPodcast);
                updateLikedPodcasts();
                likedPodcastsCount.textContent = likedPodcasts.length;
            }
        }

        function updateLikedPodcasts() {
            likedPodcastsList.innerHTML = '';
            likedPodcasts.forEach((podcast, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${podcast.title}</span>
                    <div>
                        <button class="play-btn" aria-label="Play podcast">
                            <i class="fas fa-play"></i>
                        </button>
                        <button class="delete-btn" aria-label="Remove from liked podcasts">
                            <i class="fas fa-times-circle"></i>
                        </button>
                    </div>
                `;
                likedPodcastsList.appendChild(li);

                li.querySelector('.play-btn').addEventListener('click', () => {
                    currentPodcastIndex = podcasts.findIndex(s => s.id === podcast.id);
                    loadPodcast(podcasts[currentPodcastIndex]);
                    audioPlayer.play();
                    playBtn.textContent = '[❚❚ PAUSE]';
                });

                li.querySelector('.delete-btn').addEventListener('click', () => {
                    likedPodcasts = likedPodcasts.filter(s => s.id !== podcast.id);
                    updateLikedPodcasts();
                    localStorage.setItem('likedPodcasts', JSON.stringify(likedPodcasts));
                    likedPodcastsCount.textContent = likedPodcasts.length;
                    updateLikeButtonState(podcasts[currentPodcastIndex].id);
                });
            });
            localStorage.setItem('likedPodcasts', JSON.stringify(likedPodcasts));
        }

        function updateCommentsList() {
            const currentPodcast = podcasts[currentPodcastIndex];
            commentsList.innerHTML = '';
            if (comments[currentPodcast.id]) {
                comments[currentPodcast.id].forEach(comment => {
                    const li = document.createElement('li');
                    li.textContent = comment;
                    commentsList.appendChild(li);
                });
            }
        }

        function addComment() {
            const currentPodcast = podcasts[currentPodcastIndex];
            const comment = commentInput.value.trim();
            if (comment) {
                if (!comments[currentPodcast.id]) {
                    comments[currentPodcast.id] = [];
                }
                comments[currentPodcast.id].push(comment);
                updateCommentsList();
                commentInput.value = '';
                totalComments++;
                commentsCount.textContent = totalComments;
            }
        }

        function populatePodcastList() {
            podcastListBody.innerHTML = '';
            podcasts.forEach((podcast, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${podcast.title}</td>
                    <td>${podcast.date}</td>
                    <td><button class="play-btn">Play</button></td>
                `;
                podcastListBody.appendChild(row);

                row.querySelector('.play-btn').addEventListener('click', () => {
                    currentPodcastIndex = index;
                    loadPodcast(podcast);
                    audioPlayer.play();
                    playBtn.textContent = '[❚❚ PAUSE]';
                });
            });
        }

        function searchPodcasts() {
            const searchTerm = podcastSearch.value.toLowerCase();
            const filteredPodcasts = podcasts.filter(podcast => 
                podcast.title.toLowerCase().includes(searchTerm) || 
                podcast.description.toLowerCase().includes(searchTerm)
            );
            podcastListBody.innerHTML = '';
            filteredPodcasts.forEach((podcast, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${podcast.title}</td>
                    <td>${podcast.date}</td>
                    <td><button class="play-btn">Play</button></td>
                `;
                podcastListBody.appendChild(row);

                row.querySelector('.play-btn').addEventListener('click', () => {
                    currentPodcastIndex = podcasts.findIndex(s => s.id === podcast.id);
                    loadPodcast(podcast);
                    audioPlayer.play();
                    playBtn.textContent = '[❚❚ PAUSE]';
                });
            });
        }

        function updateLikeButtonState(podcastId) {
            const isLiked = likedPodcasts.some(podcast => podcast.id === podcastId);
            likeBtn.classList.toggle('liked', isLiked);
            likeBtn.innerHTML = isLiked ? '<i class="fas fa-heart"></i> LIKED' : '<i class="far fa-heart"></i> LIKE';
        }

        function toggleLike() {
            const currentPodcast = podcasts[currentPodcastIndex];
            const podcastId = currentPodcast.id;
            const isLiked = likedPodcasts.some(podcast => podcast.id === podcastId);
            
            if (isLiked) {
                likedPodcasts = likedPodcasts.filter(podcast => podcast.id !== podcastId);
            } else {
                likedPodcasts.push(currentPodcast);
            }
            
            updateLikedPodcasts();
            updateLikeButtonState(podcastId);
            likedPodcastsCount.textContent = likedPodcasts.length;
        }

        // Event listeners
        if (playBtn) playBtn.addEventListener('click', togglePlay);
        if (prevBtn) prevBtn.addEventListener('click', prevPodcast);
        if (nextBtn) nextBtn.addEventListener('click', nextPodcast);
        if (likeBtn) likeBtn.addEventListener('click', toggleLike);
        if (submitCommentBtn) submitCommentBtn.addEventListener('click', addComment);
        if (searchBtn) searchBtn.addEventListener('click', searchPodcasts);
        if (volumeBar) {
            volumeBar.addEventListener('input', () => {
                audioPlayer.volume = volumeBar.value;
            });
        }

        // Initialize
        shufflePodcasts();
        loadPodcast(podcasts[currentPodcastIndex]);
        populatePodcastList();
        updateLikedPodcasts();
        if (likedPodcastsCount) likedPodcastsCount.textContent = likedPodcasts.length;
        if (commentsCount) commentsCount.textContent = totalComments;

        // Load liked podcasts from localStorage
        const storedLikedPodcasts = JSON.parse(localStorage.getItem('likedPodcasts')) || [];
        likedPodcastsList.innerHTML = '';
        storedLikedPodcasts.forEach(podcastId => {
            const podcast = podcasts.find(p => p.id === podcastId);
            if (podcast) {
                const li = document.createElement('li');
                li.textContent = `${podcast.title}`;
                likedPodcastsList.appendChild(li);
            }
        });

        likeBtn.addEventListener('click', toggleLike);
        updateLikedPodcastsList();
    })
    .catch(error => console.error('Error fetching the podcast data:', error));

// Timeline handle code (unchanged)
const handle = document.getElementById('timelineHandle');
let isDragging = false;
let startX, startScrollLeft;

handle.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - handle.offsetLeft;
    startScrollLeft = handle.parentElement.scrollLeft;
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - handle.parentElement.offsetLeft;
    const walk = (x - startX) * 2;
    handle.parentElement.scrollLeft = startScrollLeft - walk;
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        const audio = document.getElementById('audioPlayer');
        const currentRate = audio.playbackRate;
        audio.playbackRate = currentRate * 1.5;
        setTimeout(() => {
            audio.playbackRate = currentRate;
        }, 300);
    }
});

// DOMContentLoaded event listeners (unchanged)
document.addEventListener('DOMContentLoaded', function() {
    const likeBtn = document.getElementById('likeBtn');
    const audioPlayer = document.getElementById('audioPlayer');
    
    function updateLikeButton() {
        const currentPodcast = audioPlayer.src;
        const isLiked = localStorage.getItem(currentPodcast) === 'liked';
        likeBtn.classList.toggle('liked', isLiked);
        likeBtn.innerHTML = isLiked ? '<i class="fas fa-heart"></i> LIKED' : '<i class="far fa-heart"></i> LIKE';
    }
    
    likeBtn.addEventListener('click', function() {
        const currentPodcast = audioPlayer.src;
        const isLiked = this.classList.toggle('liked');
        if (isLiked) {
            localStorage.setItem(currentPodcast, 'liked');
            this.innerHTML = '<i class="fas fa-heart"></i> LIKED';
            console.log('Podcast liked!');
        } else {
            localStorage.removeItem(currentPodcast);
            this.innerHTML = '<i class="far fa-heart"></i> LIKE';
            console.log('Like removed!');
        }
    });
    
    // Update like button state when a new podcast is loaded
    audioPlayer.addEventListener('loadedmetadata', updateLikeButton);
    
    // Initial update
    updateLikeButton();
});

audioPlayer.currentTime = seekPosition * audioPlayer.duration;
}

timeline.addEventListener('mousedown', (e) => {
    isDragging = true;
    seek(e);
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        seek(e);
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

audioPlayer.addEventListener('timeupdate', updateTimeline);

// Event listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevPodcast);
nextBtn.addEventListener('click', nextPodcast);
likeBtn.addEventListener('click', toggleLike);
submitCommentBtn.addEventListener('click', addComment);
searchBtn.addEventListener('click', searchPodcasts);
volumeBar.addEventListener('input', () => {
    audioPlayer.volume = volumeBar.value;
});

// Initialize
shufflePodcasts();
loadPodcast(podcasts[currentPodcastIndex]);
populatePodcastList();
updateLikedPodcasts();
})
.catch(error => console.error('Error fetching the podcast data:', error));