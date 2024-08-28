document.addEventListener('DOMContentLoaded', function() {
    const leftSidebar = document.getElementById('left-sidebar');
    const rightSidebar = document.getElementById('right-sidebar');
    const rightToggleButton = document.getElementById('right-toggle-button');
    const leftToggleButton = document.getElementById('left-toggle-button');

    function toggleSidebars() {
        if (window.innerWidth > 768) {
            leftSidebar.style.left = '0px';
            rightSidebar.style.right = '0px';
        } else {
            leftSidebar.style.left = '-100%';
            rightSidebar.style.right = '-100%';
        }
        updateSidebarState();
    }

    function toggleLeftSidebar() {
        leftSidebar.style.left = leftSidebar.style.left === '0px' ? '-100%' : '0px';
        updateSidebarState();
    }

    function toggleRightSidebar(event) {
        event.stopPropagation();
        rightSidebar.style.right = rightSidebar.style.right === '0px' ? '-100%' : '0px';
        updateSidebarState();
    }

    function closeSidebars() {
        leftSidebar.style.left = '-100%';
        rightSidebar.style.right = '-100%';
        updateSidebarState();
    }

    function updateSidebarState() {
        const isRightOpen = rightSidebar.style.right === '0px';
        rightToggleButton.textContent = isRightOpen ? '✕' : '☰';
        rightToggleButton.style.right = isRightOpen && window.innerWidth > 768 ? '282px' : '10px';
        
        const isLeftOpen = leftSidebar.style.left === '0px';
        leftToggleButton.textContent = isLeftOpen ? '✕' : '☰';
    }

    toggleSidebars();
    window.addEventListener('resize', toggleSidebars);
    leftToggleButton.addEventListener('click', toggleLeftSidebar);
    rightToggleButton.addEventListener('click', toggleRightSidebar);

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
        const swipeThreshold = 100; // Minimum distance for a swipe
        if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe right
            toggleLeftSidebar();
        } else if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe left
            toggleRightSidebar(event);
        }
    }

    // ... rest of your existing code ...
});