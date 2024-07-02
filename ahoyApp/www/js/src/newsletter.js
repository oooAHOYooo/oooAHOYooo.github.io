window.addEventListener('DOMContentLoaded', (event) => {
    fetch('./data/newsletter.json')
        .then(response => response.json())
        .then(data => {
            const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            const newsletterList = document.getElementById('newsletter-list');
            const groupedByMonth = {};

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
            menu.innerHTML = `<button class="btn">Select Month <i class="bx bx-chevron-down"></i></button>`;
            const dropdownContent = document.createElement('div');
            dropdownContent.className = 'dropdown-content';

            Object.keys(groupedByMonth).forEach(monthYear => {
                const menuItem = document.createElement('a');
                menuItem.href = '#';
                menuItem.textContent = monthYear;
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
                renderNewsItems(filteredItems);
            }

            // Function to render news items
            function renderNewsItems(items) {
                newsletterList.innerHTML = ''; // Clear existing items
                items.forEach((newsletter, index) => {
                    const div = document.createElement('div');
                    div.className = 'newsletter-item';
                    div.style.textAlign = 'center';

                    let htmlContent = `
                        <p class="newsletter-date">${newsletter.date}</p>
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
                            htmlContent += `
                                <div style="text-align: center;">
                                    <img src="${newsletter.imageUrl}" alt="${newsletter.title}" class="newsletter-image" style="max-width: 100%; height: auto;" onclick="openLightbox('${newsletter.imageUrl}')">
                                </div>
                            `;
                        }
                    }
                    htmlContent += `<p>${newsletter.content}</p>`;
                    div.innerHTML = htmlContent;
                    newsletterList.appendChild(div);
                });
            }

            // Initially render all news items
            renderNewsItems(sortedData);
        });
});