// ========================================
// PRODUTOS - DATABASE
// ========================================
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro",
        price: 4999.00,
        category: "smartphones",
        image: "https://via.placeholder.com/300x300/007bff/ffffff?text=iPhone+15+Pro",
        description: "Smartphone topo de linha com câmera profissional e processador A17",
        stock: 15,
        rating: 4.9
    },
    {
        id: 2,
        name: "Samsung Galaxy S24",
        price: 4499.00,
        category: "smartphones",
        image: "https://via.placeholder.com/300x300/007bff/ffffff?text=Galaxy+S24",
        description: "Flagship Android com inteligência artificial integrada",
        stock: 20,
        rating: 4.8
    },
    {
        id: 3,
        name: "MacBook Pro 16\"",
        price: 12999.00,
        category: "notebooks",
        image: "https://via.placeholder.com/300x300/808080/ffffff?text=MacBook+Pro",
        description: "Laptop profissional com chip M3 Max e tela de alta resolução",
        stock: 8,
        rating: 4.9
    },
    {
        id: 4,
        name: "Dell XPS 15",
        price: 8999.00,
        category: "notebooks",
        image: "https://via.placeholder.com/300x300/808080/ffffff?text=Dell+XPS+15",
        description: "Notebook poderoso para profissionais e criadores de conteúdo",
        stock: 12,
        rating: 4.7
    },
    {
        id: 5,
        name: "Sony WH-1000XM5",
        price: 2499.00,
        category: "fones",
        image: "https://via.placeholder.com/300x300/FFD700/000000?text=Sony+WH",
        description: "Fones de ouvido com cancelamento de ruído excepcional",
        stock: 25,
        rating: 4.8
    },
    {
        id: 6,
        name: "Apple AirPods Max",
        price: 7599.00,
        category: "fones",
        image: "https://via.placeholder.com/300x300/FFD700/000000?text=AirPods+Max",
        description: "Headphones premium com audio espacial e design icônico",
        stock: 10,
        rating: 4.6
    },
    {
        id: 7,
        name: "Apple Watch Series 9",
        price: 2999.00,
        category: "acessorios",
        image: "https://via.placeholder.com/300x300/FF69B4/ffffff?text=Apple+Watch",
        description: "Relógio inteligente com monitoramento avançado de saúde",
        stock: 18,
        rating: 4.7
    },
    {
        id: 8,
        name: "iPad Pro 12.9\"",
        price: 6999.00,
        category: "tablets",
        image: "https://via.placeholder.com/300x300/FF69B4/ffffff?text=iPad+Pro",
        description: "Tablet de alta performance com tela M2 e Pencil suporte",
        stock: 14,
        rating: 4.8
    }
];

// ========================================
// CARRINHO - GERENCIAMENTO
// ========================================
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let coupon = JSON.parse(localStorage.getItem('coupon')) || null;

// Salvar carrinho no localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

// Adicionar ao carrinho
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    showNotification(`${product.name} adicionado ao carrinho!`);
}

// Remover do carrinho
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

// Atualizar quantidade
function updateQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart();
    }
}

// Limpar carrinho
function clearCart() {
    cart = [];
    coupon = null;
    saveCart();
}

// Atualizar badge do carrinho
function updateCartBadge() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('#cartBadge').forEach(badge => {
        badge.textContent = total;
    });
}

// ========================================
// CÁLCULOS
// ========================================

// Calcular subtotal
function calculateSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Aplicar cupom
function applyCoupon(code) {
    const coupons = JSON.parse(localStorage.getItem('coupons')) || [
        { code: 'PROMO10', discount: 10 },
        { code: 'TECH20', discount: 20 },
        { code: 'SUMMER15', discount: 15 }
    ];
    
    const foundCoupon = coupons.find(c => c.code === code.toUpperCase());
    if (foundCoupon) {
        coupon = foundCoupon;
        localStorage.setItem('coupon', JSON.stringify(coupon));
        showNotification(`Cupom ${code} aplicado! Desconto de ${coupon.discount}%`);
        return true;
    } else {
        showNotification('Cupom inválido!', 'error');
        return false;
    }
}

// Calcular desconto
function calculateDiscount() {
    if (!coupon) return 0;
    return (calculateSubtotal() * coupon.discount) / 100;
}

// Calcular total
function calculateTotal(shippingCost = 0) {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return subtotal - discount + shippingCost;
}

// ========================================
// RENDERIZAÇÃO DE PRODUTOS
// ========================================

// Renderizar produtos
function renderProducts(productsToRender = products, containerId = 'productsGrid') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '';
    
    if (productsToRender.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Nenhum produto encontrado</p>';
        return;
    }

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">${product.rating}</div>
                <p class="product-price">R$ ${product.price.toFixed(2)}</p>
                <p class="product-stock">${product.stock > 0 ? `${product.stock} em estoque` : 'Fora de estoque'}</p>
                <div class="product-actions">
                    <button class="btn btn-primary" onclick="openProductModal(${product.id})">Ver Detalhes</button>
                    <button class="btn btn-secondary" onclick="addToCart(${product.id})">Adicionar</button>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Renderizar produtos em destaque
function renderFeaturedProducts() {
    const featured = products.slice(0, 4);
    renderProducts(featured, 'featuredProducts');
}

// ========================================
// MODAL DE PRODUTO
// ========================================

let currentModalProduct = null;

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentModalProduct = product;
    document.getElementById('modalProductImage').src = product.image;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductDescription').textContent = product.description;
    document.getElementById('modalProductPrice').textContent = product.price.toFixed(2);
    document.getElementById('modalProductRating').textContent = product.rating;
    document.getElementById('quantityInput').value = 1;

    document.getElementById('productModal').classList.add('show');
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('show');
}

// ========================================
// FILTROS
// ========================================

function applyFilters() {
    const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    const priceRange = document.getElementById('priceFilter')?.value || '';

    let filtered = products.filter(product => {
        // Filtro de busca
        if (search && !product.name.toLowerCase().includes(search)) {
            return false;
        }

        // Filtro de categoria
        if (category && product.category !== category) {
            return false;
        }

        // Filtro de preço
        if (priceRange) {
            if (priceRange === '0-500' && product.price > 500) return false;
            if (priceRange === '500-1000' && (product.price < 500 || product.price > 1000)) return false;
            if (priceRange === '1000-3000' && (product.price < 1000 || product.price > 3000)) return false;
            if (priceRange === '3000' && product.price < 3000) return false;
        }

        return true;
    });

    renderProducts(filtered, 'productsGrid');
}

// ========================================
// RENDERIZAR CARRINHO
// ========================================

function renderCart() {
    const tableBody = document.getElementById('cartTableBody');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');

    if (!tableBody) return;

    if (cart.length === 0) {
        emptyCart.style.display = 'block';
        cartContent.style.display = 'none';
        return;
    }

    emptyCart.style.display = 'none';
    cartContent.style.display = 'grid';

    tableBody.innerHTML = '';
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; border-radius: 5px;">
                ${item.name}
            </td>
            <td>R$ ${item.price.toFixed(2)}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" 
                    onchange="updateQuantity(${item.id}, this.value)">
            </td>
            <td>R$ ${(item.price * item.quantity).toFixed(2)}</td>
            <td>
                <button class="btn btn-secondary" onclick="removeFromCart(${item.id})">Remover</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    updateCartSummary();
}

function updateCartSummary() {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    const shipping = document.querySelector('input[name="shipping"]:checked')?.value === 'normal' ? 20 : 
                    document.querySelector('input[name="shipping"]:checked')?.value === 'express' ? 50 : 100;
    const total = subtotal - discount + shipping;

    document.getElementById('subtotal').textContent = `R$ ${subtotal.toFixed(2)}`;
    document.getElementById('discount').textContent = `R$ ${discount.toFixed(2)}`;
    document.getElementById('shipping').textContent = `R$ ${shipping.toFixed(2)}`;
    document.getElementById('total').textContent = `R$ ${total.toFixed(2)}`;
}

// ========================================
// NOTIFICAÇÕES
// ========================================

function showNotification(message, type = 'success') {
    // Remove notificação anterior se existir
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Atualizar badge do carrinho
    updateCartBadge();

    // Página inicial
    if (document.getElementById('featuredProducts')) {
        renderFeaturedProducts();
    }

    // Página de produtos
    if (document.getElementById('productsGrid') && !document.getElementById('cartTableBody')) {
        renderProducts();
    }

    // Página de carrinho
    if (document.getElementById('cartTableBody')) {
        renderCart();
    }

    // Modal de produto
    const modal = document.getElementById('productModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeProductModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeProductModal();
            }
        });
    }

    // Adicionar ao carrinho a partir do modal
    const addToCartBtn = document.getElementById('addToCartBtn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const quantity = parseInt(document.getElementById('quantityInput').value);
            addToCart(currentModalProduct.id, quantity);
            closeProductModal();
        });
    }

    // Botões de quantidade no modal
    const decreaseQty = document.getElementById('decreaseQty');
    const increaseQty = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantityInput');

    if (decreaseQty) {
        decreaseQty.addEventListener('click', function() {
            quantityInput.value = Math.max(1, parseInt(quantityInput.value) - 1);
        });
    }

    if (increaseQty) {
        increaseQty.addEventListener('click', function() {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });
    }

    // Filtros
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const clearFiltersBtn = document.getElementById('clearFilters');

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
    if (priceFilter) {
        priceFilter.addEventListener('change', applyFilters);
    }
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            if (searchInput) searchInput.value = '';
            if (categoryFilter) categoryFilter.value = '';
            if (priceFilter) priceFilter.value = '';
            renderProducts();
        });
    }

    // Cupom
    const applyCouponBtn = document.getElementById('applyCouponBtn');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', function() {
            const couponInput = document.getElementById('couponInput');
            if (couponInput.value) {
                applyCoupon(couponInput.value);
                couponInput.value = '';
                renderCart();
            }
        });
    }

    // Newsletter
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Inscrição realizada com sucesso!');
            newsletterForm.reset();
        });
    }

    // Contato
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Mensagem enviada com sucesso!');
            contactForm.reset();
        });
    }
});
