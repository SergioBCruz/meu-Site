"""
Testes para o Sistema de Personalização de Sacolas
Execute: pytest test_sistema.py
"""

import pytest
import json
from pathlib import Path
from datetime import datetime, timedelta
from main import validar_id_pedido, validar_whatsapp

# ==================== TESTES DE VALIDAÇÃO ====================

class TestValidacaoIdPedido:
    """Testes para validação de ID do pedido"""
    
    def test_id_valido(self):
        """Testa ID válido"""
        assert validar_id_pedido("26011412345678") == True
    
    def test_id_tamanho_incorreto(self):
        """Testa ID com tamanho incorreto"""
        assert validar_id_pedido("2601141234567") == False  # 13 dígitos
        assert validar_id_pedido("260114123456789") == False  # 15 dígitos
    
    def test_id_com_letras(self):
        """Testa ID contendo letras"""
        assert validar_id_pedido("2601141234567a") == False
    
    def test_id_mes_invalido(self):
        """Testa ID com mês inválido"""
        assert validar_id_pedido("26131200001234") == False  # Mês 13
        assert validar_id_pedido("26001200001234") == False  # Mês 00
    
    def test_id_dia_invalido(self):
        """Testa ID com dia inválido"""
        assert validar_id_pedido("26013200001234") == False  # Dia 32
        assert validar_id_pedido("26010000001234") == False  # Dia 00
    
    def test_id_vazio(self):
        """Testa ID vazio"""
        assert validar_id_pedido("") == False
    
    def test_ids_validos_borda(self):
        """Testa IDs válidos na borda"""
        assert validar_id_pedido("26010100001234") == True  # 01/01/26
        assert validar_id_pedido("26123100001234") == True  # 31/12/26
        assert validar_id_pedido("26022800001234") == True  # 28/02/26

class TestValidacaoWhatsApp:
    """Testes para validação de WhatsApp"""
    
    def test_whatsapp_valido(self):
        """Testa WhatsApp válido"""
        assert validar_whatsapp("(11) 99876-5432") == True
        assert validar_whatsapp("(21) 91234-5678") == True
    
    def test_whatsapp_sem_mascara(self):
        """Testa WhatsApp sem máscara"""
        assert validar_whatsapp("11998765432") == False
    
    def test_whatsapp_formato_incorreto(self):
        """Testa WhatsApp com formato incorreto"""
        assert validar_whatsapp("(11)99876-5432") == False  # Sem espaço
        assert validar_whatsapp("11 99876-5432") == False   # Sem parênteses
        assert validar_whatsapp("(11) 99876 5432") == False # Sem hífen
    
    def test_whatsapp_com_letras(self):
        """Testa WhatsApp contendo letras"""
        assert validar_whatsapp("(11) 9987a-5432") == False
    
    def test_whatsapp_vazio(self):
        """Testa WhatsApp vazio"""
        assert validar_whatsapp("") == False

# ==================== TESTES DE INTEGRAÇÃO ====================

class TestFluxoCompleto:
    """Testes do fluxo completo"""
    
    @pytest.fixture
    def client(self):
        """Fixture para cliente FastAPI"""
        from fastapi.testclient import TestClient
        from main import app
        return TestClient(app)
    
    def test_validar_pedido_sucesso(self, client):
        """Testa validação bem-sucedida de pedido"""
        response = client.post("/api/validar-pedido", json={
            "id_pedido": "26011412345678"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["valido"] == True
        assert data["id_pedido"] == "26011412345678"
    
    def test_validar_pedido_erro(self, client):
        """Testa validação com erro"""
        response = client.post("/api/validar-pedido", json={
            "id_pedido": "123"
        })
        assert response.status_code == 400
        data = response.json()
        assert data["valido"] == False

# ==================== TESTES DE ESTRUTURA ====================

class TestEstruturaProjeto:
    """Testes de estrutura do projeto"""
    
    def test_diretorio_uploads_existe(self):
        """Verifica se diretório uploads existe"""
        assert Path("uploads").exists()
    
    def test_diretorio_generated_existe(self):
        """Verifica se diretório generated existe"""
        assert Path("generated").exists()
    
    def test_arquivo_html_existe(self):
        """Verifica se arquivo HTML existe"""
        assert Path("templates/index.html").exists()
    
    def test_arquivo_css_existe(self):
        """Verifica se arquivo CSS existe"""
        assert Path("static/css/style.css").exists()
    
    def test_arquivo_js_existe(self):
        """Verifica se arquivo JS existe"""
        assert Path("static/js/app.js").exists()
    
    def test_requirements_existe(self):
        """Verifica se requirements.txt existe"""
        assert Path("requirements.txt").exists()

# ==================== TESTES DE PERFORMANCE ====================

class TestPerformance:
    """Testes de performance"""
    
    def test_validacao_id_rapida(self):
        """Testa se validação de ID é rápida"""
        import time
        inicio = time.time()
        for _ in range(1000):
            validar_id_pedido("26011412345678")
        tempo = time.time() - inicio
        assert tempo < 0.1  # Menos de 100ms para 1000 validações
    
    def test_validacao_whatsapp_rapida(self):
        """Testa se validação de WhatsApp é rápida"""
        import time
        inicio = time.time()
        for _ in range(1000):
            validar_whatsapp("(11) 99876-5432")
        tempo = time.time() - inicio
        assert tempo < 0.1  # Menos de 100ms para 1000 validações

# ==================== TESTES DE SEGURANÇA ====================

class TestSeguranca:
    """Testes de segurança"""
    
    def test_id_pedido_injection(self):
        """Testa proteção contra SQL injection"""
        ids_maliciosos = [
            "26011412345678'; DROP TABLE--",
            "26011412345678 OR 1=1",
            "26011412345678<script>",
            "26011412345678../../etc/passwd"
        ]
        for id_mal in ids_maliciosos:
            assert validar_id_pedido(id_mal) == False
    
    def test_whatsapp_sanitizacao(self):
        """Testa sanitização de WhatsApp"""
        whatsapps_maliciosos = [
            "(11) 99876-5432<script>alert(1)</script>",
            "(11) 99876-5432'; DROP TABLE--",
            "(11) 99876-5432\\x00"
        ]
        for wp_mal in whatsapps_maliciosos:
            assert validar_whatsapp(wp_mal) == False

# ==================== EXECUTAR TESTES ====================

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
