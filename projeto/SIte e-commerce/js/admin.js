// ========================================
// ADMIN.JS - Scripts Adicionais para Admin
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar página admin
    initializeAdmin();
});

function initializeAdmin() {
    setupAdminTabs();
    loadAdminData();
}

function setupAdminTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const adminSections = document.querySelectorAll('.admin-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Remove active class from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            adminSections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked button and corresponding section
            this.classList.add('active');
            const targetSection = document.getElementById(tabName);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

function loadAdminData() {
    updateDashboardStats();
    loadProductsIntoTable();
    loadOrdersIntoTable();
    loadSettings();
    loadCoupons();
}

function updateDashboardStats() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    let totalSales = 0;
    const customers = new Set();

    orders.forEach(order => {
        totalSales += order.total;
        customers.add(order.customerEmail);
    });

    const totalSalesEl = document.getElementById('totalSales');
    const totalOrdersEl = document.getElementById('totalOrders');
    const totalProductsEl = document.getElementById('totalProducts');
    const totalCustomersEl = document.getElementById('totalCustomers');

    if (totalSalesEl) totalSalesEl.textContent = `R$ ${totalSales.toFixed(2)}`;
    if (totalOrdersEl) totalOrdersEl.textContent = orders.length;
    if (totalProductsEl) totalProductsEl.textContent = products.length;
    if (totalCustomersEl) totalCustomersEl.textContent = customers.size;
}

function loadProductsIntoTable() {
    const tableBody = document.getElementById('productsTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${product.name}</strong></td>
            <td>${product.category}</td>
            <td>R$ ${product.price.toFixed(2)}</td>
            <td>
                <span style="background-color: ${product.stock > 10 ? '#d4edda' : '#fff3cd'}; 
                             color: ${product.stock > 10 ? '#155724' : '#856404'};
                             padding: 0.25rem 0.5rem; border-radius: 3px;">
                    ${product.stock}
                </span>
            </td>
            <td>
                <button class="btn btn-secondary" onclick="editProductAdmin(${product.id})" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Editar</button>
                <button class="btn btn-danger" onclick="deleteProductAdmin(${product.id})" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Excluir</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function loadOrdersIntoTable() {
    const tableBody = document.getElementById('ordersTableBody');
    if (!tableBody) return;

    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    tableBody.innerHTML = '';

    orders.forEach(order => {
        const row = document.createElement('tr');
        const date = new Date(order.timestamp).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        
        row.innerHTML = `
            <td><strong>${order.orderNumber}</strong></td>
            <td>${order.customerName}</td>
            <td>R$ ${order.total.toFixed(2)}</td>
            <td>
                <span style="background-color: #d4edda; color: #155724; padding: 0.25rem 0.5rem; border-radius: 3px;">
                    ✓ Confirmado
                </span>
            </td>
            <td>${date}</td>
            <td>
                <button class="btn btn-secondary" onclick="viewOrderDetails('${order.orderNumber}')" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">Ver</button>
            </td>
        `;
        tableBody.appendChild(row);
    });

    if (orders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem;">Nenhum pedido realizado</td></tr>';
    }
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('storeSettings')) || {
        storeName: 'TechStore',
        storeEmail: 'contato@techstore.com',
        storePhone: '(11) 99999-9999',
        shippingNormal: 20,
        shippingExpress: 50,
        shippingSame: 100,
        freeShippingAmount: 100
    };

    if (document.getElementById('storeName')) document.getElementById('storeName').value = settings.storeName;
    if (document.getElementById('storeEmail')) document.getElementById('storeEmail').value = settings.storeEmail;
    if (document.getElementById('storePhone')) document.getElementById('storePhone').value = settings.storePhone;
    if (document.getElementById('shippingNormal')) document.getElementById('shippingNormal').value = settings.shippingNormal;
    if (document.getElementById('shippingExpress')) document.getElementById('shippingExpress').value = settings.shippingExpress;
    if (document.getElementById('shippingSame')) document.getElementById('shippingSame').value = settings.shippingSame;
    if (document.getElementById('freeShippingAmount')) document.getElementById('freeShippingAmount').value = settings.freeShippingAmount;
}

function loadCoupons() {
    const couponsList = document.getElementById('couponsList');
    if (!couponsList) return;

    const coupons = JSON.parse(localStorage.getItem('coupons')) || [
        { code: 'PROMO10', discount: 10 },
        { code: 'TECH20', discount: 20 },
        { code: 'SUMMER15', discount: 15 }
    ];

    couponsList.innerHTML = '';

    coupons.forEach((coupon, index) => {
        const item = document.createElement('div');
        item.className = 'coupon-item';
        item.innerHTML = `
            <div>
                <strong>${coupon.code}</strong>
                <span style="color: #666; margin-left: 1rem;">
                    ${coupon.discount}% de desconto
                </span>
            </div>
            <button class="btn btn-danger" onclick="deleteCouponAdmin(${index})" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
                Excluir
            </button>
        `;
        couponsList.appendChild(item);
    });
}

// ========================================
// FUNÇÕES DE EDIÇÃO/EXCLUSÃO
// ========================================

function editProductAdmin(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productImage').value = product.image;
        document.getElementById('productRating').value = product.rating;

        // Highlight the form
        const formSection = document.querySelector('.product-form-section');
        if (formSection) {
            formSection.style.backgroundColor = '#fff3cd';
            formSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

function deleteProductAdmin(productId) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) {
        return;
    }

    const index = products.findIndex(p => p.id === productId);
    if (index > -1) {
        const productName = products[index].name;
        products.splice(index, 1);
        showNotification(`Produto "${productName}" excluído com sucesso!`);
        loadProductsIntoTable();
        updateDashboardStats();
    }
}

function deleteCouponAdmin(index) {
    if (!confirm('Tem certeza que deseja excluir este cupom?')) {
        return;
    }

    let coupons = JSON.parse(localStorage.getItem('coupons')) || [];
    const couponCode = coupons[index].code;
    coupons.splice(index, 1);
    localStorage.setItem('coupons', JSON.stringify(coupons));
    showNotification(`Cupom "${couponCode}" excluído!`);
    loadCoupons();
}

function viewOrderDetails(orderNumber) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.orderNumber === orderNumber);

    if (!order) {
        showNotification('Pedido não encontrado', 'error');
        return;
    }

    let itemsList = order.items.map(item => 
        `• ${item.name} x${item.quantity} = R$ ${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    let details = `
DETALHES DO PEDIDO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Número: ${order.orderNumber}
Data: ${new Date(order.timestamp).toLocaleDateString('pt-BR')}

CLIENTE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Nome: ${order.customerName}
Email: ${order.customerEmail}
Telefone: ${order.customerPhone}

ENDEREÇO DE ENTREGA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${order.shippingAddress.address}, ${order.shippingAddress.number}
${order.shippingAddress.complement ? order.shippingAddress.complement + '\n' : ''}
${order.shippingAddress.city}, ${order.shippingAddress.state}
CEP: ${order.shippingAddress.cep}

PRODUTOS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${itemsList}

RESUMO FINANCEIRO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subtotal: R$ ${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
Frete: ${order.shippingType === 'normal' ? 'R$ 20.00' : order.shippingType === 'express' ? 'R$ 50.00' : 'R$ 100.00'}
Total: R$ ${order.total.toFixed(2)}

Método de Pagamento: ${order.paymentMethod.toUpperCase()}
    `;

    alert(details);
}

// ========================================
// INICIALIZAR DADOS PADRÃO
// ========================================

window.addEventListener('beforeunload', function() {
    // Opcionalmente, você pode sincronizar dados aqui
});
