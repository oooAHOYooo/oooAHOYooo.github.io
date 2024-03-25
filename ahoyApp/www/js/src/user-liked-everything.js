document.addEventListener('DOMContentLoaded', function() {
  const player = document.getElementById('audio-player');
  
  document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', function() {
      player.src = this.getAttribute('data-track');
      player.play();
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const player = document.getElementById('audio-player');
  
  document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', function() {
      player.src = this.getAttribute('data-track');
      player.play();
    });
  });
});