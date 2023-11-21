    document.getElementById('load-game-a').addEventListener('click', function() {
    this.style.display = 'none';

    
});

document.getElementById('load-game-b').addEventListener('click', function() {
    this.style.display = 'none';

    
});
function openGame(evt, gameName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(gameName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.getElementById('load-game-a').addEventListener('click', function() {
    document.getElementById('game-frame-a').src = "https://marcoworms.github.io/vanca/";
});

document.getElementById('load-game-b').addEventListener('click', function() {
    document.getElementById('game-frame-b').src = "https://marcoworms.github.io/attach/";
});

// Add similar event listeners for other games