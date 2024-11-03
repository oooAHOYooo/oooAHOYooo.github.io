window.onload = function () {
  var tvWrap = document.querySelector(".tv-wrap");
  var mediaTableHeader = document.querySelector(".mediaTable-header");

  var tvWrapHeight = window.getComputedStyle(tvWrap).getPropertyValue("height");

  mediaTableHeader.style.top = tvWrapHeight;
};
