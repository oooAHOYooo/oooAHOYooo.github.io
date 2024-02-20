window.addEventListener('DOMContentLoaded', (event) => {
    fetch('./data/newsletter.json')
        .then(response => response.json())
        .then(data => {
            // Sort the data by date in descending order
            const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

            const newsletterList = document.getElementById('newsletter-list');
            sortedData.forEach(newsletter => {
                const div = document.createElement('div');
                div.className = 'newsletter-item'; // Add a class for styling
                let htmlContent = `
                    <h2>${newsletter.title}</h2>
                    <p class="date">${newsletter.date}</p>
                `;
                if (newsletter.imageUrl) {
                    htmlContent += `<img src="${newsletter.imageUrl}" alt="${newsletter.title}" class="newsletter-image">`;
                }
                htmlContent += `<p>${newsletter.content}</p>`;
                div.innerHTML = htmlContent;
                newsletterList.appendChild(div);
            });
        });
});