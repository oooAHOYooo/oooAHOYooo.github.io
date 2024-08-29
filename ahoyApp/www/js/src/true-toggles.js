document.addEventListener('DOMContentLoaded', function() {
    const leftSidebar = document.getElementById('left-sidebar');
    const rightSidebar = document.getElementById('right-sidebar');
    const leftToggleButton = document.getElementById('left-toggle-button');
    const rightToggleButton = document.getElementById('right-toggle-button');
    const mainContent = document.getElementById('tabSortza');

    function toggleSidebar(sidebar, position) {
        const isOpen = sidebar.classList.contains('open');
        sidebar.classList.toggle('open');
        
        if (position === 'left') {
            sidebar.style.left = isOpen ? '-280px' : '0';
            leftToggleButton.style.left = isOpen ? '10px' : '290px';
        } else {
            sidebar.style.right = isOpen ? '-280px' : '0';
            rightToggleButton.style.right = isOpen ? '10px' : '290px';
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

    leftToggleButton.addEventListener('click', () => toggleSidebar(leftSidebar, 'left'));
    rightToggleButton.addEventListener('click', () => toggleSidebar(rightSidebar, 'right'));

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            closeSidebars();
        }
        updateMainContentMargin();
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