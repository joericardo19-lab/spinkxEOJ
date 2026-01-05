// ==================== Data Produk ==================== //
const products = [
    // Elektronik
    { id: 1, name: 'Laptop Gaming', category: 'elektronik', price: 12000000, originalPrice: 15000000, rating: 5, image: '💻' },
    { id: 2, name: 'Smartphone 5G', category: 'elektronik', price: 6500000, originalPrice: 8000000, rating: 5, image: '📱' },
    { id: 3, name: 'Headphone Wireless', category: 'elektronik', price: 1500000, originalPrice: 2000000, rating: 4.5, image: '🎧' },
    { id: 4, name: 'Smart Watch', category: 'elektronik', price: 2000000, originalPrice: 2500000, rating: 4.5, image: '⌚' },
    { id: 5, name: 'Kamera Digital', category: 'elektronik', price: 5000000, originalPrice: 6500000, rating: 5, image: '📷' },
    { id: 6, name: 'Tablet Premium', category: 'elektronik', price: 8000000, originalPrice: 10000000, rating: 4.5, image: '📱' },
    
    // Fashion
    { id: 7, name: 'Jaket Premium', category: 'fashion', price: 500000, originalPrice: 750000, rating: 5, image: '👔' },
    { id: 8, name: 'Sepatu Olahraga', category: 'fashion', price: 700000, originalPrice: 1000000, rating: 5, image: '👟' },
    { id: 9, name: 'Jeans Branded', category: 'fashion', price: 400000, originalPrice: 600000, rating: 4.5, image: '👖' },
    { id: 10, name: 'Kaos Cotton Premium', category: 'fashion', price: 150000, originalPrice: 250000, rating: 4.5, image: '👕' },
    { id: 11, name: 'Tas Tangan Kulit', category: 'fashion', price: 800000, originalPrice: 1200000, rating: 5, image: '👜' },
    { id: 12, name: 'Topi Branded', category: 'fashion', price: 200000, originalPrice: 350000, rating: 4, image: '🧢' },
    
    // Rumah & Perabotan
    { id: 13, name: 'Sofa Minimalis', category: 'rumah', price: 3000000, originalPrice: 4500000, rating: 5, image: '🛋️' },
    { id: 14, name: 'Meja Kerja', category: 'rumah', price: 1500000, originalPrice: 2000000, rating: 4.5, image: '🪑' },
    { id: 15, name: 'Kasur Spring Bed', category: 'rumah', price: 5000000, originalPrice: 7000000, rating: 5, image: '🛏️' },
    { id: 16, name: 'Lemari Pakaian', category: 'rumah', price: 2000000, originalPrice: 2800000, rating: 4.5, image: '🗄️' },
    { id: 17, name: 'Karpet Persegi', category: 'rumah', price: 800000, originalPrice: 1200000, rating: 4, image: '📐' },
    { id: 18, name: 'Lampu Gantung Modern', category: 'rumah', price: 600000, originalPrice: 900000, rating: 4.5, image: '💡' },
    
    // Olahraga
    { id: 19, name: 'Dumbel Set', category: 'olahraga', price: 700000, originalPrice: 1000000, rating: 5, image: '🏋️' },
    { id: 20, name: 'Yoga Mat Premium', category: 'olahraga', price: 300000, originalPrice: 500000, rating: 4.5, image: '🧘' },
    { id: 21, name: 'Sepeda Gunung', category: 'olahraga', price: 2500000, originalPrice: 3500000, rating: 5, image: '🚲' },
    { id: 22, name: 'Bola Basket', category: 'olahraga', price: 250000, originalPrice: 400000, rating: 4, image: '🏀' },
    { id: 23, name: 'Raket Tenis', category: 'olahraga', price: 800000, originalPrice: 1200000, rating: 4.5, image: '🎾' },
    { id: 24, name: 'Tongkat Golf Set', category: 'olahraga', price: 3000000, originalPrice: 4000000, rating: 4.5, image: '⛳' },
];

// ==================== Cart Management ==================== //
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Produk ditambahkan ke keranjang!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item && quantity > 0) {
        item.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        displayCart();
    }
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Keranjang belanja Anda kosong</p>';
        cartSummary.style.display = 'none';
        return;
    }
    
    let cartHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="remove-btn" onclick="removeFromCart(${item.id})">Hapus</button>
                    </div>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    
    const shipping = subtotal > 100000 ? 0 : 50000;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'Gratis' : `Rp ${shipping.toLocaleString('id-ID')}`;
    document.getElementById('total').textContent = `Rp ${total.toLocaleString('id-ID')}`;
    
    cartSummary.style.display = 'block';
}

// ==================== Products Display ==================== //
function displayProducts(productsToDisplay = products) {
    const productsGrid = document.getElementById('productsGrid');
    
    productsGrid.innerHTML = productsToDisplay.map(product => `
        <div class="product-card">
            <div class="product-image">
                ${product.image}
                ${product.price < product.originalPrice ? `<div class="product-badge">-${Math.round((1 - product.price / product.originalPrice) * 100)}%</div>` : ''}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-stars">
                    ${[...Array(5)].map((_, i) => `<i class="fas fa-star"></i>`).join('')}
                </div>
                <div class="product-price">
                    <span class="current">Rp ${product.price.toLocaleString('id-ID')}</span>
                    <span class="original">Rp ${product.originalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="addToCart(${product.id})">Beli</button>
                    <button class="view-detail" onclick="viewProductDetail(${product.id})">Detail</button>
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== Product Detail ==================== //
function viewProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    const productDetail = document.getElementById('productDetail');
    
    productDetail.innerHTML = `
        <button class="close-btn" onclick="closeProductModal()">&times;</button>
        <div class="product-detail">
            <div class="product-detail-image">${product.image}</div>
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <div class="product-detail-price">
                    <span class="current">Rp ${product.price.toLocaleString('id-ID')}</span>
                    <span class="original">Rp ${product.originalPrice.toLocaleString('id-ID')}</span>
                </div>
                <div class="product-detail-rating">
                    ${[...Array(5)].map(() => '<i class="fas fa-star"></i>').join('')}
                    <span>(${Math.floor(Math.random() * 100 + 50)} ulasan)</span>
                </div>
                <div class="product-detail-description">
                    <h3>Deskripsi Produk</h3>
                    <p>Produk berkualitas premium dengan standar internasional. Kami menjamin kepuasan pelanggan 100%. Produk original dengan harga terbaik. Pengiriman cepat ke seluruh Indonesia.</p>
                    <p><strong>Fitur:</strong></p>
                    <ul style="margin-left: 1.5rem; color: var(--text-light);">
                        <li>Kualitas terbaik</li>
                        <li>Garansi 1 tahun</li>
                        <li>Gratis pengiriman (pembelian > Rp 100.000)</li>
                        <li>Garansi uang kembali 100%</li>
                    </ul>
                </div>
                <div class="quantity-selector">
                    <label>Jumlah:</label>
                    <input type="number" id="detailQuantity" value="1" min="1">
                </div>
                <div class="product-detail-actions">
                    <button class="btn btn-primary" onclick="addToCartFromDetail(${product.id})">Tambah ke Keranjang</button>
                    <button class="btn btn-secondary" onclick="closeProductModal()">Tutup</button>
                </div>
            </div>
        </div>
    `;
    
    document.getElementById('productModal').classList.add('active');
}

function addToCartFromDetail(productId) {
    const quantity = parseInt(document.getElementById('detailQuantity').value);
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    closeProductModal();
    showNotification(`${quantity} produk ditambahkan ke keranjang!`);
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
}

// ==================== Filter & Search ==================== //
function filterProducts(category) {
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

function searchProducts(query) {
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filtered);
}

function sortProducts(sortType) {
    let sorted = [...products];
    
    switch(sortType) {
        case 'harga-terendah':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'harga-tertinggi':
            sorted.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sorted.sort((a, b) => b.rating - a.rating);
            break;
        case 'terbaru':
        default:
            sorted = products;
    }
    
    displayProducts(sorted);
}

// ==================== Notifications ==================== //
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideUp 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ==================== Navigation ==================== //
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi
    displayProducts();
    updateCartCount();
    
    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Update active nav link
    const navLink = document.querySelectorAll('.nav-link');
    navLink.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            navLink.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLink.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const closeCartBtn = document.getElementById('closeCartBtn');
    
    cartBtn.addEventListener('click', function() {
        displayCart();
        cartModal.classList.add('active');
    });
    
    closeCartBtn.addEventListener('click', function() {
        cartModal.classList.remove('active');
    });
    
    // Close modal on outside click
    cartModal.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
    
    document.getElementById('productModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeProductModal();
        }
    });
    
    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterProducts(this.dataset.filter);
        });
    });
    
    // Sort select
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', function() {
        sortProducts(this.value);
    });
    
    // Search
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        searchProducts(this.value);
    });
    
    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Terima kasih! Kami akan menghubungi Anda segera.');
            this.reset();
        });
    }
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Terima kasih telah subscribe!');
            this.reset();
        });
    }
});

// ==================== Smooth Scroll ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
