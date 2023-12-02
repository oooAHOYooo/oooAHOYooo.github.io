let theme = 'light';

function switchTheme() {
    const root = document.documentElement;
    const themeTitle = document.getElementById('theme-title');

    if (theme === 'light') {
        setThemeProperties(root, 'rgb(0, 14, 19)', '#00f2ff', '#00e5ff', '#000000ba', '#ffffff2d', '#ffd900');
        theme = 'dark';
    } else if (theme === 'dark') {
        setThemeProperties(root, '#ff69be', '#ffffff', '#ff1493', '#ff69b4', '#ff1493', '#ffd900');
        theme = 'pink';
    } else if (theme === 'pink') {
        setThemeProperties(root, '#98ff98', 'rgb(0, 119, 97)', '#3eb489', '#98ff98', '#3eb489', '#ffd900');
        theme = 'ellie';
    } else {
        setThemeProperties(root, '#ffffff', '#000000', '#e0e0e0', '#f2f2f2', '#d9d9d9', '#ffd900');
        theme = 'light';
    }

    themeTitle.innerText = theme;
}

function setThemeProperties(root, backgroundColor, textColor, borderColor, secondaryColor, buttonColor, goldColor) {
    root.style.setProperty('--background-color', backgroundColor);
    root.style.setProperty('--text-color', textColor);
    root.style.setProperty('--border-color', borderColor);
    root.style.setProperty('--secondary-color', secondaryColor);
    root.style.setProperty('--button-color', buttonColor);
    root.style.setProperty('--gold', goldColor);

    // Set the colors of the progress bar
    const progressBarContainer = document.getElementById('progress-bar-container');
    const progressBar = document.getElementById('progress-bar');
    progressBarContainer.style.borderColor = borderColor;
    progressBar.style.backgroundColor = buttonColor;
}