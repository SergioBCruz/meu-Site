// ========================================
// SISTEMA DE PAGAMENTOS
// ========================================

// Validação de cartão
function validateCard(cardNumber, expiry, cvc) {
    // Algoritmo de Luhn para validação básica
    const cleanNumber = cardNumber.replace(/\s/g, '');
    if (!/^\d{13,19}$/.test(cleanNumber)) return false;

    let sum = 0;
    let isEven = false;

    for (let i = cleanNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cleanNumber[i], 10);

        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEven = !isEven;
    }

    return sum % 10 === 0;
}

// Validar data de validade
function validateExpiry(expiry) {
    const [month, year] = expiry.split('/');
    const currentDate = new Date();
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    return expiryDate > currentDate;
}

// Validar CVV
function validateCVC(cvc) {
    return /^\d{3,4}$/.test(cvc);
}

// Mascarar número do cartão
function maskCardNumber(cardNumber) {
    const clean = cardNumber.replace(/\s/g, '');
    return clean.slice(-4).padStart(clean.length, '*');
}

// Gerar número de pedido
function generateOrderNumber() {
    return 'PED' + Date.now() + Math.floor(Math.random() * 1000);
}

// Simular processamento de pagamento
function processPayment(paymentData) {
    return new Promise((resolve) => {
        // Simular delay de processamento
        setTimeout(() => {
            // 95% de taxa de sucesso
            const success = Math.random() < 0.95;
            resolve({
                success: success,
                transactionId: 'TXN' + Date.now(),
                message: success ? 'Pagamento processado com sucesso' : 'Falha no processamento'
            });
        }, 2000);
    });
}

// Formatar número do cartão
function formatCardNumber(value) {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
}

// Formatar validade
function formatExpiry(value) {
    const clean = value.replace(/\D/g, '');
    if (clean.length >= 2) {
        return clean.substring(0, 2) + '/' + clean.substring(2, 4);
    }
    return clean;
}

// ========================================
// CHECKOUT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Formulário de checkout
    const checkoutForm = document.getElementById('checkoutForm');
    if (!checkoutForm) return;

    // Formatação de inputs
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            e.target.value = formatCardNumber(e.target.value);
        });
    }

    const cardExpiryInput = document.getElementById('cardExpiry');
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', function(e) {
            e.target.value = formatExpiry(e.target.value);
        });
    }

    const cardCVCInput = document.getElementById('cardCVC');
    if (cardCVCInput) {
        cardCVCInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
        });
    }

    // Buscar CEP (usando API ViaCEP)
    const searchCepBtn = document.getElementById('searchCepBtn');
    if (searchCepBtn) {
        searchCepBtn.addEventListener('click', async function() {
            const cep = document.getElementById('cep').value.replace(/\D/g, '');
            
            if (cep.length !== 8) {
                showNotification('CEP inválido', 'error');
                return;
            }

            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (data.erro) {
                    showNotification('CEP não encontrado', 'error');
                    return;
                }

                document.getElementById('address').value = data.logradouro;
                document.getElementById('city').value = data.localidade;
                document.getElementById('state').value = data.uf;

                showNotification('Endereço encontrado!');
            } catch (error) {
                showNotification('Erro ao buscar CEP', 'error');
            }
        });
    }

    // Mostrar/esconder seções de pagamento
    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            const cardPaymentSection = document.getElementById('cardPaymentSection');
            const pixSection = document.getElementById('pixSection');
            const boletoSection = document.getElementById('boletoSection');

            // Esconder tudo
            if (cardPaymentSection) cardPaymentSection.classList.remove('show');
            if (pixSection) pixSection.style.display = 'none';
            if (boletoSection) boletoSection.style.display = 'none';

            // Mostrar selecionado
            if (this.value === 'credit' || this.value === 'debit') {
                if (cardPaymentSection) cardPaymentSection.classList.add('show');
            } else if (this.value === 'pix') {
                if (pixSection) pixSection.style.display = 'block';
            } else if (this.value === 'boleto') {
                if (boletoSection) boletoSection.style.display = 'block';
            }
        });
    });

    // Atualizar resumo do pedido
    function updateOrderSummary() {
        const summaryItems = document.getElementById('summaryItems');
        const summarySubtotal = document.getElementById('summarySubtotal');
        const summaryShipping = document.getElementById('summaryShipping');
        const summaryTotal = document.getElementById('summaryTotal');

        if (!summaryItems) return;

        summaryItems.innerHTML = '';
        cart.forEach(item => {
            const itemRow = document.createElement('div');
            itemRow.className = 'summary-item-row';
            itemRow.innerHTML = `
                <div>
                    <img src="${item.image}" alt="${item.name}" class="summary-item-img">
                    ${item.name} x${item.quantity}
                </div>
                <div>R$ ${(item.price * item.quantity).toFixed(2)}</div>
            `;
            summaryItems.appendChild(itemRow);
        });

        if (summarySubtotal) summarySubtotal.textContent = `R$ ${calculateSubtotal().toFixed(2)}`;
        
        const shippingValue = document.querySelector('input[name="shipping"]:checked')?.value;
        let shippingCost = 20;
        if (shippingValue === 'express') shippingCost = 50;
        if (shippingValue === 'same') shippingCost = 100;
        
        if (summaryShipping) summaryShipping.textContent = `R$ ${shippingCost.toFixed(2)}`;
        if (summaryTotal) summaryTotal.textContent = `R$ ${(calculateTotal(shippingCost)).toFixed(2)}`;
    }

    // Atualizar ao mudar frete
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    shippingRadios.forEach(radio => {
        radio.addEventListener('change', updateOrderSummary);
    });

    // Carregar resumo inicial
    updateOrderSummary();

    // Submissão do formulário
    checkoutForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

        // Validações
        if (paymentMethod === 'credit' || paymentMethod === 'debit') {
            const cardNumber = document.getElementById('cardNumber').value;
            const cardExpiry = document.getElementById('cardExpiry').value;
            const cardCVC = document.getElementById('cardCVC').value;

            if (!validateCard(cardNumber, cardExpiry, cardCVC)) {
                showNotification('Número do cartão inválido', 'error');
                return;
            }

            if (!validateExpiry(cardExpiry)) {
                showNotification('Cartão expirado', 'error');
                return;
            }

            if (!validateCVC(cardCVC)) {
                showNotification('CVV inválido', 'error');
                return;
            }
        }

        // Preparar dados do pedido
        const orderData = {
            orderNumber: generateOrderNumber(),
            customerName: document.getElementById('fullName').value,
            customerEmail: document.getElementById('email').value,
            customerPhone: document.getElementById('phone').value,
            shippingAddress: {
                cep: document.getElementById('cep').value,
                address: document.getElementById('address').value,
                number: document.getElementById('number').value,
                complement: document.getElementById('complement').value,
                city: document.getElementById('city').value,
                state: document.getElementById('state').value
            },
            shippingType: document.querySelector('input[name="shipping"]:checked').value,
            paymentMethod: paymentMethod,
            items: cart,
            total: calculateTotal(getShippingCost()),
            timestamp: new Date().toISOString()
        };

        // Mostrar loading
        const submitBtn = checkoutForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processando...';

        // Processar pagamento
        const paymentResult = await processPayment(orderData);

        if (paymentResult.success) {
            // Salvar pedido
            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(orderData);
            localStorage.setItem('orders', JSON.stringify(orders));

            // Limpar carrinho
            clearCart();

            // Mostrar modal de sucesso
            showSuccessModal(orderData);
        } else {
            showNotification('Erro ao processar pagamento. Tente novamente.', 'error');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });

    function getShippingCost() {
        const shippingValue = document.querySelector('input[name="shipping"]:checked')?.value;
        let shippingCost = 20;
        if (shippingValue === 'express') shippingCost = 50;
        if (shippingValue === 'same') shippingCost = 100;
        return shippingCost;
    }

    function showSuccessModal(orderData) {
        const modal = document.getElementById('successModal');
        document.getElementById('orderNumber').textContent = orderData.orderNumber;
        document.getElementById('confirmEmail').textContent = orderData.customerEmail;

        modal.classList.add('show');

        setTimeout(() => {
            window.location.href = 'index.html';
        }, 5000);
    }
});

// ========================================
// PAINEL ADMINISTRATIVO
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Abas do admin
    const tabButtons = document.querySelectorAll('.tab-button');
    const adminSections = document.querySelectorAll('.admin-section');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');

            // Remover active de todos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            adminSections.forEach(section => section.classList.remove('active'));

            // Adicionar active ao selecionado
            this.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // Dashboard
    if (document.getElementById('dashboard')) {
        updateDashboard();
    }

    // Formulário de produto
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const newProduct = {
                id: products.length + 1,
                name: document.getElementById('productName').value,
                price: parseFloat(document.getElementById('productPrice').value),
                category: document.getElementById('productCategory').value,
                stock: parseInt(document.getElementById('productStock').value),
                description: document.getElementById('productDescription').value,
                image: document.getElementById('productImage').value,
                rating: parseFloat(document.getElementById('productRating').value)
            };

            products.push(newProduct);
            showNotification('Produto adicionado com sucesso!');
            productForm.reset();
            renderProductsTable();
            updateDashboard();
        });
    }

    // Limpar formulário
    const clearFormBtn = document.getElementById('clearFormBtn');
    if (clearFormBtn) {
        clearFormBtn.addEventListener('click', function() {
            productForm.reset();
        });
    }

    // Renderizar tabela de produtos
    function renderProductsTable() {
        const tableBody = document.getElementById('productsTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = '';
        products.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>R$ ${product.price.toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>
                    <button class="btn btn-secondary" onclick="editProduct(${product.id})">Editar</button>
                    <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Excluir</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    if (document.getElementById('productsTableBody')) {
        renderProductsTable();
    }

    // Renderizar pedidos
    function renderOrdersTable() {
        const tableBody = document.getElementById('ordersTableBody');
        if (!tableBody) return;

        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        tableBody.innerHTML = '';

        orders.forEach(order => {
            const row = document.createElement('tr');
            const date = new Date(order.timestamp).toLocaleDateString('pt-BR');
            row.innerHTML = `
                <td>${order.orderNumber}</td>
                <td>${order.customerName}</td>
                <td>R$ ${order.total.toFixed(2)}</td>
                <td>
                    <span style="background-color: #d4edda; color: #155724; padding: 0.25rem 0.5rem; border-radius: 3px;">
                        Confirmado
                    </span>
                </td>
                <td>${date}</td>
                <td>
                    <button class="btn btn-secondary" onclick="viewOrder('${order.orderNumber}')">Ver</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    if (document.getElementById('ordersTableBody')) {
        renderOrdersTable();
    }

    // Configurações
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    if (saveSettingsBtn) {
        saveSettingsBtn.addEventListener('click', function() {
            const settings = {
                storeName: document.getElementById('storeName').value,
                storeEmail: document.getElementById('storeEmail').value,
                storePhone: document.getElementById('storePhone').value,
                shippingNormal: parseFloat(document.getElementById('shippingNormal').value),
                shippingExpress: parseFloat(document.getElementById('shippingExpress').value),
                shippingSame: parseFloat(document.getElementById('shippingSame').value),
                freeShippingAmount: parseFloat(document.getElementById('freeShippingAmount').value)
            };

            localStorage.setItem('storeSettings', JSON.stringify(settings));
            showNotification('Configurações salvas com sucesso!');
        });
    }

    // Adicionar cupom
    const addCouponBtn = document.getElementById('addCouponBtn');
    if (addCouponBtn) {
        addCouponBtn.addEventListener('click', function() {
            const code = document.getElementById('couponCode').value;
            const discount = parseInt(document.getElementById('couponDiscount').value);

            if (!code || !discount) {
                showNotification('Preencha os campos', 'error');
                return;
            }

            let coupons = JSON.parse(localStorage.getItem('coupons')) || [
                { code: 'PROMO10', discount: 10 },
                { code: 'TECH20', discount: 20 },
                { code: 'SUMMER15', discount: 15 }
            ];

            coupons.push({ code: code.toUpperCase(), discount: discount });
            localStorage.setItem('coupons', JSON.stringify(coupons));

            showNotification('Cupom adicionado!');
            document.getElementById('couponCode').value = '';
            document.getElementById('couponDiscount').value = '10';
            renderCouponsList();
        });
    }

    // Renderizar lista de cupons
    function renderCouponsList() {
        const couponsList = document.getElementById('couponsList');
        if (!couponsList) return;

        const coupons = JSON.parse(localStorage.getItem('coupons')) || [];
        couponsList.innerHTML = '';

        coupons.forEach((coupon, index) => {
            const item = document.createElement('div');
            item.className = 'coupon-item';
            item.innerHTML = `
                <div>
                    <strong>${coupon.code}</strong> - ${coupon.discount}% de desconto
                </div>
                <button class="btn btn-danger" onclick="deleteCoupon(${index})">Excluir</button>
            `;
            couponsList.appendChild(item);
        });
    }

    if (document.getElementById('couponsList')) {
        renderCouponsList();
    }
});

// Funções auxiliares do Admin
function editProduct(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productCategory').value = product.category;
        document.getElementById('productStock').value = product.stock;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productImage').value = product.image;
        document.getElementById('productRating').value = product.rating;

        // Scroll para formulário
        document.querySelector('.product-form-section').scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteProduct(productId) {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
        const index = products.findIndex(p => p.id === productId);
        if (index > -1) {
            products.splice(index, 1);
            showNotification('Produto excluído!');
            document.getElementById('productsTableBody').innerHTML = '';
            const tableBody = document.getElementById('productsTableBody');
            if (tableBody) {
                products.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${product.name}</td>
                        <td>${product.category}</td>
                        <td>R$ ${product.price.toFixed(2)}</td>
                        <td>${product.stock}</td>
                        <td>
                            <button class="btn btn-secondary" onclick="editProduct(${product.id})">Editar</button>
                            <button class="btn btn-danger" onclick="deleteProduct(${product.id})">Excluir</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            }
        }
    }
}

function viewOrder(orderNumber) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.orderNumber === orderNumber);
    
    if (order) {
        alert(`Pedido: ${order.orderNumber}\nCliente: ${order.customerName}\nTotal: R$ ${order.total.toFixed(2)}`);
    }
}

function deleteCoupon(index) {
    let coupons = JSON.parse(localStorage.getItem('coupons')) || [];
    coupons.splice(index, 1);
    localStorage.setItem('coupons', JSON.stringify(coupons));
    showNotification('Cupom excluído!');
    
    const couponsList = document.getElementById('couponsList');
    if (couponsList) {
        couponsList.innerHTML = '';
        coupons.forEach((coupon, idx) => {
            const item = document.createElement('div');
            item.className = 'coupon-item';
            item.innerHTML = `
                <div>
                    <strong>${coupon.code}</strong> - ${coupon.discount}% de desconto
                </div>
                <button class="btn btn-danger" onclick="deleteCoupon(${idx})">Excluir</button>
            `;
            couponsList.appendChild(item);
        });
    }
}

function updateDashboard() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    let totalSales = 0;
    orders.forEach(order => {
        totalSales += order.total;
    });

    const totalSalesElement = document.getElementById('totalSales');
    const totalOrdersElement = document.getElementById('totalOrders');
    const totalProductsElement = document.getElementById('totalProducts');
    const totalCustomersElement = document.getElementById('totalCustomers');

    if (totalSalesElement) totalSalesElement.textContent = `R$ ${totalSales.toFixed(2)}`;
    if (totalOrdersElement) totalOrdersElement.textContent = orders.length;
    if (totalProductsElement) totalProductsElement.textContent = products.length;
    if (totalCustomersElement) totalCustomersElement.textContent = new Set(orders.map(o => o.customerEmail)).size;
}
