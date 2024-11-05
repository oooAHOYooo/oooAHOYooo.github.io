const urls = {
    mediaCollection: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/mediaCollection.json',
    newsletter: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/newsletter.json',
    podcastCollection: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/podcastCollection.json',
    trueRadioPlay: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/true-radioPlay.json'
};

let currentData = [];
let currentUrl = '';
let changes = [];
let newEntries = [];
let currentCollection = '';

function loadData() {
    console.log('Load Data button clicked');
    const selector = document.getElementById('jsonSelector');
    const selectedValue = selector.value;
    currentCollection = selectedValue;
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
            newEntries = []; // Reset new entries
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
            if (newEntries.includes(index)) {
                itemDiv.classList.add('new');
            } else if (changes.some(change => change.index === index)) {
                itemDiv.classList.add('changed');
            }
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
    formatted += `<button onclick="deleteItem(${index})">Delete</button>`;
    return formatted;
}

function saveItem(index) {
    console.log('Saving item at index:', index);
    const inputs = document.querySelectorAll(`input[data-index="${index}"]`);
    let itemChanged = false;
    let changeDetails = [];
    inputs.forEach(input => {
        const key = input.getAttribute('data-key');
        const newValue = input.value;
        if (currentData[index][key] !== newValue) {
            changeDetails.push(`${key}: "${currentData[index][key]}" -> "${newValue}"`);
            currentData[index][key] = newValue;
            itemChanged = true;
        }
    });
    if (itemChanged) {
        changes.push({ index, details: changeDetails });
        const itemDiv = document.querySelector(`.json-item:nth-child(${index + 1})`);
        itemDiv.classList.add('changed');
        showNotification('Changes saved successfully! Click here to review.');
        listChanges();
        console.log('Changes:', changes);
    }
}

function deleteItem(index) {
    console.log('Deleting item at index:', index);
    currentData.splice(index, 1);
    displayData(currentData);
    showNotification('Item deleted successfully! Click here to review.');
    listChanges();
}

function addSong() {
    const title = document.getElementById('newTitle').value;
    const artist = document.getElementById('newArtist').value;
    const album = document.getElementById('newAlbum').value;

    if (title && artist && album) {
        const newSong = { title, artist, album };
        currentData.push(newSong);
        newEntries.push(currentData.length - 1);
        displayData(currentData);
        showNotification('New song added successfully! Click here to review.');
        listChanges();
        console.log('New song added:', newSong);
    } else {
        console.error('Please fill in all fields to add a new song.');
    }
}

function previewChanges() {
    console.log('Previewing changes');
    const previewDisplay = document.getElementById('previewDisplay');
    const previewData = currentData.map((item, index) => {
        const isNew = newEntries.includes(index);
        return `${isNew ? '// New Entry\n' : ''}${JSON.stringify(item, null, 2)}`;
    }).join('\n\n');
    previewDisplay.textContent = previewData;
}

function publishChanges() {
    if (changes.length === 0 && newEntries.length === 0) {
        alert('No changes have been made.');
        return;
    }
    console.log('Publishing changes');
    const humanReadableData = currentData.map((item, index) => {
        const isNew = newEntries.includes(index);
        return `${isNew ? '// New Entry\n' : ''}${JSON.stringify(item, null, 2)}`;
    }).join('\n\n');

    const timestampComment = `// Published on: ${formatTimestamp(new Date())}\n`;
    const dataWithTimestamp = `${timestampComment}${humanReadableData}`;

    const timestamp = formatTimestamp(new Date());
    const humanBlob = new Blob([dataWithTimestamp], { type: 'application/json' });
    const humanUrl = URL.createObjectURL(humanBlob);
    const humanLink = document.createElement('a');
    humanLink.href = humanUrl;
    humanLink.download = `${currentCollection}_${timestamp}.json`;
    humanLink.click();
    URL.revokeObjectURL(humanUrl);
}

function formatTimestamp(date) {
    const options = { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
    return date.toLocaleString('en-US', options).replace(/,|:/g, '').replace(' ', '-').toLowerCase();
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    notification.style.display = 'block';
    notification.onclick = () => {
        document.getElementById('reviewChanges').scrollIntoView({ behavior: 'smooth' });
    };
    setTimeout(() => {
        notification.style.display = 'none';
        document.body.removeChild(notification);
    }, 5000);
}

function listChanges() {
    const changeLog = document.getElementById('changeLog');
    changeLog.innerHTML = '<h3>Change Log</h3><ul>';
    changes.forEach(change => {
        changeLog.innerHTML += `<li>Modified item at index ${change.index}: ${change.details.join(', ')}</li>`;
    });
    newEntries.forEach(index => {
        changeLog.innerHTML += `<li>Added new item at index ${index}</li>`;
    });
    changeLog.innerHTML += '</ul>';
}