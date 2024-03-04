window.addEventListener('DOMContentLoaded', (event) => {
    fetch('./data/newsletter.json')
        .then(response => response.json())
        .then(data => {
            const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
            const newsletterList = document.getElementById('newsletter-list');

            // Ensure newsletter lightbox elements are created only once
            let lightboxBackground = document.getElementById('newsletter-lightbox-background');
            if (!lightboxBackground) {
                lightboxBackground = document.createElement('div');
                lightboxBackground.id = 'newsletter-lightbox-background';
                const lightboxImg = document.createElement('img');
                lightboxImg.className = 'lightbox-img';
                lightboxBackground.appendChild(lightboxImg);
                document.body.appendChild(lightboxBackground);

                // Function to open the newsletter lightbox
                const openLightbox = (src) => {
                    lightboxImg.src = src;
                    lightboxBackground.style.display = 'flex';
                };

                // Function to close the newsletter lightbox
                const closeLightbox = () => {
                    lightboxBackground.style.display = 'none';
                };

                // Close lightbox when clicking outside the image
                lightboxBackground.addEventListener('click', (e) => {
                    if (e.target !== lightboxImg) {
                        closeLightbox();
                    }
                });

                sortedData.forEach((newsletter, index) => {
                    const div = document.createElement('div');
                    div.className = 'newsletter-item';
                    div.style.textAlign = 'center';

                    if (index > 0) {
                        const divider = document.createElement('hr');
                        divider.className = 'newsletter-divider';
                        newsletterList.appendChild(divider);
                    }

                    let htmlContent = `
                        <p class="newsletter-date">${newsletter.date}</p>
                        <h2>${newsletter.title}</h2>
                    `;
                    if (newsletter.imageUrl) {
                        htmlContent += `
                            <div style="text-align: center;">
                                <img src="${newsletter.imageUrl}" alt="${newsletter.title}" class="newsletter-image" style="max-width: 100%; height: auto;" onclick="openLightbox('${newsletter.imageUrl}')">
                            </div>
                        `;
                    }
                    if (newsletter.songLink && newsletter.songLink.playButton) {
                        htmlContent += `
                            <div style="text-align: center; margin-top: 20px;">
                                <button onclick="playSong('${newsletter.songLink.mp3url}', '${newsletter.title}', 'S.G. Carlson')" class="play-button">Play</button>
                            </div>
                        `;
                    }
                    htmlContent += `<p>${newsletter.content}</p>`;
                    div.innerHTML = htmlContent;
                    newsletterList.appendChild(div);
                });

                // Global audio player
                let globalAudio = new Audio();

                // Function to play the song and update the song display
                window.playSong = (src, songTitle, artistName) => {
                    if (globalAudio.src !== src) {
                        globalAudio.src = src; // Change the song if a different one is clicked
                    }
                    if (globalAudio.paused) {
                        globalAudio.play();
                        updateSongDisplay(songTitle, artistName, true);
                    } else {
                        globalAudio.pause();
                        updateSongDisplay(songTitle, artistName, false);
                    }
                };

                // Function to update the song display and play/pause icon
                function updateSongDisplay(songTitle, artistName, isPlaying) {
                    const songInfoDiv = document.getElementById('song-info');
                // Function to play the song
                window.playSong = (src) => {
                    const audio = new Audio(src);
                    audio.play();
                };
            }
        });
});