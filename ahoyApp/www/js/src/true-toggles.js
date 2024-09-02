document.addEventListener('DOMContentLoaded', function() {
    const leftSidebar = document.getElementById('left-sidebar');
    const rightSidebar = document.getElementById('right-sidebar');
    const leftToggleButton = document.getElementById('left-toggle-button');
    const rightToggleButton = document.getElementById('right-toggle-button');
    const mainContent = document.getElementById('tabSortza');
    const exitButton = document.createElement('button');
    exitButton.id = 'exit-button';
    exitButton.innerText = '✖';
    document.body.appendChild(exitButton);

    // Add subtle transition to sidebars and buttons
    leftSidebar.style.transition = 'left 0.3s ease';
    rightSidebar.style.transition = 'right 0.3s ease';
    leftToggleButton.style.transition = 'left 0.3s ease';
    rightToggleButton.style.transition = 'right 0.3s ease';

    // Add padding to the left sidebar content
    leftSidebar.style.paddingLeft = '20px';

    function toggleSidebar(sidebar, position) {
        const isOpen = sidebar.classList.contains('open');
        sidebar.classList.toggle('open');
        
        if (position === 'left') {
            sidebar.style.left = isOpen ? '-280px' : '0';
        } else {
            sidebar.style.right = isOpen ? '-280px' : '0';
        }
        
        updateMainContentMargin();
    }

    function updateMainContentMargin() {
        const isLeftOpen = leftSidebar.classList.contains('open');
        const isRightOpen = rightSidebar.classList.contains('open');
        
        if (window.innerWidth > 768) {
            mainContent.style.marginLeft = isLeftOpen ? '280px' : '0';
            mainContent.style.marginRight = isRightOpen ? '280px' : '0';
        } else {
            mainContent.style.marginLeft = '0';
            mainContent.style.marginRight = '0';
        }
    }

    function closeSidebars() {
        leftSidebar.classList.remove('open');
        rightSidebar.classList.remove('open');
        leftSidebar.style.left = '-280px';
        rightSidebar.style.right = '-280px';
        leftToggleButton.style.left = '10px';
        rightToggleButton.style.right = '10px';
        updateMainContentMargin();
    }

    function openSidebars() {
        leftSidebar.classList.add('open');
        rightSidebar.classList.add('open');
        leftSidebar.style.left = '0';
        rightSidebar.style.right = '0';
        leftToggleButton.style.left = '290px';
        rightToggleButton.style.right = '290px';
        updateMainContentMargin();
    }

    function handleResize() {
        if (window.innerWidth > 768) {
            openSidebars();
            leftToggleButton.style.display = 'block';
            rightToggleButton.style.display = 'block';
        } else {
            closeSidebars();
            leftToggleButton.style.display = 'block';
            rightToggleButton.style.display = 'block';
            rightSidebar.style.right = '-280px'; // Ensure sidebar is hidden on mobile
            rightToggleButton.style.right = '10px'; // Ensure button is visible and correctly positioned
        }
    }

    leftToggleButton.addEventListener('click', () => {
        toggleSidebar(leftSidebar, 'left');
        leftToggleButton.querySelector('.toggle-icon').classList.toggle('open');
    });

    rightToggleButton.addEventListener('click', () => {
        toggleSidebar(rightSidebar, 'right');
        rightToggleButton.querySelector('.toggle-icon').classList.toggle('open');
    });
    window.addEventListener('resize', handleResize);

    document.addEventListener('click', function(event) {
        if (!leftSidebar.contains(event.target) && event.target !== leftToggleButton &&
            !rightSidebar.contains(event.target) && event.target !== rightToggleButton &&
            event.target !== exitButton) {
            closeSidebars();
        }
    });

    exitButton.addEventListener('click', closeSidebars);

    // Initialize sidebar positions
    handleResize();

    // Add touch event listeners for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    function handleTouchStart(event) {
        touchStartX = event.changedTouches[0].screenX;
    }

    function handleTouchEnd(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleGesture();
    }

    function handleGesture() {
        if (touchEndX < touchStartX - 50) {
            closeSidebars(); // Swipe left to close
        }
        if (touchEndX > touchStartX + 50) {
            openSidebars(); // Swipe right to open
        }
    }

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    // Ensure toggles and sidebars are visible on mobile
    if (window.innerWidth <= 768) {
        leftSidebar.style.left = '-280px';
        rightSidebar.style.right = '-280px';
        leftToggleButton.style.display = 'block';
        rightToggleButton.style.display = 'block';
        rightToggleButton.style.right = '10px'; // Ensure button is visible and correctly positioned
    }

    // Function to play a playlist
    function playPlaylist(playlistIndex) {
        fetch('./data/featured-playlist.json')
            .then(response => response.json())
            .then(data => {
                const playlist = data.playlists[playlistIndex];
                playlist.songs.forEach(song => {
                    console.log(`Playing song: ${song.title} by ${song.artist}`);
                    // Here you would typically use an audio library or HTML5 audio to play the song
                    // For example:
                    // let audio = new Audio(song.mp3url);
                    // audio.play();
                });
            })
            .catch(error => console.error('Error loading playlist:', error));
    }

    // Function to create and show a popup with playlist details
    function showPlaylistPopup(playlist, targetElement) {
        console.log("Showing popup for:", playlist.name); // Debugging log
        const popup = document.createElement('div');
        popup.id = 'playlist-popup';
        popup.style.position = 'fixed'; // Changed from 'absolute' to 'fixed'
        popup.style.top = '50%'; // Center vertically
        popup.style.left = '50%'; // Center horizontally
        popup.style.transform = 'translate(-50%, -50%)'; // Adjust to center
        popup.style.backgroundColor = '#f9f9f9';
        popup.style.padding = '10px';
        popup.style.border = '1px solid #ccc';
        popup.style.borderRadius = '5px';
        popup.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        popup.style.width = '300px';
        popup.style.zIndex = '10000'; // Ensure it's on top
        popup.innerHTML = `<h4>${playlist.name}</h4>`;

        playlist.songs.forEach(song => {
            const songElement = document.createElement('div');
            songElement.innerHTML = `<p><strong>${song.title}</strong> by ${song.artist}</p>`;
            popup.appendChild(songElement);
        });

        const closeButton = document.createElement('button');
        closeButton.innerText = 'Close';
        closeButton.style.marginTop = '10px';
        closeButton.onclick = function() {
            document.body.removeChild(popup);
        };
        popup.appendChild(closeButton);

        document.body.appendChild(popup);
    }

    // Function to play a playlist and show details
    function playAndShowPlaylist(playlistIndex, event) {
        console.log("Attempting to play and show playlist:", playlistIndex); // Debugging log
        fetch('./data/featured-playlist.json')
            .then(response => response.json())
            .then(data => {
                const playlist = data.playlists[playlistIndex];
                console.log("Fetched playlist:", playlist); // Debugging log
                showPlaylistPopup(playlist, event.target);
                playlist.songs.forEach(song => {
                    console.log(`Playing song: ${song.title} by ${song.artist}`);
                    // Here you would typically use an audio library or HTML5 audio to play the song
                });
            })
            .catch(error => console.error('Error loading playlist:', error));
    }

    // Event listeners for playlist buttons
    document.getElementById('playlist1').addEventListener('click', (event) => playAndShowPlaylist(0, event));
    document.getElementById('playlist2').addEventListener('click', (event) => playAndShowPlaylist(1, event));
    document.getElementById('playlist3').addEventListener('click', (event) => playAndShowPlaylist(2, event));

    // Function to dynamically load playlists into the sidebar
    function loadPlaylists() {
        fetch('./data/featured-playlist.json')
            .then(response => response.json())
            .then(data => {
                const playlists = data.playlists;
                playlists.forEach((playlist, index) => {
                    const button = document.getElementById(`playlist${index + 1}`);
                    button.textContent = playlist.name; // Set the button text to the playlist name
                    button.addEventListener('click', (event) => playAndShowPlaylist(index, event));
                });
            })
            .catch(error => console.error('Error loading playlists:', error));
    }

    loadPlaylists(); // Call the function to load playlists

    // ... existing code ...
});