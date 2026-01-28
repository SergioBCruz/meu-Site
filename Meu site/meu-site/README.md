## Landing Pages que vendem

Site em Next.js + Tailwind pensado para vender serviços de landing pages. Inclui seções de hero, serviços, demos, diferenciais, sobre e contato (CTA para WhatsApp + formulário).

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
