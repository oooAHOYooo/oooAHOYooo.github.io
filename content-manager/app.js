const urls = {
    mediaCollection: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/mediaCollection.json',
    newsletter: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/newsletter.json',
    podcastCollection: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/podcastCollection.json',
    trueRadioPlay: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/true-radioPlay.json'
};

let currentData = [];
let currentUrl = '';
let changes = [];

function loadData() {
    console.log('Load Data button clicked');
    const selector = document.getElementById('jsonSelector');
    const selectedValue = selector.value;
    currentUrl = urls[selectedValue];
    console.log('Fetching URL:', currentUrl);

    fetch(currentUrl)
        .then(response => {
            console.log('Response received:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched successfully:', data);
            currentData = data;
            changes = []; // Reset changes
            displayData(data);
        })
        .catch(error => console.error('Error loading JSON:', error));
}

function displayData(data) {
    console.log('Displaying data');
    const jsonDisplay = document.getElementById('jsonDisplay');
    jsonDisplay.innerHTML = ''; // Clear previous content

    if (Array.isArray(data)) {
        data.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'json-item';
            itemDiv.innerHTML = formatJsonItem(item, index);
            jsonDisplay.appendChild(itemDiv);
        });
    } else {
        jsonDisplay.innerHTML = formatJsonItem(data, 0);
    }
}

function formatJsonItem(item, index) {
    console.log('Formatting JSON item');
    let formatted = '<ul>';
    for (const key in item) {
        if (item.hasOwnProperty(key)) {
            formatted += `<li><strong>${key}:</strong> <input type="text" value="${item[key]}" data-key="${key}" data-index="${index}"></li>`;
        }
    }
    formatted += '</ul>';
    formatted += `<button onclick="saveItem(${index})">Save</button>`;
    return formatted;
}

function saveItem(index) {
    console.log('Saving item at index:', index);
    const inputs = document.querySelectorAll(`input[data-index="${index}"]`);
    let itemChanged = false;
    inputs.forEach(input => {
        const key = input.getAttribute('data-key');
        const newValue = input.value;
        if (currentData[index][key] !== newValue) {
            currentData[index][key] = newValue;
            itemChanged = true;
        }
    });
    if (itemChanged) {
        changes.push(index);
        console.log('Changes:', changes);
    }
}

function addSong() {
    const title = document.getElementById('newTitle').value;
    const artist = document.getElementById('newArtist').value;
    const album = document.getElementById('newAlbum').value;

    if (title && artist && album) {
        const newSong = { title, artist, album };
        currentData.push(newSong);
        displayData(currentData);
        console.log('New song added:', newSong);
    } else {
        console.error('Please fill in all fields to add a new song.');
    }
}

function previewChanges() {
    console.log('Previewing changes');
    const previewDisplay = document.getElementById('previewDisplay');
    previewDisplay.innerHTML = JSON.stringify(currentData, null, 2);
}

function downloadHumanReadable() {
    console.log('Downloading human-readable JSON');
    const humanReadableData = currentData.map((item, index) => {
        return `// Item ${index + 1}\n${JSON.stringify(item, null, 2)}`;
    }).join('\n\n');

    const humanBlob = new Blob([humanReadableData], { type: 'application/json' });
    const humanUrl = URL.createObjectURL(humanBlob);
    const humanLink = document.createElement('a');
    humanLink.href = humanUrl;
    humanLink.download = 'human_readable_data.json';
    humanLink.click();
    URL.revokeObjectURL(humanUrl);
}

function downloadMachineReadable() {
    console.log('Downloading machine-readable JSON');
    const rawData = JSON.stringify(currentData, null, 2);

    const rawBlob = new Blob([rawData], { type: 'application/json' });
    const rawUrl = URL.createObjectURL(rawBlob);
    const rawLink = document.createElement('a');
    rawLink.href = rawUrl;
    rawLink.download = 'raw_data.json';
    rawLink.click();
    URL.revokeObjectURL(rawUrl);
}