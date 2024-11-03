  window.addEventListener('scroll', function() {
    const updatesHeader = document.querySelector('.h1-background');
    if (window.scrollY > 0) {
      updatesHeader.classList.add('h1-background-faded');
    } else {
      updatesHeader.classList.remove('h1-background-faded');
    }
  });