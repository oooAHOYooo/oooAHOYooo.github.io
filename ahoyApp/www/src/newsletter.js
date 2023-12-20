window.addEventListener('DOMContentLoaded', (event) => {
    fetch('./data/newsletter.json')
        .then(response => response.json())
        .then(data => {
            const newsletterList = document.getElementById('newsletter-list');
            data.forEach(newsletter => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <h2>${newsletter.title}</h2>
                    <p>${newsletter.date}</p>
                    <p>${newsletter.content}</p>
                `;
                newsletterList.appendChild(div);
            });
        });
});