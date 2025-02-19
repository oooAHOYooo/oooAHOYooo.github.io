const themes = ["cream", "dark", "flamenco jimbo", "ellie", "bug", "licorice", "old yella", "gradientPink", "deep purple"]; // Updated available themes

// Initialize with gradientPink as the default theme
let theme = themes[Math.floor(Math.random() * themes.length)];

function switchTheme(selectedTheme) {
  const root = document.documentElement;
  const themeTitle = document.getElementById("theme-title");

  theme = selectedTheme || theme; // Use the passed theme or the current one

  // Define theme properties based on the selected theme
  if (theme === "cream") {
    setThemeProperties(
      root,
      "#25ced1", // Background color
      "#FFF",    // Text color
      "#fceade", // Border color
      "#ff8a5b", // Secondary color
      "#ea526f", // Button color
      "#ea526f"  // Gold color (using same as button)
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
  } else if (theme === "flamenco jimbo") {
    setThemeProperties(
      root,
      "#ffe5ec", // Background color
      "#ff4d6d", // Text color
      "#ffccd5", // Border color
      "#fff0f3", // Secondary color
      "#c9184a", // Button color
      "#c9184a"  // Gold color (using same as button)
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
  } else if (theme === "licorice") {
    setThemeProperties(
      root,
      "#191516", // Background color: Licorice (dark)
      "#C9DAEA", // Text color: Columbia blue
      "#AB2346", // Border color: Amaranth purple
      "#00B295", // Secondary color: Jungle green
      "#AB2346", // Button color: Amaranth purple
      "#03F7EB"  // Gold color: Fluorescent cyan (used as a highlight color here)
    );
  } else if (theme === "old yella") {
    setThemeProperties(
      root,
      "#ffbe0b", // Background color: bright yellow
      "#000000", // Text color: black
      "#fb5607", // Border color: bright orange
      "#ff006e", // Secondary color: bright pink
      "#8338ec", // Button color: bright purple
      "#3a86ff"  // Gold color: bright blue (used as a highlight color here)
    );
  } else if (theme === "deep purple") {
    setThemeProperties(
      root,
      "#10002b", // Background color
      "#c77dff", // Text color
      "#9d4edd", // Border color
      "#c77dff", // Secondary color
      "#ffdab9", // Button color
      "#ffdab9"  // Gold color (using same as button)
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

  // Update the SVG icon's outline color
  const userIcon = document.querySelector('#user-account-button svg');
  if (userIcon) {
    userIcon.style.stroke = borderColor; // Use border color for the outline
  }
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