# 🚀 Guia de Deploy em Produção

## Opção 1: Deploy Simples (VPS Linux)

### 1.1 Preparar Servidor

```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Python 3.11+
sudo apt install python3.11 python3.11-venv python3-pip -y

# Instalar dependências do sistema
sudo apt install nginx curl git -y

# Criar usuário para aplicação
sudo useradd -m -s /bin/bash sacolas
sudo su - sacolas
```

### 1.2 Clonar e Configurar Projeto

```bash
# Clonar projeto
git clone https://seu-repo/SacolaPersonalizacao.git
cd SacolaPersonalizacao

# Criar ambiente virtual
python3.11 -m venv venv
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt
pip install gunicorn

# Criar arquivo .env
cp .env.example .env
nano .env  # Editar com suas credenciais
```

### 1.3 Configurar Gunicorn

Criar arquivo `/home/sacolas/SacolaPersonalizacao/gunicorn_config.py`:

```python
import multiprocessing

bind = "127.0.0.1:8000"
workers = multiprocessing.cpu_count() * 2 + 1
worker_class = "uvicorn.workers.UvicornWorker"
worker_connections = 1000
timeout = 30
keepalive = 5
accesslog = "logs/access.log"
errorlog = "logs/error.log"
loglevel = "info"
```

### 1.4 Criar Arquivo de Serviço Systemd

```bash
sudo nano /etc/systemd/system/sacolas.service
```

Conteúdo:

```ini
[Unit]
Description=Sistema de Personalização de Sacolas
After=network.target

[Service]
User=sacolas
WorkingDirectory=/home/sacolas/SacolaPersonalizacao
Environment="PATH=/home/sacolas/SacolaPersonalizacao/venv/bin"
ExecStart=/home/sacolas/SacolaPersonalizacao/venv/bin/gunicorn -c gunicorn_config.py main:app
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Ativar serviço:

```bash
sudo systemctl daemon-reload
sudo systemctl enable sacolas
sudo systemctl start sacolas
sudo systemctl status sacolas
```

### 1.5 Configurar Nginx como Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/sacolas
```

Conteúdo:

```nginx
upstream sacolas_app {
    server 127.0.0.1:8000;
}

server {
    listen 80;
    server_name seu-dominio.com www.seu-dominio.com;

    # Redirecionar HTTP para HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name seu-dominio.com www.seu-dominio.com;

    # Certificado SSL (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;

    # Configurações SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Limites
    client_max_body_size 10M;

    # Proxy
    location / {
        proxy_pass http://sacolas_app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_redirect off;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Cache para arquivos estáticos
    location /static/ {
        alias /home/sacolas/SacolaPersonalizacao/static/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Compressão
    gzip on;
    gzip_types text/plain text/css text/javascript application/json;
}
```

Ativar site:

```bash
sudo ln -s /etc/nginx/sites-available/sacolas /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 1.6 SSL com Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot certonly --nginx -d seu-dominio.com -d www.seu-dominio.com
```

---

## Opção 2: Deploy com Docker

### 2.1 Build da Imagem

```bash
docker build -t sacolas:1.0 .
```

### 2.2 Executar Container

```bash
docker run -d \
  --name sacolas \
  -p 8000:8000 \
  -e SMTP_SERVER=smtp.gmail.com \
  -e EMAIL_USUARIO=seu_email@gmail.com \
  -e EMAIL_SENHA=sua_senha \
  -v /data/uploads:/app/uploads \
  -v /data/generated:/app/generated \
  -v /data/logs:/app/logs \
  --restart unless-stopped \
  sacolas:1.0
```

### 2.3 Com Docker Compose

```bash
docker-compose up -d
```

### 2.4 Monitorar

```bash
docker logs -f sacolas
docker stats sacolas
```

---

## Opção 3: Heroku Deploy

### 3.1 Preparar

```bash
# Instalar Heroku CLI
curl https://cli.heroku.com/install.sh | sh

# Login
heroku login

# Criar app
heroku create seu-app-name
```

### 3.2 Procfile

Criar `Procfile`:

```
web: gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

### 3.3 runtime.txt

Criar `runtime.txt`:

```
python-3.11.7
```

### 3.4 Deploy

```bash
git push heroku main
heroku config:set SMTP_SERVER=smtp.gmail.com
heroku config:set EMAIL_USUARIO=seu_email@gmail.com
heroku config:set EMAIL_SENHA=sua_senha
```

---

## Opção 4: AWS EC2

### 4.1 Lançar Instância

1. EC2 Dashboard → Lançar Instância
2. Selecionar Ubuntu 22.04 LTS
3. Tipo: t3.medium (mínimo)
4. Armazenamento: 30GB
5. Security Group: Abrir portas 80, 443, 22

### 4.2 Conectar via SSH

```bash
chmod 400 sua-chave.pem
ssh -i sua-chave.pem ubuntu@seu-ip-publico
```

### 4.3 Setup igual à Opção 1

Seguir instruções da Opção 1 (VPS Linux)

---

## Opção 5: DigitalOcean App Platform

### 5.1 Conectar Repositório

1. DigitalOcean → App Platform → Create App
2. Conectar repositório GitHub
3. Selecionar branch main

### 5.2 Configurar

```yaml
name: sacolas
services:
- name: api
  github:
    repo: seu-usuario/SacolaPersonalizacao
    branch: main
  build_command: pip install -r requirements.txt
  run_command: gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
  envs:
  - key: SMTP_SERVER
    value: smtp.gmail.com
  - key: EMAIL_USUARIO
    value: ${EMAIL_USUARIO}
  - key: EMAIL_SENHA
    value: ${EMAIL_SENHA}
```

---

## 🔒 Checklist de Segurança

- [ ] HTTPS/SSL configurado
- [ ] Arquivo `.env` não está no git
- [ ] Firewall configurado (apenas portas necessárias)
- [ ] Backup automático dos dados
- [ ] Logs habilitados e monitorados
- [ ] Rate limiting implementado
- [ ] CORS configurado corretamente
- [ ] Headers de segurança adicionados

### Headers de Segurança (Nginx)

```nginx
# Adicionar ao bloco server
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self'" always;
```

---

## 📊 Monitoramento

### Instalar Prometheus + Grafana

```bash
sudo apt install prometheus grafana-server -y
sudo systemctl start prometheus grafana-server
```

### Adicionar Métricas (main.py)

```python
from prometheus_client import Counter, Histogram
from fastapi_prometheus_instrumentator import Instrumentator

Instrumentator().instrument(app).expose(app)

upload_counter = Counter('uploads_total', 'Total uploads')
mockup_timer = Histogram('mockup_generation_seconds', 'Mockup geração tempo')
```

---

## 🔄 Backup e Recuperação

### Script de Backup

```bash
#!/bin/bash
BACKUP_DIR="/backups"
DATE=$(date +%Y%m%d)

# Backup de pedidos
tar -czf $BACKUP_DIR/pedidos_$DATE.tar.gz /home/sacolas/SacolaPersonalizacao/generated/

# Backup de uploads
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /home/sacolas/SacolaPersonalizacao/uploads/

# Manter apenas últimos 30 dias
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
```

Adicionar ao crontab:

```bash
crontab -e
# Adicionar: 0 2 * * * /home/sacolas/backup.sh
```

---

## 📈 Escalabilidade

### Load Balancing com HAProxy

```bash
sudo apt install haproxy -y
```

Configurar `/etc/haproxy/haproxy.cfg`:

```
frontend sacolas
    bind *:80
    default_backend sacolas_backend

backend sacolas_backend
    balance roundrobin
    server app1 localhost:8001
    server app2 localhost:8002
    server app3 localhost:8003
```

---

## 🆘 Troubleshooting em Produção

### Verificar Logs

```bash
# Systemd
sudo journalctl -u sacolas -f

# Nginx
sudo tail -f /var/log/nginx/error.log

# Aplicação
tail -f /home/sacolas/SacolaPersonalizacao/logs/error.log
```

### Reiniciar Serviço

```bash
sudo systemctl restart sacolas
```

### Ver Status

```bash
sudo systemctl status sacolas
```

---

## 📞 Suporte em Produção

- Monitorar logs regularmente
- Backup automático diário
- Updates de segurança mensais
- Testes de recuperação trimestrais
- Monitoramento 24/7 (recomendado)

---

**Última atualização:** 18/01/2026
**Versão:** 1.0.0
