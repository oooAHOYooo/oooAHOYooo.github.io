const themes = ["light", "dark", "pink", "ellie", "bug", "hiii", "crazy", "gradientPink"]; // List of available themes

// Initialize with gradientPink as the default theme
let theme = themes[Math.floor(Math.random() * themes.length)];

function switchTheme(selectedTheme) {
  const root = document.documentElement;
  const themeTitle = document.getElementById("theme-title");

  theme = selectedTheme || theme; // Use the passed theme or the current one

  // Define theme properties based on the selected theme
  if (theme === "light") {
    setThemeProperties(
      root,
      "#ffffff", // Background color: white
      "#000000", // Text color: black
      "#cccccc", // Border color: light gray
      "#e0e0e0", // Secondary color: gray for secondary elements
      "#f0f0f0", // Button color: very light gray
      "#ffd700"  // Gold color: used for highlights or accents
    );
  } else if (theme === "dark") {
    setThemeProperties(
      root,
      "#003366", // Background color: beautiful navy gradient
      "#ffffff", // Text color: white
      "#2a2d4f", // Border color: matte dark navy purple blue
      "#777777", // Secondary color: medium dark gray
      "#1a3a5a", // Button color: shady navy
      "#bbbbbb"  // Gold color: light gray (used as a highlight color here)
    );
  } else if (theme === "pink") {
    setThemeProperties(
      root,
      "#ff4d6d", // Background color: bright pink
      "#ffffff", // Text color: white
      "#ff758f", // Border color: soft pink
      "#ff8fa3", // Secondary color: lighter pink
      "#ffb3c1", // Button color: very light pink
      "#ffccd5"  // Gold color: palest pink (used as a highlight color here)
    );
  } else if (theme === "ellie") {
    setThemeProperties(
      root,
      "#9c7a5e", // Background color: brownish
      "#d6b580", // Text color: light brown
      "#e3c7a1", // Border color: tan
      "#f4e6b3", // Secondary color: pale yellow
      "#f4c9b8", // Button color: peach
      "#ffd700"  // Gold color: gold (used for highlights or accents)
    );
  } else if (theme === "bug") {
    setThemeProperties(
      root,
      "#b3c59b", // Background color: rgb(179, 197, 155)
      "#ffffff", // Text color: white
      "#9fb58c", // Border color: rgb(159, 181, 140)
      "#c8d0a4", // Secondary color: rgb(200, 208, 164)
      "#b1c18b", // Button color: rgb(177, 193, 139)
      "#8fa76c"  // Gold color: rgb(143, 167, 108) (used as a highlight color here)
    );
  } else if (theme === "hiii") {
    setThemeProperties(
      root,
      "#f9c54e", // Background color: new color
      "#ffffff", // Text color: white
      "#f9b248", // Border color: new color
      "#f98348", // Secondary color: new color
      "#f94346", // Button color: new color
      "#f3712b"  // Gold color: new color
    );
  } else if (theme === "crazy") {
    setThemeProperties(
      root,
      "#ffbe0b", // Background color: bright yellow
      "#000000", // Text color: black
      "#fb5607", // Border color: bright orange
      "#ff006e", // Secondary color: bright pink
      "#8338ec", // Button color: bright purple
      "#3a86ff"  // Gold color: bright blue (used as a highlight color here)
    );
  } else if (theme === "gradientPink") { // Default theme
    setThemeProperties(
      root,
      "#ff0060", // Background color: dark pink gradient
      "#ffffff", // Text color: white
      "#ff4d6d", // Border color: bright pink
      "#ff758f", // Secondary color: soft pink
      "#ff8fa3", // Button color: lighter pink
      "#ffb3c1"  // Gold color: very light pink (used as a highlight color here)
    );
  }

  themeTitle.innerText = theme.charAt(0).toUpperCase() + theme.slice(1); // Update the theme title on the page
}

function setThemeProperties(
  root,
  backgroundColor,
  textColor,
  borderColor,
  secondaryColor,
  buttonColor,
  goldColor
) {
  root.style.setProperty("--background-color", backgroundColor);
  root.style.setProperty("--text-color", textColor);
  root.style.setProperty("--border-color", borderColor);
  root.style.setProperty("--secondary-color", secondaryColor);
  root.style.setProperty("--button-color", buttonColor);
  root.style.setProperty("--gold", goldColor);

  // Set the body background color
  document.body.style.backgroundColor = backgroundColor;

  // Add RGB versions of the colors
  root.style.setProperty("--background-color-rgb", hexToRgb(backgroundColor));
  root.style.setProperty("--text-color-rgb", hexToRgb(textColor));
  root.style.setProperty("--border-color-rgb", hexToRgb(borderColor));
  root.style.setProperty("--secondary-color-rgb", hexToRgb(secondaryColor));
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  if (!hex.includes("gradient")) { // Skip gradient conversion
    hex = hex.replace(/^#/, '');
    var bigint = parseInt(hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return r + "," + g + "," + b;
  }
  return ""; // Return empty string for gradients
}

// Apply the default theme on page load
document.addEventListener("DOMContentLoaded", function () {
  switchTheme(theme); // Apply the default theme on page load
  populateThemeDropdown(); // Populate the dropdown with theme options
});

// Function to populate the theme dropdown
function populateThemeDropdown() {
  const dropdown = document.getElementById('theme-dropdown');
  themes.forEach(theme => {
    const option = document.createElement('option');
    option.value = theme;
    option.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    dropdown.appendChild(option);
  });

  // Add event listener to change theme on user selection
  dropdown.addEventListener('change', function() {
    switchTheme(this.value);
  });
}