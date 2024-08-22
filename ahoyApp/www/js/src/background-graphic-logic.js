document.addEventListener('DOMContentLoaded', function() {
    const backgroundImages = [
    
        'https://www.icegif.com/wp-content/uploads/2022/02/icegif-536.gif',
        'https://media1.giphy.com/media/wkKyBT94rB196/giphy.gif?cid=ecf05e47b9ypgsrn61em96kw5zberiuv0vmdperhn0uq9ch2&rid=giphy.gif&ct=g',
        'https://i.gifer.com/ARqO.gif',
        'https://s.yimg.com/uu/api/res/1.2/rVdUX8eVa31S_5JDCvvp0A--~B/Zmk9ZmlsbDtweW9mZj0wO3c9NjQwO2g9MzYwO3NtPTE7YXBwaWQ9eXRhY2h5b24-/http://media.zenfs.com/en-US/video/video.storyful.com/866362344b92b1cb1d9c3a36db9b0520',
        'https://media.tenor.com/S8_V9lNMc3oAAAAM/waves-awesome.gif',
        'https://i.pinimg.com/originals/c6/36/2e/c6362e4ca5fa5e887c6b9ddfcb82c13d.gif',
        'https://i.pinimg.com/originals/fc/38/97/fc389789c5fbe80b36df05e8ee441c66.gif',
        'https://c.tenor.com/lWbWfolwJfIAAAAC/ocean-night.gif',
        'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMHpvZ2RiazV6d2R1cjBnazl4b3hweHFyNjl0NG9vOXhuaG03ZjNreiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/J1dyoeVpfDCQqOpBNh/giphy.gif',
        "https://www.icegif.com/wp-content/uploads/2023/04/icegif-1410.gif",
        "https://i.pinimg.com/originals/90/f9/3d/90f93d69410a62b0676b81a4305f01c2.gif",
        "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExcjQ1Y3V3MzR5Yzh1Njdhb2t2Z2RmdzgyZXY0bGNvODZxNnJxbms1ayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/LMVkZXubrWzcaZNq10/giphy.gif",
        "https://i.giphy.com/14hS1ZEmSfKdTW.webp",
        "https://i.gifer.com/embedded/download/1g1u.gif",
        "https://68.media.tumblr.com/fc5e96885fb8c0e015442c96b2f7c02b/tumblr_otdbyg4ft11ujzdjmo1_400.gif",
        "https://i.gifer.com/7Ld0.gif"
        // Newly added images
       
    ];
    let currentImageIndex = Math.floor(Math.random() * backgroundImages.length); // Start with a random image

    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function changeBackgroundImage() {
        const appBackgroundLayer = document.querySelector('.app-background-layer');
        if (appBackgroundLayer && !isMobileDevice()) {
            appBackgroundLayer.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
            currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
        } else if (appBackgroundLayer && isMobileDevice()) {
            appBackgroundLayer.style.backgroundImage = 'none';
        }
    }

    // Set initial background image randomly on page load
    changeBackgroundImage();

    // Declare and use changeInterval within the DOMContentLoaded context
    let changeInterval = setInterval(changeBackgroundImage, 120000); // 120000 milliseconds = 2 minutes

    // Function to override background change
    window.overrideBackgroundChange = function() {
        clearInterval(changeInterval); // Stop the automatic background change
        changeBackgroundImage(); // Change the background image immediately
    };

    // Change background image when the 'o' key is pressed (only on non-mobile devices)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'o' && !isMobileDevice()) {
            changeBackgroundImage();
        }
    });
});