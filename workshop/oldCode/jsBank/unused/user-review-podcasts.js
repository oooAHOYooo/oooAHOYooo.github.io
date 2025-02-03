// This script handles the podcast review submission and display
function submitPodcastReview() {
  const reviewInput = document.getElementById('podcast-review-input');
  const reviewText = reviewInput.value.trim();
  if (reviewText) {
    // Assuming a function addPodcastReview exists to handle the review addition to the database
    addPodcastReview(reviewText).then(() => {
      reviewInput.value = ''; // Clear the input after submission
      alert('Review submitted successfully!');
      // Optionally, refresh the reviews display here
    }).catch(error => {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    });
  } else {
    alert('Please write a review before submitting.');
  }
}

// Function to toggle the review input section based on user login status
function toggleReviewInputSection(isLoggedIn) {
  const reviewInputSection = document.getElementById('user-review-input-section');
  if (isLoggedIn) {
    reviewInputSection.style.display = 'block';
  } else {
    reviewInputSection.style.display = 'none';
  }
}

// Example usage: Call this function when the auth state changes
firebase.auth().onAuthStateChanged(function(user) {
  toggleReviewInputSection(!!user);
});