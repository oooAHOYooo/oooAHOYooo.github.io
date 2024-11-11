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
        const table = document.createElement('table');
        table.className = 'json-table';
        data.forEach((item, index) => {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            const details = document.createElement('details');
            const summary = document.createElement('summary');
            summary.textContent = `Item ${index + 1}`;
            details.appendChild(summary);
            details.innerHTML += formatJsonItem(item, index);
            cell.appendChild(details);
            row.appendChild(cell);
            table.appendChild(row);
        });
        jsonDisplay.appendChild(table);
    } else {
        jsonDisplay.innerHTML = formatJsonItem(data, 0);
    }
}

function formatJsonItem(item, index) {
    console.log('Formatting JSON item');
    let formatted = '<ul>';
    for (const key in item) {
        if (item.hasOwnProperty(key)) {
            const value = item[key];
            if (typeof value === 'object' && value !== null) {
                formatted += `<li><strong>${key}:</strong> ${formatNestedJson(value, `${index}-${key}`)}</li>`;
            } else {
                formatted += `<li><strong>${key}:</strong> <input type="text" value="${value}" data-key="${key}" data-index="${index}"></li>`;
            }
        }
    }
    formatted += '</ul>';
    formatted += `<button class="save" onclick="saveItem(${index})">Save</button>`;
    formatted += `<button class="delete" onclick="deleteItem(${index})">Delete</button>`;
    return formatted;
}

function formatNestedJson(value, parentIndex) {
    let formatted = '<ul>';
    if (Array.isArray(value)) {
        value.forEach((item, index) => {
            formatted += `<li>${formatNestedJson(item, `${parentIndex}-${index}`)}</li>`;
        });
    } else if (typeof value === 'object') {
        for (const key in value) {
            if (value.hasOwnProperty(key)) {
                const nestedValue = value[key];
                if (typeof nestedValue === 'object' && nestedValue !== null) {
                    formatted += `<li><strong>${key}:</strong> ${formatNestedJson(nestedValue, `${parentIndex}-${key}`)}</li>`;
                } else {
                    formatted += `<li><strong>${key}:</strong> <input type="text" value="${nestedValue}" data-key="${parentIndex}-${key}" data-index="${parentIndex}"></li>`;
                }
            }
        }
    }
    formatted += '</ul>';
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