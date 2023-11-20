        function switchTheme() {
            const root = document.documentElement;
            const bgColor = getComputedStyle(root).getPropertyValue('--background-color');
            const lightBgColor = getComputedStyle(root).getPropertyValue('--light-background-color');

            if (bgColor.trim() === lightBgColor.trim()) {
                // If the current theme is light, switch to dark
                root.style.setProperty('--background-color', 'rgb(0, 14, 19)');
                root.style.setProperty('--text-color', '#00f2ff');
                root.style.setProperty('--border-color', '#00e5ff');
                root.style.setProperty('--secondary-color', '#000000ba');
                root.style.setProperty('--button-color', '#ffffff2d');
                root.style.setProperty('--gold', '#ffd900');
            } else {
                // If the current theme is dark, switch to light
                root.style.setProperty('--background-color', '#ffffff');
                root.style.setProperty('--text-color', '#000000');
                root.style.setProperty('--border-color', '#e0e0e0');
                root.style.setProperty('--secondary-color', '#f2f2f2');
                root.style.setProperty('--button-color', '#d9d9d9');
                root.style.setProperty('--gold', '#ffd900');
            }
        }