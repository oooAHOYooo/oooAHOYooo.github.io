// Get the player element
var player = document.getElementById("player");

// Get the buttons
var topLeftButton = document.getElementById("topLeft");
var topRightButton = document.getElementById("topRight");
var bottomLeftButton = document.getElementById("bottomLeft");
var bottomRightButton = document.getElementById("bottomRight");

// Add event listeners to the buttons
topLeftButton.addEventListener('click', function() {
    player.style.top = "0px";
    player.style.left = "0px";
});

topRightButton.addEventListener('click', function() {
    player.style.top = "0px";
    player.style.left = (window.innerWidth - player.offsetWidth) + "px";
});

bottomLeftButton.addEventListener('click', function() {
    player.style.top = (window.innerHeight - player.offsetHeight) + "px";
    player.style.left = "0px";
});

bottomRightButton.addEventListener('click', function() {
    player.style.top = (window.innerHeight - player.offsetHeight) + "px";
    player.style.left = (window.innerWidth - player.offsetWidth) + "px";
});