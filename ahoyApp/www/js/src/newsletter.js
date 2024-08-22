window.addEventListener('DOMContentLoaded', (event) => {
    fetch('./data/newsletter.json')
        .then(response => response.json())
        .then(data => {
            // Filter out inactive items
            const activeData = data.filter(item => item.active !== "false" && item.active !== false);
            const sortedData = activeData.sort((a, b) => new Date(b.date) - new Date(a.date));
            const newsletterList = document.getElementById('newsletter-list');
            const groupedByMonth = {};
            let currentPage = 1;
            const itemsPerPage = 5;

            // Group data by month and year
            sortedData.forEach(item => {
                const date = new Date(item.date);
                const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
                if (!groupedByMonth[monthYear]) {
                    groupedByMonth[monthYear] = [];
                }
                groupedByMonth[monthYear].push(item);
            });

            const menu = document.createElement('div');
            menu.style.display = 'block';
            menu.className = 'newsletter-menu-container';
            menu.className = 'dropdown';
            menu.innerHTML = `<button class="btnPrimary">Issues <i class="fa-solid fa-chevron-down"></i></button>`;
            const dropdownContent = document.createElement('div');
            dropdownContent.className = 'dropdown-content';

            Object.keys(groupedByMonth).forEach(monthYear => {
                const menuItem = document.createElement('a');
                menuItem.href = '#';
                menuItem.innerHTML = ` ${monthYear}`;
                menuItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    filterNewsByMonth(monthYear);
                });
                dropdownContent.appendChild(menuItem);
            });

            menu.appendChild(dropdownContent);

            // Function to filter news items by month and year
            function filterNewsByMonth(monthYear) {
                const filteredItems = groupedByMonth[monthYear];
                currentPage = 1;
                displayNewsletter(filteredItems);
            }

            // Function to render news items with pagination
            function displayNewsletter(data) {
                const newsletterList = document.getElementById('newsletter-list');
                const paginationControls = document.querySelector('.pagination-controls');
                
                let totalPages = Math.ceil(data.length / itemsPerPage);
                
                function renderPage(page) {
                    newsletterList.innerHTML = '';
                    const start = (page - 1) * itemsPerPage;
                    const end = start + itemsPerPage;
                    const pageItems = data.slice(start, end);
                    
                    pageItems.forEach((newsletter) => {
                        const div = document.createElement('div');
                        div.className = 'newsletter-item';
                        div.style.textAlign = 'center';

                        let htmlContent = `
                            <p class="newsletter-date"><i class="fa-regular fa-clock"></i> ${newsletter.date}</p>
                            <h2>${newsletter.title}</h2>
                        `;
                        if (newsletter.imageUrl) {
                            if (newsletter.imageUrl.endsWith('.mp4')) {
                                htmlContent += `
                                    <div style="text-align: center;">
                                        <video loop autoplay muted style="width: 100%; height: auto;">
                                            <source src="${newsletter.imageUrl}" type="video/mp4">
                                            Your browser does not support the video tag.
                                        </video>
                                    </div>
                                `;
                            } else {
                                const imageClickHandler = newsletter.goTo ? `onclick="goTo('${newsletter.goTo}')"` : `onclick="openLightbox('${newsletter.imageUrl}')"`;
                                htmlContent += `
                                    <div style="text-align: center;">
                                        <img src="${newsletter.imageUrl}" alt="${newsletter.title}" class="newsletter-image" style="max-width: 100%; height: auto; cursor: pointer;" ${imageClickHandler}>
                                    </div>
                                `;
                            }
                        }
                        htmlContent += `<p><i class="fa-solid fa-file-lines"></i> ${newsletter.content}</p>`;

                        // Add additional images if present
                        if (newsletter.additionalImages && newsletter.additionalImages.length > 0) {
                            htmlContent += `<div class="additional-images">`;
                            newsletter.additionalImages.forEach(imgUrl => {
                                htmlContent += `<img src="${imgUrl}" alt="Additional Image" style="max-width: 100%; height: auto; margin: 10px 0;" onclick="openLightbox('${imgUrl}')">`;
                            });
                            htmlContent += `</div>`;
                        }

                        div.innerHTML = htmlContent;
                        newsletterList.appendChild(div);
                    });
                    
                    updatePaginationControls();
                }
                
                function updatePaginationControls() {
                    paginationControls.innerHTML = `
                        <button class="pagination-button prev" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
                        <span class="pagination-info">Page ${currentPage} of ${totalPages}</span>
                        <button class="pagination-button next" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
                    `;
                    
                    // Add the dropdown menu after the pagination controls
                    paginationControls.appendChild(menu);
                    
                    const prevButton = paginationControls.querySelector('.prev');
                    const nextButton = paginationControls.querySelector('.next');
                    
                    prevButton.addEventListener('click', () => {
                        if (currentPage > 1) {
                            currentPage--;
                            renderPage(currentPage);
                        }
                    });
                    
                    nextButton.addEventListener('click', () => {
                        if (currentPage < totalPages) {
                            currentPage++;
                            renderPage(currentPage);
                        }
                    });
                }
                
                renderPage(currentPage);
            }

            // Initially render all news items
            displayNewsletter(sortedData);
        });
});