var ahoyMarketplace = new Vue({
    el: '#marketplace-ahoy-app',
    data: {
      products: [
        {
            id: 1,
            name: 'Ahoy Defaultz Stickers',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            price: 10.99,
            image: './images/Ahoy-Indie-Media-DEFAULT-COVER-A-8.jpg',
            stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144',
            digital: false // Physical product
          },
          {
            id: 2,
            name: 'Live from the44 Garage',
            description: 'Compilation Recordings from the Ahoy Garage Featuring Samuel Dyaln Witch',
            price: 5,
            image: './images/productImages/product_sk_1.png',
            stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144',
            digital: true // Digital product
          }
      ],
      showPhysicalProducts: false, // Show physical products by default
      showDigitalProducts: true // Show digital products by default
    },
    computed: {
      filteredProducts: function() {
        return this.products.filter((product) => {
          if (this.showPhysicalProducts && this.showDigitalProducts) {
            return true; // Show all products if both filters are enabled
          } else if (this.showPhysicalProducts) {
            return !product.digital; // Show physical products only
          } else if (this.showDigitalProducts) {
            return product.digital; // Show digital products only
          } else {
            return false; // Hide all products if both filters are disabled
          }
        });
      }
    },
    methods: {
      buyProduct: function(productId) {
        // Redirect to the product's Stripe Buy URL
        var product = this.products.find(function(product) {
          return product.id === productId;
        });
        window.location.href = product.stripeBuyUrl;
      }
    }
  });
  