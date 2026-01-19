# 🌍 Viajando com os Paixão

Um site moderno e responsivo para compartilhar suas aventuras de viagem com fotos, vídeos e histórias!

## ✨ Características

- **Sistema de Autenticação Seguro**: Login e registro com JWT
- **Gerenciamento de Conteúdo**: Criar, editar e deletar posts com fotos e vídeos
- **Galeria de Fotos**: Filtrável por local e país
- **Galeria de Vídeos**: Reproduza vídeos em HTML5
- **Sistema de Comentários**: Leia e deixe comentários nos posts
- **Sistema de Likes**: Marque seus posts favoritos
- **Painel Admin**: Interface para gerenciar todo o conteúdo
- **Integração com API de Clima**: Veja o clima do local visitado
- **Responsivo**: Funciona perfeitamente em celular, tablet e desktop
- **Design Moderno**: Interface limpa e intuitiva

## 📋 Requisitos

- Python 3.8+
- pip (gerenciador de pacotes Python)
- Navegador moderno (Chrome, Firefox, Safari, Edge)

## 🚀 Instalação e Configuração

### 1. Clone ou baixe o projeto

```bash
cd ViajandoComOsPaixao
```

### 2. Crie um ambiente virtual

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Instale as dependências

```bash
pip install -r requirements.txt
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` a partir de `.env.example`:

```bash
cp .env.example .env
```

Edite o `.env` com suas configurações:

```
SECRET_KEY=sua-chave-secreta-super-segura-mude-isto
DEBUG=True
```

**IMPORTANTE**: Mude a `SECRET_KEY` para algo único e seguro! Use:

```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 5. Execute o servidor

```bash
python main.py
```

O servidor estará disponível em: **http://localhost:8000**

## 📁 Estrutura de Pastas

```
ViajandoComOsPaixao/
├── main.py                 # Aplicação FastAPI principal
├── requirements.txt        # Dependências Python
├── .env                   # Configurações (crie a partir de .env.example)
├── .env.example           # Exemplo de configurações
├── README.md              # Este arquivo
├── database.json          # Banco de dados (criado automaticamente)
├── static/
│   ├── css/
│   │   └── style.css      # Estilos da aplicação
│   ├── js/
│   │   └── main.js        # JavaScript principal
│   └── img/
│       └── (imagens do site)
├── templates/
│   ├── index.html         # Página inicial
│   ├── galeria.html       # Galeria de fotos
│   ├── videos.html        # Galeria de vídeos
│   ├── sobre.html         # Página sobre nós
│   └── admin.html         # Painel administrativo
├── uploads/
│   ├── fotos/            # Fotos dos posts
│   └── videos/           # Vídeos dos posts
└── public/                # Arquivos públicos
```

## 🎯 Como Usar

### 1. Primeira Visita

1. Acesse http://localhost:8000
2. Clique em "Login"
3. Clique na aba "Registrar"
4. Crie sua conta com email e senha

### 2. Criar um Post

1. Faça login
2. Clique em "Admin" na barra de navegação
3. Clique em "Criar Novo Post"
4. Preencha:
   - Título da viagem
   - Descrição detalhada
   - Local/País
   - Data da viagem
   - Adicione fotos e vídeos
5. Clique "Publicar Post"

### 3. Editar ou Deletar Posts

1. Acesse o painel "Admin"
2. Clique em "Meus Posts" ou "Editar Posts"
3. Selecione o post que deseja modificar
4. Faça as alterações e clique "Salvar Alterações"

### 4. Visualizar Galeriachobi

1. Clique em "Galeria" para ver todas as fotos
2. Use os filtros para buscar por local ou país
3. Clique em uma foto para vê-la em tamanho grande

### 5. Assistir Vídeos

1. Clique em "Vídeos"
2. Os vídeos podem ser reproduzidos direto na página

## 🔐 Segurança

- As senhas são armazenadas com hash (não em texto plano)
- Os tokens JWT expiram após 24 horas
- Apenas usuários autenticados podem criar posts
- Os uploads são validados (tamanho e tipo de arquivo)

## 🌐 APIs Integradas

### Open-Meteo (Clima)
- **Sem necessidade de autenticação**
- Fornece dados de clima em tempo real
- Usado para mostrar clima dos locais visitados

### Mapa Leaflet (Maps)
- Estrutura pronta para integração de mapas
- Mostra localização dos destinos

## 📸 Formatos Suportados

**Fotos:**
- JPG, JPEG, PNG, WebP
- Máximo: 10MB por arquivo

**Vídeos:**
- MP4, WebM
- Máximo: 100MB por arquivo

## 🎨 Personalização

### Cores

Edite as variáveis CSS em `static/css/style.css`:

```css
:root {
    --primary-color: #FF6B6B;      /* Vermelho vibrante */
    --secondary-color: #4ECDC4;    /* Turquesa */
    --accent-color: #FFE66D;       /* Amarelo */
}
```

### Logo e Textos

Edite os templates HTML em `templates/` para mudar:
- Títulos
- Descrições
- Logo (emoji ou imagem)

## 🐛 Troubleshooting

### "Connection refused" ao acessar localhost

- Certifique-se de que o servidor está rodando
- Execute novamente: `python main.py`

### Erro ao fazer upload de arquivos

- Verifique o tamanho do arquivo (máximo 10MB para fotos, 100MB para vídeos)
- Verifique se a pasta `uploads/` existe
- Permissões de escrita na pasta

### Erro 401 ao acessar admin

- Você precisa estar logado
- Se já está logado, o token pode ter expirado
- Faça logout e login novamente

### Banco de dados corrompido

- Delete o arquivo `database.json` (será recriado)
- **AVISO**: Isso deletará todos os posts!

## 📝 Dicas

- Use descrições detalhadas e interessantes para seus posts
- Adicione múltiplas fotos de ângulos diferentes
- Crie vídeos curtos (30-60 segundos) para melhores resultados
- Sempre indique o país e a cidade no campo "Local/País"

## 🚢 Deploy (Colocar na Internet)

Para colocar o site online, você pode usar:

### Opção 1: Render.com
1. Crie conta em render.com
2. Conecte seu repositório GitHub
3. Defina o comando: `python main.py`

### Opção 2: Railway.app
1. Crie conta em railway.app
2. Conecte seu repositório
3. Defina o comando de start

### Opção 3: Heroku
```bash
heroku login
heroku create seu-app-name
git push heroku main
```

## 📞 Suporte

Para problemas ou sugestões, verifique:
- Se as dependências foram instaladas corretamente
- Se o `.env` está configurado
- Se Python está instalado corretamente

## 📄 Licença

Este projeto é fornecido como está, para uso pessoal e familiar.

---

**Desenvolvido com ❤️ para famílias viajantes!**

Bom compartilhamento de memórias! ✈️🌍📸
