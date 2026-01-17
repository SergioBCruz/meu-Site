from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.responses import HTMLResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from database import engine, get_db, Base
import models
import schemas
from typing import List
import os

# Criar as tabelas no banco de dados
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Blog FastAPI", version="1.0.0")

# Servir arquivos estáticos
static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

# ==================== POSTS ====================

@app.post("/api/posts", response_model=schemas.Post)
def criar_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    """Cria um novo post no blog"""
    db_post = models.Post(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post

@app.get("/api/posts", response_model=List[schemas.Post])
def listar_posts(db: Session = Depends(get_db)):
    """Lista todos os posts do blog"""
    posts = db.query(models.Post).all()
    return posts

@app.get("/api/posts/{post_id}", response_model=schemas.Post)
def obter_post(post_id: int, db: Session = Depends(get_db)):
    """Obtém um post específico pelo ID"""
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    return post

@app.put("/api/posts/{post_id}", response_model=schemas.Post)
def atualizar_post(post_id: int, post: schemas.PostCreate, db: Session = Depends(get_db)):
    """Atualiza um post existente"""
    db_post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    
    for key, value in post.dict().items():
        setattr(db_post, key, value)
    
    db.commit()
    db.refresh(db_post)
    return db_post

@app.delete("/api/posts/{post_id}")
def deletar_post(post_id: int, db: Session = Depends(get_db)):
    """Deleta um post"""
    db_post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    
    db.delete(db_post)
    db.commit()
    return {"mensagem": "Post deletado com sucesso"}

# ==================== COMENTÁRIOS ====================

@app.post("/api/posts/{post_id}/comentarios", response_model=schemas.Comentario)
def criar_comentario(post_id: int, comentario: schemas.ComentarioCreate, db: Session = Depends(get_db)):
    """Adiciona um comentário a um post"""
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post não encontrado")
    
    db_comentario = models.Comentario(post_id=post_id, **comentario.dict())
    db.add(db_comentario)
    db.commit()
    db.refresh(db_comentario)
    return db_comentario

@app.get("/api/posts/{post_id}/comentarios", response_model=List[schemas.Comentario])
def listar_comentarios(post_id: int, db: Session = Depends(get_db)):
    """Lista todos os comentários de um post"""
    comentarios = db.query(models.Comentario).filter(models.Comentario.post_id == post_id).all()
    return comentarios

@app.delete("/api/comentarios/{comentario_id}")
def deletar_comentario(comentario_id: int, db: Session = Depends(get_db)):
    """Deleta um comentário"""
    db_comentario = db.query(models.Comentario).filter(models.Comentario.id == comentario_id).first()
    if not db_comentario:
        raise HTTPException(status_code=404, detail="Comentário não encontrado")
    
    db.delete(db_comentario)
    db.commit()
    return {"mensagem": "Comentário deletado com sucesso"}

# ==================== ROTAS GERAIS ====================

@app.get("/", response_class=HTMLResponse)
def home():
    """Serve a página principal do blog"""
    template_path = os.path.join(os.path.dirname(__file__), "templates", "index.html")
    if os.path.exists(template_path):
        with open(template_path, 'r', encoding='utf-8') as f:
            return f.read()
    return "<h1>Blog FastAPI</h1><p>Templates não encontrados</p>"

@app.get("/health")
def health_check():
    """Verifica se a API está funcionando"""
    return {"status": "ok", "mensagem": "Servidor está rodando"}

@app.get("/api/stats")
def obter_estatisticas(db: Session = Depends(get_db)):
    """Retorna estatísticas do blog"""
    total_posts = db.query(models.Post).count()
    total_comentarios = db.query(models.Comentario).count()
    return {
        "total_posts": total_posts,
        "total_comentarios": total_comentarios
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
