function changeTheme(theme) {
    var root = document.documentElement;

    if (theme === 'dark') {
        root.style.setProperty('--background-color', '#000026');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--border-color', '#006aff');
        root.style.setProperty('--secondary-color', '#9e945c63');
        root.style.setProperty('--button-color', '#5d5dff2d');
    } else if (theme === 'white') {
        root.style.setProperty('--background-color', '#ffffff');
        root.style.setProperty('--text-color', '#000000');
        root.style.setProperty('--border-color', '#000000');
        root.style.setProperty('--secondary-color', '#000000');
        root.style.setProperty('--button-color', '#000000');
    } else if (theme === 'blue') {
        root.style.setProperty('--background-color', '#0000ff');
        root.style.setProperty('--text-color', '#ffffff');
        root.style.setProperty('--border-color', '#0000ff');
        root.style.setProperty('--secondary-color', '#0000ff');
        root.style.setProperty('--button-color', '#0000ff');
    }
}