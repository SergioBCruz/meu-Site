# 🛒 Guia Rápido de Personalização

## 🎨 Personalize Facilmente Seu E-commerce

### 1. MUDAR O NOME DA LOJA

**Encontre em todas as páginas HTML:**
```html
<h1>🛍️ TechStore</h1>
```

**E substitua por:**
```html
<h1>🛍️ Sua Loja Aqui</h1>
```

**Arquivo**: `admin.html` (linha ~280)
```html
<input type="text" id="storeName" value="Sua Loja Aqui">
```

---

### 2. MUDAR CORES DO TEMA

**Arquivo**: `css/style.css` (linhas 1-15)

```css
:root {
    --primary-color: #007bff;      /* Cor principal (azul) */
    --secondary-color: #6c757d;    /* Cor secundária (cinza) */
    --success-color: #28a745;      /* Sucesso (verde) */
    --danger-color: #dc3545;       /* Perigo (vermelho) */
    --warning-color: #ffc107;      /* Aviso (amarelo) */
    --light-color: #f8f9fa;        /* Fundo claro */
    --dark-color: #343a40;         /* Texto escuro */
}
```

**Exemplos de cores:**
- Verde Tech: `--primary-color: #00aa44;`
- Roxo Premium: `--primary-color: #7c3aed;`
- Rosa/Magenta: `--primary-color: #ec4899;`
- Laranja Vibrante: `--primary-color: #ff6b35;`

---

### 3. ADICIONAR NOVO PRODUTO

**Arquivo**: `js/app.js` (procure `const products = [`)

Copie este modelo e adicione antes do último `];`:

```javascript
{
    id: 9,
    name: "Nome do Produto",
    price: 999.99,
    category: "smartphones",  // ou: notebooks, fones, acessorios
    image: "https://sua-imagem.jpg",
    description: "Descrição breve do produto",
    stock: 15,
    rating: 4.8
}
```

**Exemplo real:**
```javascript
{
    id: 9,
    name: "Samsung Galaxy Buds",
    price: 1299.00,
    category: "fones",
    image: "https://via.placeholder.com/300x300/FFD700/000000?text=Galaxy+Buds",
    description: "Fones wireless com cancelamento de ruído",
    stock: 20,
    rating: 4.6
}
```

---

### 4. MUDAR VALORES DE FRETE

**Arquivo**: `admin.html` (procure `<h3>Configurações de Frete</h3>`)

Ou via painel admin:
1. Vá para: `admin.html`
2. Clique na aba "⚙️ Configurações"
3. Mude os valores em "Configurações de Frete"
4. Clique em "Salvar Configurações"

**Ou edite manualmente em `js/pagamento.js`:**
```javascript
const shippingCost = document.querySelector('input[name="shipping"]:checked')?.value;
let shippingCost = 20;        // Normal: R$ 20
if (shippingValue === 'express') shippingCost = 50;    // Express: R$ 50
if (shippingValue === 'same') shippingCost = 100;      // Mesmo dia: R$ 100
```

---

### 5. ADICIONAR CUPOM DE DESCONTO

**Via Painel Admin (Recomendado):**
1. Abra: `admin.html`
2. Clique em "⚙️ Configurações"
3. Role até "Cupons de Desconto"
4. Digite o código (ex: BLACKFRIDAY)
5. Digite o desconto (ex: 50 para 50%)
6. Clique em "Adicionar Cupom"

**Ou edite em `js/pagamento.js`:**
```javascript
const coupons = [
    { code: 'PROMO10', discount: 10 },
    { code: 'TECH20', discount: 20 },
    { code: 'SUMMER15', discount: 15 },
    { code: 'BLACKFRIDAY', discount: 50 }  // NOVO
];
```

---

### 6. MUDAR DADOS DE CONTATO

**Encontre em `contato.html` (procure `<h3>Email</h3>`):**

```html
<p>
    contato@techstore.com<br>
    suporte@techstore.com<br>
    vendas@techstore.com
</p>
```

**E substitua por:**
```html
<p>
    seu-email@suaempresa.com<br>
    suporte@suaempresa.com<br>
    vendas@suaempresa.com
</p>
```

**Telefone em `contato.html`:**
```html
<p>
    (11) 99999-9999<br>
    (11) 3333-3333
</p>
```

---

### 7. MUDAR INFORMAÇÕES DO RODAPÉ

**Encontre em todas as páginas (procure `<footer class="footer">`):**

```html
<div class="footer-section">
    <h4>Contato</h4>
    <p>Email: contato@techstore.com</p>
    <p>Telefone: (11) 99999-9999</p>
</div>
```

**E substitua pelos seus dados.**

---

### 8. ADICIONAR REDES SOCIAIS

**Arquivo**: `contato.html` (procure `<h3>🌐 Redes Sociais</h3>`)

```html
<div class="social-links">
    <a href="https://facebook.com/suaempresa" class="social-link">Facebook</a>
    <a href="https://instagram.com/suaempresa" class="social-link">Instagram</a>
    <a href="https://twitter.com/suaempresa" class="social-link">Twitter</a>
    <a href="https://linkedin.com/company/suaempresa" class="social-link">LinkedIn</a>
</div>
```

---

### 9. MUDAR DESCRIÇÃO DA LOJA

**Arquivo**: `sobre.html` (procure `<h2>Nossa História</h2>`)

```html
<section class="about-section">
    <h2>Nossa História</h2>
    <p>
        A TechStore foi fundada em 2020 com a missão de trazer os melhores 
        produtos de tecnologia ao alcance de todos os brasileiros.
    </p>
</section>
```

---

### 10. CUSTOMIZAR IMAGENS

Os produtos usam imagens placeholder. Para adicionar suas próprias:

1. **Coloque suas imagens em `/img/`**
2. **Atualize no `js/app.js`:**

```javascript
{
    id: 1,
    name: "iPhone 15 Pro",
    price: 4999.00,
    image: "img/iphone15.jpg",  // Caminho da sua imagem
    ...
}
```

---

## 🔧 ATALHOS ÚTEIS

### Abrir Console para Debug
Pressione: `F12` ou `Ctrl+Shift+I`

### Limpar Dados (localStorage)
No console, execute:
```javascript
localStorage.clear();
```

### Ver Produtos Cadastrados
No console, execute:
```javascript
console.log(products);
```

### Ver Carrinho Atual
No console, execute:
```javascript
console.log(cart);
```

### Ver Pedidos Realizados
No console, execute:
```javascript
console.log(JSON.parse(localStorage.getItem('orders')));
```

---

## 🎨 TEMAS PRONTOS

### Tema Verde (E-commerce Eco)
```css
--primary-color: #10b981;
--secondary-color: #059669;
--light-color: #ecfdf5;
```

### Tema Roxo (Premium/Luxo)
```css
--primary-color: #9333ea;
--secondary-color: #7e22ce;
--light-color: #faf5ff;
```

### Tema Rosa (Fashion/Beleza)
```css
--primary-color: #ec4899;
--secondary-color: #db2777;
--light-color: #fdf2f8;
```

### Tema Laranja (Energético)
```css
--primary-color: #f97316;
--secondary-color: #ea580c;
--light-color: #fff7ed;
```

---

## 📱 ADICIONAR FAVICON

Crie um arquivo `favicon.ico` e adicione em **todas as páginas**, na seção `<head>`:

```html
<link rel="icon" type="image/x-icon" href="favicon.ico">
```

---

## 📧 INTEGRAR EMAIL REAL

Para enviar emails de contato (requer backend):

1. Use um serviço como:
   - **EmailJS** (sem servidor)
   - **Formspree** (simples)
   - **SendGrid** (profissional)
   - **Seu próprio backend** (PHP, Node.js, Python)

---

## 🚀 PRÓXIMAS MELHORIAS

Ideias para evoluir seu e-commerce:

- [ ] Integrar Stripe/PayPal real
- [ ] Autenticação de usuários
- [ ] Wishlist/Favoritos
- [ ] Histórico de compras
- [ ] Sistema de reviews
- [ ] Blog integrado
- [ ] Chat de suporte
- [ ] Analytics
- [ ] PWA (App Mobile)
- [ ] SEO otimizado

---

## ❓ DÚVIDAS FREQUENTES

**P: Como adicionar mais categorias?**
R: Edite o select em `produtos.html` e atualize em `js/app.js` nos filtros.

**P: Como mudar o layout?**
R: Edite `css/style.css` - use Grid e Flexbox para rearranjar.

**P: Como proteger dados sensíveis?**
R: Para produção, implemente um backend seguro (não use localStorage para dados críticos).

**P: Posso usar banco de dados?**
R: Sim! Crie um backend (Node.js, PHP, Python) e substitua localStorage por API calls.

---

**Última atualização**: 17 de Janeiro de 2026
