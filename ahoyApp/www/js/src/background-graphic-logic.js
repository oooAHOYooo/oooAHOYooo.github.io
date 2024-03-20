document.addEventListener('DOMContentLoaded', function() {
    const backgroundImages = [
        'https://thumbs.gfycat.com/FrayedQuaintAnteater-max-1mb.gif',
        'https://www.icegif.com/wp-content/uploads/2022/02/icegif-536.gif',
        'https://thumbs.gfycat.com/BackLankyGangesdolphin-size_restricted.gif',
        'https://media1.giphy.com/media/wkKyBT94rB196/giphy.gif?cid=ecf05e47b9ypgsrn61em96kw5zberiuv0vmdperhn0uq9ch2&rid=giphy.gif&ct=g',
        'https://i.gifer.com/ARqO.gif',
        'https://s.yimg.com/uu/api/res/1.2/rVdUX8eVa31S_5JDCvvp0A--~B/Zmk9ZmlsbDtweW9mZj0wO3c9NjQwO2g9MzYwO3NtPTE7YXBwaWQ9eXRhY2h5b24-/http://media.zenfs.com/en-US/video/video.storyful.com/866362344b92b1cb1d9c3a36db9b0520',
        'https://media.tenor.com/S8_V9lNMc3oAAAAM/waves-awesome.gif',
        'https://i.pinimg.com/originals/c6/36/2e/c6362e4ca5fa5e887c6b9ddfcb82c13d.gif',
        'https://i.pinimg.com/originals/fc/38/97/fc389789c5fbe80b36df05e8ee441c66.gif',
        'https://c.tenor.com/lWbWfolwJfIAAAAC/ocean-night.gif',
        // Newly added images
       
    ];
    let currentImageIndex = 0;

    function changeBackgroundImage() {
        const appBackgroundLayer = document.querySelector('.app-background-layer');
        if (appBackgroundLayer) {
            appBackgroundLayer.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
            currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        }
    }

    // Rotate background images every 2 minutes
    setInterval(changeBackgroundImage, 120000); // 120000 milliseconds = 2 minutes

    // Change background image when the 'o' key is pressed
    document.addEventListener('keydown', function(event) {
        if (event.key === 'o') {
            changeBackgroundImage();
        }
    });
});