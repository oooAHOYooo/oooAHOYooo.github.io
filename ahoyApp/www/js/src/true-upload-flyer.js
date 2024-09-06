// Add this script to your existing JavaScript file or within a <script> tag in your HTML
document.getElementById('upload-venue-btn').addEventListener('click', function() {
    const venueName = document.getElementById('venue-name').value;
    const venueDescription = document.getElementById('venue-description').value;
    const dateAdded = document.getElementById('date-added').value;
    const venueUrl = document.getElementById('venue-url').value;
    const venueFlyer = document.getElementById('venue-flyer').files[0];

    if (!dateAdded || !venueFlyer) {
        alert("Please fill in the required fields: Date Added and Flyer.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(event) {
        const venueList = document.getElementById('venue-list');
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="flyer">
                <img src="${event.target.result}" alt="${venueName}" style="width: 100px; height: auto; cursor: pointer;" />
                <h3>${venueName || 'Unnamed Venue'}</h3>
                <p>${venueDescription || 'No description provided.'}</p>
                <p>Date Added: ${dateAdded}</p>
                ${venueUrl ? `<a href="${venueUrl}" target="_blank">Visit Website</a>` : ''}
                <button class="upvote-btn">Upvote (<span class="upvote-count">0</span>)</button>
                <button class="remove-btn">Remove</button>
            </div>
        `;
        venueList.appendChild(listItem);
        
        // Clear the input fields after upload
        document.getElementById('venue-name').value = '';
        document.getElementById('venue-description').value = '';
        document.getElementById('date-added').value = '';
        document.getElementById('venue-url').value = '';
        document.getElementById('venue-flyer').value = '';

        // Image click functionality to enlarge
        const flyerImage = listItem.querySelector('img');
        flyerImage.addEventListener('click', function() {
            const enlargedImage = document.createElement('img');
            enlargedImage.src = event.target.result;
            enlargedImage.style.width = '500px'; // Set desired width for enlarged image
            enlargedImage.style.height = 'auto';
            enlargedImage.style.position = 'fixed';
            enlargedImage.style.top = '50%';
            enlargedImage.style.left = '50%';
            enlargedImage.style.transform = 'translate(-50%, -50%)';
            enlargedImage.style.zIndex = '1000';
            enlargedImage.style.cursor = 'pointer';
            document.body.appendChild(enlargedImage);

            // Close enlarged image on click
            enlargedImage.addEventListener('click', function() {
                document.body.removeChild(enlargedImage);
            });
        });

        // Upvote functionality
        listItem.querySelector('.upvote-btn').addEventListener('click', function() {
            const upvoteCount = listItem.querySelector('.upvote-count');
            upvoteCount.textContent = parseInt(upvoteCount.textContent) + 1;
        });

        // Remove functionality
        listItem.querySelector('.remove-btn').addEventListener('click', function() {
            venueList.removeChild(listItem);
        });
    };
    reader.readAsDataURL(venueFlyer);
});

// Comment functionality
document.getElementById('submit-comment-btn').addEventListener('click', function() {
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value.trim();
    if (commentText) {
        const commentList = document.getElementById('comment-list');
        const commentItem = document.createElement('li');
        commentItem.textContent = commentText;

        // Create a delete button for the comment
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.marginLeft = '10px';
        deleteButton.addEventListener('click', function() {
            commentList.removeChild(commentItem);
        });

        commentItem.appendChild(deleteButton); // Append the delete button to the comment item
        commentList.appendChild(commentItem);
        commentInput.value = ''; // Clear the input after submission
    } else {
        alert("Please enter a comment.");
    }
});