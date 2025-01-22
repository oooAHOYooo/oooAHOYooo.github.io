function startPayment() {
    const selectedPlan = document.querySelector('input[name="plan"]:checked').value;
    window.location.href = selectedPlan === "free" ? 'thankyou.html' : 'https://square.link/u/YOUR_CHECKOUT_LINK';
}
