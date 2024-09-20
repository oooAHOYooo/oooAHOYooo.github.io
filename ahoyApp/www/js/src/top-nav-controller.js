// Update navigation bar with current track details
function updateNavBar(title, artist) {
    const trackTitleElement = document.getElementById('current-track-title');
    const trackArtistElement = document.getElementById('current-track-artist');
    trackTitleElement.innerHTML = title ? `${title}` : '';
    trackArtistElement.innerHTML = artist ? `${artist}` : '';
}

// Media control functions
function playCurrentMedia() {
    const audioPlayer = document.querySelector('.audio-player:playing');
    if (audioPlayer) {
        audioPlayer.play();
    }
}

function playPreviousMedia() {
    const prevBtn = document.querySelector('.prev-btn');
    if (prevBtn) {
        prevBtn.click();
    }
}

function playNextMedia() {
    const nextBtn = document.querySelector('.next-btn');
    if (nextBtn) {
        nextBtn.click();
    }
}

// Navigation and local storage handling
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const toggle = document.getElementById('toggle-top-nav');
    const navVisible = localStorage.getItem('navVisible') === 'true';
    toggle.checked = navVisible;
    nav.style.display = navVisible ? 'block' : 'none';

    toggle.addEventListener('change', function() {
        localStorage.setItem('navVisible', this.checked);
        window.location.reload();
    });
});