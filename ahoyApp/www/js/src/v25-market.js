document.addEventListener('DOMContentLoaded', function() {
    // Fetch the JSON data from the v25-market.json file
    fetch('data/v25-market.json')
      .then(response => response.json())
      .then(itemsForSale => {
        const marketGrid = document.getElementById('market-grid');
  
        // Create a modal for image zoom
        const modal = document.createElement('div');
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.8)';
        modal.style.zIndex = '1000';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.display = 'flex';
        document.body.appendChild(modal);

        const zoomedImage = document.createElement('img');
        modal.appendChild(zoomedImage);

        modal.addEventListener('click', function() {
            modal.style.display = 'none';
        });

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
          img.style.cursor = 'zoom-in';

          img.addEventListener('click', function() {
              zoomedImage.src = img.src;
              modal.style.display = 'flex';
          });
  
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
  });