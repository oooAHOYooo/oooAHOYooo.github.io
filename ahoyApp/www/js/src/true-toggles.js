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
        }
    }

    leftToggleButton.addEventListener('click', () => {
        toggleSidebar(leftSidebar, 'left');
    });
    rightToggleButton.addEventListener('click', () => {
        toggleSidebar(rightSidebar, 'right');
    });
    window.addEventListener('resize', handleResize);

    document.addEventListener('click', function(event) {
        if (!leftSidebar.contains(event.target) && event.target !== leftToggleButton &&
            !rightSidebar.contains(event.target) && event.target !== rightToggleButton) {
            closeSidebars();
        }
    });

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
    }
});