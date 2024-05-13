import GlobalState from './globalState.js';

const AhoyAudioManager = (() => {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseIcon = document.getElementById('play-pause-icon');

    let isPlaying = false;

    function togglePlayPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseIcon.className = 'fas fa-pause';
            isPlaying = true;
        } else {
            audioPlayer.pause();
            playPauseIcon.className = 'fas fa-play';
            isPlaying = false;
        }
    }

    function loadMedia(src) {
        if (audioPlayer.src !== src) {
            audioPlayer.src = src;
        }
        togglePlayPause();
    }

    function updateCurrentSong(songDetails) {
        GlobalState.setCurrentSong(songDetails);
    }

    return {
        togglePlayPause,
        loadMedia,
        updateCurrentSong
    };
})();

export default AhoyAudioManager;
