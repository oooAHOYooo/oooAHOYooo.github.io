const day = new Date();
	const hr = day.getHours();
  
	if (window.innerWidth > 300) {
	  document.body.style.backgroundColor = "#acaca3";
  
	  if (hr === 5) {
		document.body.style.backgroundImage = "url('https://thumbs.gfycat.com/FrayedQuaintAnteater-max-1mb.gif')";
	  } else if (hr === 6 || hr === 12) {
		document.body.style.backgroundImage = "url('https://www.icegif.com/wp-content/uploads/2022/02/icegif-536.gif')";
	  } else if (hr === 7 || hr === 13 || hr === 14) {
		document.body.style.backgroundImage = "url('https://thumbs.gfycat.com/BackLankyGangesdolphin-size_restricted.gif')";
	  } else if (hr === 8 || hr === 9 || hr === 10) {
		document.body.style.backgroundImage = "url('https://media1.giphy.com/media/wkKyBT94rB196/giphy.gif?cid=ecf05e47b9ypgsrn61em96kw5zberiuv0vmdperhn0uq9ch2&rid=giphy.gif&ct=g')";
	  } else if (hr === 11) {
		document.body.style.backgroundImage = "url('https://i.gifer.com/ARqO.gif')";
	  } else if (hr === 15 || hr === 16) {
		document.body.style.backgroundImage = "url('https://s.yimg.com/uu/api/res/1.2/rVdUX8eVa31S_5JDCvvp0A--~B/Zmk9ZmlsbDtweW9mZj0wO3c9NjQwO2g9MzYwO3NtPTE7YXBwaWQ9eXRhY2h5b24-/http://media.zenfs.com/en-US/video/video.storyful.com/866362344b92b1cb1d9c3a36db9b0520')";
	  } else if (hr === 17 || hr === 18 || hr === 19 || hr === 20) {
		document.body.style.backgroundImage = "url('https://media.tenor.com/S8_V9lNMc3oAAAAM/waves-awesome.gif')";
	  } else if (hr === 22) {
		document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/c6/36/2e/c6362e4ca5fa5e887c6b9ddfcb82c13d.gif')";
	  } else if (hr === 23) {
		document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/fc/38/97/fc389789c5fbe80b36df05e8ee441c66.gif')";
	  } else if (hr === 24) {
		document.body.style.backgroundImage = "url('https://c.tenor.com/lWbWfolwJfIAAAAC/ocean-night.gif')";
	  }
	} else {
	  document.body.style.backgroundColor = "#000f2b85;";
	}