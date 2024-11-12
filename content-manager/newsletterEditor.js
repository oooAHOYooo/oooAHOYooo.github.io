document.addEventListener('DOMContentLoaded', function() {
    tinymce.init({
        selector: '#newContent',
        plugins: 'link image code',
        toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
        menubar: false
    });
});

// Define any specific URLs or configurations for the newsletter
const newsletterUrl = 'https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/newsletter.json';

function loadNewsletterData() {
    console.log('Load Newsletter Data button clicked');
    currentUrl = newsletterUrl;
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
            displayNewsletterData(data);
        })
        .catch(error => console.error('Error loading JSON:', error));
}

function displayNewsletterData(data) {
    console.log('Displaying newsletter data');
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

function formatText(command) {
    document.execCommand(command, false, null);
}

function insertLink() {
    const url = prompt("Enter the URL");
    if (url) {
        document.execCommand('createLink', false, url);
    }
}

function addNewItem() {
    const newDate = document.getElementById('newDate').value;
    const newTitle = document.getElementById('newTitle').value;
    const newImageUrl = document.getElementById('newImageUrl').value;
    const newContent = document.getElementById('newContent').innerHTML; // Get HTML content

    if (!newDate || !newTitle || !newContent) {
        alert('Please fill in all required fields.');
        return;
    }

    const newItem = {
        date: newDate,
        title: newTitle,
        imageUrl: newImageUrl,
        content: newContent
    };

    currentData.push(newItem);
    newEntries.push(currentData.length - 1); // Track new entry index
    displayNewsletterData(currentData);
    showNotification('New item added successfully! Click here to review.');
    listChanges();
}

function previewNewsletter() {
    const previewDisplay = document.getElementById('previewDisplay');
    previewDisplay.innerHTML = ''; // Clear previous preview

    currentData.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'newsletter-item';
        itemDiv.innerHTML = `
            <h3>${item.title}</h3>
            <p><strong>Date:</strong> ${item.date}</p>
            <img src="${item.imageUrl}" alt="${item.title}" style="max-width: 100%;">
            <div>${item.content}</div>
        `;
        previewDisplay.appendChild(itemDiv);
    });
}

// You can add more functions specific to the newsletter editor here