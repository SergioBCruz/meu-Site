# 🚀 Deploy no Firebase - Passo a Passo

## 1️⃣ Instalação Inicial

### Windows - Instale Firebase CLI:
```bash
# Instale Node.js primeiro (https://nodejs.org/)
npm install -g firebase-tools

# Depois instale Google Cloud SDK:
# https://cloud.google.com/sdk/docs/install
```

### Verifique as instalações:
```bash
firebase --version
gcloud --version
```

---

## 2️⃣ Configurar Google Cloud

### Faça Login:
```bash
gcloud auth login
gcloud config set project PROJECT_ID
```

Substitua `PROJECT_ID` com seu ID do projeto Firebase.

---

## 3️⃣ Build da Imagem Docker

```bash
# Navigate to your project
cd C:\Users\Sergi\Documents\Python\ Scripts\ViajandoComOsPaixao

# Build the image
gcloud builds submit --tag gcr.io/PROJECT_ID/viajando-app
```

Substitua `PROJECT_ID` com seu ID.

---

## 4️⃣ Deploy no Cloud Run

```bash
gcloud run deploy viajando-com-os-paixao \
  --image gcr.io/PROJECT_ID/viajando-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

Você receberá uma URL como:
```
https://viajando-com-os-paixao-xxxxx.a.run.app
```

---

## 5️⃣ Atualize o Firebase Redirect

Edite `public/index.html` e mude:
```javascript
const BACKEND_URL = 'https://viajando-com-os-paixao-xxxxx.a.run.app';
```

Para a URL que você recebeu no passo anterior.

---

## 6️⃣ Deploy Frontend

```bash
# Faça login no Firebase
firebase login

# Faça deploy
firebase deploy --only hosting
```

---

## 7️⃣ Teste Online

Seu site estará em:
```
https://SEU-PROJECT.web.app
```

---

## ❓ Problemas Comuns

### Erro: "gcloud command not found"
- Instale Google Cloud SDK: https://cloud.google.com/sdk/docs/install
- Reinicie o terminal

### Erro: "Docker not found"
- Instale Docker Desktop: https://www.docker.com/products/docker-desktop

### Erro: "Permission denied"
- Execute `gcloud auth login` novamente
- Certifique-se de estar no projeto correto

### Erro de Porta
- Cloud Run sempre usa porta 8080
- Certifique-se de que `main.py` está usando `--port 8080`

---

## 📊 Custo (Estimado - Grátis ou Muito Barato)

- **Firebase Hosting:** Grátis até 1GB/mês
- **Cloud Run:** Grátis até 180.000 CPU-segundos/mês
- **Total para pequeno uso:** Geralmente GRÁTIS!

---

## 💾 Variáveis de Ambiente

Na Console Cloud Run, adicione:

1. Vá para seu serviço Cloud Run
2. Clique em "Editar e fazer deploy novamente"
3. Na aba "Variáveis de ambiente", adicione:
   ```
   SECRET_KEY=sua-chave-segura-aqui
   DEBUG=False
   ```

---

## 🔒 Banco de Dados

Para produção, considere:
- **Firestore** (Recomendado - gratuito)
- **Cloud SQL** (PostgreSQL)
- **Firebase Realtime Database**

Veja documentação para integração!

---

## 📞 Próximos Passos

1. Instale Firebase CLI e Google Cloud SDK
2. Crie projeto no Firebase Console
3. Siga os passos 1-7 acima
4. Teste seu site online!

---

**Seu site estará ao vivo em minutos! 🎉**
