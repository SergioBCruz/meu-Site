from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.responses import HTMLResponse, FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Optional
import os
import re
import json
from datetime import datetime, timedelta
from pathlib import Path
import shutil
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.utils import formatdate
from email import encoders
from PIL import Image, ImageDraw, ImageFont
import io
import base64

# Inicialização da aplicação
app = FastAPI(title="Sistema Web de Personalização de Sacolas")

# Configurações
UPLOAD_DIR = Path("uploads")
GENERATED_DIR = Path("generated")
UPLOAD_DIR.mkdir(exist_ok=True)
GENERATED_DIR.mkdir(exist_ok=True)

# Montar arquivos estáticos
app.mount("/static", StaticFiles(directory="static"), name="static")

# ==================== MODELOS ====================

class PedidoIdentificacao(BaseModel):
    id_pedido: str

class PersonalizacaoContato(BaseModel):
    id_pedido: str
    instagram: Optional[str] = None
    whatsapp: Optional[str] = None
    usar_instagram: bool = False
    usar_whatsapp: bool = False

class PersonalizacaoEstrutura(BaseModel):
    id_pedido: str
    frase_ou_logo: str  # "frase" ou "logo"
    frase_personalizada: Optional[str] = None
    opcoes_alca: str  # opção de frase na alça

class PedidoData(BaseModel):
    id_pedido: str
    logo_path: Optional[str] = None
    instagram: Optional[str] = None
    whatsapp: Optional[str] = None
    usar_instagram: bool = False
    usar_whatsapp: bool = False
    frase_ou_logo: str = "logo"
    frase_personalizada: Optional[str] = None
    opcoes_alca: str = "padrão"
    data_criacao: str

# ==================== VALIDAÇÕES ====================

def validar_id_pedido(id_pedido: str) -> bool:
    """
    Valida se o ID do pedido tem formato correto:
    - Começa com AAMMDD (data)
    - Total de 14 dígitos
    """
    if len(id_pedido) != 14:
        return False
    
    if not id_pedido.isdigit():
        return False
    
    # Validar formato de data nos 6 primeiros dígitos
    ano = int(id_pedido[:2])
    mes = int(id_pedido[2:4])
    dia = int(id_pedido[4:6])
    
    # Validações básicas de data
    if mes < 1 or mes > 12:
        return False
    if dia < 1 or dia > 31:
        return False
    
    return True

def validar_whatsapp(whatsapp: str) -> bool:
    """Validar formato WhatsApp: (XX) 9XXXX-XXXX"""
    pattern = r'^\(\d{2}\)\s9\d{4}-\d{4}$'
    return bool(re.match(pattern, whatsapp))

# ==================== GERENCIAMENTO DE PEDIDOS ====================

def obter_caminho_pedido(id_pedido: str) -> dict:
    """Retorna caminhos para os arquivos do pedido"""
    pedido_dir = GENERATED_DIR / id_pedido
    return {
        "dir": pedido_dir,
        "dados": pedido_dir / "dados.json",
        "mockup": pedido_dir / "mockup.png",
        "final": pedido_dir / "final.png"
    }

def criar_ou_carregar_pedido(id_pedido: str) -> dict:
    """Cria ou carrega dados de um pedido existente"""
    caminhos = obter_caminho_pedido(id_pedido)
    caminhos["dir"].mkdir(parents=True, exist_ok=True)
    
    if caminhos["dados"].exists():
        with open(caminhos["dados"], "r") as f:
            return json.load(f)
    else:
        novo_pedido = {
            "id_pedido": id_pedido,
            "logo_path": None,
            "instagram": None,
            "whatsapp": None,
            "usar_instagram": False,
            "usar_whatsapp": False,
            "frase_ou_logo": "logo",
            "frase_personalizada": None,
            "opcoes_alca": "padrão",
            "data_criacao": datetime.now().isoformat()
        }
        salvar_pedido(novo_pedido)
        return novo_pedido

def salvar_pedido(dados_pedido: dict):
    """Salva dados do pedido em JSON"""
    caminhos = obter_caminho_pedido(dados_pedido["id_pedido"])
    with open(caminhos["dados"], "w") as f:
        json.dump(dados_pedido, f, indent=2, ensure_ascii=False)

# ==================== GERAÇÃO DE MOCKUP ====================

def gerar_mockup(dados_pedido: dict) -> str:
    """
    Gera um mockup realista da sacola com simulação de papel fosco
    """
    # Dimensões da sacola (simulada)
    largura = 800
    altura = 1000
    
    # Criar imagem com textura de papel
    img = Image.new("RGB", (largura, altura), color=(245, 242, 238))  # Cor paper offset
    draw = ImageDraw.Draw(img, "RGBA")
    
    # Adicionar textura sutil (papel fosco)
    pixels = img.load()
    import random
    random.seed(42)  # Sempre mesma textura
    for i in range(0, largura, 5):
        for j in range(0, altura, 5):
            variacao = random.randint(-5, 5)
            try:
                r, g, b = pixels[i, j]
                pixels[i, j] = (max(0, min(255, r+variacao)), 
                               max(0, min(255, g+variacao)),
                               max(0, min(255, b+variacao)))
            except:
                pass
    
    # Área nobre (frente da sacola) - com margem
    margem = 80
    area_nobre_top = 100
    area_nobre_altura = 400
    
    # Desenhar borda sutil
    draw.rectangle(
        [(margem, area_nobre_top), (largura - margem, area_nobre_top + area_nobre_altura)],
        outline=(200, 190, 180),
        width=2
    )
    
    # Adicionar logotipo se existir
    if dados_pedido.get("logo_path") and os.path.exists(dados_pedido["logo_path"]):
        try:
            logo = Image.open(dados_pedido["logo_path"]).convert("RGBA")
            # Redimensionar logo para caber bem
            max_logo_altura = 150
            ratio = max_logo_altura / logo.height
            novo_tamanho = (int(logo.width * ratio), max_logo_altura)
            logo.thumbnail(novo_tamanho, Image.Resampling.LANCZOS)
            
            # Posicionar no centro superior da área nobre
            logo_x = (largura - logo.width) // 2
            logo_y = area_nobre_top + 30
            img.paste(logo, (logo_x, logo_y), logo)
        except:
            pass
    
    # Adicionar frase personalizada se escolhida
    if dados_pedido.get("frase_ou_logo") == "frase" and dados_pedido.get("frase_personalizada"):
        try:
            font = ImageFont.truetype("arial.ttf", 28)
        except:
            font = ImageFont.load_default()
        
        frase = dados_pedido["frase_personalizada"]
        bbox = draw.textbbox((0, 0), frase, font=font)
        texto_width = bbox[2] - bbox[0]
        texto_x = (largura - texto_width) // 2
        texto_y = area_nobre_top + 180
        
        # Texto com cor integrada (não "plástica")
        draw.text((texto_x, texto_y), frase, fill=(80, 70, 60), font=font)
    
    # Área de contato (rodapé)
    rodape_y = altura - 150
    contatos_text = ""
    
    if dados_pedido.get("usar_instagram") and dados_pedido.get("instagram"):
        contatos_text += f"📱 {dados_pedido['instagram']}\n"
    
    if dados_pedido.get("usar_whatsapp") and dados_pedido.get("whatsapp"):
        contatos_text += f"💬 {dados_pedido['whatsapp']}"
    
    if contatos_text:
        try:
            font_pequena = ImageFont.truetype("arial.ttf", 16)
        except:
            font_pequena = ImageFont.load_default()
        
        draw.text((margem + 20, rodape_y), contatos_text, fill=(100, 90, 80), font=font_pequena)
    
    # Informação legal no fundo
    try:
        font_legal = ImageFont.truetype("arial.ttf", 10)
    except:
        font_legal = ImageFont.load_default()
    
    legal_text = "Embalagem produzida por Lografic | Personalização Web-to-Print"
    draw.text((margem, altura - 30), legal_text, fill=(180, 170, 160), font=font_legal)
    
    # Salvar mockup
    caminhos = obter_caminho_pedido(dados_pedido["id_pedido"])
    mockup_path = str(caminhos["mockup"])
    img.save(mockup_path, quality=95)
    
    return mockup_path

# ==================== ROTAS ====================

@app.get("/", response_class=HTMLResponse)
async def index():
    """Serve a página inicial"""
    with open("templates/index.html", "r", encoding="utf-8") as f:
        return f.read()

@app.post("/api/validar-pedido")
async def validar_pedido(dados: PedidoIdentificacao):
    """Passo 1: Validação do ID do pedido"""
    if not validar_id_pedido(dados.id_pedido):
        return JSONResponse(
            status_code=400,
            content={
                "valido": False,
                "erro": "ID do pedido deve conter 14 dígitos no formato AAMMDD + 8 dígitos. Ex: 26011412345678"
            }
        )
    
    # Criar ou carregar pedido
    pedido = criar_ou_carregar_pedido(dados.id_pedido)
    
    return JSONResponse(
        status_code=200,
        content={
            "valido": True,
            "id_pedido": dados.id_pedido,
            "mensagem": f"Pedido {dados.id_pedido} carregado com sucesso!"
        }
    )

@app.post("/api/upload-logo")
async def upload_logo(id_pedido: str = Form(...), arquivo: UploadFile = File(...)):
    """Passo 2: Upload do logotipo"""
    if not validar_id_pedido(id_pedido):
        raise HTTPException(status_code=400, detail="ID do pedido inválido")
    
    # Validar extensão
    extensoes_permitidas = {".png", ".jpg", ".jpeg", ".svg", ".webp"}
    extensao = Path(arquivo.filename).suffix.lower()
    
    if extensao not in extensoes_permitidas:
        raise HTTPException(status_code=400, detail="Formato de arquivo não permitido")
    
    # Salvar arquivo
    pedido_dir = UPLOAD_DIR / id_pedido
    pedido_dir.mkdir(parents=True, exist_ok=True)
    
    logo_path = pedido_dir / f"logo{extensao}"
    
    with open(logo_path, "wb") as f:
        conteudo = await arquivo.read()
        f.write(conteudo)
    
    # Atualizar dados do pedido
    pedido = criar_ou_carregar_pedido(id_pedido)
    pedido["logo_path"] = str(logo_path)
    salvar_pedido(pedido)
    
    # Gerar preview do mockup
    mockup_path = gerar_mockup(pedido)
    
    return JSONResponse(
        status_code=200,
        content={
            "sucesso": True,
            "logo_path": str(logo_path),
            "mockup_preview": f"/api/mockup-preview/{id_pedido}"
        }
    )

@app.post("/api/salvar-contato")
async def salvar_contato(dados: PersonalizacaoContato):
    """Passo 3: Salvar dados de contato"""
    if not validar_id_pedido(dados.id_pedido):
        raise HTTPException(status_code=400, detail="ID do pedido inválido")
    
    # Validar WhatsApp se for usado
    if dados.usar_whatsapp and dados.whatsapp:
        if not validar_whatsapp(dados.whatsapp):
            raise HTTPException(status_code=400, detail="Formato de WhatsApp inválido. Use: (XX) 9XXXX-XXXX")
    
    # Atualizar pedido
    pedido = criar_ou_carregar_pedido(dados.id_pedido)
    pedido["usar_instagram"] = dados.usar_instagram
    pedido["instagram"] = dados.instagram if dados.usar_instagram else None
    pedido["usar_whatsapp"] = dados.usar_whatsapp
    pedido["whatsapp"] = dados.whatsapp if dados.usar_whatsapp else None
    
    salvar_pedido(pedido)
    
    # Gerar novo mockup
    gerar_mockup(pedido)
    
    return JSONResponse(
        status_code=200,
        content={
            "sucesso": True,
            "mensagem": "Dados de contato salvos com sucesso!",
            "mockup_preview": f"/api/mockup-preview/{dados.id_pedido}"
        }
    )

@app.post("/api/salvar-estrutura")
async def salvar_estrutura(dados: PersonalizacaoEstrutura):
    """Passo 4: Salvar personalização estrutural"""
    if not validar_id_pedido(dados.id_pedido):
        raise HTTPException(status_code=400, detail="ID do pedido inválido")
    
    pedido = criar_ou_carregar_pedido(dados.id_pedido)
    pedido["frase_ou_logo"] = dados.frase_ou_logo
    pedido["frase_personalizada"] = dados.frase_personalizada
    pedido["opcoes_alca"] = dados.opcoes_alca
    
    salvar_pedido(pedido)
    
    # Gerar mockup final
    gerar_mockup(pedido)
    
    return JSONResponse(
        status_code=200,
        content={
            "sucesso": True,
            "mensagem": "Personalização estrutural salva!"
        }
    )

@app.get("/api/mockup-preview/{id_pedido}")
async def mockup_preview(id_pedido: str):
    """Retorna preview do mockup como imagem"""
    if not validar_id_pedido(id_pedido):
        raise HTTPException(status_code=400, detail="ID do pedido inválido")
    
    caminhos = obter_caminho_pedido(id_pedido)
    
    if not caminhos["mockup"].exists():
        raise HTTPException(status_code=404, detail="Mockup não encontrado")
    
    return FileResponse(caminhos["mockup"], media_type="image/png")

@app.post("/api/aprovar-arte")
async def aprovar_arte(id_pedido: str = Form(...)):
    """Passo final: Aprovação e geração de arquivos finais"""
    if not validar_id_pedido(id_pedido):
        raise HTTPException(status_code=400, detail="ID do pedido inválido")
    
    pedido = criar_ou_carregar_pedido(id_pedido)
    caminhos = obter_caminho_pedido(id_pedido)
    
    # Copiar mockup como arquivo final
    if caminhos["mockup"].exists():
        shutil.copy2(caminhos["mockup"], caminhos["final"])
    
    # Gerar também em JPEG para impressão
    if caminhos["mockup"].exists():
        img = Image.open(caminhos["mockup"])
        img = img.convert("RGB")
        img.save(str(caminhos["dir"] / "final.jpg"), quality=95)
    
    # Enviar email automático
    try:
        enviar_email_producao(pedido, caminhos)
        email_enviado = True
    except Exception as e:
        email_enviado = False
        print(f"Erro ao enviar email: {e}")
    
    # Calcular data de postagem
    data_criacao = datetime.fromisoformat(pedido["data_criacao"])
    data_postagem = data_criacao + timedelta(days=4)
    
    return JSONResponse(
        status_code=200,
        content={
            "sucesso": True,
            "mensagem": f"Arte aprovada! Sua sacola será postada em {data_postagem.strftime('%d/%m/%Y')}",
            "email_enviado": email_enviado,
            "arquivos_disponivel": {
                "png": f"/api/download/{id_pedido}/final.png",
                "jpg": f"/api/download/{id_pedido}/final.jpg"
            }
        }
    )

@app.get("/api/download/{id_pedido}/{arquivo}")
async def download_arquivo(id_pedido: str, arquivo: str):
    """Download dos arquivos gerados"""
    if not validar_id_pedido(id_pedido):
        raise HTTPException(status_code=400, detail="ID do pedido inválido")
    
    caminhos = obter_caminho_pedido(id_pedido)
    arquivo_path = caminhos["dir"] / arquivo
    
    if not arquivo_path.exists():
        raise HTTPException(status_code=404, detail="Arquivo não encontrado")
    
    return FileResponse(
        arquivo_path,
        media_type="image/png" if arquivo.endswith(".png") else "image/jpeg",
        filename=f"{id_pedido}_{arquivo}"
    )

def enviar_email_producao(pedido: dict, caminhos: dict):
    """Envia email automático para o administrador com os arquivos"""
    # Configurar credenciais (use variáveis de ambiente em produção)
    SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
    EMAIL_USUARIO = os.getenv("EMAIL_USUARIO", "seu_email@gmail.com")
    EMAIL_SENHA = os.getenv("EMAIL_SENHA", "sua_senha_app")
    EMAIL_ADMIN = os.getenv("EMAIL_ADMIN", "admin@lografic.com.br")
    
    # Criar mensagem
    msg = MIMEMultipart()
    msg["From"] = EMAIL_USUARIO
    msg["To"] = EMAIL_ADMIN
    msg["Date"] = formatdate(localtime=True)
    msg["Subject"] = f"[{pedido['id_pedido']}] - Arquivos para Produção"
    
    # Corpo do email
    corpo = f"""
    <html>
        <body style="font-family: Arial, sans-serif;">
            <h2>Novo Pedido de Sacola Personalizada - Aprovado para Produção</h2>
            
            <h3>Informações do Pedido:</h3>
            <p><strong>ID do Pedido:</strong> {pedido['id_pedido']}</p>
            <p><strong>Data de Criação:</strong> {datetime.fromisoformat(pedido['data_criacao']).strftime('%d/%m/%Y às %H:%M')}</p>
            
            <h3>Personalização:</h3>
            <ul>
                <li><strong>Tipo de destaque:</strong> {'Frase Personalizada' if pedido.get('frase_ou_logo') == 'frase' else 'Logotipo'}</li>
                {f"<li><strong>Frase:</strong> {pedido.get('frase_personalizada', 'N/A')}</li>" if pedido.get('frase_personalizada') else ""}
                {f"<li><strong>Instagram:</strong> {pedido.get('instagram', 'N/A')}</li>" if pedido.get('usar_instagram') else ""}
                {f"<li><strong>WhatsApp:</strong> {pedido.get('whatsapp', 'N/A')}</li>" if pedido.get('usar_whatsapp') else ""}
                <li><strong>Opção de Alça:</strong> {pedido.get('opcoes_alca', 'Padrão')}</li>
            </ul>
            
            <h3>Arquivos Anexados:</h3>
            <p>Os arquivos de impressão estão anexados em PNG e JPEG.</p>
            
            <p style="color: #666; font-size: 12px;">
                Email automático gerado pelo Sistema Web de Personalização de Sacolas - Lografic
            </p>
        </body>
    </html>
    """
    
    msg.attach(MIMEText(corpo, "html"))
    
    # Anexar arquivos
    for arquivo in [caminhos["dir"] / "final.png", caminhos["dir"] / "final.jpg"]:
        if arquivo.exists():
            with open(arquivo, "rb") as anexo:
                parte = MIMEBase("application", "octet-stream")
                parte.set_payload(anexo.read())
                encoders.encode_base64(parte)
                parte.add_header("Content-Disposition", f"attachment; filename= {arquivo.name}")
                msg.attach(parte)
    
    # Enviar email
    if EMAIL_USUARIO != "seu_email@gmail.com":  # Apenas se configurado
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(EMAIL_USUARIO, EMAIL_SENHA)
        server.sendmail(EMAIL_USUARIO, EMAIL_ADMIN, msg.as_string())
        server.quit()

# ==================== INICIALIZAÇÃO ====================

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
