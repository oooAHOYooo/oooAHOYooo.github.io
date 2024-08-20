        fetch('./data/true-radioPlay.json')
            .then(response => response.json())
            .then(data => {
                const songs = data.songs;
                let currentSongIndex = 0;

                const audioPlayer = document.getElementById('audioPlayer');
                const songTitle = document.getElementById('songTitle');
                const artist = document.getElementById('artist');
                const coverArt = document.getElementById('coverArt');
                const prevBtn = document.getElementById('prevBtn');
                const nextBtn = document.getElementById('nextBtn');
                const likeBtn = document.getElementById('likeBtn');
                const likedSongsList = document.getElementById('likedSongsList');
                const volumeBar = document.getElementById('volumeBar');
                const commentInput = document.getElementById('commentInput');
                const submitCommentBtn = document.getElementById('submitCommentBtn');
                const commentsList = document.getElementById('commentsList');
                const commentSongTitle = document.getElementById('commentSongTitle');
                const playBtn = document.getElementById('playBtn');
                let likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
                let comments = {};
                let totalComments = 0;

                const likedSongsCount = document.getElementById('likedSongsCount');
                const commentsCount = document.getElementById('commentsCount');

                const songSearch = document.getElementById('songSearch');
                const searchBtn = document.getElementById('searchBtn');
                const songListBody = document.getElementById('songListBody');

                function shuffleSongs() {
                    for (let i = songs.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [songs[i], songs[j]] = [songs[j], songs[i]];
                    }
                }

                function togglePlay() {
                    if (audioPlayer.paused) {
                        audioPlayer.play().then(() => {
                            playBtn.textContent = '[❚❚ PAUSE]';
                        }).catch(error => {
                            console.error('Playback was prevented:', error);
                        });
                    } else {
                        audioPlayer.pause();
                        playBtn.textContent = '[► PLAY]';
                    }
                }

                function loadSong(song) {
                    songTitle.textContent = song.songTitle;
                    artist.textContent = song.artist;
                    coverArt.src = song.coverArt;
                    coverArt.alt = `${song.artist} - ${song.songTitle}`;
                    audioPlayer.src = song.mp3url;
                    commentSongTitle.textContent = song.songTitle;
                    updateCommentsList();
                    playBtn.textContent = '[► PLAY]';
                    playBtn.style.fontSize = '0.19em'; // Add this line to make the text smaller
                    populateSongList();

                    likeBtn.dataset.songId = song.id;
                    updateLikeButtonState(song.id);

                    // Make cover art a perfect square and maintain aspect ratio
                    const size = '100px';
                    coverArt.style.width = size;
                    coverArt.style.height = size;
                    coverArt.style.objectFit = 'cover';
                    coverArt.style.display = 'block';
                }

                function prevSong() {
                    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
                    loadSong(songs[currentSongIndex]);
                    audioPlayer.play().then(() => {
                        playBtn.textContent = '[❚❚ PAUSE]';
                    }).catch(error => {
                        console.error('Playback was prevented:', error);
                    });
                }

                function nextSong() {
                    currentSongIndex = (currentSongIndex + 1) % songs.length;
                    loadSong(songs[currentSongIndex]);
                    audioPlayer.play().then(() => {
                        playBtn.textContent = '[❚❚ PAUSE]';
                    }).catch(error => {
                        console.error('Playback was prevented:', error);
                    });
                }

                function likeSong() {
                    const currentSong = songs[currentSongIndex];
                    const songId = currentSong.id;
                    const index = likedSongs.findIndex(song => song.id === songId);
                    
                    if (index === -1) {
                        likedSongs.push(currentSong);
                    } else {
                        likedSongs.splice(index, 1);
                    }
                    
                    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
                    updateLikeButtonState(songId);
                    updateLikedSongs();
                    likedSongsCount.textContent = likedSongs.length;
                }

                function updateLikedSongs() {
                    likedSongsList.innerHTML = '';
                    likedSongs.forEach((song, index) => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <span>${song.songTitle} - ${song.artist}</span>
                            <div style="margin: 10px 0;">
                                <button class="play-btn responsive-play-btn" aria-label="Play song" style="margin-right: 10px; font-size: 1em; padding: 8px 12px; border: 2px solid #4CAF50; border-radius: 5px;">
                                    <i class="fas fa-play" style="font-size: 1.2em;"></i>
                                </button>
                                <button class="delete-btn" aria-label="Remove from liked songs" style="background: none; border: none; color: #999; opacity: 0.6; font-size: 0.9em; padding: 5px; cursor: pointer; transition: opacity 0.3s ease;">
                                    <i class="fas fa-times"></i>
                                </button>
                            </div>
                        `;
                        const playBtn = li.querySelector('.play-btn');
                        const deleteBtn = li.querySelector('.delete-btn');
                        playBtn.addEventListener('click', () => playSongFromLiked(index));
                        deleteBtn.addEventListener('click', () => removeLikedSong(index));
                        likedSongsList.appendChild(li);
                    });
                }

                function removeLikedSong(index) {
                    likedSongs.splice(index, 1);
                    updateLikedSongs();
                    likedSongsCount.textContent = likedSongs.length;
                }

                function addComment() {
                    const commentText = commentInput.value.trim();
                    if (commentText) {
                        const comment = {
                            text: commentText,
                            timestamp: new Date().toLocaleString()
                        };
                        const currentSong = songs[currentSongIndex];
                        if (!comments[currentSong.id]) {
                            comments[currentSong.id] = [];
                        }
                        comments[currentSong.id].push(comment);
                        updateCommentsList();
                        commentInput.value = '';
                        totalComments++;
                        commentsCount.textContent = totalComments;
                    }
                }

                function updateCommentsList() {
                    commentsList.innerHTML = '';
                    const currentSong = songs[currentSongIndex];
                    if (comments[currentSong.id]) {
                        comments[currentSong.id].forEach((comment, index) => {
                            const li = document.createElement('li');
                            li.className = 'comment-item';
                            li.innerHTML = `
                                <span class="comment-text">${comment.timestamp}: ${comment.text}</span>
                                <button class="delete-btn" aria-label="Delete comment">
                                    <i class="fas fa-times-circle"></i>
                                </button>
                            `;
                            const deleteBtn = li.querySelector('.delete-btn');
                            deleteBtn.addEventListener('click', () => deleteComment(currentSong.id, index));
                            commentsList.appendChild(li);
                        });
                    }
                }

                function deleteComment(songId, commentIndex) {
                    comments[songId].splice(commentIndex, 1);
                    updateCommentsList();
                    totalComments--;
                    commentsCount.textContent = totalComments;
                }

                function updateVolume() {
                    audioPlayer.volume = volumeBar.value;
                }

                prevBtn.addEventListener('click', () => {
                    prevSong();
                    setupAutoplay(); // Enable autoplay when previous button is clicked
                });
                nextBtn.addEventListener('click', () => {
                    nextSong();
                    setupAutoplay(); // Enable autoplay when next button is clicked
                });
                likeBtn.addEventListener('click', likeSong);
                submitCommentBtn.addEventListener('click', addComment);
                volumeBar.addEventListener('input', updateVolume);
                playBtn.addEventListener('click', togglePlay);

                // Add draggable timeline functionality
                const timeline = document.getElementById('timeline');
                const timelineHandle = document.getElementById('timelineHandle');
                let isDragging = false;

                timelineHandle.addEventListener('mousedown', (e) => {
                    isDragging = true;
                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                });

                function onMouseMove(e) {
                    if (isDragging) {
                        const timelineRect = timeline.getBoundingClientRect();
                        let newPosition = (e.clientX - timelineRect.left) / timelineRect.width;
                        newPosition = Math.max(0, Math.min(newPosition, 1));
                        timelineHandle.style.left = `${newPosition * 100}%`;
                        audioPlayer.currentTime = newPosition * audioPlayer.duration;
                    }
                }

                function onMouseUp() {
                    isDragging = false;
                    document.removeEventListener('mousemove', onMouseMove);
                    document.removeEventListener('mouseup', onMouseUp);
                }

                audioPlayer.addEventListener('timeupdate', () => {
                    if (!isDragging) {
                        const progress = audioPlayer.currentTime / audioPlayer.duration;
                        timelineHandle.style.left = `${progress * 100}%`;
                    }
                });

                function populateSongList(filteredSongs = songs) {
                    songListBody.innerHTML = '';
                    
                    filteredSongs.forEach((song, index) => {
                        const row = document.createElement('div');
                        row.className = 'song-row';
                        row.innerHTML = `
                            <div class="song-artwork">
                                <img src="${song.coverArt}" alt="${song.songTitle}" class="song-cover-max play-song-btn" data-index="${index}">
                            </div>
                            <div class="song-details">
                                <div class="song-index">${index + 1}</div>
                                <div class="song-info-row">
                                    <div class="song-title"><p class="body-text-bold">${song.songTitle}</p></div>
                                    <div class="song-artist"><p class="body-text">${song.artist}</p></div>
                                </div>
                                <div class="song-actions">
                                    <button class="play-song-btn" data-index="${index}">
                                        ${index === currentSongIndex ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>'}
                                    </button>
                                </div>
                            </div>
                        `;
                        songListBody.appendChild(row);
                    });

                    // Add event listeners to play buttons, album art, and the entire row
                    const songRows = songListBody.querySelectorAll('.song-row');
                    songRows.forEach(row => {
                        row.addEventListener('click', (e) => {
                            const songIndex = parseInt(e.currentTarget.querySelector('.play-song-btn').getAttribute('data-index'));
                            playSongFromList(songIndex);
                        });
                    });

                    // Add event listeners to like buttons
                    const likeButtons = songListBody.querySelectorAll('.like-song-btn');
                    likeButtons.forEach(button => {
                        button.addEventListener('click', (e) => {
                            const songId = e.currentTarget.getAttribute('data-id');
                            toggleLikeSong(songId);
                        });
                    });
                }

                function formatDuration(seconds) {
                    const minutes = Math.floor(seconds / 60);
                    const remainingSeconds = Math.floor(seconds % 60);
                    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
                }

                function updateLikeButtonState(songId) {
                    if (likedSongs.some(song => song.id === songId)) {
                        likeBtn.classList.add('liked');
                        likeBtn.querySelector('i').classList.remove('far');
                        likeBtn.querySelector('i').classList.add('fas');
                    } else {
                        likeBtn.classList.remove('liked');
                        likeBtn.querySelector('i').classList.remove('fas');
                        likeBtn.querySelector('i').classList.add('far');
                    }
                }

                function playSongFromList(index) {
                    currentSongIndex = index;
                    loadSong(songs[currentSongIndex]);
                    audioPlayer.play().then(() => {
                        playBtn.textContent = '[❚❚ PAUSE]';
                    }).catch(error => {
                        console.error('Playback was prevented:', error);
                    });
                    populateSongList();
                    
                    // Scroll to the top of the page smoothly
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }

                function playSongFromLiked(index) {
                    const songToPlay = likedSongs[index];
                    const songIndex = songs.findIndex(song => song.id === songToPlay.id);
                    if (songIndex !== -1) {
                        playSongFromList(songIndex);
                    }
                }

                searchBtn.addEventListener('click', () => {
                    const query = songSearch.value.toLowerCase();
                    const filteredSongs = songs.filter(song => 
                        song.songTitle.toLowerCase().includes(query) || 
                        song.artist.toLowerCase().includes(query)
                    );
                    populateSongList(filteredSongs);
                });

                // Add this function to handle autoplay
                function setupAutoplay() {
                    audioPlayer.addEventListener('ended', () => {
                        nextSong();
                    });
                }

                shuffleSongs();
                loadSong(songs[currentSongIndex]);
                updateVolume();
                populateSongList();
                setupAutoplay(); // Call this function to set up autoplay

                // Add this after the other variable declarations
                const friendsList = document.getElementById('friendsList');

                // Add this function to create a bot friend
                function createBotFriend() {
                    const botFriend = {
                        name: 'PAL-BOT',
                        level: 3,
                        xp: 750,
                        comments: 15
                    };
                    
                    const botElement = document.createElement('div');
                    botElement.innerHTML = `
                        <h3>> Your Friend:</h3>
                        <p>NAME: ${botFriend.name}</p>
                        <p>LEVEL: ${botFriend.level}</p>
                        <p>XP: ${botFriend.xp}</p>
                        <p>COMMENTS: ${botFriend.comments}</p>
                    `;
                    friendsList.appendChild(botElement);
                }

                // Add this to the end of the fetch .then() block
                createBotFriend();

                // Add these functions to handle the like button
                function updateLikeButtonState(songId) {
                    if (likedSongs.some(song => song.id === songId)) {
                        likeBtn.classList.add('liked');
                        likeBtn.querySelector('i').classList.remove('far');
                        likeBtn.querySelector('i').classList.add('fas');
                    } else {
                        likeBtn.classList.remove('liked');
                        likeBtn.querySelector('i').classList.remove('fas');
                        likeBtn.querySelector('i').classList.add('far');
                    }
                }

                function toggleLike() {
                    const songId = likeBtn.dataset.songId;
                    if (!songId) return;

                    const index = likedSongs.findIndex(song => song.id === songId);
                    if (index === -1) {
                        likedSongs.push(songs[currentSongIndex]);
                    } else {
                        likedSongs.splice(index, 1);
                    }

                    localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
                    updateLikeButtonState(songId);
                    updateLikedSongsList();
                }

                function updateLikedSongsList() {
                    const likedSongsList = document.getElementById('likedSongsList');
                    const likedSongsCount = document.getElementById('likedSongsCount');

                    likedSongsList.innerHTML = '';
                    likedSongsCount.textContent = likedSongs.length;

                    likedSongs.forEach(song => {
                        const li = document.createElement('li');
                        li.textContent = `${song.songTitle} - ${song.artist}`;
                        likedSongsList.appendChild(li);
                    });
                }

                likeBtn.addEventListener('click', toggleLike);
                updateLikedSongsList();
            })
            .catch(error => console.error('Error fetching the song data:', error));



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


            document.addEventListener('DOMContentLoaded', function() {
                const likeBtn = document.getElementById('likeBtn');
                
                likeBtn.addEventListener('click', function() {
                    this.classList.toggle('liked');
                    if (this.classList.contains('liked')) {
                        this.innerHTML = '<i class="fas fa-heart"></i> LIKED';
                        // Here you would typically send a request to your server to record the like
                        console.log('Song liked!');
                    } else {
                        this.innerHTML = '<i class="far fa-heart"></i> LIKE';
                        // Here you would typically send a request to your server to remove the like
                        console.log('Like removed!');
                    }
                });
            });


            document.addEventListener('DOMContentLoaded', function() {
                const likeBtn = document.getElementById('likeBtn');
                const audioPlayer = document.getElementById('audioPlayer');
                
                function updateLikeButton() {
                    const currentSong = audioPlayer.src;
                    const isLiked = localStorage.getItem(currentSong) === 'liked';
                    likeBtn.classList.toggle('liked', isLiked);
                    likeBtn.innerHTML = isLiked ? '<i class="fas fa-heart"></i> LIKED' : '<i class="far fa-heart"></i> LIKE';
                }
                
                likeBtn.addEventListener('click', function() {
                    const currentSong = audioPlayer.src;
                    const isLiked = this.classList.toggle('liked');
                    if (isLiked) {
                        localStorage.setItem(currentSong, 'liked');
                        this.innerHTML = '<i class="fas fa-heart"></i> LIKED';
                        console.log('Song liked!');
                    } else {
                        localStorage.removeItem(currentSong);
                        this.innerHTML = '<i class="far fa-heart"></i> LIKE';
                        console.log('Like removed!');
                    }
                });
                
                // Update like button state when a new song is loaded
                audioPlayer.addEventListener('loadedmetadata', updateLikeButton);
                
                // Initial update
                updateLikeButton();
            });

            // Add this CSS to your stylesheet or in a <style> tag in your HTML
            const style = document.createElement('style');
            style.textContent = `
                #commentInput {
                    max-width: 250px;
                    margin-left: auto;
                    margin-right: auto;
                    width: 200px!important;
                    display: block;
                }
                #songListBody tr {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 5px;
                }
                #songListBody td:first-child {
                    flex-grow: 1;
                    margin-right: 10px;
                }
            `;
            document.head.appendChild(style);
