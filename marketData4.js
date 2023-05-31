var ahoyMarketplace = new Vue({
    el: '#marketplace-ahoy-app',
    data: {
      products: [
        {
          id: 1,
          name: 'Classic B&W Ahoy Stickers',
          description: 'Discover the balanced simplicity of our symmetrical stickers, crafted with durable vinyl for protection against wear. Add a touch of classic style to your laptop, water bottle, or any surface with our pack of five.          ',
          price: 10.99,
          image: './images/Ahoy-Indie-Media-DEFAULT-COVER-A-8.jpg',
          stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144',
          digital: false // Physical product
        },
        {
          id: 2,
          name: 'Live from the Garage',
          description: 'Compilation Recordings from the Ahoy Garage Featuring Samuel Dyaln Witch - 14 songs total',
          price: 5.5,
          image: './images/productImages/product_sk_1.png',
          stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144',
          digital: true // Digital product
        },
        {
          id: 3,
          name: 'The Original Ahoy Sticker',
          description: 'Perfectly equal on all sides. Thick, durable vinyl protects the stickers from scratching, rain & sunlight. Adorn your favorite laptop, water bottle, and/or bathroom stall. 5 Total per pack.',
          price: 5,
          image: './images/productImages/product_sk_2.png',
          stripeBuyUrl: 'https://buy.stripe.com/5kA5obd9xflCeJ28ww',
          digital: false // physical product
        },
        {
          id: 4,
          name: 'Rob Meglio Cameo',
          description: 'Request a personalized video message from Rob Meglio himself. Connect with your favorite personality and receive a personalized message that will leave a lasting impression, making every request an extraordinary and memorable occasion. ',
          price: 132.99,
          image: './images/Ahoy-Indie-Media-DEFAULT-COVER-A-8.jpg',
          stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144',
          digital: true // Physical product
        },
        {
            id: 5,
            name: 'Pal-bot 2 - NFT #1',
            description: 'Request a personalized video message from Rob Meglio himself. Connect with your favorite personality and receive a personalized message that will leave a lasting impression, making every request an extraordinary and memorable occasion. ',
            price: 132.99,
            image: './images/productImages/nfts/PAL BOT 2 - NFT.png',
            stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144',
            digital: true // Physical product
          },
          {
            id: 6,
            name: 'Pal-bot 2 - NFT #2',
            description: 'Request a personalized video message from Rob Meglio himself. Connect with your favorite personality and receive a personalized message that will leave a lasting impression, making every request an extraordinary and memorable occasion. ',
            price: 132.99,
            image: './images/productImages/nfts/PAL BOT 2 - NFT (2).png',
            stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144',
            digital: true // Physical product
          },
          {
            id: 7,
            name: 'Pal-bot 2 - NFT #3',
            description: 'Request a personalized video message from Rob Meglio himself. Connect with your favorite personality and receive a personalized message that will leave a lasting impression, making every request an extraordinary and memorable occasion. ',
            price: 132.99,
            image: './images/productImages/nfts/PAL BOT 2 - NFT (3).png',
            stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144',
            digital: true // Physical product
          },
          {
            id: 8,
            name: 'Pal-bot 2 - NFT #4',
            description: 'Request a personalized video message from Rob Meglio himself. Connect with your favorite personality and receive a personalized message that will leave a lasting impression, making every request an extraordinary and memorable occasion. ',
            price: 132.99,
            image: './images/productImages/nfts/PAL BOT 2 - NFT (4).png',
            stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144',
            digital: true // Physical product
          },
          {
            id: 9,
            name: 'Pal-bot 2 - NFT #5',
            description: 'Request a personalized video message from Rob Meglio himself. Connect with your favorite personality and receive a personalized message that will leave a lasting impression, making every request an extraordinary and memorable occasion. ',
            price: 132.99,
            image: './images/productImages/nfts/PAL BOT 2 - NFT (5).png',
            stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144',
            digital: true // Physical product
          },
     
        // Other product data here
      ],
      showPhysicalProducts: true, // Show physical products by default
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
  
