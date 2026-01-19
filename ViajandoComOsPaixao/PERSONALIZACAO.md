# 🎨 Guia de Personalização

Customize o site para deixar com a cara da sua família!

## 🎯 Mudanças Fáceis

### 1. Mudar Cores

Abra o arquivo `static/css/style.css` e procure por:

```css
:root {
    --primary-color: #FF6B6B;      /* Vermelho/Rosa - Cor principal */
    --secondary-color: #4ECDC4;    /* Turquesa - Cor secundária */
    --accent-color: #FFE66D;       /* Amarelo - Destaques */
    --dark-color: #1A1A2E;         /* Escuro - Fundos */
    --light-color: #F7F7F7;        /* Claro - Fundos alternativos */
}
```

Mude para as cores que quiser! Aqui estão algumas sugestões:

**Tema Tropical:**
```css
--primary-color: #FF6B9D;      /* Rosa tropical */
--secondary-color: #C44569;    /* Vermelho tropical */
--accent-color: #FEC860;       /* Amarelo solar */
```

**Tema Oceano:**
```css
--primary-color: #0A6FA8;      /* Azul oceano */
--secondary-color: #0FA3B1;    /* Turquesa mar */
--accent-color: #FFD700;       /* Ouro praia */
```

**Tema Floresta:**
```css
--primary-color: #2D6A4F;      /* Verde floresta */
--secondary-color: #52B788;    /* Verde claro */
--accent-color: #E63946;       /* Vermelho floresta */
```

### 2. Mudar Título e Nome

Abra qualquer arquivo `.html` em `templates/` e mude:

```html
<h1>Viajando com os Paixão</h1>
```

Para algo como:

```html
<h1>Aventuras da Família Silva</h1>
```

### 3. Mudar Emoji do Logo

Em `templates/` procure por:

```html
<span class="logo">✈️</span>
```

Mude o ✈️ para outro emoji:

- 🌍 Globo
- 🧳 Mala
- 🏖️ Praia
- ⛰️ Montanha
- 🗺️ Mapa
- 🌴 Palmeira
- 🚀 Foguete
- 💫 Estrela

### 4. Mudar Fonte do Site

Procure pela linha no `static/css/style.css`:

```css
font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
```

Mude para Google Fonts:

1. Acesse https://fonts.google.com
2. Escolha uma fonte
3. Copie o `<link>` fornecido
4. Cole em `templates/index.html` (antes do `<link>` do style.css)

Exemplo:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
```

Depois, em `style.css`:

```css
font-family: 'Poppins', sans-serif;
```

## 🎬 Mudanças Médias

### 5. Adicionar Logo/Imagem

1. Salve uma imagem em `static/img/logo.png`
2. Em `templates/index.html`, mude:

```html
<span class="logo">✈️</span>
```

Para:

```html
<img src="/static/img/logo.png" alt="Logo" style="width: 50px; height: 50px;">
```

### 6. Customizar Textos da Página "Sobre"

Abra `templates/sobre.html` e mude:

```html
<h2>Bem-vindo ao Nosso Mundo de Viagens!</h2>
<p>Somos uma família apaixonada por explorar o mundo...</p>
```

Para sua própria história!

### 7. Mudar Tamanhos de Fotos

Em `static/css/style.css`, procure por:

```css
.post-image,
.gallery-image,
.video-thumbnail {
    width: 100%;
    height: 250px;  /* Mude este valor */
    object-fit: cover;
}
```

Mude `250px` para:
- `200px` - Fotos mais compactas
- `350px` - Fotos maiores
- `400px` - Fotos bem grandes

### 8. Customizar Número de Colunas de Posts

Procure por:

```css
.posts-grid,
.gallery-grid,
.videos-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
```

Mude `300px` para:
- `250px` - Mais posts por linha
- `350px` - Menos posts por linha (mais espaço)

## 💻 Mudanças Avançadas

### 9. Adicionar Rodapé Customizado

Abra `static/css/style.css` e procure por `.footer`:

```css
.footer {
    background-color: var(--dark-color);
    color: white;
    text-align: center;
    padding: 2rem 0;
    margin-top: 3rem;
}
```

Em qualquer `.html`, mude o rodapé:

```html
<footer class="footer">
    <div class="container">
        <p>&copy; 2024 Viajando com os Paixão. Todos os direitos reservados.</p>
    </div>
</footer>
```

Para:

```html
<footer class="footer">
    <div class="container">
        <p>❤️ Criado com amor pela Família Paixão</p>
        <p>&copy; 2024 - Todos os direitos reservados</p>
    </div>
</footer>
```

### 10. Mudar Estilo do Botão de Login

Procure em `style.css`:

```css
.btn-login {
    background-color: white;
    color: var(--primary-color);
}
```

Mude para qualquer cor:

```css
.btn-login {
    background-color: var(--accent-color);
    color: white;
}
```

## 🌍 Adicionar Conteúdo Personalizado

### 11. Nova Seção na Home

Edite `templates/index.html` e adicione:

```html
<section class="container mt-4">
    <h2 class="section-title">Próximo Destino</h2>
    <div class="custom-card">
        <h3>Planejamos visitar...</h3>
        <p>Estamos pensando em ir para a Tailândia em dezembro!</p>
    </div>
</section>
```

### 12. Links para Redes Sociais

No rodapé, adicione:

```html
<div class="social-links">
    <a href="https://instagram.com/seu-usuario" target="_blank">📸 Instagram</a>
    <a href="https://facebook.com/seu-usuario" target="_blank">👍 Facebook</a>
    <a href="https://youtube.com/seu-canal" target="_blank">▶️ YouTube</a>
</div>
```

E em `style.css`:

```css
.social-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1rem;
}

.social-links a {
    color: white;
    text-decoration: none;
    transition: var(--transition);
}

.social-links a:hover {
    transform: scale(1.1);
}
```

## ✨ Dicas de Design

1. **Use contraste**: Cores claras com escuras são mais legíveis
2. **Mantenha consistência**: Use sempre as mesmas cores
3. **Espaçamento**: Não coloque elementos muito próximos
4. **Tipografia**: Use no máximo 2-3 fontes diferentes
5. **Mobile-first**: Teste em celular, não só no PC

## 🎨 Geradores de Cores

Procure online por:

- **ColorHunt.co** - Paletas de cores prontas
- **CoolorsApp.com** - Gerador de paletas
- **Adobe Color Wheel** - Combinações de cores
- **Material Design Colors** - Cores profissionais do Google

## 📸 Padrão para Fotos

Para melhor aparência:

- **Proporção**: 16:9 (largura 1200px, altura 675px)
- **Tamanho**: 100-500KB (comprima antes de upload)
- **Formato**: JPG é melhor que PNG para fotos

## 🔄 Testar Mudanças

1. Edite um arquivo
2. Salve (Ctrl+S)
3. Atualize o navegador (F5)
4. As mudanças devem aparecer!

Se não vir mudanças:
- Limpe o cache (Ctrl+Shift+Delete)
- Feche e abra o navegador novamente

---

**Divirta-se customizando! Se tiver dúvidas, compare com os exemplos nos arquivos original.** ✨
