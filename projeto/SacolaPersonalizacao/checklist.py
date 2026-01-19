#!/usr/bin/env python3
"""
CHECKLIST de Verificação - Sistema de Personalização de Sacolas
Execute: python checklist.py
"""

import os
import sys
from pathlib import Path
from datetime import datetime

class Checker:
    def __init__(self):
        self.checks = []
        self.passed = 0
        self.failed = 0

    def add_check(self, name, status, message=""):
        self.checks.append({
            "nome": name,
            "status": status,
            "mensagem": message
        })
        if status:
            self.passed += 1
        else:
            self.failed += 1

    def print_resultado(self):
        print("\n" + "=" * 70)
        print("📋 CHECKLIST DE VERIFICAÇÃO")
        print("=" * 70)
        
        for check in self.checks:
            symbol = "✅" if check["status"] else "❌"
            print(f"\n{symbol} {check['nome']}")
            if check["mensagem"]:
                print(f"   └─ {check['mensagem']}")

        print("\n" + "=" * 70)
        print(f"Resultado: {self.passed} ✅ | {self.failed} ❌")
        print("=" * 70)
        
        if self.failed == 0:
            print("\n🎉 TUDO PRONTO! Sistema 100% operacional.\n")
        else:
            print(f"\n⚠️  {self.failed} item(ns) precisa(m) de atenção.\n")

def verificar_estrutura():
    """Verifica estrutura de arquivos"""
    checker = Checker()
    
    print("\n" + "=" * 70)
    print("1️⃣  VERIFICANDO ESTRUTURA DE ARQUIVOS")
    print("=" * 70)

    # Verificar pastas
    pastas = {
        "uploads": "Pasta para logotipos enviados",
        "generated": "Pasta para mockups e arquivos finais",
        "static": "Pasta de arquivos estáticos",
        "static/css": "Pasta de estilos CSS",
        "static/js": "Pasta de JavaScript",
        "templates": "Pasta de templates HTML"
    }

    for pasta, descricao in pastas.items():
        existe = Path(pasta).exists()
        checker.add_check(
            f"Pasta: {pasta}/",
            existe,
            descricao
        )

    # Verificar arquivos críticos
    arquivos = {
        "main.py": "Backend FastAPI",
        "requirements.txt": "Dependências Python",
        "templates/index.html": "Interface web",
        "static/css/style.css": "Estilos CSS",
        "static/js/app.js": "Lógica JavaScript",
        "README.md": "Documentação principal",
        "config.py": "Configurações",
        ".env.example": "Exemplo de variáveis de ambiente"
    }

    for arquivo, descricao in arquivos.items():
        existe = Path(arquivo).exists()
        checker.add_check(
            f"Arquivo: {arquivo}",
            existe,
            descricao
        )

    return checker

def verificar_dependencias():
    """Verifica dependências Python"""
    checker = Checker()
    
    print("\n" + "=" * 70)
    print("2️⃣  VERIFICANDO DEPENDÊNCIAS PYTHON")
    print("=" * 70)

    dependencias = [
        ("fastapi", "Framework web"),
        ("uvicorn", "Servidor ASGI"),
        ("pydantic", "Validação de dados"),
        ("PIL", "Processamento de imagens"),
        ("dotenv", "Carregamento de .env"),
    ]

    for modulo, descricao in dependencias:
        try:
            __import__(modulo)
            checker.add_check(
                f"Módulo: {modulo}",
                True,
                descricao
            )
        except ImportError:
            checker.add_check(
                f"Módulo: {modulo}",
                False,
                f"{descricao} - Execute: pip install -r requirements.txt"
            )

    return checker

def verificar_configuracao():
    """Verifica configuração"""
    checker = Checker()
    
    print("\n" + "=" * 70)
    print("3️⃣  VERIFICANDO CONFIGURAÇÃO")
    print("=" * 70)

    # Verificar .env
    env_existe = Path(".env").exists()
    checker.add_check(
        "Arquivo .env",
        env_existe,
        "Configure com: copy .env.example .env"
    )

    # Verificar variáveis de ambiente
    if env_existe:
        from dotenv import load_dotenv
        load_dotenv()
        
        email_user = os.getenv("EMAIL_USUARIO")
        email_pass = os.getenv("EMAIL_SENHA")
        
        checker.add_check(
            "Email configurado",
            bool(email_user and email_pass),
            "Opcional, mas recomendado para produção"
        )

    return checker

def verificar_integracao():
    """Verifica integração do sistema"""
    checker = Checker()
    
    print("\n" + "=" * 70)
    print("4️⃣  VERIFICANDO INTEGRAÇÃO DO SISTEMA")
    print("=" * 70)

    # Teste rápido de validação
    try:
        from main import validar_id_pedido, validar_whatsapp
        
        # Teste ID válido
        id_teste = validar_id_pedido("26011412345678")
        checker.add_check(
            "Validação de ID",
            id_teste,
            "Função validar_id_pedido() funcionando"
        )
        
        # Teste WhatsApp válido
        wp_teste = validar_whatsapp("(11) 99876-5432")
        checker.add_check(
            "Validação de WhatsApp",
            wp_teste,
            "Função validar_whatsapp() funcionando"
        )
        
        # Teste de diretórios
        from pathlib import Path
        upload_dir = Path("uploads")
        generated_dir = Path("generated")
        
        upload_dir.mkdir(exist_ok=True)
        generated_dir.mkdir(exist_ok=True)
        
        checker.add_check(
            "Diretórios criados",
            upload_dir.exists() and generated_dir.exists(),
            "Pastas de armazenamento funcionando"
        )
        
    except Exception as e:
        checker.add_check(
            "Integração Python",
            False,
            f"Erro ao importar módulos: {str(e)}"
        )

    return checker

def verificar_html():
    """Verifica HTML"""
    checker = Checker()
    
    print("\n" + "=" * 70)
    print("5️⃣  VERIFICANDO INTERFACE HTML")
    print("=" * 70)

    try:
        with open("templates/index.html", "r", encoding="utf-8") as f:
            conteudo = f.read()
            
            elementos = {
                'step1': "Passo 1 (Identificação)",
                'step2': "Passo 2 (Upload Logo)",
                'step3': "Passo 3 (Contato)",
                'step4': "Passo 4 (Personalização)",
                'step5': "Passo 5 (Mockup)",
                'step6': "Passo 6 (Confirmação)"
            }
            
            for elemento, descricao in elementos.items():
                existe = elemento in conteudo
                checker.add_check(
                    f"ID: {elemento}",
                    existe,
                    descricao
                )
    except Exception as e:
        checker.add_check(
            "Leitura HTML",
            False,
            f"Erro: {str(e)}"
        )

    return checker

def verificar_performance():
    """Verifica performance"""
    checker = Checker()
    
    print("\n" + "=" * 70)
    print("6️⃣  VERIFICANDO PERFORMANCE")
    print("=" * 70)

    try:
        from main import validar_id_pedido
        import time
        
        # Teste de velocidade
        inicio = time.time()
        for _ in range(1000):
            validar_id_pedido("26011412345678")
        tempo = time.time() - inicio
        
        rapido = tempo < 0.1
        checker.add_check(
            "Velocidade de validação",
            rapido,
            f"1000 validações em {tempo:.3f}s (< 0.1s esperado)"
        )
        
        # Tamanho do projeto
        tamanho = sum(
            f.stat().st_size 
            for f in Path(".").rglob("*") 
            if f.is_file() and not f.is_relative_to(Path(".git")) 
               and not f.is_relative_to(Path("__pycache__"))
        ) / (1024 * 1024)
        
        checker.add_check(
            "Tamanho do projeto",
            tamanho < 100,
            f"Total: {tamanho:.1f}MB (< 100MB esperado)"
        )
        
    except Exception as e:
        checker.add_check(
            "Performance",
            False,
            f"Erro: {str(e)}"
        )

    return checker

def gerar_relatorio():
    """Gera relatório completo"""
    print("\n")
    print("╔" + "=" * 68 + "╗")
    print("║" + " " * 15 + "CHECKLIST DE VERIFICAÇÃO DO SISTEMA" + " " * 19 + "║")
    print("║" + " " * 20 + "18 de janeiro de 2026 v1.0.0" + " " * 19 + "║")
    print("╚" + "=" * 68 + "╝")

    checkers = [
        verificar_estrutura(),
        verificar_dependencias(),
        verificar_configuracao(),
        verificar_integracao(),
        verificar_html(),
        verificar_performance()
    ]

    print("\n" + "=" * 70)
    print("📊 RESULTADO FINAL")
    print("=" * 70)

    total_passed = sum(c.passed for c in checkers)
    total_failed = sum(c.failed for c in checkers)
    total = total_passed + total_failed

    print(f"\nTotal de verificações: {total}")
    print(f"✅ Passou: {total_passed}")
    print(f"❌ Falhou: {total_failed}")
    print(f"Sucesso: {(total_passed/total*100):.1f}%")

    if total_failed == 0:
        print("\n" + "🎉 " * 15)
        print("PARABÉNS! Sistema 100% operacional!")
        print("🎉 " * 15)
        print("\nPróximos passos:")
        print("1. Execute: python main.py")
        print("2. Abra: http://localhost:8000")
        print("3. Teste com ID: 26011412345678")
        return True
    else:
        print(f"\n⚠️  {total_failed} problema(s) detectado(s).")
        print("Resolva os itens marcados com ❌ antes de usar em produção.")
        return False

if __name__ == "__main__":
    try:
        sucesso = gerar_relatorio()
        sys.exit(0 if sucesso else 1)
    except KeyboardInterrupt:
        print("\n\nChecklist interrompido pelo usuário.")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Erro durante verificação: {str(e)}")
        sys.exit(1)
