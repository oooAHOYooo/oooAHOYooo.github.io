function getDailySeed() {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    return seed;
}

function seededShuffle(array, seed) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    let random = () => {
        var x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    };

    while (0 !== currentIndex) {
        randomIndex = Math.floor(random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffleSongs(songs) {
    const dailySeed = getDailySeed();
    return seededShuffle(songs, dailySeed);
}

// Expose shuffleSongs globally
window.shuffleSongs = shuffleSongs;