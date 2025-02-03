document.getElementById('donation-amount-slider').oninput = function() {
    const amount = this.value;
    document.getElementById('donation-amount').textContent = amount;
    // Trigger fireworks when the slider is used
    triggerFireworks();
};

document.getElementById('donate-button').onclick = function() {
    const amount = document.getElementById('donation-amount').textContent;
    console.log(`Donating $${amount} via Stripe`);
    processStripePayment(amount);
    // Grant automatic membership and shoutouts after donation
    grantMembershipAndShoutouts(amount);
};

function processStripePayment(amount) {
    // Replace this with your actual Stripe payment processing code
    alert(`Thank you for your donation of $${amount}!`);
    const totalDonationElement = document.getElementById('total-donation');
    const currentTotal = parseInt(totalDonationElement.textContent.replace('Total Donation: $', ''));
    totalDonationElement.textContent = `Total Donation: $${currentTotal + parseInt(amount)}`;
    // Assume donation is successful for this example
    onDonationSuccess(amount);
}

function onDonationSuccess(amount) {
    // Example function to handle post-donation success actions
    triggerFireworks();
    grantMembershipAndShoutouts(amount);
}

function triggerFireworks() {
    // This is a placeholder for triggering fireworks on the page.
    // You can use a library like fireworks-js (https://crashmax-dev.github.io/fireworks-js/)
    // Include the library in your HTML and initialize fireworks here.
    console.log('Fireworks triggered!');
}

function grantMembershipAndShoutouts(amount) {
    // Placeholder function for granting membership and shoutouts
    console.log(`Membership granted for donation of $${amount}`);
    // Implement your logic for granting membership here

    // Example shoutout from Rob
    if (amount >= 50) { // Set a threshold for shoutout eligibility
        console.log("Rob says: 'Thank you for your generous donation!'");
        // Implement your shoutout feature here
    }
}