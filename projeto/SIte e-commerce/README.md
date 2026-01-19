# 🛍️ TechStore - E-commerce Completo

Um site de e-commerce profissional e completo em HTML, CSS e JavaScript puro, com todas as funcionalidades essenciais de uma loja online.

## 📋 Características

### 🏪 Páginas Principais
- **Início (index.html)** - Página inicial com produtos em destaque
- **Produtos (produtos.html)** - Catálogo completo com filtros
- **Carrinho (carrinho.html)** - Gerenciamento de carrinho
- **Checkout (checkout.html)** - Finalização de compra com múltiplos pagamentos
- **Sobre (sobre.html)** - Informações da loja
- **Contato (contato.html)** - Formulário de contato e FAQ
- **Admin (admin.html)** - Painel administrativo

### 🛒 Funcionalidades do Carrinho
- Adicionar/remover produtos
- Atualizar quantidades
- Cupons de desconto
- Cálculo automático de totais
- Armazenamento em localStorage

### 💳 Sistema de Pagamentos
- **Cartão de Crédito** - Com validação de número (Luhn)
- **Cartão de Débito** - Suporte completo
- **PIX** - Integração simulada
- **Boleto** - Geração simulada
- Parcelamento em até 12 vezes
- Validação de dados do cartão

### 🚚 Entrega
- 3 opções de frete:
  - Padrão: R$ 20,00 (5-7 dias)
  - Expressa: R$ 50,00 (2-3 dias)
  - Mesmo dia: R$ 100,00
- Frete grátis acima de R$ 100
- Integração com API ViaCEP para busca de endereços

### 📊 Painel Administrativo
- **Dashboard** - Estatísticas de vendas
- **Gerenciar Produtos** - Adicionar, editar e excluir
- **Gerenciar Pedidos** - Visualizar detalhes
- **Configurações** - Valores de frete, informações da loja
- **Cupons** - Criar e gerenciar cupons de desconto

### 🔍 Recursos Adicionais
- Filtros avançados por categoria e preço
- Busca de produtos
- Avaliações de produtos
- Modal de detalhes do produto
- Notificações elegantes
- Tema claro e responsivo
- Design mobile-first
- Armazenamento local (localStorage)

## 🚀 Como Usar

### 1. Abrir o Site
Simplesmente abra o arquivo `index.html` em seu navegador web. Não requer servidor!

```
Clique duplo em: index.html
```

### 2. Navegar pela Loja
- Navegue por **Início**, **Produtos**, **Sobre** e **Contato**
- Use os filtros para encontrar produtos
- Clique em "Ver Detalhes" para mais informações

### 3. Adicionar Produtos ao Carrinho
```
1. Clique em "Ver Detalhes" do produto
2. Escolha a quantidade
3. Clique em "Adicionar ao Carrinho"
```

### 4. Ir para Checkout
```
1. Clique no ícone 🛒 Carrinho
2. Revise seus produtos
3. Aplique cupom (opcional)
4. Clique em "Ir para Pagamento"
```

### 5. Finalizar Compra
```
1. Preencha dados pessoais
2. Digite CEP (ex: 01311100) e clique "Buscar CEP"
3. Escolha forma de entrega
4. Selecione método de pagamento
5. Preencha dados do cartão ou escolha PIX/Boleto
6. Clique em "Confirmar Pedido"
```

## 💳 Dados de Teste

### Cartão de Crédito
- **Número**: 4532 1234 5678 9010
- **Validade**: 12/25
- **CVV**: 123

### Cupons de Desconto
- `PROMO10` - 10% de desconto
- `TECH20` - 20% de desconto
- `SUMMER15` - 15% de desconto

### CEP para Teste
- `01311100` - Av. Paulista, São Paulo

## ⚙️ Acessar Painel Admin

Vá para: `admin.html`

**Funcionalidades:**
- 📊 Dashboard com estatísticas
- ➕ Adicionar novos produtos
- ✏️ Editar produtos existentes
- 🗑️ Excluir produtos
- 📋 Visualizar pedidos realizados
- ⚙️ Configurar valores de frete
- 🎟️ Gerenciar cupons de desconto

## 📁 Estrutura de Arquivos

```
SIte e-commerce/
├── index.html              # Página inicial
├── produtos.html           # Catálogo de produtos
├── carrinho.html           # Página do carrinho
├── checkout.html           # Página de checkout
├── sobre.html              # Sobre a loja
├── contato.html            # Contato e FAQ
├── admin.html              # Painel administrativo
├── README.md               # Este arquivo
│
├── css/
│   └── style.css           # Estilos CSS (responsivo)
│
├── js/
│   ├── app.js              # Lógica principal
│   ├── pagamento.js        # Sistema de pagamentos
│   └── admin.js            # Scripts do admin
│
├── img/                    # Pasta para imagens
└── data/                   # Pasta para dados
```

## 🎨 Tema e Cores

- **Cor Primária**: #007bff (Azul)
- **Cor Secundária**: #6c757d (Cinza)
- **Sucesso**: #28a745 (Verde)
- **Perigo**: #dc3545 (Vermelho)
- **Aviso**: #ffc107 (Amarelo)
- **Fundo**: #f8f9fa (Claro)

## 📱 Responsividade

O site é totalmente responsivo:
- **Desktop**: Layout completo com múltiplas colunas
- **Tablet**: Adaptação para telas médias
- **Mobile**: Layout de coluna única otimizado

## 🔐 Segurança

- Validação de números de cartão (Algoritmo de Luhn)
- Validação de datas de expiração
- Validação de CVV
- Sanitização básica de inputs
- Armazenamento seguro de dados em localStorage

⚠️ **Nota**: Este é um protótipo de desenvolvimento. Para produção, implemente:
- Backend seguro
- Criptografia SSL/TLS
- PCI DSS compliance
- Integração com gateway de pagamento real (Stripe, PayPal, etc.)

## 📊 Dados e Armazenamento

O site utiliza **localStorage** do navegador para:
- Carrinho de compras
- Cupons aplicados
- Pedidos realizados
- Configurações da loja

**Limpar Dados:**
```javascript
// Abra o console (F12) e execute:
localStorage.clear();
```

## 🎯 Produtos Padrão

O site vem com 8 produtos pré-configurados:

1. **iPhone 15 Pro** - R$ 4.999,00
2. **Samsung Galaxy S24** - R$ 4.499,00
3. **MacBook Pro 16"** - R$ 12.999,00
4. **Dell XPS 15** - R$ 8.999,00
5. **Sony WH-1000XM5** - R$ 2.499,00
6. **Apple AirPods Max** - R$ 7.599,00
7. **Apple Watch Series 9** - R$ 2.999,00
8. **iPad Pro 12.9"** - R$ 6.999,00

## 🔧 Personalização

### Mudar Logo/Marca
Edite em todas as páginas:
```html
<h1>🛍️ TechStore</h1>
```

### Mudar Cores
Edite `css/style.css`:
```css
:root {
    --primary-color: #007bff;  /* Mude aqui */
    ...
}
```

### Adicionar Novo Produto
No `js/app.js`, adicione ao array `products`:
```javascript
{
    id: 9,
    name: "Seu Produto",
    price: 999.99,
    category: "smartphones",
    image: "url-da-imagem",
    description: "Descrição aqui",
    stock: 10,
    rating: 4.5
}
```

## 🐛 Troubleshooting

**Problema**: Cupom não funciona
- **Solução**: Certifique-se de usar o código exato (PROMO10, TECH20, SUMMER15)

**Problema**: Produtos não aparecem
- **Solução**: Verifique o console (F12) para erros de JavaScript

**Problema**: CEP não retorna endereço
- **Solução**: Verifique a conexão com internet (usa API ViaCEP)

**Problema**: Dados do carrinho sumiram
- **Solução**: localStorage foi limpo, recarregue a página

## 📞 Suporte

Para modificações ou dúvidas sobre o código:
- Verifique o código dos arquivos JavaScript
- Consulte comentários no código
- Use o console do navegador (F12) para debug

## 📄 Licença

Este projeto é fornecido como é, para fins educacionais e de prototipagem.

## 🎓 O que você aprendeu

Este projeto demonstra:
- ✅ HTML5 semântico
- ✅ CSS3 responsivo (Grid, Flexbox)
- ✅ JavaScript vanilla (sem frameworks)
- ✅ localStorage e manipulação do DOM
- ✅ APIs (fetch, ViaCEP)
- ✅ Validação de formulários
- ✅ Design responsivo mobile-first
- ✅ UX/UI para e-commerce

---

**Versão**: 1.0.0  
**Última Atualização**: 17 de Janeiro de 2026  
**Desenvolvido com ❤️ para demonstrar desenvolvimento web moderno**
