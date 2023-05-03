var marketplace = new Vue({
  el: '#marketplace',
  data: {
    products: [
      { id: 1, name: 'Pal-bot 2 (VHS)', price: 28, description: 'This is a short description of product 1', image: 'https://via.placeholder.com/150', checkoutLink: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144' },
      { id: 2, name: 'Product 2', price: 20, description: 'This is a short description of product 2', image: 'https://via.placeholder.com/150', checkoutLink: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144' },
      { id: 3, name: 'Ellen Jane Poetry', price: 30, description: 'This is a short description of product 3', image: 'https://via.placeholder.com/150', checkoutLink: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144' },
      { id: 4, name: 'Tallboyz Series', price: 40, description: 'This is a short description of product 4', image: 'https://via.placeholder.com/150', checkoutLink: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144' },
      { id: 5, name: 'The Tines Album', price: 32, description: 'This is a short description of product 5', image: 'https://via.placeholder.com/150', checkoutLink: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144' },
      { id: 6, name: 'Rambles and Rough Drafts', price: 22, description: 'This is a short description of product 6', image: 'https://via.placeholder.com/150', checkoutLink: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144' }
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
    },
    createCheckoutLink: function(product) {
      var self = this;
      // Call Stripe API to create checkout session and get the session ID
      // Replace YOUR_API_KEY with your actual Stripe API key
      fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: 'payment_method_types[]=card&line_items[][price_data][currency]=usd&line_items[][price_data][unit_amount]=' + product.price * 100 + '&line_items[][quantity]=1&mode=payment&success_url=http://localhost:3000/success&cancel_url=http://localhost:3000/cancel'
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(session) {
        // Update the checkoutLink of the product with the session ID
        product.checkoutLink = session.url;
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  },
  mounted: function() {
    // Call createCheckoutLink for each product to create Stripe checkout links
    for (var i = 0; i < this.products.length; i++) {
      this.createCheckoutLink(this.products[i]);
    }
  }