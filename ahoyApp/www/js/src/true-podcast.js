document.addEventListener('DOMContentLoaded', function() {
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
            const likedPodcastsCount = document.getElementById('likedPodcastsCount');
            const commentsCount = document.getElementById('commentsCount');

            let likedPodcasts = JSON.parse(localStorage.getItem('likedPodcasts')) || [];
            let comments = {};
            let totalComments = 0;

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

            function togglePlay() {
                if (audioPlayer.paused) {
                    audioPlayer.play();
                    playBtn.textContent = '[❚❚ PAUSE]';
                } else {
                    audioPlayer.pause();
                    playBtn.textContent = '[► PLAY]';
                }
            }

            function prevPodcast() {
                currentPodcastIndex = (currentPodcastIndex - 1 + podcasts.length) % podcasts.length;
                loadPodcast(podcasts[currentPodcastIndex]);
            }

            function nextPodcast() {
                currentPodcastIndex = (currentPodcastIndex + 1) % podcasts.length;
                loadPodcast(podcasts[currentPodcastIndex]);
            }

            function toggleLike() {
                const currentPodcast = podcasts[currentPodcastIndex];
                const index = likedPodcasts.findIndex(p => p.id === currentPodcast.id);
                if (index === -1) {
                    likedPodcasts.push(currentPodcast);
                    likeBtn.innerHTML = '<i class="fas fa-heart"></i> LIKED';
                } else {
                    likedPodcasts.splice(index, 1);
                    likeBtn.innerHTML = '<i class="far fa-heart"></i> LIKE';
                }
                updateLikedPodcasts();
                localStorage.setItem('likedPodcasts', JSON.stringify(likedPodcasts));
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
                    const playBtn = li.querySelector('.play-btn');
                    const deleteBtn = li.querySelector('.delete-btn');
                    playBtn.addEventListener('click', () => playPodcastFromLiked(index));
                    deleteBtn.addEventListener('click', () => removeLikedPodcast(index));
                    likedPodcastsList.appendChild(li);
                });
                likedPodcastsCount.textContent = likedPodcasts.length;
                localStorage.setItem('likedPodcasts', JSON.stringify(likedPodcasts));
            }

            function removeLikedPodcast(index) {
                likedPodcasts.splice(index, 1);
                updateLikedPodcasts();
            }

            function playPodcastFromLiked(index) {
                const podcastToPlay = likedPodcasts[index];
                const podcastIndex = podcasts.findIndex(p => p.id === podcastToPlay.id);
                if (podcastIndex !== -1) {
                    currentPodcastIndex = podcastIndex;
                    loadPodcast(podcasts[currentPodcastIndex]);
                    togglePlay();
                }
            }

            function addComment() {
                const commentText = commentInput.value.trim();
                if (commentText) {
                    const comment = {
                        text: commentText,
                        timestamp: new Date().toLocaleString()
                    };
                    const currentPodcast = podcasts[currentPodcastIndex];
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

            function updateCommentsList() {
                commentsList.innerHTML = '';
                const currentPodcast = podcasts[currentPodcastIndex];
                if (comments[currentPodcast.id]) {
                    comments[currentPodcast.id].forEach((comment, index) => {
                        const li = document.createElement('li');
                        li.className = 'comment-item';
                        li.innerHTML = `
                            <span class="comment-text">${comment.timestamp}: ${comment.text}</span>
                            <button class="delete-btn" aria-label="Delete comment">
                                <i class="fas fa-times-circle"></i>
                            </button>
                        `;
                        const deleteBtn = li.querySelector('.delete-btn');
                        deleteBtn.addEventListener('click', () => deleteComment(currentPodcast.id, index));
                        commentsList.appendChild(li);
                    });
                }
            }

            function deleteComment(podcastId, commentIndex) {
                comments[podcastId].splice(commentIndex, 1);
                updateCommentsList();
                totalComments--;
                commentsCount.textContent = totalComments;
            }

            function updateLikeButtonState(podcastId) {
                if (likedPodcasts.some(p => p.id === podcastId)) {
                    likeBtn.classList.add('liked');
                    likeBtn.innerHTML = '<i class="fas fa-heart"></i> LIKED';
                } else {
                    likeBtn.classList.remove('liked');
                    likeBtn.innerHTML = '<i class="far fa-heart"></i> LIKE';
                }
            }

            function searchPodcasts() {
                const query = podcastSearch.value.toLowerCase();
                const filteredPodcasts = podcasts.filter(podcast => 
                    podcast.title.toLowerCase().includes(query) || 
                    podcast.description.toLowerCase().includes(query)
                );
                populatePodcastList(filteredPodcasts);
            }

            function populatePodcastList(podcastsToShow = podcasts) {
                podcastListBody.innerHTML = '';
                podcastsToShow.forEach((podcast, index) => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${podcast.title}</td>
                        <td>${podcast.date}</td>
                        <td><button class="play-podcast-btn" data-index="${index}">[PLAY]</button></td>
                    `;
                    podcastListBody.appendChild(row);
                });

                // Add event listeners to play buttons
                document.querySelectorAll('.play-podcast-btn').forEach(btn => {
                    btn.addEventListener('click', function() {
                        currentPodcastIndex = parseInt(this.dataset.index);
                        loadPodcast(podcasts[currentPodcastIndex]);
                        togglePlay();
                    });
                });
            }

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
            loadPodcast(podcasts[currentPodcastIndex]);
            updateLikedPodcasts();
            populatePodcastList();
        })
        .catch(error => console.error('Error fetching the podcast data:', error));
});