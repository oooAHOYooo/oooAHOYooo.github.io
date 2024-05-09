document.addEventListener('DOMContentLoaded', function() {
    // Fetch the JSON data from the v25-market.json file
    fetch('data/v25-market.json')
      .then(response => response.json())
      .then(itemsForSale => {
        const marketGrid = document.getElementById('market-grid');
  
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
  
          // Add to Cart Button
          const addToCartButton = document.createElement('button');
          addToCartButton.textContent = 'Add to Cart';
          addToCartButton.onclick = function() {
            // Functionality to add item to cart
            console.log(`${item.name} added to cart`);
          };
  
          // Append elements to the content div
          contentDiv.appendChild(name);
          contentDiv.appendChild(price);
          contentDiv.appendChild(subscription);
          contentDiv.appendChild(addToCartButton);
  
          // Append image and content div to the main item div
          itemDiv.appendChild(img);
          itemDiv.appendChild(contentDiv);
  
          // Append the item to the grid
          marketGrid.appendChild(itemDiv);
        });
      })
      .catch(error => console.error('Failed to load items:', error));
  });