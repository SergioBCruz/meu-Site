FROM python:3.11-slim

# Definir diretório de trabalho
WORKDIR /app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements
COPY requirements.txt .

# Instalar dependências Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiar arquivos da aplicação
COPY . .

# Criar diretórios necessários
RUN mkdir -p uploads generated logs

# Expor porta
EXPOSE 8000

# Comando para executar
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
