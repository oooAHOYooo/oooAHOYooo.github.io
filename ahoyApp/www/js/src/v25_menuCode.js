  let touchStartX = 0;
  let touchEndX = 0;

  const iconContainer = document.getElementById('v25-icon-container');

  iconContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  iconContainer.addEventListener('touchmove', (e) => {
    touchEndX = e.changedTouches[0].screenX;
  }, false);

  iconContainer.addEventListener('touchend', (e) => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left
      iconContainer.scrollBy({ left: 100, behavior: 'smooth' });
    } else if (touchStartX - touchEndX < -50) {
      // Swipe right
      iconContainer.scrollBy({ left: -100, behavior: 'smooth' });
    }
  }, false);