#!/usr/bin/env python
"""
Script de inicialização e teste do Sistema de Personalização de Sacolas
Execute este script para verificar se tudo está configurado corretamente
"""

import os
import sys
from pathlib import Path

def verificar_ambiente():
    """Verifica se o ambiente está configurado corretamente"""
    print("=" * 60)
    print("🔍 VERIFICANDO AMBIENTE DO SISTEMA DE SACOLAS")
    print("=" * 60)
    
    # Verificar Python
    print(f"\n✓ Python versão: {sys.version}")
    
    # Verificar diretórios
    dirs_obrigatorios = ['uploads', 'generated', 'static', 'templates']
    print("\n📁 Verificando diretórios:")
    for d in dirs_obrigatorios:
        if Path(d).exists():
            print(f"  ✓ {d}/")
        else:
            print(f"  ✗ {d}/ (não encontrado)")
            Path(d).mkdir(exist_ok=True)
    
    # Verificar arquivos
    arquivos_obrigatorios = [
        'main.py',
        'requirements.txt',
        'templates/index.html',
        'static/css/style.css',
        'static/js/app.js'
    ]
    print("\n📄 Verificando arquivos:")
    for arq in arquivos_obrigatorios:
        if Path(arq).exists():
            print(f"  ✓ {arq}")
        else:
            print(f"  ✗ {arq} (não encontrado)")
    
    # Verificar dependências
    print("\n📦 Verificando dependências Python:")
    dependencias = ['fastapi', 'uvicorn', 'pydantic', 'PIL', 'dotenv']
    
    for dep in dependencias:
        try:
            __import__(dep.replace('-', '_'))
            print(f"  ✓ {dep}")
        except ImportError:
            print(f"  ✗ {dep} (não instalado)")
            print(f"    Execute: pip install -r requirements.txt")
    
    # Verificar .env
    print("\n🔐 Configuração de Email:")
    if Path('.env').exists():
        print("  ✓ Arquivo .env encontrado")
    else:
        print("  ℹ Arquivo .env não encontrado")
        print("    Copie .env.example para .env e configure seus dados")

def mostrar_instrucoes():
    """Mostra instruções de uso"""
    print("\n" + "=" * 60)
    print("🚀 INSTRUÇÕES DE USO")
    print("=" * 60)
    
    print("""
1. CONFIGURAR EMAIL (opcional):
   - Copiar: .env.example → .env
   - Editar .env com suas credenciais
   - Para Gmail: usar "Senha de App"
     https://myaccount.google.com/apppasswords

2. INSTALAR DEPENDÊNCIAS:
   pip install -r requirements.txt

3. EXECUTAR O SERVIDOR:
   python main.py
   
   OU com auto-reload:
   uvicorn main:app --reload

4. ACESSAR NO NAVEGADOR:
   http://localhost:8000

5. TESTAR O SISTEMA:
   - Insira um ID como: 26011412345678
   - Faça upload de uma imagem (PNG/JPG)
   - Preencha os dados
   - Visualize o mockup
   - Aprove e baixe os arquivos

ARQUIVOS GERADOS:
- Pedidos: generated/{id_pedido}/
- Uploads: uploads/{id_pedido}/
- Mockups: gerados automaticamente em PNG e JPEG
    """)

def main():
    """Função principal"""
    verificar_ambiente()
    mostrar_instrucoes()
    
    print("\n" + "=" * 60)
    print("✅ Sistema pronto para uso!")
    print("=" * 60)
    print("\nPara iniciar o servidor, execute:")
    print("  python main.py")
    print("\nOu com reload automático:")
    print("  uvicorn main:app --reload")
    print("\n" + "=" * 60)

if __name__ == "__main__":
    main()
