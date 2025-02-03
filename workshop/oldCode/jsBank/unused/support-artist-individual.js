document.addEventListener('DOMContentLoaded', function() {
    // Assuming Stripe.js has been included in your HTML <head>
    const stripe = Stripe('your_stripe_publishable_key'); // Replace with your actual publishable key

    function loadArtistData() {
        fetch('./data/artistCollection.json')
            .then(response => response.json())
            .then(data => {
                const tableBody = document.getElementById('artists-table').querySelector('tbody');
                data.artists.forEach(artist => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td><a href="${artist.artistUrl}" target="_blank">${artist.name}</a></td>
                        <td>${artist.location}</td>
                        <td>
                            <button class="support-button" data-artist-id="${artist.id}">Support</button> | 
                            <a href="${artist.shareLink}" target="_blank">Share</a> | 
                            <a href="${artist.messageLink}" target="_blank">Message</a>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });

                document.querySelectorAll('.support-button').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const artistId = e.target.getAttribute('data-artist-id');
                        // Simulate fetching a Stripe session ID from a server or Supabase Function
                        // In a real application, you would fetch this from your server
                        const fakeSessionId = 'your_fake_stripe_session_id'; // This is just a placeholder
                        
                        // Redirect to Stripe Checkout using the fake session ID
                        // In a real application, this ID should be obtained from your server after creating a checkout session
                        stripe.redirectToCheckout({ sessionId: fakeSessionId })
                            .then(function (result) {
                                if (result.error) {
                                    alert(result.error.message);
                                }
                            });
                    });
                });
            })
            .catch(error => console.error('Error loading artist data:', error));
    }

    loadArtistData();
});