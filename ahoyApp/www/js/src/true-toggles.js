document.addEventListener('DOMContentLoaded', function() {
    const rightToggleButton = document.getElementById('right-toggle-button');
    const rightSidebar = document.getElementById('right-sidebar');

    if (rightToggleButton && rightSidebar) {
        rightToggleButton.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent the click from being detected by the document listener
            toggleSidebar();
        });

        // Close sidebar when clicking outside of it
        document.addEventListener('click', function(event) {
            if (!rightSidebar.contains(event.target) && event.target !== rightToggleButton) {
                closeSidebar();
            }
        });

        // Initialize sidebar state
        updateSidebarState();

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
    } else {
        console.error('Right sidebar elements not found');
    }

    function toggleSidebar() {
        rightSidebar.classList.toggle('open');
        rightToggleButton.classList.toggle('active');
        updateSidebarState();
    }

    function closeSidebar() {
        rightSidebar.classList.remove('open');
        rightToggleButton.classList.remove('active');
        updateSidebarState();
    }

    function updateSidebarState() {
        if (rightSidebar.classList.contains('open')) {
            rightToggleButton.textContent = '✕';
            rightToggleButton.style.right = '302.25px'; // 300px sidebar width + 2.25px original right position
        } else {
            rightToggleButton.textContent = '☰';
            rightToggleButton.style.right = '2.25px';
        }
    }
});