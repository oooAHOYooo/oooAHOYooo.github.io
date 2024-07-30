// script.js

// Fetch the song data from radioPlay.json
fetch('radioPlay.json')
    .then(response => response.json())
    .then(data => {
        const songs = data.songs;
        let currentSongIndex = 0;
        let playHistory = [];

        const audioPlayer = document.getElementById('audioPlayer');
        const songTitle = document.getElementById('songTitle');
        const artist = document.getElementById('artist');
        const coverArt = document.getElementById('coverArt');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const likeBtn = document.getElementById('likeBtn');
        const likedSongsList = document.getElementById('likedSongsList');
        const burnToCdBtn = document.getElementById('burnToCdBtn');
        const cdPreviewList = document.getElementById('cdPreviewList');
        const emailBtn = document.getElementById('emailBtn');
        const cdNameInput = document.getElementById('cdNameInput');
        const submitCdBtn = document.getElementById('submitCdBtn');
        const messageBox = document.getElementById('messageBox');
        const volumeBar = document.getElementById('volumeBar');
        const commentInput = document.getElementById('commentInput');
        const submitCommentBtn = document.getElementById('submitCommentBtn');
        const commentsList = document.getElementById('commentsList');
        const commentSongTitle = document.getElementById('commentSongTitle');
        let likedSongs = [];
        let playlist = [];
        let comments = {};

        function shuffleSongs() {
            for (let i = songs.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [songs[i], songs[j]] = [songs[j], songs[i]];
            }
        }

        function loadSong(song) {
            songTitle.textContent = song.songTitle;
            artist.textContent = song.artist;
            coverArt.src = song.coverArt;
            audioPlayer.src = song.mp3url;
            commentSongTitle.textContent = song.songTitle;
            updateCommentsList();
            
            // Add current song to play history
            playHistory.push(currentSongIndex);
        }

        function prevSong() {
            if (playHistory.length > 1) {
                // Remove current song from history
                playHistory.pop();
                // Get the previous song index
                currentSongIndex = playHistory.pop();
                loadSong(songs[currentSongIndex]);
            } else {
                // If there's no previous song, just restart the current song
                audioPlayer.currentTime = 0;
            }
        }

        function nextSong() {
            currentSongIndex = Math.floor(Math.random() * songs.length);
            loadSong(songs[currentSongIndex]);
        }

        function likeSong() {
            const currentSong = songs[currentSongIndex];
            if (!likedSongs.includes(currentSong)) {
                likedSongs.push(currentSong);
                updateLikedSongsList();
            }
        }

        function removeLikedSong(index) {
            likedSongs.splice(index, 1);
            updateLikedSongsList();
        }

        function burnToCd() {
            if (likedSongs.length > 15 || totalDuration > 70) {
                alert('You can only select up to 15 songs or 70 minutes total.');
                return;
            }
            playlist = [...likedSongs];
            updateCdPreviewList();
        }

        function updateLikedSongsList() {
            likedSongsList.innerHTML = '';
            totalDuration = 0;
            likedSongs.forEach((song, index) => {
                const li = document.createElement('li');
                li.textContent = `${song.songTitle} by ${song.artist} (${song.duration} mins)`;
                totalDuration += song.duration;
                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'Remove';
                removeBtn.addEventListener('click', () => removeLikedSong(index));
                li.appendChild(removeBtn);
                likedSongsList.appendChild(li);
            });
        }

        function updateCdPreviewList() {
            cdPreviewList.innerHTML = '';
            playlist.forEach((song, index) => {
                const li = document.createElement('li');
                li.textContent = `${song.songTitle} by ${song.artist}`;
                li.draggable = true;
                li.dataset.index = index;
                li.addEventListener('dragstart', handleDragStart);
                li.addEventListener('dragover', handleDragOver);
                li.addEventListener('drop', handleDrop);
                cdPreviewList.appendChild(li);
            });
        }

        function handleDragStart(e) {
            e.dataTransfer.setData('text/plain', e.target.dataset.index);
        }

        function handleDragOver(e) {
            e.preventDefault();
        }

        function handleDrop(e) {
            e.preventDefault();
            const draggedIndex = e.dataTransfer.getData('text/plain');
            const targetIndex = e.target.dataset.index;
            [playlist[draggedIndex], playlist[targetIndex]] = [playlist[targetIndex], playlist[draggedIndex]];
            updateCdPreviewList();
        }

        function emailPlaylist() {
            const emailBody = playlist.map(song => `${song.songTitle} by ${song.artist}`).join('\n');
            window.location.href = `mailto:?subject=My CD Playlist&body=${encodeURIComponent(emailBody)}`;
        }

        function submitCdRequest() {
            const cdName = cdNameInput.value;
            if (!cdName) {
                alert('Please enter a name for your CD.');
                return;
            }
            const emailBody = `CD Name: ${cdName}\n\n` + playlist.map(song => `${song.songTitle} by ${song.artist}`).join('\n');
            window.location.href = `mailto:?subject=CD Burn Request&body=${encodeURIComponent(emailBody)}`;
            messageBox.textContent = 'Your CD burn request has been submitted. Your CD will be shipped to your house within 2-4 weeks.';
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
            }
        }

        function updateCommentsList() {
            commentsList.innerHTML = '';
            const currentSong = songs[currentSongIndex];
            if (comments[currentSong.id]) {
                comments[currentSong.id].forEach(comment => {
                    const li = document.createElement('li');
                    li.textContent = `${comment.timestamp}: ${comment.text}`;
                    commentsList.appendChild(li);
                });
            }
        }

        function updateVolume() {
            audioPlayer.volume = volumeBar.value;
        }

        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        likeBtn.addEventListener('click', likeSong);
        burnToCdBtn.addEventListener('click', burnToCd);
        emailBtn.addEventListener('click', emailPlaylist);
        submitCdBtn.addEventListener('click', submitCdRequest);
        submitCommentBtn.addEventListener('click', addComment);
        volumeBar.addEventListener('input', updateVolume);

        shuffleSongs();
        currentSongIndex = 0;
        loadSong(songs[currentSongIndex]);
        updateVolume();
    })
    .catch(error => console.error('Error fetching the song data:', error));