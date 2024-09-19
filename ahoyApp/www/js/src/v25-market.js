document.addEventListener('DOMContentLoaded', function() {
    const marketGrid = document.getElementById('market-grid');
    marketGrid.classList.add('market-grid'); // Add CSS class for grid container
    const cart = []; // Initialize an empty array to hold cart items

    // Function to update cart display
    function updateCartDisplay() {
      const cartDiv = document.getElementById('cart');
      cartDiv.innerHTML = ''; // Clear previous cart display
      cart.forEach(cartItem => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.textContent = `${cartItem.name} - ${cartItem.price}`;
        cartDiv.appendChild(cartItemDiv);
      });
    }

    // Function to filter items based on category
    function filterItems(category) {
      const items = document.querySelectorAll('.grid-item');
      items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }

    // Event listener for category select
    document.getElementById('category-select').addEventListener('change', function() {
      filterItems(this.value);
    });

  

    document.body.insertBefore(purchaseButton, document.body.firstChild); // Insert at the top of the body

    // Fetch the JSON data from the v25-market.json file
    fetch('data/v25-market.json')
      .then(response => response.json())
      .then(itemsForSale => {
        // Iterate over each item in the JSON array
        itemsForSale.forEach(item => {
          // Create the main item container
          const itemDiv = document.createElement('div');
          itemDiv.className = 'grid-item market-item'; // Add CSS class for grid item
          itemDiv.dataset.category = item.category; // Add category data attribute
  
          // Add an image if available
          const img = document.createElement('img');
          img.src = item.image || 'placeholder.jpg'; // Assuming there's a 'image' field in your JSON
          img.alt = item.name;
          img.className = 'item-image';
  
          // Create a container for text content
          const contentDiv = document.createElement('div');
          contentDiv.className = 'item-content';
  
          // Item name and price
          const name = document.createElement('h3');
          name.textContent = item.name;
          const price = document.createElement('p');
          price.textContent = `Price: ${item.price}`;
  
          // Subscription requirement
          const subscription = document.createElement('p');
          subscription.textContent = `Requires Subscription: ${item.requires_subscription ? 'Yes' : 'No'}`;
  
          // Edition information
          const edition = document.createElement('p');
          edition.textContent = `Edition: ${item.edition}`;
  
          // Reserve Button
          const reserveButton = document.createElement('button');
          reserveButton.textContent = 'Join Waitlist';
          reserveButton.onclick = function() {
            alert('This item is coming soon! Your reservation is noted.');
            // Add item to cart using the addToCart function from v25-cart-manager.js
            addToCart({
              name: item.name,
              price: item.price,
              reserved: true // Additional property to indicate it's a reservation
            });
            updateCartDisplay(); // Update the cart display immediately after adding the item
          };
  
          // Append elements to the content div
          contentDiv.appendChild(name);
          contentDiv.appendChild(price);
          contentDiv.appendChild(subscription);
          contentDiv.appendChild(edition); // Append edition information
          contentDiv.appendChild(reserveButton);
  
          // Append image and content div to the main item div
          itemDiv.appendChild(img);
          itemDiv.appendChild(contentDiv);
  
          // Append the item to the grid
          marketGrid.appendChild(itemDiv);
        });
      })
      .catch(error => console.error('Failed to load items:', error));
  });


// Function to navigate to the complete order page
function goToCompleteOrderPage() {
    window.location.href = '/complete-order'; // Assuming '/complete-order' is the URL for the Complete Order page
}