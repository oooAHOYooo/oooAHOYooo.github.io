// Initialize Stripe.js with your publishable key
var stripe = Stripe('pk_live_51N3kXJGpN1YPCSA4r1jJ0A0RnyP5wREG17Q95CaI3ovFFTnR9TOM3IbDtA8pu155X4YNsB4MFe7k46UvOEXgwS17007xSa1efo');

// Function to handle one-time donation clicks
function handleDonationClick(amount) {
  fetch('/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ donationAmount: amount }),
  })
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok.');
    return response.json();
  })
  .then(session => {
    // Redirect to Stripe Checkout
    return stripe.redirectToCheckout({ sessionId: session.id });
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an issue processing your donation. Please try again.');
  });
}

// Function to handle custom donation amount
// Assumes you have a better UI element for input, which calls this function with the custom amount
function handleCustomDonationClick(customAmount) {
  if (customAmount) {
    handleDonationClick(customAmount);
  } else {
    alert('Please enter a valid donation amount.');
  }
}

// Function to handle monthly subscription clicks
function handleSubscriptionClick(amount) {
  fetch('/create-subscription-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ subscriptionAmount: amount }),
  })
  .then(response => {
    if (!response.ok) throw new Error('Network response was not ok.');
    return response.json();
  })
  .then(session => {
    // Redirect to Stripe Checkout
    return stripe.redirectToCheckout({ sessionId: session.id });
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an issue setting up your subscription. Please try again.');
  });
}