var marketplace = new Vue({
    el: '#marketplace',
    data: {
      products: [
        { id: 1, name: 'Pal-bot 2 (VHS)', price: 28, description: 'This is a short description of product 1', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', price: 20, description: 'This is a short description of product 2', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Pal-bot 2 Sticker Series', price: 30, description: 'This is a short description of product 3', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Tallboyz Series', price: 40, description: 'This is a short description of product 4', image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'The Tines Album', price: 32, description: 'This is a short description of product 5', image: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Rambles and Rough Drafts', price: 22, description: 'This is a short description of product 5', image: 'https://via.placeholder.com/150' }
      ],
      cartItems: [],
    },
    computed: {
      cartTotal: function() {
        var total = 0;
        for (var i = 0; i < this.cartItems.length; i++) {
          total += this.cartItems[i].price;
        }
        return total;
      }
    },
    methods: {
      addToCart: function(product) {
        var item = {
          id: product.id,
          name: product.name,
          price: product.price
        };
        this.cartItems.push(item);
      }
    }
  });
  
