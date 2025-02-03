  document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('./data/mediaCollection.json');
    const mediaCollection = await response.json();
    
    // Assuming the first media item is the current media
    const currentMedia = mediaCollection[0];

    // Initialize JWPlayer
    jwplayer("jwplayer-container").setup({
      file: currentMedia.mp4_link,
      image: currentMedia.thumbnail_link,
      title: currentMedia.display_title,
      description: currentMedia.artist,
      width: "100%",
      aspectratio: "16:9"
    });

    // Update the HTML with the current media details
    document.getElementById('current-title-text').textContent = currentMedia.display_title;
    document.getElementById('current-description-text').textContent = currentMedia.artist;
  });