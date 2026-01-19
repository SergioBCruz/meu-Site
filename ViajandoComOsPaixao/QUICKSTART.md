# ⚡ Guia Rápido - Iniciar em 5 Minutos

## 1️⃣ Abra o Terminal/PowerShell

Navegue até a pasta do projeto:

```bash
cd C:\Users\Sergi\Documents\Python\ Scripts\ViajandoComOsPaixao
```

## 2️⃣ Ative o Ambiente Virtual

**Windows:**
```bash
venv\Scripts\activate
```

**macOS/Linux:**
```bash
source venv/bin/activate
```

## 3️⃣ Instale as Dependências (primeira vez apenas)

```bash
pip install -r requirements.txt
```

## 4️⃣ Configure o Arquivo .env (primeira vez apenas)

Copie `.env.example` para `.env`:

**Windows:**
```bash
copy .env.example .env
```

**macOS/Linux:**
```bash
cp .env.example .env
```

## 5️⃣ Execute o Servidor

```bash
python main.py
```

Você verá:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

## 6️⃣ Acesse no Navegador

👉 **http://localhost:8000**

---

## 🎬 O que Fazer Agora

1. ✅ Clique **Login**
2. ✅ Clique em **Registrar**
3. ✅ Crie uma conta
4. ✅ Faça login
5. ✅ Clique em **Admin**
6. ✅ Clique em **Criar Novo Post**
7. ✅ Adicione fotos e vídeos
8. ✅ Publique!

---

## 🛑 Para Parar o Servidor

Pressione `Ctrl + C` no terminal

---

## ❓ Problema ao Instalar?

Se `pip install` falhar:

```bash
python -m pip install --upgrade pip
pip install -r requirements.txt
```

---

## 📱 Funcionalidades Principais

| Página | Função |
|--------|--------|
| **Home** | Visualiza todos os posts |
| **Galeria** | Vê fotos com filtros |
| **Vídeos** | Assiste vídeos |
| **Sobre** | Lê sobre a família |
| **Admin** | Cria/edita/deleta posts |

---

**🎉 Pronto! O site está funcionando!**

Para mais informações detalhadas, leia o `README.md`
