const applicationId = "sq0idp-rDX3FJe7HS01_cFqFpM9xw";
const locationId = "LTGWZKEYKEXFC";

async function startPayment(plan) {
    const payments = window.Square.payments(applicationId, locationId);
    const card = await payments.card();
    await card.attach('#card-container');

    document.getElementById('pay-button').addEventListener('click', async () => {
        try {
            const result = await card.tokenize();
            if (result.status === 'OK') {
                alert('Payment successful!');
                document.querySelector('[x-data]').__x.$data.step = 4;
            } else {
                alert('Payment failed. Please try again.');
            }
        } catch (error) {
            console.error("Error processing payment:", error);
        }
    });
}
