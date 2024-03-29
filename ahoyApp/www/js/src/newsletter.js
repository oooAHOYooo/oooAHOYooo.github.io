window.addEventListener('DOMContentLoaded', (event) => {
    fetch('./data/newsletter.json')
        .then(response => response.json())
        .then(data => {
            const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            const newsletterList = document.getElementById('newsletter-list');

            // Ensure newsletter lightbox elements are created only once
            let lightboxBackground = document.getElementById('newsletter-lightbox-background');
            if (!lightboxBackground) {
                lightboxBackground = document.createElement('div');
                lightboxBackground.id = 'newsletter-lightbox-background';
                const lightboxImg = document.createElement('img');
                lightboxImg.className = 'lightbox-img';
                lightboxBackground.appendChild(lightboxImg);
                document.body.appendChild(lightboxBackground);

                // Function to open the newsletter lightbox
                const openLightbox = (src) => {
                    lightboxImg.src = src;
                    lightboxBackground.style.display = 'flex';
                };

                // Function to close the newsletter lightbox
                const closeLightbox = () => {
                    lightboxBackground.style.display = 'none';
                };

                // Close lightbox when clicking outside the image
                lightboxBackground.addEventListener('click', (e) => {
                    if (e.target !== lightboxImg) {
                        closeLightbox();
                    }
                });

                sortedData.forEach((newsletter, index) => {
                    const div = document.createElement('div');
                    div.className = 'newsletter-item';
                    div.style.textAlign = 'center';

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
                        htmlContent += `
                            <div style="text-align: center;">
                                <img src="${newsletter.imageUrl}" alt="${newsletter.title}" class="newsletter-image" style="max-width: 100%; height: auto;" onclick="openLightbox('${newsletter.imageUrl}')">
                            </div>
                        `;
                    }
                    htmlContent += `<p>${newsletter.content}</p>`;
                    div.innerHTML = htmlContent;
                    newsletterList.appendChild(div);
                });
            }
        });
});