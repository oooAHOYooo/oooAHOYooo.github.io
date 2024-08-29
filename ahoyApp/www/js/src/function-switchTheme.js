const themes = ["light", "dark", "pink", "ellie", "bug", "hiii", "crazy"];

function getRandomTheme() {
  const randomIndex = Math.floor(Math.random() * themes.length);
  return themes[randomIndex];
}

let theme = getRandomTheme(); // Initialize with a random theme

function switchTheme(selectedTheme) {
  const root = document.documentElement;
  const themeTitle = document.getElementById("theme-title");

  theme = selectedTheme || theme; // Use the passed theme or the current one

  if (theme === "light") {
    setThemeProperties(
      root,
      "rgb(0, 14, 19,0.8)",
      "#00f2ff",
      "#00e5ff",
      "#000000ba",
      "#ffffff2d",
      "#ffd900"
    );
    theme = "dark";
  } else if (theme === "dark") {
    setThemeProperties(
      root,
      "#FF265A93",
      "#ffffff",
      "#ff0060",
      "#ff0060",
      "#ff0060",
      "#ffee"
    );
    theme = "pink";
  } else if (theme === "pink") {
    setThemeProperties(
      root,
      "#98ff9895",
      "rgb(0, 119, 97)",
      "#3eb489",
      "#98ff98",
      "#3eb489",
      "#ffd300"
    );
    theme = "ellie";
  } else if (theme === "ellie") {
    setThemeProperties(
      root,
      "#ffffff99",
      "#000000",
      "#e0e0e0",
      "#f2f2f2",
      "#d9d9d9",
      "#ffd900"
    );
    theme = "bug";
  } else if (theme === "bug") {
    setThemeProperties(
      root,
      "#E1F5C4",
      "#7A9E7E",
      "#9BC4BC",
      "#EDE574",
      "#F9D423",
      "#FC913A"
    );
    theme = "hiii";
  } else if (theme === "hiii") {
    setThemeProperties(
      root,
      "#F6F4D2",
      "#A44A3F",
      "#F19C79",
      "#CBDFBD",
      "#D4E09B",
      "#F19C79"
    );
    theme = "crazy";
  } else if (theme === "crazy") {
    setThemeProperties(
      root,
      "#FFBE0B",
      "#3A86FF",
      "#FB5607",
      "#FF006E",
      "#8338EC",
      "#FFBE0B"
    );
    theme = "light";
  }

  themeTitle.innerText = theme;
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

  // Add RGB versions of the colors
  root.style.setProperty("--background-color-rgb", hexToRgb(backgroundColor));
  root.style.setProperty("--text-color-rgb", hexToRgb(textColor));
  root.style.setProperty("--border-color-rgb", hexToRgb(borderColor));
  root.style.setProperty("--secondary-color-rgb", hexToRgb(secondaryColor));
}

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  // Remove the hash if it's there
  hex = hex.replace(/^#/, '');

  // Parse the hex values
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  // Return the RGB values as a string
  return r + "," + g + "," + b;
}

// Apply a random theme on page load
document.addEventListener("DOMContentLoaded", function () {
  switchTheme();

  // Populate theme dropdown
  const themeDropdown = document.getElementById("theme-dropdown");
  themes.forEach(theme => {
    const option = document.createElement("option");
    option.value = theme;
    option.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);
    themeDropdown.appendChild(option);
  });

  // Set the current theme in the dropdown
  themeDropdown.value = theme;

  // Add event listener for theme change
  themeDropdown.addEventListener("change", function () {
    switchTheme(this.value);
  });
});