## Landing pages premium

Site em Next.js + Tailwind focado em conversão. Inclui seções de hero, serviços, demos, diferenciais, sobre e contato (CTA para WhatsApp + formulário).

### Novidades
- Hero com foco em diagnóstico gratuito.
- Nova rota /diagnostico com formulário (nome, WhatsApp, URL, nicho) e mensagem pós-envio.
- Seção "Como funciona" e planos atualizados para setup e otimização contínua.
- CTA principais apontando para o diagnóstico gratuito.

### Rodar local

```bash
npm install
npm run dev
# abre em http://localhost:3000
```

### Build de produção

```bash
npm run build
npm run start
```

### Deploy rápido

- Vercel (recomendado para Next): importe o repositório, selecione framework Next.js e deploy.
- Netlify (static export opcional): use `next export` se precisar de HTML estático.

### Ajustes que você deve fazer

- Atualize o número do WhatsApp em `src/app/page.tsx` (`whatsappLink`).
- Ajuste cores ou fontes em `src/app/globals.css` se quiser personalizar a identidade.
- Edite textos nas seções conforme necessidade do cliente.

### Scripts prontos (WhatsApp)
- Inicial: "Olá! Analisei sua landing page e identifiquei alguns pontos simples que podem aumentar sua conversão. Posso te enviar um diagnóstico gratuito?"
- Entrega: "Analisei sua landing e encontrei 3 pontos que estão reduzindo sua conversão. Posso corrigir isso e te entregar a versão otimizada em 24h. Quer que eu te explique?"
- Fechamento: "O valor do setup é R$147 com entrega em até 24h. Se fizer sentido para você, posso iniciar agora."

### Prompt interno (diagnóstico com IA)
```
Você é um especialista em CRO e copywriting.
Analise esta landing page com foco em conversão.

Nicho:
[PREENCHER]

Público:
[PREENCHER]

URL ou descrição da landing:
[PREENCHER]

Entregue:
1. Problema principal da headline
2. Clareza da proposta de valor
3. Pontos de abandono
4. Sugestões práticas de melhoria
5. Nova headline sugerida
6. CTA otimizado
7. Observações finais orientadas a conversão
```
