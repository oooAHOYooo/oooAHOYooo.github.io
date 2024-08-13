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
                        audioPlayer.play();
                        playBtn.textContent = '[❚❚ PAUSE]';
                    } else {
                        audioPlayer.pause();
                        playBtn.textContent = '[► PLAY]';
                    }
                }

                function loadSong(song) {
                    songTitle.textContent = `SONG TITLE: ${song.songTitle}`;
                    artist.textContent = `ARTIST: ${song.artist}`;
                    coverArt.src = song.coverArt;
                    audioPlayer.src = song.mp3url;
                    commentSongTitle.textContent = song.songTitle;
                    updateCommentsList();
                    playBtn.textContent = '[► PLAY]';
                    populateSongList();

                    likeBtn.dataset.songId = song.id;
                    updateLikeButtonState(song.id);
                }

                function prevSong() {
                    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
                    loadSong(songs[currentSongIndex]);
                    audioPlayer.play();
                    playBtn.textContent = '[❚❚ PAUSE]';
                }

                function nextSong() {
                    currentSongIndex = (currentSongIndex + 1) % songs.length;
                    loadSong(songs[currentSongIndex]);
                    audioPlayer.play();
                    playBtn.textContent = '[❚❚ PAUSE]';
                }

                function likeSong() {
                    const currentSong = songs[currentSongIndex];
                    if (!likedSongs.some(song => song.id === currentSong.id)) {
                        likedSongs.push(currentSong);
                        updateLikedSongs();
                        likedSongsCount.textContent = likedSongs.length;
                    }
                }

                function updateLikedSongs() {
                    likedSongsList.innerHTML = '';
                    likedSongs.forEach((song, index) => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <span>${song.songTitle} - ${song.artist}</span>
                            <div>
                                <button class="play-btn" aria-label="Play song">
                                    <i class="fas fa-play"></i>
                                </button>
                                <button class="delete-btn" aria-label="Remove from liked songs">
                                    <i class="fas fa-times-circle"></i>
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

                prevBtn.addEventListener('click', prevSong);
                nextBtn.addEventListener('click', nextSong);
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
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${song.songTitle}</td>
                            <td>${song.artist}</td>
                            <td><button class="play-song-btn" data-index="${index}">${index === currentSongIndex ? '[PLAYING]' : '[PLAY]'}</button></td>
                        `;
                        songListBody.appendChild(row);
                    });

                    // Add event listeners to play buttons
                    const playButtons = document.querySelectorAll('.play-song-btn');
                    playButtons.forEach(button => {
                        button.addEventListener('click', (e) => {
                            const songIndex = parseInt(e.target.getAttribute('data-index'));
                            playSongFromList(songIndex);
                        });
                    });
                }

                function playSongFromList(index) {
                    currentSongIndex = index;
                    loadSong(songs[currentSongIndex]);
                    audioPlayer.play();
                    playBtn.textContent = '[❚❚ PAUSE]';
                    populateSongList();
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

                shuffleSongs();
                loadSong(songs[currentSongIndex]);
                updateVolume();
                populateSongList();

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
                        <h3>> BOT FRIEND:</h3>
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
                    if (likedSongs.includes(songId)) {
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

                    const index = likedSongs.indexOf(songId);
                    if (index === -1) {
                        likedSongs.push(songId);
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

                    likedSongs.forEach(songId => {
                        const song = songs.find(s => s.id === songId);
                        if (song) {
                            const li = document.createElement('li');
                            li.textContent = `${song.songTitle} - ${song.artist}`;
                            likedSongsList.appendChild(li);
                        }
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