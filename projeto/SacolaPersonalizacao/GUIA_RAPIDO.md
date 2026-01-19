# 🚀 GUIA RÁPIDO - Sistema de Personalização de Sacolas

## ⚡ Início Rápido (5 minutos)

### 1️⃣ Clonar/Preparar Pasta
```bash
cd SacolaPersonalizacao
```

### 2️⃣ Criar Ambiente Virtual
```bash
# Windows
python -m venv venv
.\venv\Scripts\Activate.ps1

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 3️⃣ Instalar Dependências
```bash
pip install -r requirements.txt
```

### 4️⃣ Executar (Sem Email)
```bash
python main.py
```

### 5️⃣ Acessar
```
http://localhost:8000
```

---

## 📧 Configurar Email (Opcional)

### Para Gmail:

1. **Ativar autenticação em 2 etapas:**
   - Acessar: https://myaccount.google.com/security

2. **Gerar Senha de App:**
   - Acessar: https://myaccount.google.com/apppasswords
   - Selecionar: Mail → Windows (ou seu SO)
   - Copiar senha gerada

3. **Configurar arquivo `.env`:**
   ```bash
   copy .env.example .env
   ```

4. **Editar `.env`:**
   ```
   SMTP_SERVER=smtp.gmail.com
   SMTP_PORT=587
   EMAIL_USUARIO=seu_email@gmail.com
   EMAIL_SENHA=abc defgh ijkl mnop
   EMAIL_ADMIN=admin@lografic.com.br
   ```

5. **Reiniciar servidor** ✓

---

## 🧪 Testar Sistema

### Teste Rápido:
1. Abrir: http://localhost:8000
2. Passo 1: Insira ID: `26011412345678`
3. Passo 2: Upload qualquer imagem PNG/JPG
4. Passo 3: Insira contato (opcional)
5. Passo 4: Customize (opcional)
6. Visualize mockup e aprove

### Verificar Setup:
```bash
python check_setup.py
```

### Executar Testes:
```bash
pip install pytest
pytest test_sistema.py -v
```

---

## 📂 Estrutura de Pastas Importantes

```
uploads/          → Logotipos enviados
generated/        → Mockups e arquivos finais
templates/        → HTML da interface
static/css        → Estilos
static/js         → JavaScript
logs/             → Arquivo de logs (se criar)
```

### Onde Encontrar Arquivos Gerados:
```
generated/26011412345678/
├── dados.json      → Metadata do pedido
├── mockup.png      → Preview visual
├── final.png       → Arquivo final
└── final.jpg       → Alternativa JPEG
```

---

## 🔧 Comandos Úteis

### Parar Servidor
```
Ctrl + C
```

### Executar com Auto-reload
```bash
uvicorn main:app --reload
```

### Limpar Cache Python
```bash
rm -r __pycache__
```

### Ver Logs
```bash
tail -f logs/app.log
```

---

## 🐛 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| "Porta 8000 já em uso" | Mudar: `python main.py --port 8001` |
| "Módulo não encontrado" | Executar: `pip install -r requirements.txt` |
| "Email não funciona" | Verificar `.env` e credenciais Gmail |
| "Imagem não aparece no mockup" | Verificar formato (PNG/JPG) e tamanho |
| "Permissão negada uploads/" | Executar com Admin (Windows) |

---

## 📡 Acessar API Diretamente

### Swagger UI:
```
http://localhost:8000/docs
```

### ReDoc:
```
http://localhost:8000/redoc
```

---

## 💾 Fazer Backup dos Pedidos

```bash
# Copiar pasta de pedidos
cp -r generated/ backup_pedidos_$(date +%d-%m-%Y)/
```

---

## 📊 Monitorar em Produção

### Ver Requisições:
```bash
# Terminal separado
tail -f logs/app.log
```

### Usar com Gunicorn (Recomendado):
```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

### Com PM2 (Node.js):
```bash
npm install -g pm2
pm2 start "python main.py" --name sacolas
pm2 logs sacolas
```

---

## 🐳 Docker (Opcional)

### Build:
```bash
docker build -t sacolas-app .
```

### Executar:
```bash
docker run -p 8000:8000 \
  -e EMAIL_USUARIO=seu_email@gmail.com \
  -e EMAIL_SENHA=senha_app \
  -v $(pwd)/uploads:/app/uploads \
  -v $(pwd)/generated:/app/generated \
  sacolas-app
```

### Ou com Docker Compose:
```bash
docker-compose up -d
```

---

## 📝 IDs de Teste

Formato válido: `AAMMDD + 8 dígitos`

```
26011412345678  ← Hoje (14/01/26)
26010100001111  ← 01/01/26
26123199999999  ← 31/12/26
25123100001234  ← 31/12/25
```

---

## 🆘 Suporte Rápido

**Erro ao iniciar?**
```bash
python check_setup.py
```

**Erro de permissão?**
- Windows: Execute CMD como Administrador
- Linux/Mac: Use `sudo python main.py`

**Porta bloqueada?**
```bash
# Encontrar processo na porta 8000
# Windows
netstat -ano | findstr :8000

# Linux/Mac
lsof -i :8000
```

---

## ✅ Checklist de Produção

- [ ] Criar arquivo `.env` com credenciais
- [ ] Testar email com `python check_setup.py`
- [ ] Fazer teste completo de pedido
- [ ] Revisar permissões de pastas
- [ ] Configurar backup automático
- [ ] Usar Gunicorn/PM2 em produção
- [ ] Habilitar HTTPS (SSL)
- [ ] Configurar firewall

---

## 📞 Contato & Suporte

- Email: suporte@lografic.com.br
- Documentação completa: README.md
- API docs: API_DOCUMENTATION.md

---

**Última atualização:** 18/01/2026
**Versão:** 1.0.0
