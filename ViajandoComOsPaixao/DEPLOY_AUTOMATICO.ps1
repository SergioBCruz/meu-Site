#!/usr/bin/env powershell

# 🚀 SCRIPT DE DEPLOY AUTOMÁTICO - VIAJANDO COM OS PAIXÃO
# Executa todos os passos de uma vez

Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  🚀 DEPLOY AUTOMÁTICO - FIREBASE                      ║" -ForegroundColor Green
Write-Host "║  Projeto: viajandocomospaixao-1eb95                   ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

# ============================================
# VERIFICAR INSTALAÇÕES
# ============================================

Write-Host "📋 VERIFICANDO INSTALAÇÕES..." -ForegroundColor Yellow
Write-Host ""

$tools_ok = $true

# Verificar Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Cyan
try {
    $node_version = node --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Node.js instalado: $node_version" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Node.js NÃO encontrado" -ForegroundColor Red
        Write-Host "     Instale em: https://nodejs.org/" -ForegroundColor Yellow
        $tools_ok = $false
    }
} catch {
    Write-Host "  ❌ Node.js NÃO encontrado" -ForegroundColor Red
    Write-Host "     Instale em: https://nodejs.org/" -ForegroundColor Yellow
    $tools_ok = $false
}

# Verificar Firebase CLI
Write-Host "Verificando Firebase CLI..." -ForegroundColor Cyan
try {
    $firebase_version = firebase --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Firebase CLI instalado: $firebase_version" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Firebase CLI NÃO encontrado" -ForegroundColor Red
        Write-Host "     Instale com: npm install -g firebase-tools" -ForegroundColor Yellow
        $tools_ok = $false
    }
} catch {
    Write-Host "  ❌ Firebase CLI NÃO encontrado" -ForegroundColor Red
    Write-Host "     Instale com: npm install -g firebase-tools" -ForegroundColor Yellow
    $tools_ok = $false
}

# Verificar Google Cloud SDK
Write-Host "Verificando Google Cloud SDK..." -ForegroundColor Cyan
try {
    $gcloud_version = gcloud --version 2>$null | Select-Object -First 1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Google Cloud SDK instalado" -ForegroundColor Green
    } else {
        Write-Host "  ❌ Google Cloud SDK NÃO encontrado" -ForegroundColor Red
        Write-Host "     Instale em: https://cloud.google.com/sdk/docs/install" -ForegroundColor Yellow
        $tools_ok = $false
    }
} catch {
    Write-Host "  ❌ Google Cloud SDK NÃO encontrado" -ForegroundColor Red
    Write-Host "     Instale em: https://cloud.google.com/sdk/docs/install" -ForegroundColor Yellow
    $tools_ok = $false
}

# Verificar Docker
Write-Host "Verificando Docker..." -ForegroundColor Cyan
try {
    $docker_version = docker --version 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ Docker instalado: $docker_version" -ForegroundColor Green
    } else {
        Write-Host "  ⚠️  Docker NÃO encontrado (necesário para build)" -ForegroundColor Yellow
        Write-Host "     Instale em: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
    }
} catch {
    Write-Host "  ⚠️  Docker NÃO encontrado (necesário para build)" -ForegroundColor Yellow
    Write-Host "     Instale em: https://www.docker.com/products/docker-desktop" -ForegroundColor Yellow
}

Write-Host ""

if ($tools_ok -eq $false) {
    Write-Host "❌ FALTAM FERRAMENTAS!" -ForegroundColor Red
    Write-Host "Instale as ferramentas acima e tente novamente." -ForegroundColor Red
    Write-Host ""
    Read-Host "Pressione ENTER para fechar"
    exit 1
}

Write-Host "✅ TODAS AS FERRAMENTAS ESTÃO INSTALADAS!" -ForegroundColor Green
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# ============================================
# PASSO 1: LOGIN
# ============================================

Write-Host "📝 PASSO 1: Faça Login no Google Cloud" -ForegroundColor Yellow
Write-Host ""
Write-Host "Digite seu email do Google (o mesmo da conta Firebase)" -ForegroundColor Cyan
Write-Host ""

gcloud auth login

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer login" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ Login realizado com sucesso!" -ForegroundColor Green
Write-Host ""

# ============================================
# PASSO 2: CONFIGURAR PROJETO
# ============================================

Write-Host "⚙️  PASSO 2: Configurar Projeto Google Cloud" -ForegroundColor Yellow

gcloud config set project viajandocomospaixao-1eb95

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao configurar projeto" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Projeto configurado!" -ForegroundColor Green
Write-Host ""

# ============================================
# PASSO 3: BUILD DOCKER
# ============================================

Write-Host "🐳 PASSO 3: Build da Imagem Docker (⏳ 3-5 minutos)" -ForegroundColor Yellow
Write-Host ""
Write-Host "⚠️  IMPORTANTE:" -ForegroundColor Red
Write-Host "   - Certifique-se que Docker Desktop está ABERTO" -ForegroundColor Red
Write-Host "   - Se não tiver, abra agora e aguarde inicializar" -ForegroundColor Red
Write-Host ""

Read-Host "Pressione ENTER para continuar"

Write-Host ""
Write-Host "Iniciando build..." -ForegroundColor Cyan
Write-Host ""

gcloud builds submit --tag gcr.io/viajandocomospaixao-1eb95/viajando-com-os-paixao

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer build" -ForegroundColor Red
    Write-Host "Verifique se Docker está rodando!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ BUILD CONCLUÍDO COM SUCESSO!" -ForegroundColor Green
Write-Host ""

# ============================================
# PASSO 4: DEPLOY CLOUD RUN
# ============================================

Write-Host "☁️  PASSO 4: Deploy no Cloud Run (⏳ 1-2 minutos)" -ForegroundColor Yellow
Write-Host ""

gcloud run deploy viajando-com-os-paixao `
  --image gcr.io/viajandocomospaixao-1eb95/viajando-com-os-paixao `
  --platform managed `
  --region us-central1 `
  --allow-unauthenticated

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer deploy" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ CLOUD RUN DEPLOY CONCLUÍDO!" -ForegroundColor Green
Write-Host ""

# ============================================
# PASSO 5: FIREBASE HOSTING
# ============================================

Write-Host "🎨 PASSO 5: Deploy Firebase Hosting (⏳ 1-2 minutos)" -ForegroundColor Yellow
Write-Host ""

firebase deploy --only hosting

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Erro ao fazer deploy Firebase" -ForegroundColor Red
    exit 1
}

Write-Host ""

# ============================================
# CONCLUSÃO
# ============================================

Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  ✅ DEPLOY CONCLUÍDO COM SUCESSO! ✅                  ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Seu site está ONLINE em:" -ForegroundColor Green
Write-Host "   https://viajandocomospaixao-1eb95.web.app" -ForegroundColor Cyan
Write-Host ""
Write-Host "📱 Próximos passos:" -ForegroundColor Yellow
Write-Host "   1. Acesse o link acima" -ForegroundColor Yellow
Write-Host "   2. Clique em 'Login'" -ForegroundColor Yellow
Write-Host "   3. Clique em 'Registrar'" -ForegroundColor Yellow
Write-Host "   4. Crie sua conta" -ForegroundColor Yellow
Write-Host "   5. Publique seu primeiro post!" -ForegroundColor Yellow
Write-Host ""
Write-Host "🔗 Links úteis:" -ForegroundColor Cyan
Write-Host "   Firebase Console:" -ForegroundColor Cyan
Write-Host "   https://console.firebase.google.com/project/viajandocomospaixao-1eb95" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Cloud Run Dashboard:" -ForegroundColor Cyan
Write-Host "   https://console.cloud.google.com/run?project=viajandocomospaixao-1eb95" -ForegroundColor Cyan
Write-Host ""

Read-Host "Pressione ENTER para fechar"
