fetch('./data/true-radioPlay.json')
    .then(response => response.json())
    .then(data => {
        const songs = data.songs;
        let currentSongIndex = 0;
        const itemsPerPage = 10; // Number of songs to display per scroll
        let currentPage = 1;

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
        const songListBody = document.getElementById('songListBody');

        let likedSongs = JSON.parse(localStorage.getItem('likedSongs')) || [];
        let comments = {};
        let totalComments = 0;

        const commentsCount = document.getElementById('commentsCount');

        // Function to load and append songs dynamically as you scroll
        function displaySongs(data, append = false) {
            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageItems = data.slice(start, end);

            if (!append) {
                songListBody.innerHTML = ''; // Clear previous items if not appending
            }

            pageItems.forEach((song, index) => {
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

            setupSongListeners();
        }

        // Function to handle song click events
        function setupSongListeners() {
            const songRows = songListBody.querySelectorAll('.song-row');
            songRows.forEach(row => {
                row.addEventListener('click', (e) => {
                    const songIndex = parseInt(e.currentTarget.querySelector('.play-song-btn').getAttribute('data-index'));
                    playSongFromList(songIndex);
                });
            });
        }

        // Infinite scroll implementation using IntersectionObserver
        function infiniteScroll() {
            const observer = new IntersectionObserver((entries) => {
                const lastEntry = entries[0];
                if (lastEntry.isIntersecting) {
                    if (currentPage * itemsPerPage < songs.length) {
                        currentPage++;
                        displaySongs(songs, true); // Load more songs and append to the list
                    }
                }
            }, { rootMargin: '0px 0px 200px 0px' }); // Trigger when the user is 200px from the bottom

            // Attach the observer to the last element in the list
            observer.observe(document.querySelector('#songListBody > .song-row:last-child'));
        }

        // Function to load the current song
        function loadSong(song) {
            songTitle.textContent = song.songTitle;
            artist.textContent = song.artist;
            coverArt.src = song.coverArt;
            audioPlayer.src = song.mp3url;
        }

        // Setup previous/next song navigation
        prevBtn.addEventListener('click', prevSong);
        nextBtn.addEventListener('click', nextSong);

        function prevSong() {
            currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
            loadSong(songs[currentSongIndex]);
            audioPlayer.play();
        }

        function nextSong() {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
            loadSong(songs[currentSongIndex]);
            audioPlayer.play();
        }

        function playSongFromList(index) {
            currentSongIndex = index;
            loadSong(songs[currentSongIndex]);
            audioPlayer.play();
        }

        // Initialize by displaying the first set of songs
        displaySongs(songs);
        infiniteScroll(); // Setup infinite scroll

    }).catch(error => console.error('Error fetching the song data:', error));
