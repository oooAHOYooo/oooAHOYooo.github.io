document.addEventListener('DOMContentLoaded', function() {
    const leftSidebar = document.getElementById('left-sidebar');
    const rightSidebar = document.getElementById('right-sidebar');
    const leftToggleButton = document.getElementById('left-toggle-button');
    const rightToggleButton = document.getElementById('right-toggle-button');
    const body = document.body;

    function toggleSidebar(sidebar, position) {
        const isOpen = sidebar.style[position] === '0px';
        sidebar.style[position] = isOpen ? `-240px` : '0px';
        
        if (position === 'left') {
            body.classList.toggle('left-sidebar-open', !isOpen);
        } else {
            body.classList.toggle('right-sidebar-open', !isOpen);
        }
        
        updateToggleButton(position, !isOpen);
    }

    function updateToggleButton(position, isOpen) {
        const button = position === 'left' ? leftToggleButton : rightToggleButton;
        button.textContent = isOpen ? '✕' : '☰';
        button.style[position] = isOpen && window.innerWidth > 768 ? '240px' : '10px';
    }

    function closeSidebars() {
        leftSidebar.style.left = '-240px';
        rightSidebar.style.right = '-240px';
        body.classList.remove('left-sidebar-open', 'right-sidebar-open');
        updateToggleButton('left', false);
        updateToggleButton('right', false);
    }

    leftToggleButton.addEventListener('click', () => toggleSidebar(leftSidebar, 'left'));
    rightToggleButton.addEventListener('click', () => toggleSidebar(rightSidebar, 'right'));

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            closeSidebars();
        }
    });

    document.addEventListener('click', function(event) {
        if (!leftSidebar.contains(event.target) && event.target !== leftToggleButton &&
            !rightSidebar.contains(event.target) && event.target !== rightToggleButton) {
            closeSidebars();
        }
    });

    // Add event listener for the "Play FullScreen" button
    const playFullscreenButton = document.getElementById('play-fullscreen-button');
    if (playFullscreenButton) {
        playFullscreenButton.addEventListener('click', function() {
            const jwplayerFullscreenModal = document.getElementById('jwplayer-fullscreen-modal');
            if (jwplayerFullscreenModal) {
                jwplayerFullscreenModal.style.display = 'block';
            }
        });
    }

    // Add event listener for the "Close FullScreen" button
    const closeFullscreenButton = document.getElementById('close-fullscreen-button');
    if (closeFullscreenButton) {
        closeFullscreenButton.addEventListener('click', function() {
            const jwplayerFullscreenModal = document.getElementById('jwplayer-fullscreen-modal');
            if (jwplayerFullscreenModal) {
                jwplayerFullscreenModal.style.display = 'none';
            }
        });
    }

    // Close playlist popup when clicking outside
    document.addEventListener('click', function(event) {
        const playlistPopup = document.querySelector('.playlist-popup');
        const toggleButtons = document.querySelectorAll('.toggle-playlist');
        
        if (playlistPopup && !playlistPopup.contains(event.target) && 
            !Array.from(toggleButtons).some(button => button.contains(event.target))) {
            playlistPopup.remove();
        }
    });

    // Add touch event listeners for swipe gestures
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 100;
        if (touchEndX - touchStartX > swipeThreshold) {
            toggleSidebar(leftSidebar, 'left');
        } else if (touchStartX - touchEndX > swipeThreshold) {
            toggleSidebar(rightSidebar, 'right');
        }
    }

    // ... rest of your existing code ...
});