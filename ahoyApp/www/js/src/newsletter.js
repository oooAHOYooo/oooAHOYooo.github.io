window.addEventListener('DOMContentLoaded', (event) => {
    fetch('./data/newsletter.json')
        .then(response => response.json())
        .then(data => {
            // Sort the data by date in descending order
            const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

            const newsletterList = document.getElementById('newsletter-list');
            sortedData.forEach((newsletter, index) => {
                const div = document.createElement('div');
                div.className = 'newsletter-item'; // Make class name unique for newsletter
                div.style.textAlign = 'center'; // Center align the content

                // Add a divider except for the first item
                if (index > 0) {
                    const divider = document.createElement('hr');
                    divider.className = 'newsletter-divider';
                    newsletterList.appendChild(divider);
                }

                let htmlContent = `
                    <p class="newsletter-date">${newsletter.date}</p>
                    <h2>${newsletter.title}</h2>
                `;
                if (newsletter.imageUrl) {
                    // Wrap the image in a div and center it
                    htmlContent += `
                        <div style="text-align: center;">
                            <img src="${newsletter.imageUrl}" alt="${newsletter.title}" class="newsletter-image" style="max-width: 100%; height: auto;">
                        </div>
                    `;
                }
                htmlContent += `<p>${newsletter.content}</p>`;
                div.innerHTML = htmlContent;
                newsletterList.appendChild(div);
            });
        });
});