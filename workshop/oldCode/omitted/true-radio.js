document.addEventListener('DOMContentLoaded', function() {
    initializeRadio();
});

function initializeRadio() {
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
        const accountLikedSongsList = document.getElementById('accountLikedSongsList');
        const likedSongsCount = document.getElementById('likedSongsCount');
        const accountLikedSongsCount = document.getElementById('accountLikedSongsCount');
        const volumeBar = document.getElementById('volumeBar');
        const commentInput = document.getElementById('commentInput');
        const submitCommentBtn = document.getElementById('submitCommentBtn');
        const commentsList = document.getElementById('commentsList');
        const commentSongTitle = document.getElementById('commentSongTitle');
        const playBtn = document.getElementById('playBtn');
        let likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
        let comments = {};
        let totalComments = 0;

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
                AudioManager.requestPlay(audioPlayer);
                audioPlayer.play().then(() => {
                    playBtns.forEach(btn => btn.innerHTML = '<i class="fas fa-pause"></i>');
                }).catch(error => {
                    console.error('Playback was prevented:', error);
                });
            } else {
                audioPlayer.pause();
                AudioManager.releasePlay(audioPlayer);
                playBtns.forEach(btn => btn.innerHTML = '<i class="fas fa-play"></i>');
            }
        }

        // Update the play button icon based on the audio state when the page loads or a new song is loaded
        function updatePlayButtonIcon() {
            const playBtns = document.querySelectorAll('.top-nav-control-btn');
            if (!audioPlayer.paused) {
                playBtns.forEach(btn => btn.innerHTML = '<i class="fas fa-pause"></i>');
            } else {
                playBtns.forEach(btn => btn.innerHTML = '<i class="fas fa-play"></i>');
            }
        }

        audioPlayer.addEventListener('loadeddata', updatePlayButtonIcon); // Update icon when a new song is loaded
        document.addEventListener('DOMContentLoaded', updatePlayButtonIcon); // Update icon on page load

        // Make togglePlay globally accessible
        window.togglePlay = togglePlay;

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

            // Update the navigation bar with the current song
            updateNavBar(song.songTitle, song.artist);

            // Scroll to top when song is loaded
            window.scrollTo({ top: 0, behavior: 'smooth' });
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

        // Make prevSong globally accessible
        window.prevSong = prevSong;

        function nextSong() {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            loadSong(songs[currentSongIndex]);
            audioPlayer.play().then(() => {
                playBtn.textContent = '[❚❚ PAUSE]';
            }).catch(error => {
                console.error('Playback was prevented:', error);
            });
        }

        // Make nextSong globally accessible
        window.nextSong = nextSong;

        function toggleLike() {
            const songId = likeBtn.dataset.songId;
            if (!songId) return;

            const index = likedSongs.findIndex(song => song.id === songId);
            if (index === -1) {
                // Song is not liked, add it to likedSongs
                likedSongs.push(songs[currentSongIndex]);
                likeBtn.classList.add('liked');
                likeBtn.innerHTML = '<i class="fas fa-heart"></i> LIKED';
            } else {
                // Song is already liked, remove it from likedSongs
                likedSongs.splice(index, 1);
                likeBtn.classList.remove('liked');
                likeBtn.innerHTML = '<i class="far fa-heart"></i> LIKE';
            }

            // Update liked songs list directly without using localStorage
            updateLikedSongs();
        }

        // Remove the event listener for storage changes
        // window.removeEventListener('storage', storageEventListener);

        function updateLikedSongs() {
            likedSongsList.innerHTML = '';
            accountLikedSongsList.innerHTML = '';
            likedSongsCount.textContent = likedSongs.length;
            accountLikedSongsCount.textContent = likedSongs.length;

            likedSongs.forEach((song, index) => {
                const li = createLikedSongElement(song, index);
                const accountLi = createLikedSongElement(song, index);
                
                likedSongsList.appendChild(li);
                accountLikedSongsList.appendChild(accountLi);
            });
        }

        function createLikedSongElement(song, index) {
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
            return li;
        }

        function removeLikedSong(index) {
            likedSongs.splice(index, 1);
            localStorage.setItem('likedSongs', JSON.stringify(likedSongs));
            updateLikedSongs();
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
        likeBtn.addEventListener('click', toggleLike);
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
            songListBody.innerHTML = '';  // Clear existing entries

            const table = document.createElement('table');
           
            const tbody = document.createElement('tbody');

            filteredSongs.forEach((song, index) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>
                        <img src="${song.coverArt}" alt="${song.songTitle}" style="width: 100%; height: auto; object-fit: cover;">
                    </td>
                    <td>
                        <div class="song-title">${song.songTitle}</div>
                        <div class="song-artist">${song.artist}</div>
                    </td>
                    <td style="text-align: right;">
                        <button class="play-song-btn" data-index="${index}" style="border: none; background: none; color: inherit;">
                            ${index === currentSongIndex ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>'}
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            table.appendChild(tbody);
            songListBody.appendChild(table);

            // Add event listeners to play buttons
            const playButtons = songListBody.querySelectorAll('.play-song-btn');
            playButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const songIndex = parseInt(e.currentTarget.getAttribute('data-index'));
                    playSongFromList(songIndex);
                });
            });
        }

        function formatDuration(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }

        function updateLikeButtonState(songId) {
            const isLiked = likedSongs.some(song => song.id === songId);
            likeBtn.classList.toggle('liked', isLiked);
            likeBtn.innerHTML = isLiked ? '<i class="fas fa-heart"></i> LIKED' : '<i class="far fa-heart"></i> LIKE';
        }

        function playSongFromList(index) {
            currentSongIndex = index;
            loadSong(songs[currentSongIndex]);
            audioPlayer.play().then(() => {
                playBtn.textContent = '[❚❚ PAUSE]';
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Ensure it scrolls to top here as well
            }).catch(error => {
                console.error('Playback was prevented:', error);
            });
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

        // Add this function to handle autoplay
        function setupAutoplay() {
            audioPlayer.addEventListener('ended', () => {
                nextSong(); // Ensure next song is loaded and played
                window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top when next song plays
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

        // Call updateLikedSongs initially and whenever the liked songs change
        updateLikedSongs();

        // Add an event listener for changes in localStorage
        window.addEventListener('storage', function(e) {
            if (e.key === 'likedSongs') {
                updateLikedSongs();
            }
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
            #likeBtn.liked {
                background-color: #ff4081;
                color: white;
            }
            #volumeBar {
                width: 100%; /* Set the width to 100% to make it full width */
                margin: 10px 0;
            }
        `;
        document.head.appendChild(style);
    })
    .catch(error => console.error('Error fetching the song data:', error));
}