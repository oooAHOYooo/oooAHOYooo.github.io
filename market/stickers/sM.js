// market/stickers/sM.js
let cart = [];
let stickers = [];

fetch('stickers.json')
    .then(response => response.json())
    .then(data => {
        stickers = data;
        const stickerList = document.getElementById('sticker-list');
        stickers.forEach(sticker => {
            const stickerDiv = document.createElement('div');
            stickerDiv.className = 'sticker';
            stickerDiv.innerHTML = `
                <img src="${sticker.image_url}" alt="${sticker.description}" onclick="openLightbox('${sticker.image_url}')">
                <button onclick="addToCart(${sticker.id})">Add to Cart</button>
            `;
            stickerList.appendChild(stickerDiv);
        });
    });

function addToCart(stickerId) {
    const sticker = stickers.find(s => s.id === stickerId);
    cart.push(sticker);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach(sticker => {
        const cartItem = document.createElement('div');
        cartItem.innerHTML = sticker.description;
        cartItems.appendChild(cartItem);
    });

    const totalPriceDiv = document.getElementById('total-price');
    const numStickers = cart.length;
    let totalPrice = 0;
    if (numStickers >= 30) {
        totalPrice = 25;
    } else if (numStickers >= 20) {
        totalPrice = 15;
    } else if (numStickers >= 10) {
        totalPrice = 10;
    }
    totalPriceDiv.textContent = `Total Price: $${totalPrice}`;

    const purchaseButton = document.getElementById('purchase-button');
    purchaseButton.disabled = numStickers < 10;
}

// Open lightbox
function openLightbox(imageUrl) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightbox.style.display = 'block';
    lightboxImg.src = imageUrl;
}

// Close lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.display = 'none';
}
