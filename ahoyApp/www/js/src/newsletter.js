window.addEventListener('DOMContentLoaded', (event) => {
    let isOfflineMode = false;
    let useLocalData = true; // Toggle to choose between local data or remote API

    document.addEventListener('offlineModeChanged', function(event) {
        isOfflineMode = event.detail;
        fetchAndDisplayNewsletter();
    });

    function fetchAndDisplayNewsletter() {
        const newsletterDataUrl = useLocalData || isOfflineMode 
            ? "local_data/newsletter.json" 
            : "https://storage.googleapis.com/ahoy-dynamic-content/dynamicJson/newsletter.json";

        fetch(newsletterDataUrl)
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.json();
            })
            .then(newsletterData => {
                console.log('Fetched JSON data:', newsletterData);
                const activeData = newsletterData.filter(item => item.active !== "false" && item.active !== false);
                const sortedData = activeData.sort((a, b) => new Date(b.date) - new Date(a.date));
                let currentPage = 1;
                const itemsPerPage = 100;

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

                        // Check if the newsletter has a featured video iframe
                        if (newsletter.featuredVideoIframe) {
                            htmlContent += `
                                <div style="position:relative;overflow:hidden;width:100%;max-width:640px;margin:0 auto;padding-bottom:56.25%;">
                                    <iframe src="${newsletter.featuredVideoIframe}" width="100%" height="100%" frameborder="0" scrolling="auto" title="${newsletter.title}" style="position:absolute;top:0;left:0;" allowfullscreen></iframe>
                                </div>
                            `;
                        }
                        // Check if there are multiple images (gallery)
                        else if (newsletter.imageUrl && newsletter.additionalImages && newsletter.additionalImages.length > 0) {
                            // Combine the main image with additional images
                            const galleryImages = [newsletter.imageUrl, ...newsletter.additionalImages];
                            htmlContent += `<div class="newsletter-gallery-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 0 auto; max-width: 1200px;">`;
                            galleryImages.forEach((img, index) => {
                                htmlContent += `
                                    <div style="position: relative; padding-bottom: 75%; overflow: hidden;">
                                        <img src="${img}" 
                                            alt="${newsletter.title} - ${index+1}" 
                                            class="gallery-thumb lazy-load" 
                                            data-gallery-index="${index}" 
                                            data-gallery='${JSON.stringify(galleryImages)}'
                                            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: contain; cursor: pointer; background: rgba(0,0,0,0.05);">
                                    </div>
                                `;
                            });
                            htmlContent += `</div>`;
                        }
                        // Else, display a single image
                        else if (newsletter.imageUrl) {
                            const linkAction = newsletter.externalLink 
                                ? `window.open('${newsletter.externalLink}', '_blank')` 
                                : `navigateToTab('${newsletter.goTo}')`;
                            htmlContent += `
                                <div class="newsletter-image-container">
                                    <img src="${newsletter.imageUrl}" alt="${newsletter.title}" class="newsletter-image-background">
                                    <img src="${newsletter.imageUrl}" alt="${newsletter.title}" class="newsletter-image-foreground lazy-load hover-link" loading="lazy" onclick="${linkAction}" onerror="this.style.display='none'">
                                </div>
                            `;
                        }

                        // Add newsletter content text
                        htmlContent += `<p>${newsletter.content}</p>`;
                        div.innerHTML = htmlContent;
                        newsletterList.appendChild(div);
                    });

                    lazyLoadImages(); // Apply lazy loading to the images
                    initGalleryListeners(); // Initialize gallery click events
                }

                // Lazy load images using Intersection Observer
                function lazyLoadImages() {
                    const lazyImages = document.querySelectorAll('.lazy-load');
                    const observer = new IntersectionObserver((entries, observer) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const image = entry.target;
                                image.src = image.dataset.src || image.src;
                                image.classList.remove('lazy-load');
                                observer.unobserve(image);
                            }
                        });
                    });
                    lazyImages.forEach(image => observer.observe(image));
                }

                // Gallery modal functions
                function openGalleryModal(galleryImages, startIndex) {
                    let modal = document.getElementById('gallery-modal');
                    if (!modal) {
                        modal = document.createElement('div');
                        modal.id = 'gallery-modal';
                        // Basic inline styles for modal
                        modal.style.position = 'fixed';
                        modal.style.top = '0';
                        modal.style.left = '0';
                        modal.style.width = '100%';
                        modal.style.height = '100%';
                        modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
                        modal.style.display = 'flex';
                        modal.style.alignItems = 'center';
                        modal.style.justifyContent = 'center';
                        modal.style.zIndex = '1000';
                        modal.innerHTML = `
                            <span id="modal-close" style="position:absolute;top:20px;right:30px;font-size:30px;color:white;cursor:pointer;">&times;</span>
                            <img id="modal-image" src="" alt="" style="max-width:90%; max-height:80%;">
                            <div id="modal-prev" style="position:absolute;left:20px;font-size:30px;color:white;cursor:pointer;">&#10094;</div>
                            <div id="modal-next" style="position:absolute;right:20px;font-size:30px;color:white;cursor:pointer;">&#10095;</div>
                        `;
                        document.body.appendChild(modal);

                        // Close modal event
                        document.getElementById('modal-close').addEventListener('click', closeGalleryModal);
                        modal.addEventListener('click', function(e) {
                            if (e.target === modal) {
                                closeGalleryModal();
                            }
                        });
                    }

                    let currentIndex = startIndex;
                    const modalImage = document.getElementById('modal-image');
                    function updateModalImage() {
                        modalImage.src = galleryImages[currentIndex];
                    }
                    updateModalImage();

                    // Next and Previous navigation
                    document.getElementById('modal-next').onclick = function(e) {
                        e.stopPropagation();
                        currentIndex = (currentIndex + 1) % galleryImages.length;
                        updateModalImage();
                    };
                    document.getElementById('modal-prev').onclick = function(e) {
                        e.stopPropagation();
                        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                        updateModalImage();
                    };

                    modal.style.display = 'flex';
                }

                function closeGalleryModal() {
                    const modal = document.getElementById('gallery-modal');
                    if (modal) {
                        modal.style.display = 'none';
                    }
                }

                // Initialize click listeners on gallery thumbnails
                function initGalleryListeners() {
                    const galleryThumbs = document.querySelectorAll('.gallery-thumb');
                    galleryThumbs.forEach(thumb => {
                        thumb.addEventListener('click', function() {
                            const galleryImages = JSON.parse(this.getAttribute('data-gallery'));
                            const index = parseInt(this.getAttribute('data-gallery-index'));
                            openGalleryModal(galleryImages, index);
                        });
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
                    }, { rootMargin: '0px 0px 200px 0px' });

                    observer.observe(document.querySelector('#newsletter-list > .newsletter-item:last-child'));
                }

                // Function to navigate to a specific tab (example implementation)
                function navigateToTab(tabName) {
                    console.log(`Navigating to tab: ${tabName}`);
                    // Implement your tab navigation logic here
                }

                displayNewsletter(sortedData); // Display the first page of items
                infiniteScroll(); // Initialize infinite scroll
            })
            .catch(error => {
                console.error("Error fetching newsletter data:", error);
            });
    }

    fetchAndDisplayNewsletter(); // Initial fetch
});
