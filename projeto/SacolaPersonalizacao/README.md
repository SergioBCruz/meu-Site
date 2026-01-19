# 🛍️ Sistema Web de Personalização de Sacolas (Web-to-Print)

Um sistema completo para personalização de sacolas com logotipo, dados de contato e opções estruturais, gerando mockups realistas e enviando arquivos de produção automaticamente.

## 📋 Características

### Frontend Interativo (4 Passos)
- ✅ **Passo 1**: Identificação do pedido (validação de ID)
- ✅ **Passo 2**: Upload do logotipo com preview
- ✅ **Passo 3**: Dados de contato (Instagram e WhatsApp)
- ✅ **Passo 4**: Personalização estrutural (frase ou logo, opções de alça)
- ✅ **Passo 5**: Visualização de mockup realista
- ✅ **Passo 6**: Confirmação e download de arquivos

### Validações
- 🔒 ID do pedido: Formato AAMMDD + 8 dígitos (14 total)
- 📱 WhatsApp: Validação de formato (XX) 9XXXX-XXXX
- 📷 Logotipo: Suporte PNG, JPG, SVG, WebP (máx 5MB)
- 🎨 Frase personalizada: Máximo 50 caracteres

### Mockup Realista
- 📄 Simulação de papel offset fosco (sem brilho)
- 🖨️ Comportamento realista de tinta digital
- 🎯 Posicionamento inteligente de elementos
- 📊 Proporção 1:1 da sacola

### Backend Automático
- 💾 Armazenamento de dados em JSON
- 📧 Envio automático de email para administrador
- 📥 Geração de arquivos PNG e JPEG
- ⏱️ Cálculo de prazo de postagem (4 dias úteis)
- 🔐 Validações robustas

## 🚀 Instalação e Execução

### Pré-requisitos
- Python 3.8+
- pip
- virtualenv (recomendado)

### Instalação

1. **Clonar ou copiar o projeto**
```bash
cd SacolaPersonalizacao
```

2. **Criar e ativar ambiente virtual**
```bash
# Windows (PowerShell)
python -m venv venv
.\venv\Scripts\Activate.ps1

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

3. **Instalar dependências**
```bash
pip install -r requirements.txt
```

4. **Configurar variáveis de ambiente**
```bash
# Copiar arquivo de exemplo
copy .env.example .env

# No Windows: editar .env com suas credenciais
# SMTP_SERVER=smtp.gmail.com
# EMAIL_USUARIO=seu_email@gmail.com
# EMAIL_SENHA=sua_senha_app
```

5. **Executar a aplicação**
```bash
python main.py
```

6. **Acessar no navegador**
```
http://localhost:8000
```

## 📧 Configuração de Email (Gmail)

1. Acessar: https://myaccount.google.com/apppasswords
2. Selecionar "Mail" e "Windows Computer" (ou seu SO)
3. Gerar senha de app (16 caracteres)
4. Copiar senha para variável `EMAIL_SENHA` no arquivo `.env`
5. Configurar `EMAIL_USUARIO` com seu email do Gmail
6. Configurar `EMAIL_ADMIN` com email que receberá os pedidos

## 📁 Estrutura do Projeto

```
SacolaPersonalizacao/
├── main.py                 # Backend FastAPI
├── requirements.txt        # Dependências Python
├── .env.example           # Configurações (exemplo)
├── templates/
│   └── index.html         # Interface de 4 passos
├── static/
│   ├── css/
│   │   └── style.css      # Estilos responsivos
│   ├── js/
│   │   └── app.js         # Lógica interativa
│   └── img/               # Imagens do projeto
├── uploads/               # Logotipos enviados
├── generated/             # Mockups e arquivos finais
└── README.md             # Este arquivo
```

## 🎨 Formato de Validação

### ID do Pedido
- Formato esperado: `AAMMDD + 8 dígitos`
- Exemplo: `26011412345678` (14/01/26 + 12345678)
- Validação de data na parte AAMMDD

### WhatsApp
- Formato esperado: `(XX) 9XXXX-XXXX`
- Exemplo: `(11) 99876-5432`
- Aplicação automática de máscara

### Instagram
- Formato: `@usuario`
- Exemplo: `@lografic_oficial`

## 📧 Conteúdo do Email Automático

Quando o cliente aprova a arte, um email automático é enviado com:
- ID do pedido
- Data de criação
- Detalhes da personalização
- Arquivos em PNG e JPEG anexados
- Informações de produção

## 🔧 APIs Disponíveis

```
POST /api/validar-pedido
- Valida ID do pedido

POST /api/upload-logo
- Faz upload do logotipo

POST /api/salvar-contato
- Salva dados de Instagram/WhatsApp

POST /api/salvar-estrutura
- Salva personalização estrutural

GET /api/mockup-preview/{id_pedido}
- Retorna preview do mockup

POST /api/aprovar-arte
- Aprova arte e gera arquivos finais

GET /api/download/{id_pedido}/{arquivo}
- Download de PNG ou JPEG
```

## 💾 Estrutura de Dados (JSON)

Cada pedido é armazenado em:
```
generated/{id_pedido}/
├── dados.json             # Metadata do pedido
├── mockup.png            # Preview visual
├── final.png             # Arquivo final PNG
└── final.jpg             # Arquivo final JPEG
```

## 🎯 Casos de Uso

### Empresa de E-commerce
- Clientes personalizando sacolas de marca

### Agência de Design
- Criar amostras rápidas com mockups realistas

### Produtor de Embalagens
- Gerenciar pedidos de personalização

### Loja Online
- Sistema integrado de personalização

## 🌐 Deployment

### Usando Uvicorn (Produção)
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Usando Gunicorn + Uvicorn (Recomendado)
```bash
pip install gunicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

### Docker (Opcional)
```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## 🔒 Segurança

- Validação de todos os inputs
- Limite de tamanho de arquivo (5MB)
- Sanitização de nomes de arquivo
- Proteção contra injeção de código
- Uso de variáveis de ambiente para credenciais

## 📱 Responsividade

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (até 767px)

## 🐛 Troubleshooting

### Email não é enviado
1. Verificar credenciais no `.env`
2. Se usar Gmail, gerar "Senha de App"
3. Verificar firewall (porta 587)
4. Revisar logs de erro

### Mockup não aparece
1. Verificar se PIL/Pillow está instalado
2. Revissar permissões de pasta `generated/`
3. Verificar espaço em disco

### Upload rejeitado
1. Validar formato do arquivo
2. Verificar tamanho (máx 5MB)
3. Revisar extensão (.png, .jpg, .svg, .webp)

## 📞 Suporte e Contribuições

Para dúvidas ou sugestões, entre em contato ou abra uma issue.

## 📄 Licença

Este projeto é fornecido como está. Adapt-o conforme suas necessidades.

---

**Desenvolvido para Lografic - Soluções em Personalização** 🎨
