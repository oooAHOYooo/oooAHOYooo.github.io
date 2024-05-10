const cart = []; // Initialize an empty array to hold cart items

// Function to add item to cart
function addToCart(item) {
    cart.push(item);
    updateCartDisplay();
    goToCompleteOrderPage();
}

// Function to update cart display
function updateCartDisplay() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = ''; // Clear previous cart display
    cart.forEach(cartItem => {
        const cartItemDiv = document.createElement('div');
        const reservationText = cartItem.reserved ? ' - Reserved' : '';
        cartItemDiv.textContent = `${cartItem.name} - ${cartItem.price}${reservationText}`;
        cartDiv.appendChild(cartItemDiv);
    });
}
// Function to navigate to the complete order page
function goToCompleteOrderPage() {
    window.location.href = '/complete-order'; // Assuming '/complete-order' is the URL for the Complete Order page
}