#!/usr/bin/env python3
"""
Script de Configuração Inicial - Viajando com os Paixão
Este script configura o projeto automaticamente na primeira execução
"""

import os
import json
import secrets
from pathlib import Path

def criar_estrutura_pastas():
    """Cria as pastas necessárias se não existirem"""
    pastas = [
        'uploads',
        'uploads/fotos',
        'uploads/videos',
        'static',
        'static/css',
        'static/js',
        'static/img',
        'templates',
        'public'
    ]
    
    for pasta in pastas:
        Path(pasta).mkdir(parents=True, exist_ok=True)
    
    print("✅ Pastas criadas com sucesso!")

def criar_arquivo_env():
    """Cria o arquivo .env se não existir"""
    if os.path.exists('.env'):
        print("⚠️  Arquivo .env já existe, pulando...")
        return
    
    # Gerar chave secreta segura
    secret_key = secrets.token_urlsafe(32)
    
    env_content = f"""# Configuração do Banco de Dados
DATABASE_URL=sqlite:///./database.db

# Segurança JWT
SECRET_KEY={secret_key}
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=1440

# Configurações da Aplicação
DEBUG=False
MAX_UPLOAD_SIZE=10485760  # 10MB em bytes
MAX_VIDEO_SIZE=104857600  # 100MB em bytes

# Email (Opcional - para notificações)
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASSWORD=sua-senha-de-app
SMTP_FROM=seu-email@gmail.com
"""
    
    with open('.env', 'w') as f:
        f.write(env_content)
    
    print("✅ Arquivo .env criado com SECRET_KEY segura!")

def criar_banco_dados_vazio():
    """Cria o arquivo de banco de dados vazio"""
    if os.path.exists('database.json'):
        print("⚠️  Banco de dados já existe, pulando...")
        return
    
    db_inicial = {
        "usuarios": [],
        "posts": [],
        "comentarios": [],
        "likes": []
    }
    
    with open('database.json', 'w', encoding='utf-8') as f:
        json.dump(db_inicial, f, ensure_ascii=False, indent=2)
    
    print("✅ Banco de dados inicializado!")

def main():
    """Função principal"""
    print("""
    ╔════════════════════════════════════════════════════╗
    ║  🌍 Viajando com os Paixão - Configuração Inicial  ║
    ╚════════════════════════════════════════════════════╝
    """)
    
    print("📁 Criando estrutura de pastas...")
    criar_estrutura_pastas()
    
    print("\n🔐 Criando arquivo de configuração...")
    criar_arquivo_env()
    
    print("\n💾 Inicializando banco de dados...")
    criar_banco_dados_vazio()
    
    print("""
    ✨ Configuração concluída com sucesso!
    
    Próximos passos:
    
    1. Ative o ambiente virtual:
       Windows:  venv\\Scripts\\activate
       macOS/Linux: source venv/bin/activate
    
    2. Instale as dependências:
       pip install -r requirements.txt
    
    3. Execute o servidor:
       python main.py
    
    4. Abra no navegador:
       http://localhost:8000
    
    📖 Leia o README.md para mais informações!
    """)

if __name__ == '__main__':
    main()
