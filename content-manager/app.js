const urls = {
    mediaCollection: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/mediaCollection.json',
    newsletter: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/newsletter.json',
    podcastCollection: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/podcastCollection.json',
    trueRadioPlay: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/true-radioPlay.json'
};

let currentData = [];
let currentUrl = '';

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
    inputs.forEach(input => {
        const key = input.getAttribute('data-key');
        currentData[index][key] = input.value;
    });
    console.log('Updated data:', currentData[index]);
    // Here you would implement the logic to save the updated data back to your server or storage
    // For example, you could use fetch to send a POST request with the updated data
}