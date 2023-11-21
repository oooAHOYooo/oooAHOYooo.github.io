let theme = 'light';

function switchTheme() {
    const root = document.documentElement;

    if (theme === 'light') {
        // If the current theme is light, switch to dark
        root.style.setProperty('--background-color', 'rgb(0, 14, 19)');
        root.style.setProperty('--text-color', '#00f2ff');
        root.style.setProperty('--border-color', '#00e5ff');
        root.style.setProperty('--secondary-color', '#000000ba');
        root.style.setProperty('--button-color', '#ffffff2d');
        root.style.setProperty('--gold', '#ffd900');
        theme = 'dark';
    } else if (theme === 'dark') {
        // If the current theme is dark, switch to bright pink
        root.style.setProperty('--background-color', '#ff69be');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--border-color', '#ff1493');
        root.style.setProperty('--secondary-color', '#ff69b4');
        root.style.setProperty('--button-color', '#ff1493');
        root.style.setProperty('--gold', '#ffd900');
        theme = 'pink';
    } else {
        // If the current theme is pink, switch to light
        root.style.setProperty('--background-color', '#ffffff');
        root.style.setProperty('--text-color', '#000000');
        root.style.setProperty('--border-color', '#e0e0e0');
        root.style.setProperty('--secondary-color', '#f2f2f2');
        root.style.setProperty('--button-color', '#d9d9d9');
        root.style.setProperty('--gold', '#ffd900');
        theme = 'light';
    }
}