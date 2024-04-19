const themes = ["light", "dark", "pink", "ellie"];

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
  } else {
    setThemeProperties(
      root,
      "#ffffff99",
      "#000000",
      "#e0e0e0",
      "#f2f2f2",
      "#d9d9d9",
      "#ffd900"
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
}

// Apply a random theme on page load
document.addEventListener("DOMContentLoaded", function () {
  switchTheme();
});
