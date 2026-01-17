# Blog FastAPI 📝

Um blog simples e funcional desenvolvido com **FastAPI** e **SQLite**.

## 🚀 Como Executar

### 1. Instalar Dependências (já feito)
```bash
pip install -r requirements.txt
```

### 2. Rodar o Servidor
```bash
python main.py
```

Ou com uvicorn diretamente:
```bash
uvicorn main:app --reload
```

O servidor estará disponível em: **http://localhost:8000**

## 📚 Documentação Interativa

Acesse a documentação interativa em:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 📋 Endpoints Disponíveis

### Posts
- `GET /posts` - Lista todos os posts
- `POST /posts` - Cria um novo post
- `GET /posts/{id}` - Obtém um post específico
- `PUT /posts/{id}` - Atualiza um post
- `DELETE /posts/{id}` - Deleta um post

### Comentários
- `POST /posts/{post_id}/comentarios` - Adiciona comentário a um post
- `GET /posts/{post_id}/comentarios` - Lista comentários de um post
- `DELETE /comentarios/{comentario_id}` - Deleta um comentário

### Gerais
- `GET /` - Página inicial
- `GET /health` - Verifica saúde da API

## 💾 Banco de Dados

O banco de dados SQLite é criado automaticamente na primeira execução (`blog.db`).

### Tabelas:
- **posts** - Armazena os posts do blog
- **comentarios** - Armazena comentários nos posts

## 📝 Exemplo de Uso

### Criar um Post
```json
POST /posts
{
  "titulo": "Meu Primeiro Post",
  "conteudo": "Este é o conteúdo do meu primeiro post",
  "autor": "Seu Nome"
}
```

### Adicionar Comentário
```json
POST /posts/1/comentarios
{
  "texto": "Ótimo post!",
  "autor": "Leitor"
}
```

## 📁 Estrutura do Projeto

```
BlogFastAPI/
├── main.py          # Aplicação FastAPI principal
├── models.py        # Modelos do banco de dados
├── schemas.py       # Schemas Pydantic (validação)
├── database.py      # Configuração do banco de dados
├── requirements.txt # Dependências
└── templates/       # Pasta para templates HTML (futuro)
```

## 🛠️ Tecnologias

- **FastAPI** - Framework web moderno
- **SQLAlchemy** - ORM para banco de dados
- **Pydantic** - Validação de dados
- **Uvicorn** - Servidor ASGI
- **SQLite** - Banco de dados leve

## 📦 Próximos Passos (Opcional)

- Adicionar autenticação com JWT
- Criar frontend HTML/CSS/JavaScript
- Adicionar busca de posts
- Implementar paginação
- Adicionar tags nos posts

---

Desenvolvido com FastAPI 🚀
