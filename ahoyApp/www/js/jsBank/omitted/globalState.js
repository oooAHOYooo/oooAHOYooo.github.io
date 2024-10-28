const GlobalState = (() => {
    let currentSong = {
        url: '',
        title: '',
        artist: '',
        albumArt: '',
        duration: 0
    };

    return {
        getCurrentSong: () => currentSong,
        setCurrentSong: (song) => {
            currentSong = { ...currentSong, ...song };
        }
    };
})();

export default GlobalState;