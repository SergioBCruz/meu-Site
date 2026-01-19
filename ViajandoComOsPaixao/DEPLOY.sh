#!/bin/bash
# 🚀 Deploy Rápido - Viajando com os Paixão
# Execute este arquivo para fazer deploy automático

echo "🔥 Iniciando Deploy para Firebase..."
echo ""

# Configurações
PROJECT_ID="viajandocomospaixao-1eb95"
APP_NAME="viajando-com-os-paixao"
REGION="us-central1"

echo "📊 Projeto: $PROJECT_ID"
echo "🌍 Região: $REGION"
echo ""

# ============================================
# PASSO 1: Build da imagem Docker
# ============================================

echo "📦 PASSO 1: Building Docker image..."
echo "Comando:"
echo "gcloud builds submit --tag gcr.io/$PROJECT_ID/$APP_NAME"
echo ""
echo "⏳ Isso pode levar 3-5 minutos..."
echo ""
echo "Copie e execute este comando no terminal:"
echo "gcloud builds submit --tag gcr.io/$PROJECT_ID/$APP_NAME"
echo ""

read -p "Pressione ENTER quando o build terminar..."

# ============================================
# PASSO 2: Deploy no Cloud Run
# ============================================

echo ""
echo "🚀 PASSO 2: Deploying to Cloud Run..."
echo "Comando:"
echo "gcloud run deploy $APP_NAME --image gcr.io/$PROJECT_ID/$APP_NAME --platform managed --region $REGION --allow-unauthenticated"
echo ""
echo "Copie e execute este comando:"
echo "gcloud run deploy $APP_NAME --image gcr.io/$PROJECT_ID/$APP_NAME --platform managed --region $REGION --allow-unauthenticated"
echo ""

read -p "Pressione ENTER quando o deploy terminar..."

# Peça a URL do Cloud Run
echo ""
echo "❓ Qual é a URL do Cloud Run que você recebeu?"
echo "Exemplo: https://viajando-com-os-paixao-xxxxx.a.run.app"
read CLOUD_RUN_URL

# ============================================
# PASSO 3: Atualizar Firebase Hosting
# ============================================

echo ""
echo "🔗 PASSO 3: Configurando redirect para Cloud Run..."
echo "Atualizando public/index.html..."

# Atualizar o URL no index.html
sed -i "s|https://viajando-com-os-paixao-xxxxx.a.run.app|$CLOUD_RUN_URL|g" public/index.html

echo "✅ URL atualizado para: $CLOUD_RUN_URL"
echo ""

# ============================================
# PASSO 4: Deploy Frontend
# ============================================

echo "🎨 PASSO 4: Deploying Firebase Hosting..."
echo "Comando:"
echo "firebase deploy --only hosting"
echo ""

firebase deploy --only hosting

# ============================================
# Conclusão
# ============================================

echo ""
echo "╔════════════════════════════════════════════════════════╗"
echo "║         ✅ DEPLOY CONCLUÍDO COM SUCESSO! ✅            ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""
echo "🌐 Seu site estará disponível em:"
echo "   https://viajandocomospaixao-1eb95.web.app"
echo ""
echo "☁️  Backend (Cloud Run):"
echo "   $CLOUD_RUN_URL"
echo ""
echo "📝 Próximos passos:"
echo "   1. Acesse o site acima"
echo "   2. Crie uma conta"
echo "   3. Publique seu primeiro post!"
echo ""
