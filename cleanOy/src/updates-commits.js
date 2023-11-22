function loadCommits() {
    fetch('https://api.github.com/repos/oooAHOYooo/oooAHOYooo.github.io/commits')
        .then(response => response.json())
        .then(commits => {
            const commitsList = document.getElementById('commits-list');
            commitsList.innerHTML = ''; // Clear the list

            commits.forEach(commit => {
                const commitItem = document.createElement('div');
                commitItem.className = 'commit-item';

                const date = new Date(commit.commit.author.date);
                const formattedDate = `${date.getHours()}:${date.getMinutes()}`;

                commitItem.innerHTML = `
                <h3>${commit.commit.message}</h3>
                <p>Author: ${commit.commit.author.name}</p>
                <p>Time: ${formattedDate}</p>
                <p>Description: ${commit.commit.message}</p>
                `;

                commitsList.appendChild(commitItem);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Load commits when the page loads
window.onload = loadCommits;