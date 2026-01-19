# 📡 Documentação da API

## Base URL
```
http://localhost:8000
```

## Endpoints

### 1. Validar Pedido
**Endpoint:** `POST /api/validar-pedido`

Valida e carrega um pedido existente ou cria um novo.

**Request:**
```json
{
  "id_pedido": "26011412345678"
}
```

**Response (Sucesso):**
```json
{
  "valido": true,
  "id_pedido": "26011412345678",
  "mensagem": "Pedido 26011412345678 carregado com sucesso!"
}
```

**Response (Erro):**
```json
{
  "valido": false,
  "erro": "ID do pedido deve conter 14 dígitos no formato AAMMDD + 8 dígitos"
}
```

---

### 2. Upload de Logotipo
**Endpoint:** `POST /api/upload-logo`

Faz upload do logotipo da marca para a sacola.

**Request:**
- Form Data:
  - `id_pedido` (string): ID do pedido validado
  - `arquivo` (file): Arquivo de imagem (PNG, JPG, SVG, WebP - máx 5MB)

**Response (Sucesso):**
```json
{
  "sucesso": true,
  "logo_path": "/path/to/logo.png",
  "mockup_preview": "/api/mockup-preview/26011412345678"
}
```

**Response (Erro):**
```json
{
  "detail": "Formato de arquivo não permitido"
}
```

**Status Codes:**
- 200: Upload bem-sucedido
- 400: ID inválido ou formato de arquivo não suportado
- 413: Arquivo muito grande

---

### 3. Salvar Dados de Contato
**Endpoint:** `POST /api/salvar-contato`

Salva informações de contato (Instagram e WhatsApp).

**Request:**
```json
{
  "id_pedido": "26011412345678",
  "instagram": "@lografic_oficial",
  "whatsapp": "(11) 99876-5432",
  "usar_instagram": true,
  "usar_whatsapp": true
}
```

**Response (Sucesso):**
```json
{
  "sucesso": true,
  "mensagem": "Dados de contato salvos com sucesso!",
  "mockup_preview": "/api/mockup-preview/26011412345678"
}
```

**Response (Erro):**
```json
{
  "detail": "Formato de WhatsApp inválido. Use: (XX) 9XXXX-XXXX"
}
```

**Formatos Esperados:**
- Instagram: `@usuario` (obrigatório começar com @)
- WhatsApp: `(XX) 9XXXX-XXXX` (com máscara)

---

### 4. Salvar Personalização Estrutural
**Endpoint:** `POST /api/salvar-estrutura`

Salva opções estruturais da sacola (frase vs logo, opções de alça).

**Request:**
```json
{
  "id_pedido": "26011412345678",
  "frase_ou_logo": "frase",
  "frase_personalizada": "Escolha a melhor qualidade!",
  "opcoes_alca": "frase1"
}
```

**Response (Sucesso):**
```json
{
  "sucesso": true,
  "mensagem": "Personalização estrutural salva!"
}
```

**Valores Válidos:**
- `frase_ou_logo`: "logo" | "frase"
- `opcoes_alca`: "padrão" | "frase1" | "frase2" | "frase3"

---

### 5. Obter Preview do Mockup
**Endpoint:** `GET /api/mockup-preview/{id_pedido}`

Retorna a imagem PNG do mockup da sacola.

**Response:**
- Content-Type: `image/png`
- Binary PNG image

**Status Codes:**
- 200: Mockup encontrado
- 400: ID inválido
- 404: Mockup não encontrado

---

### 6. Aprovar Arte
**Endpoint:** `POST /api/aprovar-arte`

Aprova a arte e gera arquivos finais (PNG e JPEG). Envia email automático.

**Request:**
- Form Data:
  - `id_pedido` (string): ID do pedido

**Response (Sucesso):**
```json
{
  "sucesso": true,
  "mensagem": "Arte aprovada! Sua sacola será postada em 22/01/2026",
  "email_enviado": true,
  "arquivos_disponivel": {
    "png": "/api/download/26011412345678/final.png",
    "jpg": "/api/download/26011412345678/final.jpg"
  }
}
```

**Response (Erro):**
```json
{
  "detail": "ID do pedido inválido"
}
```

**Nota:** O email será enviado apenas se as variáveis de ambiente estiverem configuradas.

---

### 7. Download de Arquivo
**Endpoint:** `GET /api/download/{id_pedido}/{arquivo}`

Download dos arquivos gerados (PNG ou JPEG).

**Parâmetros:**
- `id_pedido`: ID do pedido
- `arquivo`: "final.png" ou "final.jpg"

**Response:**
- Content-Type: `image/png` ou `image/jpeg`
- Binary image file

**Status Codes:**
- 200: Arquivo encontrado
- 400: ID inválido
- 404: Arquivo não encontrado

---

## Fluxo Típico

```
1. POST /api/validar-pedido
   └─ Validar ID (formato AAMMDD + 8 dígitos)

2. POST /api/upload-logo
   └─ Upload do logotipo
   └─ Gerar mockup inicial

3. POST /api/salvar-contato
   └─ Salvar Instagram/WhatsApp
   └─ Atualizar mockup

4. POST /api/salvar-estrutura
   └─ Salvar opções (frase/logo, alça)
   └─ Gerar mockup final

5. GET /api/mockup-preview/{id_pedido}
   └─ Visualizar mockup para aprovação

6. POST /api/aprovar-arte
   └─ Gerar arquivos finais (PNG/JPEG)
   └─ Enviar email automático
   └─ Calcular data de postagem

7. GET /api/download/{id_pedido}/{arquivo}
   └─ Baixar arquivos finais
```

---

## Códigos de Erro HTTP

| Código | Significado | Solução |
|--------|-------------|---------|
| 200 | OK | Requisição bem-sucedida |
| 400 | Bad Request | Verifique os parâmetros enviados |
| 404 | Not Found | Recurso não existe |
| 413 | Payload Too Large | Arquivo muito grande (máx 5MB) |
| 422 | Unprocessable Entity | Validação de dados falhou |
| 500 | Server Error | Erro no servidor |

---

## Formato de ID do Pedido

O ID deve seguir um padrão específico:

```
AAMMDD + 8 dígitos = 14 dígitos totais
```

**Exemplos válidos:**
- `26011412345678` = 14/01/26 + 12345678
- `25120100001234` = 01/12/25 + 00001234
- `26063099999999` = 30/06/26 + 99999999

**Exemplos inválidos:**
- `2601141234567` = Só 13 dígitos ❌
- `26131200001234` = Mês 13 inválido ❌
- `26002000001234` = Dia 20 em fevereiro (mês 02) ❌

---

## Autenticação

Atualmente não há autenticação. Para adicionar em produção:

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthCredentials

security = HTTPBearer()

async def verificar_token(credentials: HTTPAuthCredentials = Depends(security)):
    token = credentials.credentials
    # Validar token aqui
    return token
```

---

## Rate Limiting (Recomendado)

Para produção, adicionar rate limiting:

```bash
pip install slowapi
```

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.post("/api/upload-logo")
@limiter.limit("5/minute")
async def upload_logo(...):
    ...
```

---

## CORS (Se necessário)

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://seudominio.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## Exemplos com cURL

```bash
# 1. Validar pedido
curl -X POST "http://localhost:8000/api/validar-pedido" \
  -H "Content-Type: application/json" \
  -d '{"id_pedido":"26011412345678"}'

# 2. Upload de logotipo
curl -X POST "http://localhost:8000/api/upload-logo" \
  -F "id_pedido=26011412345678" \
  -F "arquivo=@logo.png"

# 3. Salvar contato
curl -X POST "http://localhost:8000/api/salvar-contato" \
  -H "Content-Type: application/json" \
  -d '{
    "id_pedido":"26011412345678",
    "instagram":"@lografic",
    "whatsapp":"(11) 99876-5432",
    "usar_instagram":true,
    "usar_whatsapp":true
  }'

# 4. Download
curl -X GET "http://localhost:8000/api/download/26011412345678/final.png" \
  -o sacola.png
```

---

## Exemplos com JavaScript/Fetch

```javascript
// 1. Validar pedido
fetch('/api/validar-pedido', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({id_pedido: '26011412345678'})
}).then(r => r.json()).then(d => console.log(d));

// 2. Upload de logotipo
const formData = new FormData();
formData.append('id_pedido', '26011412345678');
formData.append('arquivo', fileInput.files[0]);

fetch('/api/upload-logo', {
  method: 'POST',
  body: formData
}).then(r => r.json()).then(d => console.log(d));

// 3. Download
const link = document.createElement('a');
link.href = '/api/download/26011412345678/final.png';
link.download = 'sacola.png';
link.click();
```

---

## Performance

**Tempos esperados:**
- Validação de pedido: < 10ms
- Upload de logotipo: 100-500ms (depende do tamanho)
- Geração de mockup: 200-800ms
- Aprovação e geração final: 500-1500ms
- Envio de email: 1-3s

**Otimizações:**
- Usar cache para mockups frequentes
- Comprimir imagens de entrada
- Gerar mockups em background com celery
- Implementar CDN para arquivos estáticos

---

Última atualização: 18/01/2026
