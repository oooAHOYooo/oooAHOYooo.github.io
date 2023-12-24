function loadCommits() {
    fetch('https://api.github.com/repos/oooAHOYooo/oooAHOYooo.github.io/commits?per_page=50')
        .then(response => response.json())
        .then(commits => {
            const commitsList = document.getElementById('commits-list');
            commitsList.innerHTML = ''; // Clear the list

            commits.forEach(commit => {
                const commitItem = document.createElement('div');
                commitItem.className = 'commit-item';

                const date = new Date(commit.commit.author.date);
                const formattedDate = `${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} - ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;

                commitItem.innerHTML = `
                <h3>${commit.commit.message}</h3>
                <p>Time: ${formattedDate}</p>
        
                `;

                commitsList.appendChild(commitItem);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Load commits when the page loads
window.onload = loadCommits;

document.addEventListener('DOMContentLoaded', function () {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTrigger = document.getElementById('lightbox-trigger');
  
    lightboxTrigger.addEventListener('click', function () {
      lightboxImage.src = this.src;
      lightbox.style.display = 'block';
    });
  
    lightbox.addEventListener('click', function () {
      lightbox.style.display = 'none';
    });
  });