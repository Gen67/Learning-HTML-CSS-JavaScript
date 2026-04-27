// Coffee Menu Data
const menuItems = [
    {
        id: 1,
        name: "Espresso",
        price: 3.99,
        description: "Bold and strong single shot",
        icon: "☕"
    },
    {
        id: 2,
        name: "Cappuccino",
        price: 4.99,
        description: "Espresso with steamed milk",
        icon: "🥛"
    },
    {
        id: 3,
        name: "Latte",
        price: 4.99,
        description: "Smooth and creamy",
        icon: "🍶"
    },
    {
        id: 4,
        name: "Americano",
        price: 3.99,
        description: "Espresso with hot water",
        icon: "💧"
    },
    {
        id: 5,
        name: "Macchiato",
        price: 4.49,
        description: "Espresso marked with milk",
        icon: "⚪"
    },
    {
        id: 6,
        name: "Mocha",
        price: 5.49,
        description: "Espresso, chocolate & milk",
        icon: "🍫"
    },
    {
        id: 7,
        name: "Flat White",
        price: 5.49,
        description: "Espresso with velvety milk",
        icon: "☁️"
    },
    {
        id: 8,
        name: "Cold Brew",
        price: 4.49,
        description: "Smooth and refreshing",
        icon: "🧊"
    },
    {
        id: 9,
        name: "Cortado",
        price: 4.49,
        description: "Equal espresso and milk",
        icon: "🎯"
    },
    {
        id: 10,
        name: "Iced Latte",
        price: 4.99,
        description: "Chilled and delicious",
        icon: "❄️"
    },
    {
        id: 11,
        name: "Caramel Macchiato",
        price: 5.99,
        description: "Sweet caramel delight",
        icon: "🍮"
    },
    {
        id: 12,
        name: "Vanilla Latte",
        price: 5.49,
        description: "Smooth vanilla flavor",
        icon: "🌸"
    }
];

// Shopping Cart
let cart = [];

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('coffeeCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('coffeeCart', JSON.stringify(cart));
}

// Initialize Menu
function initializeMenu() {
    const menuGrid = document.getElementById('menuGrid');
    menuGrid.innerHTML = '';

    menuItems.forEach(item => {
        const menuCard = document.createElement('div');
        menuCard.className = 'menu-card';
        menuCard.innerHTML = `
            <div class="menu-card-icon">${item.icon}</div>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="menu-card-footer">
                <span class="price">$${item.price.toFixed(2)}</span>
                <button onclick="addToCart(${item.id})" class="add-btn">Add</button>
            </div>
        `;
        menuGrid.appendChild(menuCard);
    });
}

// Add Item to Cart
function addToCart(itemId) {
    const item = menuItems.find(m => m.id === itemId);
    const existingItem = cart.find(c => c.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            icon: item.icon,
            quantity: 1
        });
    }

    saveCart();
    updateCartDisplay();
    showNotification(`${item.name} added to cart!`);
}

// Remove Item from Cart
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartDisplay();
}

// Update Item Quantity
function updateQuantity(itemId, quantity) {
    if (quantity <= 0) {
        removeFromCart(itemId);
    } else {
        const item = cart.find(c => c.id === itemId);
        if (item) {
            item.quantity = quantity;
            saveCart();
            updateCartDisplay();
        }
    }
}

// Update Cart Display
function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        updateCartSummary();
        return;
    }

    cartItemsDiv.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <span class="cart-item-icon">${item.icon}</span>
                <div>
                    <p class="cart-item-name">${item.name}</p>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="cart-item-controls">
                <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                <span class="quantity">${item.quantity}</span>
                <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <div class="cart-item-remove">
                <span class="subtotal">$${(item.price * item.quantity).toFixed(2)}</span>
                <button onclick="removeFromCart(${item.id})" class="remove-btn">✕</button>
            </div>
        </div>
    `).join('');

    updateCartSummary();
}

// Update Cart Summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax + 2.99;

    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;

    // Update checkout totals too
    document.getElementById('checkoutSubtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkoutTax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('checkoutTotal').textContent = `$${(total + 2.99).toFixed(2)}`;
}

// Toggle Cart Sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('open');
}

// Open Checkout Modal
function openCheckout() {
    if (cart.length === 0) {
        showNotification('Please add items to your cart first!', 'error');
        return;
    }
    
    document.getElementById('checkoutModal').classList.add('open');
    toggleCart();
}

// Close Checkout Modal
function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('open');
}

// Place Order
function placeOrder(event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;

    // Generate Order ID
    const orderId = 'ORD-' + Date.now();

    // Store order (in real app, send to backend)
    const order = {
        id: orderId,
        customerName: fullName,
        customerEmail: email,
        items: cart,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        tax: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 0.08,
        deliveryFee: 2.99,
        timestamp: new Date().toLocaleString()
    };

    // Save to localStorage (in real app, send to backend)
    let orders = JSON.parse(localStorage.getItem('coffeeOrders') || '[]');
    orders.push(order);
    localStorage.setItem('coffeeOrders', JSON.stringify(orders));

    // Clear cart
    cart = [];
    saveCart();

    // Show confirmation
    closeCheckout();
    document.getElementById('orderId').textContent = orderId;
    document.getElementById('confirmEmail').textContent = email;
    document.getElementById('confirmationModal').classList.add('open');
}

// Close Confirmation Modal
function closeConfirmation() {
    document.getElementById('confirmationModal').classList.remove('open');
    document.getElementById('checkoutForm').reset();
    updateCartDisplay();
}

// Show Notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    initializeMenu();
    updateCartDisplay();
});
