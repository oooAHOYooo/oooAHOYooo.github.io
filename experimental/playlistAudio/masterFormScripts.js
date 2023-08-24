document.getElementById("songForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the form values
    var songName = document.getElementById("songName").value;
    var artist = document.getElementById("artist").value;
    var thumbnail = document.getElementById("thumbnail").value;
    var url = document.getElementById("url").value;
    var buyLink = document.getElementById("buyLink").value;

    // Create a new song object
    var newSong = {
        "id": null, // You can generate a unique ID here if needed
        "name": songName,
        "artist": artist,
        "thumbnail": thumbnail,
        "url": url,
        "buyLink": buyLink
    };

    // Fetch the existing JSON file
    fetch("oooAHOYooo.github.io/experimental/playlistAudio/masterMusic.json")
        .then(response => response.json())
        .then(data => {
            // Add the new song to the existing songs array
            data.songs.push(newSong);

            // Save the updated JSON file
            fetch("oooAHOYooo.github.io/experimental/playlistAudio/masterMusic.json", {
                method: "PUT", // Use the appropriate HTTP method here (e.g., PUT, POST)
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            .then(response => {
                if (response.ok) {
                    alert("Song added successfully!");
                    // You can perform any additional actions here after the song is added
                } else {
                    alert("Failed to add song.");
                }
            })
            .catch(error => {
                alert("An error occurred while adding the song.");
                console.error(error);
            });
        })
        .catch(error => {
            alert("An error occurred while fetching the JSON file.");
            console.error(error);
        });
});