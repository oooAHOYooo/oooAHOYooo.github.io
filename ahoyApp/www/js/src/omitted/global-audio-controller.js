// global-audio-controller.js
window.AudioManager = {
    currentSource: null,

    requestPlay: function(source) {
        if (this.currentSource && this.currentSource !== source) {
            this.currentSource.pause();
        }
        this.currentSource = source;
    },

    releasePlay: function(source) {
        if (this.currentSource === source) {
            this.currentSource = null;
        }
    }
};