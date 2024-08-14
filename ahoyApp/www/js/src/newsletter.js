window.addEventListener('DOMContentLoaded', (event) => {
    fetch('./data/newsletter.json')
        .then(response => response.json())
        .then(data => {
            const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
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
            menu.className = 'dropdown';
            menu.innerHTML = `<button class="btnPrimary">Select Month <i class="fa-solid fa-chevron-down"></i></button>`;
            const dropdownContent = document.createElement('div');
            dropdownContent.className = 'dropdown-content';

            Object.keys(groupedByMonth).forEach(monthYear => {
                const menuItem = document.createElement('a');
                menuItem.href = '#';
                menuItem.innerHTML = `<i class="fa-regular fa-calendar"></i> ${monthYear}`;
                menuItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    filterNewsByMonth(monthYear);
                });
                dropdownContent.appendChild(menuItem);
            });

            menu.appendChild(dropdownContent);
            newsletterList.before(menu);

            // Function to filter news items by month and year
            function filterNewsByMonth(monthYear) {
                const filteredItems = groupedByMonth[monthYear];
                currentPage = 1;
                renderNewsItems(filteredItems);
            }

            // Function to render news items with pagination
            function renderNewsItems(items) {
                newsletterList.innerHTML = ''; // Clear existing items
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const pageItems = items.slice(startIndex, endIndex);

                pageItems.forEach((newsletter) => {
                    const div = document.createElement('div');
                    div.className = 'newsletter-item';
                    div.style.textAlign = 'center';

                    let htmlContent = `
                        <p class="newsletter-date"><i class="fa-regular fa-clock"></i> ${newsletter.date}</p>
                        <h2><i class="fa-solid fa-newspaper"></i> ${newsletter.title}</h2>
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
                            htmlContent += `
                                <div style="text-align: center;">
                                    <img src="${newsletter.imageUrl}" alt="${newsletter.title}" class="newsletter-image" style="max-width: 100%; height: auto;" onclick="openLightbox('${newsletter.imageUrl}')">
                                </div>
                            `;
                        }
                    }
                    htmlContent += `<p><i class="fa-solid fa-file-lines"></i> ${newsletter.content}</p>`;
                    div.innerHTML = htmlContent;
                    newsletterList.appendChild(div);
                });

                // Add pagination controls
                const totalPages = Math.ceil(items.length / itemsPerPage);
                const paginationControls = document.createElement('div');
                paginationControls.className = 'pagination-controls';
                paginationControls.innerHTML = `
                    <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
                        <i class="fa-solid fa-chevron-left"></i> Previous
                    </button>
                    <span>Page ${currentPage} of ${totalPages}</span>
                    <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
                        Next <i class="fa-solid fa-chevron-right"></i>
                    </button>
                `;
                newsletterList.after(paginationControls);
            }

            // Function to change page
            window.changePage = function(newPage) {
                currentPage = newPage;
                renderNewsItems(sortedData);
            };

            // Initially render all news items
            renderNewsItems(sortedData);
        });
});