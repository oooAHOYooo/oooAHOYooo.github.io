window.addEventListener('DOMContentLoaded', (event) => {
    fetch('./local_data/newsletter.json')
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            console.log('Fetched JSON data:', data);
            const activeData = data.filter(item => item.active !== "false" && item.active !== false);
            const sortedData = activeData.sort((a, b) => new Date(b.date) - new Date(a.date));
            const groupedByMonth = {};
            let currentPage = 1;
            const itemsPerPage = 100;

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
                        const linkAction = newsletter.externalLink ? `window.open('${newsletter.externalLink}', '_blank')` : `navigateToTab('${newsletter.goTo}')`;
                        htmlContent += `
                            <div class="newsletter-image-container">
                                <img src="${newsletter.imageUrl}" alt="${newsletter.title}" class="newsletter-image-background">
                                <img src="${newsletter.imageUrl}" alt="${newsletter.title}" class="newsletter-image-foreground lazy-load hover-link" loading="lazy" onclick="${linkAction}" onerror="this.style.display='none'">
                            </div>
                        `;
                    }
                    htmlContent += `<p>${newsletter.content}</p>`;

                    if (newsletter.additionalImages && newsletter.additionalImages.length > 0) {
                        htmlContent += `<div class="additional-images gallery">`;
                        newsletter.additionalImages.forEach((imgUrl, index) => {
                            htmlContent += `
                                <div class="gallery-item" style="display: inline-block; margin: 5px;">
                                    <img src="${imgUrl}" alt="Additional Image ${index + 1}" class="lazy-load" loading="lazy" style="max-width: 100px; height: auto; cursor: pointer;" onclick="openLightbox('${imgUrl}')" onerror="this.style.display='none'">
                                </div>
                            `;
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

            // Function to open a lightbox as a mosaic popup
            function openLightbox(imageUrls) {
                const lightbox = document.createElement('div');
                lightbox.id = 'lightbox';
                lightbox.style.position = 'fixed';
                lightbox.style.top = '0';
                lightbox.style.left = '0';
                lightbox.style.width = '100%';
                lightbox.style.height = '100%';
                lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                lightbox.style.display = 'flex';
                lightbox.style.alignItems = 'center';
                lightbox.style.justifyContent = 'center';
                lightbox.style.zIndex = '1000';
                lightbox.style.transition = 'opacity 0.3s ease';
                lightbox.style.opacity = '0';

                // Create a container for the mosaic
                const mosaicContainer = document.createElement('div');
                mosaicContainer.style.display = 'grid';
                mosaicContainer.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';
                mosaicContainer.style.gap = '10px';
                mosaicContainer.style.maxWidth = '90%';
                mosaicContainer.style.maxHeight = '90%';
                mosaicContainer.style.overflowY = 'auto';
                mosaicContainer.style.padding = '20px';
                mosaicContainer.style.backgroundColor = '#fff';
                mosaicContainer.style.borderRadius = '8px';

                // Create a close button
                const closeButton = document.createElement('span');
                closeButton.innerHTML = '&times;';
                closeButton.style.position = 'absolute';
                closeButton.style.top = '10px';
                closeButton.style.right = '20px';
                closeButton.style.fontSize = '30px';
                closeButton.style.color = '#fff';
                closeButton.style.cursor = 'pointer';
                closeButton.onclick = () => document.body.removeChild(lightbox);

                // Append the close button to the lightbox
                lightbox.appendChild(closeButton);

                // Add each image to the mosaic
                imageUrls.forEach(url => {
                    const img = document.createElement('img');
                    img.src = url;
                    img.style.width = '100%';
                    img.style.height = 'auto';
                    img.style.cursor = 'pointer';
                    img.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.3)';
                    img.onclick = () => openSingleImage(url); // Open single image view on click
                    mosaicContainer.appendChild(img);
                });

                // Append the mosaic container to the lightbox
                lightbox.appendChild(mosaicContainer);

                // Append the lightbox to the body
                document.body.appendChild(lightbox);

                // Fade in the lightbox
                requestAnimationFrame(() => {
                    lightbox.style.opacity = '1';
                });

                // Close the lightbox when clicking outside the mosaic
                lightbox.onclick = (e) => {
                    if (e.target === lightbox) {
                        document.body.removeChild(lightbox);
                    }
                };
            }

            // Function to open a single image in full view
            function openSingleImage(imageUrl) {
                const singleImageLightbox = document.createElement('div');
                singleImageLightbox.style.position = 'fixed';
                singleImageLightbox.style.top = '0';
                singleImageLightbox.style.left = '0';
                singleImageLightbox.style.width = '100%';
                singleImageLightbox.style.height = '100%';
                singleImageLightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
                singleImageLightbox.style.display = 'flex';
                singleImageLightbox.style.alignItems = 'center';
                singleImageLightbox.style.justifyContent = 'center';
                singleImageLightbox.style.zIndex = '1001';

                const img = document.createElement('img');
                img.src = imageUrl;
                img.style.maxWidth = '90%';
                img.style.maxHeight = '90%';
                img.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';

                singleImageLightbox.appendChild(img);
                document.body.appendChild(singleImageLightbox);

                singleImageLightbox.onclick = () => document.body.removeChild(singleImageLightbox);
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

            // Function to navigate to a specific tab
            function navigateToTab(tabName) {
                // Implement the logic to navigate to the specified tab
                console.log(`Navigating to tab: ${tabName}`);
                // Example: window.location.href = `#${tabName}`;
            }

            displayNewsletter(sortedData); // Display the first page of items
            infiniteScroll(); // Initialize infinite scroll
        })
        .catch(error => {
            console.error("Error fetching newsletter data:", error);
        });
});
