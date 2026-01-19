# 🚀 Guia de Instalação e Execução

## Passo 1: Preparar o Ambiente

### No Windows:

```bash
# Abrir PowerShell ou Command Prompt
# Navegar até a pasta do projeto
cd C:\Users\Sergi\Documents\Python Scripts\ViajandoComOsPaixao

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
venv\Scripts\activate
```

### No macOS/Linux:

```bash
# Navegar até a pasta do projeto
cd ~/Documents/Python\ Scripts/ViajandoComOsPaixao

# Criar ambiente virtual
python3 -m venv venv

# Ativar ambiente virtual
source venv/bin/activate
```

## Passo 2: Instalar Dependências

```bash
# Com o ambiente virtual ativado
pip install -r requirements.txt
```

**Isso levará alguns minutos, dependendo da conexão**

## Passo 3: Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo (Windows)
copy .env.example .env

# OU copiar arquivo de exemplo (macOS/Linux)
cp .env.example .env
```

Depois, edite o arquivo `.env` e mude a `SECRET_KEY`:

```
SECRET_KEY=sua-chave-secreta-aleatorias-aqui
```

## Passo 4: Executar o Servidor

```bash
# Com o ambiente virtual ativado
python main.py
```

**Você deve ver:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000
INFO:     Application startup complete
```

## Passo 5: Acessar o Site

Abra seu navegador e acesse:

**http://localhost:8000**

## 🎯 Primeiros Passos

1. **Clique em "Login"** no canto superior direito
2. **Registre uma conta** com um email e senha
3. **Faça login** com as credenciais criadas
4. **Acesse o painel "Admin"** para criar seu primeiro post
5. **Preencha as informações**:
   - Título (ex: Férias em Paris)
   - Descrição (conte sua história!)
   - Local/País (ex: França, Paris)
   - Data da viagem
   - Adicione fotos (JPG, PNG, máx 10MB)
   - Adicione vídeos (MP4, máx 100MB)
6. **Clique "Publicar Post"**

## 📝 Estrutura do Projeto

Todos os arquivos necessários já estão criados:

```
✅ main.py              - Backend (FastAPI)
✅ requirements.txt     - Dependências
✅ templates/
   ✅ index.html        - Página inicial
   ✅ galeria.html      - Galeria de fotos
   ✅ videos.html       - Galeria de vídeos
   ✅ sobre.html        - Página sobre nós
   ✅ admin.html        - Painel administrativo
✅ static/
   ✅ css/style.css     - Estilos completos
   ✅ js/main.js        - JavaScript funcional
✅ .env.example         - Configuração de exemplo
✅ README.md            - Documentação completa
```

## 🆘 Problemas Comuns

### "python: command not found" (macOS/Linux)
- Use `python3` ao invés de `python`

### "ModuleNotFoundError" ao executar
- Certifique-se de que o ambiente virtual está ativado
- Execute: `pip install -r requirements.txt` novamente

### Porta 8000 já está em uso
- Mude a porta no comando:
  ```bash
  python main.py --port 8001
  ```

### Erros ao fazer upload de fotos/vídeos
- Verifique o tamanho do arquivo (máximo 10MB para fotos, 100MB para vídeos)
- Verifique se é um arquivo válido (JPG, PNG para fotos; MP4 para vídeos)

### "Connection refused" ao acessar localhost
- Certifique-se de que `python main.py` está rodando
- O servidor pode ter crashado - execute novamente

## 💡 Dicas Úteis

### Para parar o servidor
- Pressione `Ctrl + C` no terminal

### Para ligar novamente
- Execute `python main.py` de novo

### Para resetar o banco de dados
- Delete o arquivo `database.json` (se existir)
- Execute o servidor novamente - um novo banco será criado

### Para ver erros detalhados
- Edite `.env` e mude `DEBUG=True`
- Os erros aparecerão no navegador

## 🌐 Para Colocar Online (Deploy)

Após ter tudo funcionando localmente, você pode colocar o site na internet usando:

- **Render.com** (mais fácil)
- **Railway.app** (bom suporte)
- **PythonAnywhere** (específico para Python)

Veja o arquivo `README.md` para instruções de deploy.

---

**Dúvidas? Revise o README.md ou execute `python main.py` com DEBUG=True para ver erros detalhados!**

Bom compartilhamento! ✈️📸🌍
