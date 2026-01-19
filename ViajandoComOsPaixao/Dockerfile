FROM python:3.11-slim

WORKDIR /app

# Copiar arquivos necessários
COPY requirements.txt .
COPY main.py .
COPY templates/ ./templates/
COPY static/ ./static/
COPY uploads/ ./uploads/
COPY .env.example .env

# Instalar dependências
RUN pip install --no-cache-dir -r requirements.txt

# Expor porta
EXPOSE 8080

# Comando para rodar
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
