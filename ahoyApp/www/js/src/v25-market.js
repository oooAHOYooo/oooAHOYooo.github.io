document.addEventListener('DOMContentLoaded', function() {
    const marketGrid = document.getElementById('market-grid');
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

    // Sign out and purchase button
    const purchaseButton = document.createElement('button');
    purchaseButton.textContent = 'Sign out and Purchase';
    purchaseButton.style.position = 'fixed'; // Fix position at the top
    purchaseButton.style.top = '10px'; // 10px from the top
    purchaseButton.style.right = '10px'; // 10px from the right
    purchaseButton.onclick = function() {
      // Send notification email to Alex
      fetch('https://api.emailservice.com/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          to: 'alex@ahoy.ooo',
          subject: 'Purchase Order',
          body: `You have made a purchase of ${cart.length} items.`
        })
      }).then(response => {
        if (response.ok) {
          console.log('Purchase notification sent to alex@ahoy.ooo');
        } else {
          console.error('Failed to send purchase notification');
        }
      });

      // Clear cart and sign out logic here
      cart.length = 0;
      updateCartDisplay();
      console.log('User signed out and purchase completed');
    };

    document.body.insertBefore(purchaseButton, document.body.firstChild); // Insert at the top of the body

    // Fetch the JSON data from the v25-market.json file
    fetch('data/v25-market.json')
      .then(response => response.json())
      .then(itemsForSale => {
        // Iterate over each item in the JSON array
        itemsForSale.forEach(item => {
          // Create the main item container
          const itemDiv = document.createElement('div');
          itemDiv.className = 'grid-item';
  
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
  
          // Reserve Button
          const reserveButton = document.createElement('button');
          reserveButton.textContent = 'Reserve Yours Now';
          reserveButton.onclick = function() {
            alert('This item is coming soon! Your reservation is noted.');
            // Optionally, add logic to handle reservation here
          };
  
          // Append elements to the content div
          contentDiv.appendChild(name);
          contentDiv.appendChild(price);
          contentDiv.appendChild(subscription);
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