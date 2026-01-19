"""
Arquivo de configuração para produção do Sistema de Personalização de Sacolas
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

class Settings:
    """Configurações gerais da aplicação"""
    
    # ==================== APLICAÇÃO ====================
    APP_NAME = "Sistema de Personalização de Sacolas"
    APP_VERSION = "1.0.0"
    ENV = os.getenv("ENV", "development")
    DEBUG = ENV == "development"
    
    # ==================== SERVIDOR ====================
    HOST = os.getenv("HOST", "0.0.0.0")
    PORT = int(os.getenv("PORT", "8000"))
    WORKERS = int(os.getenv("WORKERS", "1"))
    
    # ==================== CAMINHO DE ARQUIVOS ====================
    BASE_DIR = Path(__file__).parent
    UPLOAD_DIR = BASE_DIR / "uploads"
    GENERATED_DIR = BASE_DIR / "generated"
    TEMPLATE_DIR = BASE_DIR / "templates"
    STATIC_DIR = BASE_DIR / "static"
    
    # Criar diretórios se não existirem
    UPLOAD_DIR.mkdir(exist_ok=True)
    GENERATED_DIR.mkdir(exist_ok=True)
    
    # ==================== LIMITES ====================
    MAX_UPLOAD_SIZE = 5 * 1024 * 1024  # 5MB
    MAX_LOGO_WIDTH = 500
    MAX_LOGO_HEIGHT = 500
    
    # ==================== EMAIL ====================
    SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
    EMAIL_USUARIO = os.getenv("EMAIL_USUARIO")
    EMAIL_SENHA = os.getenv("EMAIL_SENHA")
    EMAIL_ADMIN = os.getenv("EMAIL_ADMIN", "admin@lografic.com.br")
    EMAIL_HABILITADO = bool(EMAIL_USUARIO and EMAIL_SENHA)
    
    # ==================== SACOLA ====================
    # Dimensões do mockup
    MOCKUP_WIDTH = 800
    MOCKUP_HEIGHT = 1000
    
    # Cores padrão (RGB)
    COR_PAPEL = (245, 242, 238)  # Offset fosco
    COR_TEXTO_PRIMARIO = (80, 70, 60)
    COR_TEXTO_SECUNDARIO = (100, 90, 80)
    COR_TEXTO_LEGAL = (180, 170, 160)
    
    # ==================== VALIDAÇÃO ====================
    EXTENSOES_LOGO_PERMITIDAS = {'.png', '.jpg', '.jpeg', '.svg', '.webp'}
    INSTAGRAM_FORMATO = r'^@[a-zA-Z0-9_.]{1,30}$'
    WHATSAPP_FORMATO = r'^\(\d{2}\)\s9\d{4}-\d{4}$'
    ID_PEDIDO_TAMANHO = 14
    
    # ==================== FORMATO DE RESPOSTA ====================
    JSON_INDENT = 2
    JSON_ENSURE_ASCII = False
    
    # ==================== SEGURANÇA ====================
    ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS", "*").split(",")
    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*").split(",")
    
    # ==================== LOGS ====================
    LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
    LOG_FILE = BASE_DIR / "logs" / "app.log"
    
    @classmethod
    def criar_logs_dir(cls):
        """Cria diretório de logs"""
        cls.LOG_FILE.parent.mkdir(exist_ok=True)
    
    @classmethod
    def exibir_configuracoes(cls):
        """Exibe configurações atuais (sem senha)"""
        print("=" * 60)
        print("⚙️  CONFIGURAÇÕES DO SISTEMA")
        print("=" * 60)
        print(f"Aplicação: {cls.APP_NAME} v{cls.APP_VERSION}")
        print(f"Ambiente: {cls.ENV}")
        print(f"Host: {cls.HOST}:{cls.PORT}")
        print(f"Debug: {cls.DEBUG}")
        print()
        print("Diretórios:")
        print(f"  Upload: {cls.UPLOAD_DIR}")
        print(f"  Gerado: {cls.GENERATED_DIR}")
        print(f"  Logs: {cls.LOG_FILE}")
        print()
        print("Email:")
        print(f"  Habilitado: {cls.EMAIL_HABILITADO}")
        if cls.EMAIL_HABILITADO:
            print(f"  SMTP: {cls.SMTP_SERVER}:{cls.SMTP_PORT}")
            print(f"  Admin: {cls.EMAIL_ADMIN}")
        else:
            print("  ⚠️  Email não configurado (.env)")
        print()
        print("Limites:")
        print(f"  Tamanho máximo de arquivo: {cls.MAX_UPLOAD_SIZE / (1024*1024):.0f}MB")
        print(f"  Dimensão máxima de logo: {cls.MAX_LOGO_WIDTH}x{cls.MAX_LOGO_HEIGHT}px")
        print("=" * 60)

# Instância de configurações
settings = Settings()

if __name__ == "__main__":
    settings.criar_logs_dir()
    settings.exibir_configuracoes()
