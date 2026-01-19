# 🆘 PROBLEMAS DE DEPLOY - SOLUÇÕES RÁPIDAS

## ❌ ERRO: "firebase command not found"

### ✅ Solução:
```powershell
npm install -g firebase-tools

# Reinicie o PowerShell depois
```

---

## ❌ ERRO: "gcloud command not found"

### ✅ Solução:
1. Instale Google Cloud SDK:
   https://cloud.google.com/sdk/docs/install
   
2. Reinicie o PowerShell

3. Execute:
```powershell
gcloud auth login
gcloud config set project viajandocomospaixao-1eb95
```

---

## ❌ ERRO: "Docker daemon not running"

### ✅ Solução:
1. Abra **Docker Desktop**
2. Aguarde 1-2 minutos para inicializar
3. Tente novamente

---

## ❌ ERRO: "Permission denied" ou "Access denied"

### ✅ Solução:
```powershell
gcloud auth login
gcloud config set project viajandocomospaixao-1eb95
```

---

## ❌ ERRO: "failed to push to registry"

### ✅ Solução:
```powershell
# Autentique Docker
gcloud auth configure-docker

# Tente fazer build novamente
gcloud builds submit --tag gcr.io/viajandocomospaixao-1eb95/viajando-com-os-paixao
```

---

## ❌ ERRO: "Build failed"

### ✅ Solução:
1. Verifique se Docker Desktop está ABERTO
2. Execute novamente:
```powershell
gcloud builds submit --tag gcr.io/viajandocomospaixao-1eb95/viajando-com-os-paixao
```

3. Se continuar falhando:
   - Reinicie Docker Desktop
   - Reinicie o PowerShell
   - Tente novamente

---

## ❌ ERRO: "Cloud Run deployment failed"

### ✅ Solução:
```powershell
gcloud run deploy viajando-com-os-paixao `
  --image gcr.io/viajandocomospaixao-1eb95/viajando-com-os-paixao `
  --platform managed `
  --region us-central1 `
  --allow-unauthenticated
```

---

## ❌ ERRO: "Firebase login failed"

### ✅ Solução:
```powershell
firebase logout
firebase login

# Escolha a conta Gmail correta
```

---

## ❌ ERRO: "Project not found"

### ✅ Solução:
Verifique se o Project ID está correto:
```powershell
gcloud config set project viajandocomospaixao-1eb95
gcloud projects list
```

---

## ❌ ERRO: "public folder not found"

### ✅ Solução:
A pasta `public/` deve existir. Se não existir:

```powershell
mkdir public
```

---

## ✅ TUDO FUNCIONANDO?

Se tudo rodou sem erros, seu site está em:
🌐 https://viajandocomospaixao-1eb95.web.app

---

## 📞 MÉTODO ALTERNATIVO (SE NADA FUNCIONAR)

Se você está tendo muitos problemas, use a **alternativa mais simples**:

### Deploy apenas Frontend no Firebase:

```powershell
firebase login
firebase deploy --only hosting
```

Isso coloca o frontend online em minutos! ⚡

---

## 🔍 MONITORAR DEPLOY

Veja o progresso em:

1. **Cloud Build**: https://console.cloud.google.com/cloud-build?project=viajandocomospaixao-1eb95

2. **Cloud Run**: https://console.cloud.google.com/run?project=viajandocomospaixao-1eb95

3. **Firebase**: https://console.firebase.google.com/project/viajandocomospaixao-1eb95/hosting/sites

---

## 💡 DICA: Se estiver lento...

Os primeiros builds demoram mais (3-5 minutos). Seja paciente! ⏳

Próximos builds serão mais rápidos (1-2 minutos).

---

**Alguma dúvida? Me avisa qual é o erro exato!**
