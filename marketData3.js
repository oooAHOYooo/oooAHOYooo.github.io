var ahoyMarketplace = new Vue({
    el: '#marketplace-ahoy-app',
    data: {
        products: [
            {
                id: 1,
                name: 'Ahoy Defaultz Stickers',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                price: 10.99,
                image: 'https://via.placeholder.com/300',
                stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144'
            },
            {
                id: 2,
                name: 'Ahoy Slicktz Stickers',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                price: 120.99,
                image: 'https://via.placeholder.com/300',
                stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144'
            },
            {
                id: 3,
                name: 'Ahoy ASZ',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                price: 132.99,
                image: 'https://via.placeholder.com/300',
                stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144'
            },
            {
                id: 4,
                name: 'Ahoy ASZ',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                price: 132.99,
                image: 'https://via.placeholder.com/300',
                stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144'
            },
            {
                id: 5,
                name: 'Ahoy ASZ',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                price: 132.99,
                image: 'https://via.placeholder.com/300',
                stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144'
            },
            {
                id: 6,
                name: 'Ahoy ASZ',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                price: 132.99,
                image: 'https://via.placeholder.com/300',
                stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144'
            },
            {
                id: 7,
                name: 'Ahoy ASZ',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                price: 132.99,
                image: 'https://via.placeholder.com/300',
                stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144'
            },
            {
                id: 8,
                name: 'Ahoy ASZ',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                price: 132.99,
                image: 'https://via.placeholder.com/300',
                stripeBuyUrl: 'https://buy.stripe.com/test_cN26rKb2B64jaYM144'
            }
            // other products omitted for brevity
        ]
    },
    methods: {
        buyProduct: function(productId) {
            // redirect to the product's Stripe Buy URL
            var product = this.products.find(function(product) {
                return product.id === productId;
            });
            window.location.href = product.stripeBuyUrl;
        }
    }
});
