window.addEventListener('DOMContentLoaded', (event) => {
    let isOfflineMode = false;
    let useLocalData = false; // Toggle to choose between local data or remote API

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

                        // Check if the newsletter has a featured video iframe
                        if (newsletter.featuredVideoIframe) {
                            htmlContent += `
                                <div style="position:relative;overflow:hidden;width:100%;max-width:640px;margin:0 auto;padding-bottom:56.25%;">
                                    <iframe src="${newsletter.featuredVideoIframe}" width="100%" height="100%" frameborder="0" scrolling="auto" title="${newsletter.title}" style="position:absolute;top:0;left:0;" allowfullscreen></iframe>
                                </div>
                            `;
                        } else if (newsletter.imageUrl) {
                            const linkAction = newsletter.externalLink ? `window.open('${newsletter.externalLink}', '_blank')` : `navigateToTab('${newsletter.goTo}')`;
                            htmlContent += `
                                <div class="newsletter-image-container">
                                    <img src="${newsletter.imageUrl}" alt="${newsletter.title}" class="newsletter-image-background">
                                    <img src="${newsletter.imageUrl}" alt="${newsletter.title}" class="newsletter-image-foreground lazy-load hover-link" loading="lazy" onclick="${linkAction}" onerror="this.style.display='none'">
                                </div>
                            `;
                        }

                        htmlContent += `<p>${newsletter.content}</p>`;
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
    }

    fetchAndDisplayNewsletter(); // Initial fetch
});
