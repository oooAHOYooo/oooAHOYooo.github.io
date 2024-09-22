document.addEventListener('DOMContentLoaded', function() {
    fetch('./data/podcastCollection.json')
        .then(response => response.json())
        .then(data => {
            const podcasts = data.podcasts;
            // Find the podcast with the highest id
            let currentPodcastIndex = podcasts.reduce((maxIndex, podcast, index) => {
                return podcast.id > podcasts[maxIndex].id ? index : maxIndex;
            }, 0); // Use reduce to find the index of the podcast with the highest id

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
            const podcastScrubber = document.getElementById('podcastScrubber');
            const currentTimeDisplay = document.getElementById('currentTime');
            const durationDisplay = document.getElementById('duration');

            let likedPodcasts = JSON.parse(localStorage.getItem('likedPodcasts')) || [];
            let comments = {};
            let totalComments = 0;

            function loadPodcast(podcast) {
                podcastTitle.textContent = `${podcast.title}`;
                podcastDescription.textContent = `${podcast.description}`;
                podcastThumbnail.src = podcast.thumbnail;
                podcastThumbnail.alt = podcast.title;
                audioPlayer.src = podcast.mp3url;
                updateCommentsList();
                playBtn.textContent = '[► PLAY]';
                populatePodcastList();
                likeBtn.dataset.podcastId = podcast.id;
                updateLikeButtonState(podcast.id);
                updateNavBar(podcast.title, "Podcast"); // Update the navigation bar, assuming 'Podcast' as the artist
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
                audioPlayer.play();
                playBtn.textContent = '[❚❚ PAUSE]';
            }

            function nextPodcast() {
                currentPodcastIndex = (currentPodcastIndex + 1) % podcasts.length;
                loadPodcast(podcasts[currentPodcastIndex]);
                audioPlayer.play();
                playBtn.textContent = '[❚❚ PAUSE]';
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
            }

            function removeLikedPodcast(index) {
                likedPodcasts.splice(index, 1);
                updateLikedPodcasts();
                localStorage.setItem('likedPodcasts', JSON.stringify(likedPodcasts));
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
                // Start by clearing the existing content and creating a new table element
                podcastListBody.innerHTML = '';
                const table = document.createElement('table');
                table.className = 'podcast-table'; // Add a class for styling if needed

                podcastsToShow.forEach((podcast, index) => {
                    const row = document.createElement('tr');
                    row.className = 'podcast-row';
                    row.innerHTML = `
                        <td>
                            <img src="${podcast.thumbnail}" alt="${podcast.title}" class="podcast-cover-max play-podcast-btn" data-index="${index}">
                        </td>
                        <td>
                            <p>${podcast.title}</p>
                            <button class="play-podcast-btn" data-index="${index}">
                                ${index === currentPodcastIndex ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>'}
                            </button>
                        </td>
                    `;
                    table.appendChild(row); // Append the row to the table instead of the body directly
                });

                podcastListBody.appendChild(table); // Append the complete table to the podcastListBody

                // Add event listeners to play buttons, podcast art, and the entire row
                const podcastRows = table.querySelectorAll('.podcast-row');
                podcastRows.forEach(row => {
                    row.addEventListener('click', (e) => {
                        const podcastIndex = parseInt(e.currentTarget.querySelector('.play-podcast-btn').getAttribute('data-index'));
                        playPodcastFromList(podcastIndex);
                    });
                });
            }

            function playPodcastFromList(index) {
                currentPodcastIndex = index;
                loadPodcast(podcasts[currentPodcastIndex]);
                audioPlayer.play().then(() => {
                    playBtn.textContent = '[❚❚ PAUSE]';
                }).catch(error => {
                    console.error('Playback was prevented:', error);
                });
                populatePodcastList();
                
                // Scroll to the top of the page smoothly
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }

            // Populate the podcast list and load the latest podcast on initial fetch
            populatePodcastList(); // Ensure list is populated initially
            loadPodcast(podcasts[currentPodcastIndex]); // Load the podcast with the highest id initially

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

            // Setup event listeners for play buttons
            document.querySelectorAll('.podcast-play-button').forEach(button => {
                button.addEventListener('click', function() {
                    const podcastId = this.getAttribute('data-podcast-id');
                    const podcast = podcasts.find(podcast => podcast.id === podcastId);
                    loadPodcast(podcast);
                });
            });

            // Update scrubber as the podcast plays
            audioPlayer.addEventListener('timeupdate', () => {
                const value = audioPlayer.currentTime;
                podcastScrubber.value = value;
                currentTimeDisplay.textContent = formatTime(value);
            });

            // Update time display as the scrubber is moved
            podcastScrubber.addEventListener('input', () => {
                const time = (podcastScrubber.value / podcastScrubber.max) * audioPlayer.duration;
                currentTimeDisplay.textContent = formatTime(time);
            });

            // Update the podcast current time when the scrubber change is committed (e.g., user releases the mouse button)
            podcastScrubber.addEventListener('change', () => {
                audioPlayer.currentTime = podcastScrubber.value;
            });

            // Function to format time in minutes and seconds
            function formatTime(time) {
                const minutes = Math.floor(time / 60);
                const seconds = Math.floor(time % 60);
                return `${pad(minutes)}:${pad(seconds)}`;
            }

            // Function to pad numbers with zero
            function pad(number) {
                return number < 10 ? '0' + number : number;
            }

            // Setup event listeners for loaded metadata
            audioPlayer.addEventListener('loadedmetadata', () => {
                durationDisplay.textContent = formatTime(audioPlayer.duration);
                podcastScrubber.max = audioPlayer.duration;
            });

            // Update scrubber as the podcast plays
            audioPlayer.addEventListener('timeupdate', () => {
                const value = audioPlayer.currentTime;
                podcastScrubber.value = value;
                currentTimeDisplay.textContent = formatTime(value);
            });

            // Seek in the podcast when the scrubber value changes
            podcastScrubber.addEventListener('input', () => {
                const time = (podcastScrubber.value / 100) * audioPlayer.duration;
                audioPlayer.currentTime = time;
                currentTimeDisplay.textContent = formatTime(audioPlayer.currentTime);
            });
        })
        .catch(error => console.error('Error fetching the podcast data:', error));
});