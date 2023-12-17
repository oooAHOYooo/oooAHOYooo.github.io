document.addEventListener('DOMContentLoaded', function() {
  fetch('../data/market-physical.json')
    .then(response => response.json())
    .then(data => {
      const productGrid = document.getElementById('productGrid');
      const cartItems = document.getElementById('cartItems');
      const totalPrice = document.getElementById('totalPrice');
      let cart = [];

      data.physicalProducts.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <img src="${product.image}" alt="${product.title}" />
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <p>$${product.price.toFixed(2)}</p>
          <button>Add to Cart</button>
        `;
        div.querySelector('button').addEventListener('click', () => {
          cart.push(product);
          updateCart();
        });
        productGrid.appendChild(div);
      });

      function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
          const li = document.createElement('li');
          li.textContent = item.title;
          cartItems.appendChild(li);
          total += item.price;
        });
        totalPrice.textContent = 'Total: $' + total.toFixed(2);
      }
    });
});