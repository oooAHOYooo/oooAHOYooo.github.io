document.addEventListener("DOMContentLoaded", function() {
    // Fetch alumni data
    fetch('./local_data/robShowAlumni.json')
        .then(response => response.json())
        .then(alumniData => {
            const alumniGrid = document.querySelector('.alumni-grid');
            alumniData.alumni.forEach(alumni => {
                const card = document.createElement('div');
                card.className = 'alumni-card';

                const img = document.createElement('img');
                img.src = alumni.thumbnail;
                img.alt = `${alumni.name} Thumbnail`;
                img.className = 'alumni-thumbnail';

                const name = document.createElement('p');
                name.className = 'alumni-name';
                name.textContent = alumni.name.toUpperCase();

                card.appendChild(img);
                card.appendChild(name);

                alumniGrid.appendChild(card);
            });
        })
        .catch(error => console.error('Error loading alumni data:', error));
}); 