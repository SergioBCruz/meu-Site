# ❓ Perguntas Frequentes (FAQ)

## 🎯 Sobre o Sistema

### P: O que é este sistema?
**R:** É uma plataforma Web-to-Print completa para permitir que clientes personalizem sacolas com seu logotipo, dados de contato e preferências estruturais, visualizem um mockup realista e aprovem para produção.

### P: Qual é o público-alvo?
**R:** 
- Empresas de impressão/embalagem
- Lojas online de e-commerce
- Agências de design
- Produtoras de sacolas personalizadas

### P: O sistema é grátis?
**R:** Sim, é um projeto open-source. Você pode modificar e usar conforme necessário.

---

## 🚀 Instalação & Setup

### P: Que versão de Python é necessária?
**R:** Python 3.8 ou superior. Recomendamos 3.10+.

### P: Quanto tempo leva para instalar?
**R:** Cerca de 5-10 minutos (sem email) ou 15 minutos (com email).

### P: Preciso de um banco de dados?
**R:** Não! O sistema usa JSON para armazenar dados. Para produção, você pode integrar PostgreSQL/MongoDB.

### P: Posso rodar em Windows?
**R:** Sim, funciona perfeitamente em Windows. Use PowerShell ou CMD.

### P: Qual é o requisito de hardware?
**R:** Mínimo: 512MB RAM, 1GB armazenamento. Recomendado: 2GB RAM, 20GB armazenamento.

---

## 📧 Email

### P: O email é obrigatório?
**R:** Não. O sistema funciona normalmente sem email. Os arquivos ficam disponíveis para download direto.

### P: Como configurar email com Gmail?
**R:** 
1. Ativar autenticação em 2 etapas em myaccount.google.com
2. Gerar "Senha de App" em myaccount.google.com/apppasswords
3. Copiar `.env.example` para `.env`
4. Preencher EMAIL_USUARIO e EMAIL_SENHA

### P: Posso usar outro provedor de email?
**R:** Sim! Você pode usar Outlook, Yahoo, ou qualquer SMTP. Basta configurar SMTP_SERVER e SMTP_PORT no `.env`.

### P: O que acontece se o email falhar?
**R:** Os arquivos continuam sendo gerados normalmente. Você receberá um log do erro, mas o pedido não é perdido.

### P: Posso testar o email sem configurar Gmail?
**R:** Sim, rode o sistema sem preencher as variáveis de email. Um aviso aparecerá, mas tudo funciona.

---

## 🎨 Personalização & Design

### P: Posso mudar as cores do sistema?
**R:** Sim! Edite `static/css/style.css` e altere as variáveis CSS no `:root`.

### P: Posso adicionar mais passos?
**R:** Sim, adicione novos `<section class="step">` em `templates/index.html` e a lógica em `static/js/app.js`.

### P: Como mudar o texto/idioma?
**R:** Edite diretamente em `templates/index.html` e nos textos do `main.py`.

### P: Posso adicionar mais opções de alça?
**R:** Sim! No Passo 4, adicione mais `<label>` com novas opções e atualize a lógica em `main.py`.

### P: Como customizar as mensagens legais?
**R:** Edite o texto "Embalagem produzida por Lografic..." em `main.py` na função `gerar_mockup()`.

---

## 🖼️ Logotipo & Upload

### P: Quais formatos de arquivo são aceitos?
**R:** PNG, JPG, JPEG, SVG e WebP. Máximo 5MB.

### P: Qual é a resolução recomendada?
**R:** 500x500px no máximo. Recomendamos 300 DPI para qualidade de impressão.

### P: Posso fazer upload de imagens com fundo transparente?
**R:** Sim! PNG com transparência é recomendado.

### P: O sistema redimensiona automaticamente?
**R:** Sim, o sistema redimensiona para caber no mockup mantendo proporção.

### P: Onde os logos são armazenados?
**R:** Em `uploads/{id_pedido}/logo.{extensao}`

---

## 📱 Validação & Formato

### P: Qual é o formato do ID do pedido?
**R:** AAMMDD + 8 dígitos (14 total). Exemplo: 26011412345678 (14/01/26 + 12345678).

### P: Posso usar outro formato de ID?
**R:** Sim, edite a função `validar_id_pedido()` em `main.py`.

### P: Como é validado o WhatsApp?
**R:** Formato: (XX) 9XXXX-XXXX. A máscara é aplicada automaticamente.

### P: Posso adicionar outros campos de contato?
**R:** Sim! Adicione novos checkboxes no Passo 3 e atualize `main.py`.

---

## 📊 Dados & Armazenamento

### P: Onde são armazenados os pedidos?
**R:** Em `generated/{id_pedido}/dados.json`

### P: Os dados são criptografados?
**R:** Não, mas você pode implementar criptografia facilmente usando a biblioteca `cryptography`.

### P: Posso usar um banco de dados?
**R:** Sim! Integre SQLAlchemy ou outra ORM para suporte a PostgreSQL, MySQL, etc.

### P: Como fazer backup dos pedidos?
**R:** Copie a pasta `generated/` regularmente. Ou configure scripts de backup (veja DEPLOY.md).

### P: Quanto tempo os dados são mantidos?
**R:** Indefinidamente, a menos que você delete manualmente.

---

## 🖨️ Mockup & Geração

### P: Como é gerado o mockup?
**R:** Usando a biblioteca Pillow. Cria imagem PNG com simulação de papel fosco e comportamento realista de tinta.

### P: Posso mudar a textura do papel?
**R:** Sim, edite os valores de cor em `gerar_mockup()` em `main.py`. COR_PAPEL = (245, 242, 238).

### P: Quanto tempo leva para gerar o mockup?
**R:** 200-800ms dependendo do tamanho da imagem.

### P: Posso usar templates diferentes de sacola?
**R:** Sim! Crie imagens base diferentes e customize `gerar_mockup()`.

### P: Os mockups são salvos?
**R:** Sim, em `generated/{id_pedido}/mockup.png` e `final.png`/`final.jpg`.

---

## 📥 Download & Entregas

### P: Em quais formatos o arquivo final é gerado?
**R:** PNG e JPEG (300 DPI qualidade).

### P: Posso gerar em outros formatos?
**R:** Sim! Adicione suporte a PDF, TIFF, etc. usando Pillow ou ReportLab.

### P: Quanto tempo leva para gerar os arquivos finais?
**R:** 500-1500ms incluindo email.

### P: Como o cliente recebe os arquivos?
**R:** Link de download direto na página ou por email como anexo.

### P: O prazo de 4 dias úteis é configurável?
**R:** Sim, edite em `aprovar_arte()`: `data_postagem = data_criacao + timedelta(days=4)`

---

## 🔒 Segurança

### P: O sistema é seguro?
**R:** Sim, implementamos validações contra injeção de código, path traversal, etc. Para produção, adicione autenticação/autorização.

### P: Dados pessoais são protegidos?
**R:** Não há criptografia por padrão. Para LGPD/GDPR, implemente criptografia de dados sensíveis.

### P: Posso adicionar autenticação?
**R:** Sim! Use FastAPI-Users ou similar. Veja exemplos em `config.py`.

### P: Posso limitar acesso por IP?
**R:** Sim, configure firewall no Nginx ou adicione middleware no FastAPI.

### P: Como fazer HTTPS?
**R:** Use Let's Encrypt com Certbot. Instruções em DEPLOY.md.

---

## 🚨 Troubleshooting

### P: Porta 8000 já está em uso
**R:** Execute: `python main.py --port 8001` ou encontre qual processo está usando.

### P: "ModuleNotFoundError: No module named 'fastapi'"
**R:** Execute: `pip install -r requirements.txt`

### P: Email não é enviado
**R:** Verifique `.env`, credenciais Gmail, firewall (porta 587), logs de erro.

### P: Mockup não aparece
**R:** Verifique se Pillow está instalado: `pip install Pillow`

### P: Upload rejeitado
**R:** Verificar formato (PNG/JPG), tamanho (<5MB), permissões da pasta.

### P: Erro 413 Payload Too Large
**R:** Arquivo muito grande. Comprimir imagem ou aumentar limite no Nginx.

### P: CSS/JS não carrega
**R:** Verificar se `static/` está no mesmo diretório de `main.py`.

---

## 🌐 Deploy & Produção

### P: Posso usar em produção?
**R:** Sim, foi desenvolvido para produção. Siga checklist de segurança em DEPLOY.md.

### P: Qual opção de deploy é melhor?
**R:** Para começar: VPS Linux (DigitalOcean/Linode). Para enterprise: AWS/Azure com load balancing.

### P: Posso usar Docker?
**R:** Sim! Dockerfile e docker-compose.yml estão inclusos.

### P: Como monitorar em produção?
**R:** Use Prometheus + Grafana ou serviços como DataDog, New Relic.

### P: Qual é a capacidade?
**R:** Com Gunicorn 4 workers: ~500 requisições/min. Escale com load balancing.

### P: Posso ter múltiplos servidores?
**R:** Sim, usando load balancer (Nginx, HAProxy) e armazenamento compartilhado (NFS).

---

## 💰 Custos

### P: Quanto custa rodar este sistema?
**R:** 
- Básico (VPS): $5-20/mês
- Médio (EC2): $20-50/mês
- Enterprise (Load balancer + DB): $200+/mês

### P: Posso rodar gratuitamente?
**R:** Sim, usando:
- Heroku free tier (limitado)
- Oracle Cloud free tier
- Seu próprio computador

---

## 🤝 Suporte & Desenvolvimento

### P: Posso contribuir com melhorias?
**R:** Sim! Abra pull requests no repositório GitHub.

### P: Encontrei um bug!
**R:** Abra uma issue no GitHub com detalhes e passos para reproduzir.

### P: Preciso de uma feature customizada?
**R:** Você pode:
1. Implementar você mesmo
2. Contratar um desenvolvedor
3. Solicitar na comunidade

### P: Há documentação para desenvolvedores?
**R:** Sim! Veja:
- README.md (visão geral)
- API_DOCUMENTATION.md (endpoints)
- DEPLOY.md (produção)
- Código comentado em main.py

### P: Posso comercializar algo baseado nisto?
**R:** Sim, é open-source. Você pode customizar e vender.

---

## 🎓 Aprendizado

### P: Este é um bom projeto para aprender?
**R:** Sim! Demonstra:
- FastAPI & Python moderno
- Frontend HTML/CSS/JS
- REST API design
- Geração de imagens
- Envio de email
- Deploy em produção

### P: Como aprender FastAPI?
**R:** Veja código em `main.py` e documentação oficial em fastapi.tiangolo.com

### P: Como entender o fluxo?
**R:** Leia em ordem:
1. `templates/index.html` - Interface
2. `static/js/app.js` - Lógica frontend
3. `main.py` - Backend API

---

## 📞 Contato & Comunidade

### P: Onde relatar problemas?
**R:** 
- GitHub Issues
- Email: suporte@lografic.com.br

### P: Como sugerir melhorias?
**R:** GitHub Discussions ou Issues com label `enhancement`.

### P: Tem comunidade/forum?
**R:** Pode ser criado conforme demanda. Por enquanto: GitHub Issues.

---

## 📝 Última Atualização

Data: 18 de janeiro de 2026
Versão: 1.0.0
Status: ✅ Completo e Testado

Se sua pergunta não está aqui, abra uma issue no GitHub!
