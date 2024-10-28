function updateSvgColor(backgroundColor) {
  // Assuming a simple check for light/dark based on the theme's primary background color
  const lightOrDark = getLightOrDark(backgroundColor);

  // Determine SVG fill color based on the light or dark background
  const svgFillColor = (lightOrDark === 'dark') ? 'white' : 'black';
  document.documentElement.style.setProperty('--svg-fill-color', svgFillColor);
}

function getLightOrDark(color) {
  // A placeholder function to determine if the color is light or dark
  // You might need a more sophisticated method for real-world scenarios
  const r = parseInt(color.substr(1,2), 16);
  const g = parseInt(color.substr(3,2), 16);
  const b = parseInt(color.substr(5,2), 16);
  return ((r*0.299 + g*0.587 + b*0.114) > 186) ? 'light' : 'dark';
}

// Run on document load or when the background color changes
document.addEventListener('DOMContentLoaded', function() {
  // Assuming the background color is set and accessible
  const backgroundColor = document.documentElement.style.getPropertyValue('--background-color');
  updateSvgColor(backgroundColor);
});
