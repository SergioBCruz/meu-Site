from fastapi import FastAPI, UploadFile, File, HTTPException, Form, Depends, status, Request
from fastapi.responses import HTMLResponse, FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.security import HTTPBearer
from pydantic import BaseModel, EmailStr
from typing import Optional, List
import os
import json
import secrets
import hashlib
from datetime import datetime, timedelta
from pathlib import Path
import shutil
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import jwt
from PIL import Image
import io
import base64

# ==================== INICIALIZAÇÃO ====================

app = FastAPI(title="Viajando com os Paixão")

# Montar arquivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Configurações
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
(UPLOAD_DIR / "fotos").mkdir(exist_ok=True)
(UPLOAD_DIR / "videos").mkdir(exist_ok=True)

SECRET_KEY = "sua_chave_secreta_super_segura_aqui_2024"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440  # 24 horas

# ==================== MODELOS ====================

class Usuario(BaseModel):
    email: str
    senha: str

class RegistroUsuario(BaseModel):
    email: str
    senha: str
    nome: str

class Post(BaseModel):
    titulo: str
    descricao: str
    localizacao: Optional[str] = None
    pais: Optional[str] = None
    data_viagem: Optional[str] = None

class Comentario(BaseModel):
    texto: str
    nome: str
    email: str

# ==================== BANCO DE DADOS SIMPLES ====================

def carregar_usuarios():
    if Path("usuarios.json").exists():
        with open("usuarios.json", "r") as f:
            return json.load(f)
    return {}

def salvar_usuarios(usuarios):
    with open("usuarios.json", "w") as f:
        json.dump(usuarios, f, indent=2)

def carregar_posts():
    if Path("posts.json").exists():
        with open("posts.json", "r") as f:
            return json.load(f)
    return []

def salvar_posts(posts):
    with open("posts.json", "w") as f:
        json.dump(posts, f, indent=2)

def carregar_comentarios():
    if Path("comentarios.json").exists():
        with open("comentarios.json", "r") as f:
            return json.load(f)
    return []

def salvar_comentarios(comentarios):
    with open("comentarios.json", "w") as f:
        json.dump(comentarios, f, indent=2)

# ==================== SEGURANÇA & AUTENTICAÇÃO ====================

def hash_senha(senha: str) -> str:
    return hashlib.sha256(senha.encode()).hexdigest()

def criar_token_acesso(email: str) -> str:
    payload = {
        "sub": email,
        "exp": datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES),
        "iat": datetime.utcnow()
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

def verificar_token(token: str) -> str:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Token inválido")
        return email
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Token inválido")

def get_usuario_autenticado(request: Request):
    """Extrai e valida o token do header Authorization"""
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Não autorizado")
    
    token = auth_header.split(" ")[1]
    return verificar_token(token)

# ==================== ROTAS PÚBLICAS ====================

@app.get("/", response_class=HTMLResponse)
async def index():
    with open("templates/index.html", "r", encoding="utf-8") as f:
        return f.read()

@app.get("/galeria", response_class=HTMLResponse)
async def galeria():
    with open("templates/galeria.html", "r", encoding="utf-8") as f:
        return f.read()

@app.get("/videos", response_class=HTMLResponse)
async def videos():
    with open("templates/videos.html", "r", encoding="utf-8") as f:
        return f.read()

@app.get("/sobre", response_class=HTMLResponse)
async def sobre():
    with open("templates/sobre.html", "r", encoding="utf-8") as f:
        return f.read()

@app.get("/admin", response_class=HTMLResponse)
async def admin():
    with open("templates/admin.html", "r", encoding="utf-8") as f:
        return f.read()

# ==================== API DE AUTENTICAÇÃO ====================

@app.post("/api/registrar")
async def registrar(dados: RegistroUsuario):
    usuarios = carregar_usuarios()
    
    if dados.email in usuarios:
        raise HTTPException(status_code=400, detail="Email já registrado")
    
    usuarios[dados.email] = {
        "nome": dados.nome,
        "senha": hash_senha(dados.senha),
        "data_criacao": datetime.now().isoformat()
    }
    
    salvar_usuarios(usuarios)
    
    token = criar_token_acesso(dados.email)
    return {
        "sucesso": True,
        "token": token,
        "mensagem": "Usuário registrado com sucesso!"
    }

@app.post("/api/login")
async def login(dados: Usuario):
    usuarios = carregar_usuarios()
    
    if dados.email not in usuarios:
        raise HTTPException(status_code=401, detail="Email ou senha incorretos")
    
    usuario = usuarios[dados.email]
    if usuario["senha"] != hash_senha(dados.senha):
        raise HTTPException(status_code=401, detail="Email ou senha incorretos")
    
    token = criar_token_acesso(dados.email)
    return {
        "sucesso": True,
        "token": token,
        "nome": usuario["nome"],
        "email": dados.email
    }

@app.post("/api/verificar-token")
async def verificar_token_endpoint(request: Request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return {"valido": False}
    
    try:
        token = auth_header.split(" ")[1]
        email = verificar_token(token)
        usuarios = carregar_usuarios()
        return {
            "valido": True,
            "email": email,
            "nome": usuarios[email]["nome"]
        }
    except:
        return {"valido": False}

# ==================== API DE POSTS ====================

@app.get("/api/posts")
async def obter_posts():
    posts = carregar_posts()
    return {"posts": posts, "total": len(posts)}

@app.get("/api/posts/{post_id}")
async def obter_post(post_id: int):
    posts = carregar_posts()
    if post_id < len(posts):
        return posts[post_id]
    raise HTTPException(status_code=404, detail="Post não encontrado")

@app.post("/api/posts")
async def criar_post(
    post: Post,
    email: str = Depends(get_usuario_autenticado)
):
    posts = carregar_posts()
    
    novo_post = {
        "id": len(posts),
        "titulo": post.titulo,
        "descricao": post.descricao,
        "localizacao": post.localizacao,
        "pais": post.pais,
        "data_viagem": post.data_viagem,
        "email": email,
        "data_criacao": datetime.now().isoformat(),
        "fotos": [],
        "videos": [],
        "likes": 0,
        "comentarios": []
    }
    
    posts.append(novo_post)
    salvar_posts(posts)
    
    return {"sucesso": True, "id": novo_post["id"]}

@app.put("/api/posts/{post_id}")
async def atualizar_post(
    post_id: int,
    post: Post,
    email: str = Depends(get_usuario_autenticado)
):
    posts = carregar_posts()
    
    if post_id >= len(posts):
        raise HTTPException(status_code=404, detail="Post não encontrado")
    
    if posts[post_id]["email"] != email:
        raise HTTPException(status_code=403, detail="Sem permissão")
    
    posts[post_id].update({
        "titulo": post.titulo,
        "descricao": post.descricao,
        "localizacao": post.localizacao,
        "pais": post.pais,
        "data_viagem": post.data_viagem
    })
    
    salvar_posts(posts)
    return {"sucesso": True}

@app.delete("/api/posts/{post_id}")
async def deletar_post(
    post_id: int,
    email: str = Depends(get_usuario_autenticado)
):
    posts = carregar_posts()
    
    if post_id >= len(posts):
        raise HTTPException(status_code=404, detail="Post não encontrado")
    
    if posts[post_id]["email"] != email:
        raise HTTPException(status_code=403, detail="Sem permissão")
    
    # Deletar arquivos associados
    post = posts[post_id]
    for foto in post.get("fotos", []):
        caminho = Path("uploads") / foto
        if caminho.exists():
            caminho.unlink()
    
    posts.pop(post_id)
    # Reindexar
    for i, p in enumerate(posts):
        p["id"] = i
    
    salvar_posts(posts)
    return {"sucesso": True}

# ==================== UPLOAD DE MÍDIA ====================

@app.post("/api/upload-foto/{post_id}")
async def upload_foto(
    post_id: int,
    arquivo: UploadFile = File(...),
    email: str = Depends(get_usuario_autenticado)
):
    posts = carregar_posts()
    
    if post_id >= len(posts):
        raise HTTPException(status_code=404, detail="Post não encontrado")
    
    if posts[post_id]["email"] != email:
        raise HTTPException(status_code=403, detail="Sem permissão")
    
    # Validar arquivo
    if not arquivo.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Arquivo deve ser uma imagem")
    
    if arquivo.size > 10 * 1024 * 1024:  # 10MB
        raise HTTPException(status_code=400, detail="Arquivo muito grande")
    
    # Salvar arquivo
    nome_arquivo = f"fotos/{secrets.token_hex(8)}_{arquivo.filename}"
    caminho_completo = UPLOAD_DIR / nome_arquivo
    
    conteudo = await arquivo.read()
    
    # Otimizar imagem
    img = Image.open(io.BytesIO(conteudo))
    img.thumbnail((1200, 1200), Image.Resampling.LANCZOS)
    img.save(caminho_completo, quality=85, optimize=True)
    
    posts[post_id]["fotos"].append(nome_arquivo)
    salvar_posts(posts)
    
    return {
        "sucesso": True,
        "url": f"/uploads/{nome_arquivo}",
        "nome": nome_arquivo
    }

@app.post("/api/upload-video/{post_id}")
async def upload_video(
    post_id: int,
    arquivo: UploadFile = File(...),
    email: str = Depends(get_usuario_autenticado)
):
    posts = carregar_posts()
    
    if post_id >= len(posts):
        raise HTTPException(status_code=404, detail="Post não encontrado")
    
    if posts[post_id]["email"] != email:
        raise HTTPException(status_code=403, detail="Sem permissão")
    
    # Validar arquivo
    formatos_permitidos = ["video/mp4", "video/webm", "video/quicktime", "video/x-msvideo"]
    if arquivo.content_type not in formatos_permitidos:
        raise HTTPException(status_code=400, detail="Formato de vídeo não suportado")
    
    if arquivo.size > 100 * 1024 * 1024:  # 100MB
        raise HTTPException(status_code=400, detail="Vídeo muito grande")
    
    # Salvar arquivo
    nome_arquivo = f"videos/{secrets.token_hex(8)}_{arquivo.filename}"
    caminho_completo = UPLOAD_DIR / nome_arquivo
    
    conteudo = await arquivo.read()
    with open(caminho_completo, "wb") as f:
        f.write(conteudo)
    
    posts[post_id]["videos"].append(nome_arquivo)
    salvar_posts(posts)
    
    return {
        "sucesso": True,
        "url": f"/uploads/{nome_arquivo}",
        "nome": nome_arquivo
    }

@app.delete("/api/deletar-foto/{post_id}/{foto_index}")
async def deletar_foto(
    post_id: int,
    foto_index: int,
    email: str = Depends(get_usuario_autenticado)
):
    posts = carregar_posts()
    
    if post_id >= len(posts):
        raise HTTPException(status_code=404, detail="Post não encontrado")
    
    if posts[post_id]["email"] != email:
        raise HTTPException(status_code=403, detail="Sem permissão")
    
    if foto_index >= len(posts[post_id]["fotos"]):
        raise HTTPException(status_code=404, detail="Foto não encontrada")
    
    foto = posts[post_id]["fotos"].pop(foto_index)
    caminho = Path("uploads") / foto
    if caminho.exists():
        caminho.unlink()
    
    salvar_posts(posts)
    return {"sucesso": True}

# ==================== API DE COMENTÁRIOS ====================

@app.get("/api/comentarios/{post_id}")
async def obter_comentarios(post_id: int):
    posts = carregar_posts()
    if post_id < len(posts):
        return {"comentarios": posts[post_id].get("comentarios", [])}
    raise HTTPException(status_code=404, detail="Post não encontrado")

@app.post("/api/comentarios/{post_id}")
async def adicionar_comentario(post_id: int, comentario: Comentario):
    posts = carregar_posts()
    
    if post_id >= len(posts):
        raise HTTPException(status_code=404, detail="Post não encontrado")
    
    novo_comentario = {
        "id": len(posts[post_id].get("comentarios", [])),
        "nome": comentario.nome,
        "email": comentario.email,
        "texto": comentario.texto,
        "data": datetime.now().isoformat()
    }
    
    posts[post_id]["comentarios"].append(novo_comentario)
    salvar_posts(posts)
    
    return {"sucesso": True, "comentario": novo_comentario}

# ==================== API DE LIKES ====================

@app.post("/api/likes/{post_id}")
async def dar_like(post_id: int):
    posts = carregar_posts()
    
    if post_id >= len(posts):
        raise HTTPException(status_code=404, detail="Post não encontrado")
    
    posts[post_id]["likes"] += 1
    salvar_posts(posts)
    
    return {"likes": posts[post_id]["likes"]}

# ==================== INTEGRAÇÃO COM APIs EXTERNAS ====================

@app.get("/api/clima/{cidade}")
async def obter_clima(cidade: str):
    """Integração com Open-Meteo API (sem chave necessária)"""
    import httpx
    
    try:
        # Geocodificar cidade
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://geocoding-api.open-meteo.com/v1/search",
                params={"name": cidade, "count": 1, "language": "pt"}
            )
            
            if response.status_code != 200:
                return {"erro": "Cidade não encontrada"}
            
            dados = response.json()
            if "results" not in dados or len(dados["results"]) == 0:
                return {"erro": "Cidade não encontrada"}
            
            local = dados["results"][0]
            lat, lon = local["latitude"], local["longitude"]
            
            # Obter clima
            climate_response = await client.get(
                "https://api.open-meteo.com/v1/forecast",
                params={
                    "latitude": lat,
                    "longitude": lon,
                    "current": "temperature_2m,weather_code,wind_speed_10m",
                    "timezone": "auto"
                }
            )
            
            clima_data = climate_response.json()
            
            return {
                "cidade": f"{local['name']}, {local.get('admin1', '')} - {local['country']}",
                "temperatura": clima_data["current"]["temperature_2m"],
                "clima": clima_data["current"]["weather_code"],
                "vento": clima_data["current"]["wind_speed_10m"]
            }
    except Exception as e:
        return {"erro": str(e)}

@app.get("/api/mapa/{cidade}")
async def obter_coordenadas_mapa(cidade: str):
    """Retorna coordenadas para integração com mapas"""
    import httpx
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://geocoding-api.open-meteo.com/v1/search",
                params={"name": cidade, "count": 1, "language": "pt"}
            )
            
            dados = response.json()
            if "results" not in dados or len(dados["results"]) == 0:
                return {"erro": "Cidade não encontrada"}
            
            local = dados["results"][0]
            
            return {
                "lat": local["latitude"],
                "lng": local["longitude"],
                "nome": f"{local['name']}, {local.get('admin1', '')}, {local['country']}"
            }
    except Exception as e:
        return {"erro": str(e)}

# ==================== TESTE ====================

@app.get("/api/teste")
async def teste():
    return {"mensagem": "API funcionando corretamente!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
