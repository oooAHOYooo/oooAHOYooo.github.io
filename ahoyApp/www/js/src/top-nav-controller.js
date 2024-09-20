// Update navigation bar with current track details
function updateNavBar(title, artist) {
    const trackTitleElement = document.getElementById('current-track-title');
    const trackArtistElement = document.getElementById('current-track-artist');
    trackTitleElement.innerHTML = title ? `${title}` : '';
    trackArtistElement.innerHTML = artist ? `${artist}` : '';
}

// Media control functions
function playCurrentMedia() {
    console.log('Playing current media');
}

function playPreviousMedia() {
    console.log('Playing previous media');
}

function playNextMedia() {
    console.log('Playing next media');
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