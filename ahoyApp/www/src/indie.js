function loadPodcasts() {
    fetch('./data/podcastCollection.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('podcast-table').querySelector('tbody');
            data.podcasts.forEach(podcast => {
                const row = document.createElement('tr');
                row.innerHTML = `
            <td><button class="control-button" onclick="playPodcast('${podcast.mp3url}')"><i class="fas fa-play"></i></button></td> 
            <td>${podcast.title}</td>
            <td>${podcast.description}</td>
        `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error:', error));
}

function playPodcast(url) {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = url;
    audioPlayer.play();
}

// Call the function to load podcasts when the page loads
window.onload = loadPodcasts;