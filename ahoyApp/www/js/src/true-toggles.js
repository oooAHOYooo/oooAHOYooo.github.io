document.addEventListener('DOMContentLoaded', function() {
    const leftSidebar = document.getElementById('left-sidebar');
    const rightSidebar = document.getElementById('right-sidebar');
    const rightToggleButton = document.getElementById('right-toggle-button');
    const leftToggleButton = document.getElementById('left-toggle-button');

    function toggleSidebars() {
        if (window.innerWidth > 1024) {
            leftSidebar.style.left = '0px';
            rightSidebar.classList.add('open');
        } else {
            leftSidebar.style.left = '-250px';
            rightSidebar.classList.remove('open');
        }
        updateSidebarState();
    }

    function toggleLeftSidebar() {
        if (leftSidebar.style.display === 'none' || leftSidebar.style.left === '-9999px') {
            leftSidebar.style.display = 'block';
            leftSidebar.style.left = '0px';
        } else {
            leftSidebar.style.left = '-9999px';
            setTimeout(() => {
                leftSidebar.style.display = 'none';
            }, 500); // Wait for the transition to complete before hiding
        }
        updateSidebarState();
    }

    function toggleRightSidebar(event) {
        event.stopPropagation();
        rightSidebar.classList.toggle('open');
        updateSidebarState();
    }

    function closeSidebars() {
        leftSidebar.style.left = '-9999px';
        setTimeout(() => {
            leftSidebar.style.display = 'none';
        }, 500);
        rightSidebar.classList.remove('open');
        updateSidebarState();
    }

    function updateSidebarState() {
        const isRightOpen = rightSidebar.classList.contains('open');
        rightToggleButton.textContent = isRightOpen ? '✕' : '☰';
        rightToggleButton.style.right = isRightOpen ? '302.25px' : '2.25px';
        
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
});