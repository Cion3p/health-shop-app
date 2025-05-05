$(document).ready(function() {
    // Initialize empty arrays for favorites and cart
    let favorites = [];
    let cartItems = [];

    // Coffee card click handler
    $('.coffee-card').click(function() {
        const productId = $(this).data('id');
        $('.screen').removeClass('active');
        $('.detail-screen').addClass('active');
        
        // Update detail screen content based on product ID
        if (productId === 1) {
            $('.detail-image').attr('src', 'https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg');
            $('.detail-info h2').text('Vitamin C Complex');
            $('.detail-info .price h3').text('$24.99');
            $('.detail-info .description').text('High-quality Vitamin C supplement with added bioflavonoids for enhanced absorption. Supports immune system and overall health.');
        } else if (productId === 2) {
            $('.detail-image').attr('src', 'https://images.pexels.com/photos/4397835/pexels-photo-4397835.jpeg');
            $('.detail-info h2').text('Omega 3 Fish Oil');
            $('.detail-info .price h3').text('$19.99');
            $('.detail-info .description').text('Premium fish oil supplement rich in EPA and DHA. Supports heart, brain, and joint health.');
        }
    });

    // Back button handler
    $('.btn-back').click(function() {
        $('.screen').removeClass('active');
        $('.home-screen').addClass('active');
    });

    // Category buttons
    $('.category-btn').click(function() {
        $('.category-btn').removeClass('active');
        $(this).addClass('active');
    });

    // Size selection
    $('.size-btn').click(function() {
        $('.size-btn').removeClass('active');
        $(this).addClass('active');
    });

    // Favorite button toggle
    $('.btn-favorite').click(function() {
        const icon = $(this).find('i');
        const productName = $('.detail-info h2').text();
        const productPrice = $('.detail-info .price h3').text();
        const productImage = $('.detail-image').attr('src');

        if (icon.hasClass('far')) {
            icon.removeClass('far').addClass('fas');
            // Add to favorites
            favorites.push({ name: productName, price: productPrice, image: productImage });
            updateFavorites();
        } else {
            icon.removeClass('fas').addClass('far');
            // Remove from favorites
            favorites = favorites.filter(item => item.name !== productName);
            updateFavorites();
        }
    });

    // Add to Cart button
    $('.btn-primary').click(function() {
        if ($(this).text() === 'Add to Cart') {
            const productName = $('.detail-info h2').text();
            const productPrice = $('.detail-info .price h3').text();
            const productImage = $('.detail-image').attr('src');
            const size = $('.size-btn.active').text();
            
            cartItems.push({
                name: productName,
                price: productPrice,
                image: productImage,
                size: size,
                quantity: 1
            });
            
            updateCart();
            alert('Product added to cart!');
        }
    });

    // Bottom navigation
    $('.bottom-nav .nav-btn').click(function() {
        const $this = $(this);
        const targetScreen = $this.data('screen');
        
        // Update active state
        $('.bottom-nav .nav-btn').removeClass('active');
        $this.addClass('active');
        
        // Show appropriate screen
        $('.screen').removeClass('active');
        $('.' + targetScreen + '-screen').addClass('active');
        
        // Update content if needed
        if (targetScreen === 'favorites') {
            updateFavorites();
        } else if (targetScreen === 'cart') {
            updateCart();
        }
    });

    // Function to update favorites screen
    function updateFavorites() {
        const $favoritesList = $('.favorites-list');
        $favoritesList.empty();
        
        if (favorites.length === 0) {
            $favoritesList.append('<p class="empty-message">No favorites yet</p>');
        } else {
            favorites.forEach(item => {
                $favoritesList.append(`
                    <div class="favorite-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-info">
                            <h3>${item.name}</h3>
                            <p>${item.price}</p>
                        </div>
                    </div>
                `);
            });
        }
    }

    // Function to update cart screen
    function updateCart() {
        const $cartItems = $('.cart-items');
        $cartItems.empty();
        
        if (cartItems.length === 0) {
            $cartItems.append('<p class="empty-message">Your cart is empty</p>');
            $('.cart-total .amount').text('$0.00');
        } else {
            let total = 0;
            cartItems.forEach(item => {
                const price = parseFloat(item.price.replace('$', ''));
                total += price * item.quantity;
                
                $cartItems.append(`
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="item-info">
                            <h3>${item.name}</h3>
                            <p>${item.price} x ${item.quantity}</p>
                            <p>Size: ${item.size}</p>
                        </div>
                    </div>
                `);
            });
            
            $('.cart-total .amount').text('$' + total.toFixed(2));
        }
    }

    // Search functionality
    $('.search-container input').on('input', function() {
        const searchText = $(this).val().toLowerCase();
        $('.coffee-card').each(function() {
            const productName = $(this).find('h3').text().toLowerCase();
            if (productName.includes(searchText)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // Checkout button
    $('.checkout-btn').click(function() {
        if (cartItems.length > 0) {
            alert('Proceeding to checkout...');
            // Here you would typically redirect to a checkout page
        } else {
            alert('Please add items to your cart first');
        }
    });

    // Profile menu items
    $('.menu-item').click(function() {
        const action = $(this).text().trim();
        alert('Navigating to: ' + action);
        // Here you would typically handle each menu item action
    });
});
