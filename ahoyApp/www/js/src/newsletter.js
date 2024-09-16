window.addEventListener('DOMContentLoaded', (event) => {
    fetch('./data/newsletter.json')
        .then(response => response.json())
        .then(data => {
            const activeData = data.filter(item => item.active !== "false" && item.active !== false);
            const sortedData = activeData.sort((a, b) => new Date(b.date) - new Date(a.date));
            const groupedByMonth = {};
            let currentPage = 1;
            const itemsPerPage = 10;

            // Group data by month and year
            sortedData.forEach(item => {
                const date = new Date(item.date);
                const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
                if (!groupedByMonth[monthYear]) {
                    groupedByMonth[monthYear] = [];
                }
                groupedByMonth[monthYear].push(item);
            });

            function displayNewsletter(data, append = false) {
                const newsletterList = document.getElementById('newsletter-list');
                const start = (currentPage - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                const pageItems = data.slice(start, end);

                // If we're not appending, clear the existing content
                if (!append) {
                    newsletterList.innerHTML = '';
                }

                pageItems.forEach(newsletter => {
                    const div = document.createElement('div');
                    div.className = 'newsletter-item';
                    div.style.textAlign = 'center';

                    let htmlContent = `
                        <p class="newsletter-date"><i class="fa-regular fa-clock"></i> ${newsletter.date}</p>
                        <h2>${newsletter.title}</h2>
                    `;
                    // Check if imageUrl exists before rendering image or video
                    if (newsletter.imageUrl) {
                        if (newsletter.imageUrl.endsWith('.mp4')) {
                            htmlContent += `
                                <div style="text-align: center;">
                                    <video loop autoplay muted loading="lazy" style="width: 100%; height: auto;">
                                        <source src="${newsletter.imageUrl}" type="video/mp4">
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            `;
                        } else {
                            const imageClickHandler = newsletter.goTo ? `onclick="goTo('${newsletter.goTo}')"` : `onclick="openLightbox('${newsletter.imageUrl}')"`;
                            htmlContent += `
                                <div style="text-align: center;">
                                    <img src="${newsletter.imageUrl}" alt="${newsletter.title}" class="newsletter-image lazy-load" loading="lazy" style="max-width: 100%; height: auto; cursor: pointer;" ${imageClickHandler}>
                                </div>
                            `;
                        }
                    }
                    htmlContent += `<p><i class="fa-solid fa-file-lines"></i> ${newsletter.content}</p>`;

                    if (newsletter.additionalImages && newsletter.additionalImages.length > 0) {
                        htmlContent += `<div class="additional-images">`;
                        newsletter.additionalImages.forEach(imgUrl => {
                            htmlContent += `<img src="${imgUrl}" alt="Additional Image" class="lazy-load" loading="lazy" style="max-width: 100%; height: auto; margin: 10px 0;" onclick="openLightbox('${imgUrl}')">`;
                        });
                        htmlContent += `</div>`;
                    }

                    div.innerHTML = htmlContent;
                    newsletterList.appendChild(div);
                });

                lazyLoadImages(); // Apply lazy loading to the images
            }

            // Function to apply lazy loading to images using Intersection Observer
            function lazyLoadImages() {
                const lazyImages = document.querySelectorAll('.lazy-load');

                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const image = entry.target;
                            image.src = image.dataset.src || image.src; // Load image when in view
                            image.classList.remove('lazy-load');
                            observer.unobserve(image); // Stop observing once image is loaded
                        }
                    });
                });

                lazyImages.forEach(image => {
                    observer.observe(image); // Start observing each lazy-load image
                });
            }

            // Infinite scroll functionality
            function infiniteScroll() {
                const observer = new IntersectionObserver((entries) => {
                    const lastEntry = entries[0];
                    if (lastEntry.isIntersecting) {
                        if (currentPage * itemsPerPage < sortedData.length) {
                            currentPage++;
                            displayNewsletter(sortedData, true); // Load next page and append
                        }
                    }
                }, { rootMargin: '0px 0px 200px 0px' }); // Trigger when the user is 200px from the bottom

                // Attach the observer to the last element in the list
                observer.observe(document.querySelector('#newsletter-list > .newsletter-item:last-child'));
            }

            displayNewsletter(sortedData); // Display the first page of items
            infiniteScroll(); // Initialize infinite scroll
        });
});
