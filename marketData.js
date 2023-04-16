var marketplace = new Vue({
    el: '#marketplace',
    data: {
      products: [
        { id: 1, name: 'Pal-bot 2 (VHS)', price: 10, description: 'This is a short description of product 1', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product 2', price: 20, description: 'This is a short description of product 2', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Product 3', price: 30, description: 'This is a short description of product 3', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Product 4', price: 40, description: 'This is a short description of product 4', image: 'https://via.placeholder.com/150' }
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
  