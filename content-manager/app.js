const urls = {
    mediaCollection: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/mediaCollection.json',
    newsletter: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/newsletter.json',
    podcastCollection: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/podcastCollection.json',
    trueRadioPlay: 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/true-radioPlay.json'
};

function loadData() {
    console.log('Load Data button clicked');
    const selector = document.getElementById('jsonSelector');
    const selectedValue = selector.value;
    console.log('Selected JSON:', selectedValue);
    const url = urls[selectedValue];
    console.log('Fetching URL:', url);

    fetch(url)
        .then(response => {
            console.log('Response received:', response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched successfully:', data);
            displayData(data);
        })
        .catch(error => console.error('Error loading JSON:', error));
}

function displayData(data) {
    console.log('Displaying data');
    const jsonDisplay = document.getElementById('jsonDisplay');
    jsonDisplay.innerHTML = ''; // Clear previous content

    if (Array.isArray(data)) {
        data.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'json-item';
            itemDiv.innerHTML = formatJsonItem(item);
            jsonDisplay.appendChild(itemDiv);
        });
    } else {
        jsonDisplay.innerHTML = formatJsonItem(data);
    }
}

function formatJsonItem(item) {
    console.log('Formatting JSON item');
    let formatted = '<ul>';
    for (const key in item) {
        if (item.hasOwnProperty(key)) {
            formatted += `<li><strong>${key}:</strong> ${JSON.stringify(item[key], null, 2)}</li>`;
        }
    }
    formatted += '</ul>';
    return formatted;
}