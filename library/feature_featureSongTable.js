// Fetch the JSON data
fetch('l5.json')
    .then(response => response.json())
    .then(data => {
        // Filter the songs where "featured" is true
        const featuredSongs = data.songs.filter(song => song.featured);

        // Get the table body
        const tableBody = document.getElementById('featuredSongs');

        // Loop through the featured songs and create table rows
        featuredSongs.forEach(song => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td><a href="${song.artistUrl}" target="_blank"><button class="tablePlayButton">${song.artist}</td>
                <td><button class="tablePlayButton" onclick="playSongAndAddToQueue('${song.mp3url}', '${song.id}')">${song.songTitle}</td>
            `;

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    });
 
// Function to play the song and add it to the top of the queue
function playSongAndAddToQueue(mp3url, id) {
    // Play the song
    const audioPlayer = new Audio(mp3url);
    audioPlayer.loop = false; // Ensure the audio only plays once
    audioPlayer.play();

    // Add the song to the top of the queue
    queue.unshift({mp3url, id});
}

