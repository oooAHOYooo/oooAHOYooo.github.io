function changeTheme(theme) {
    var root = document.documentElement;

    if (theme === 'dark') {
        root.style.setProperty('--background-color', 'rgb(0, 0, 19)');
        root.style.setProperty('--text-color', '#0fb3ffba');
        root.style.setProperty('--border-color', '#006aff');
        root.style.setProperty('--secondary-color', '#0fb3ffba');
        root.style.setProperty('--button-color', '#5d5dff2d');
    } else if (theme === 'white') {
        root.style.setProperty('--background-color', '#ffffff');
        root.style.setProperty('--text-color', '#000000');
        root.style.setProperty('--border-color', '#000000');
        root.style.setProperty('--secondary-color', '#ffffff');
        root.style.setProperty('--button-color', '#000000');
    } else if (theme === 'blue') {
        root.style.setProperty('--background-color', 'rgb(0, 157, 255)');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--border-color', '#0000ff');
        root.style.setProperty('--secondary-color', 'rgb(0, 157, 255)');
        root.style.setProperty('--button-color', 'rgb(0, 157, 255)');
    }
}