/* =========================
   Cart Setup & Local Storage
========================= */
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add product to cart
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(name + " added to cart!");
    renderCart();
}

// Render cart items on cart.html
function renderCart() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalPriceP = document.getElementById('total-price');
    if (!cartItemsDiv) return;

    cartItemsDiv.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <p>${item.name} - $${item.price.toFixed(2)}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsDiv.appendChild(div);
        total += item.price;
    });

    totalPriceP.innerText = `Total: $${total.toFixed(2)}`;
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
}

/* =========================
   Load Products from API
========================= */
async function loadProducts(targetId) {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();

        const productGrid = document.getElementById(targetId);
        if (!productGrid) return;

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart('${product.title}', ${product.price})">Add to Cart</button>
            `;
            productGrid.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

/* =========================
   Load Featured Products (Index Page)
========================= */
async function loadFeaturedProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products?limit=3');
        const products = await response.json();

        const productGrid = document.getElementById('featured-products');
        if (!productGrid) return;

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>$${product.price}</p>
                <button onclick="addToCart('${product.title}', ${product.price})">Add to Cart</button>
            `;
            productGrid.appendChild(card);
        });
    } catch (error) {
        console.error("Error loading featured products:", error);
    }
}

/* =========================
   Initialize on Page Load
========================= */
document.addEventListener('DOMContentLoaded', () => {
    // Cart page
    if (document.getElementById('cart-items')) {
        renderCart();
    }

    // Shop page
    if (document.getElementById('product-grid')) {
        loadProducts('product-grid');
    }

    // Index page featured products
    if (document.getElementById('featured-products')) {
        loadFeaturedProducts();
    }
});
