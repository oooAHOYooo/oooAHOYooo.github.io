// script.js

// Fetch the song data from radioPlay.json
fetch('radioPlay.json')
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
        const burnToCdBtn = document.getElementById('burnToCdBtn');
        const cdPreviewList = document.getElementById('cdPreviewList');
        const emailBtn = document.getElementById('emailBtn');
        const cdNameInput = document.getElementById('cdNameInput');
        const submitCdBtn = document.getElementById('submitCdBtn');
        const messageBox = document.getElementById('messageBox');
        let likedSongs = [];
        let playlist = [];
        let totalDuration = 0;

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
            // Removed background image feature
        }

        function prevSong() {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong(songs[currentSongIndex]);
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

        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);
        likeBtn.addEventListener('click', likeSong);
        burnToCdBtn.addEventListener('click', burnToCd);
        emailBtn.addEventListener('click', emailPlaylist);
        submitCdBtn.addEventListener('click', submitCdRequest);

        // Shuffle songs initially
        shuffleSongs();
        // Load the first song initially
        loadSong(songs[currentSongIndex]);
    })
    .catch(error => console.error('Error fetching the song data:', error));