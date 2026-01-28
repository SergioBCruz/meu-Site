"use client";

const services = [
  "Landing pages focadas em conversão",
  "Sites institucionais modernos",
  "Otimização de performance",
  "Integração com WhatsApp e formulários",
  "SEO básico para Google",
];

const differentiators = [
  "⚡ Carregamento rápido",
  "📱 Mobile-first",
  "🎯 Estrutura pensada para vender",
  "💻 Código limpo e escalável",
  "🤝 Atendimento direto com o desenvolvedor",
];

const demos = [
  {
    title: "Facas Artesanais de Alto Desempenho",
    subtitle: "Corte preciso, design exclusivo e acabamento profissional",
    cta: "Solicitar orçamento no WhatsApp",
    price: "R$ 900 – R$ 2.500",
    badge: "Valor percebido alto",
  },
  {
    title: "Encontre Passagens Aéreas Mais Baratas em Minutos",
    subtitle: "Atendimento rápido, seguro e personalizado",
    cta: "Cotar passagem agora",
    price: "R$ 600 – R$ 1.500",
    badge: "Volume alto",
  },
  {
    title: "Soluções Profissionais para Seu Negócio",
    subtitle: "Atendimento rápido, confiança e resultado",
    cta: "Falar no WhatsApp",
    price: "R$ 500 – R$ 1.200",
    badge: "Fácil de vender",
  },
];

const stats = [
  { label: "Plano de ganho real", value: "R$ 5.600/mês" },
  { label: "Projetos / semana", value: "2" },
  { label: "Prazos", value: "Landing pronta em poucos dias" },
];

export default function Home() {
  const whatsappLink = "https://wa.me/5551997799212";

  return (
    <div className="min-h-screen text-foreground">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/80 border-b border-black/5">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="text-lg font-semibold text-primary">Sergi Landing Studio</div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-muted sm:flex">
            <a href="#servicos" className="hover:text-primary">
              Serviços
            </a>
            <a href="#projetos" className="hover:text-primary">
              Projetos
            </a>
            <a href="#sobre" className="hover:text-primary">
              Sobre
            </a>
            <a href="#contato" className="hover:text-primary">
              Contato
            </a>
          </nav>
          <a
            href="#contato"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Quero mais clientes
          </a>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-20 pt-12">
        <section className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Landing pages que vendem
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold leading-tight text-primary sm:text-5xl">
                Landing Pages que Transformam Visitas em Clientes
              </h1>
              <p className="text-lg text-muted">
                Crio landing pages modernas, rápidas e responsivas usando HTML, CSS, React e Bootstrap.
              </p>
              <p className="text-base text-primary font-semibold">
                Especialista em páginas focadas em conversão para empresas que querem mais clientes.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#contato"
                className="rounded-full bg-accent px-6 py-3 text-base font-semibold text-primary shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Quero mais clientes agora
              </a>
              <a
                href="#projetos"
                className="rounded-full border border-primary/20 px-6 py-3 text-base font-semibold text-primary transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
              >
                Ver demos reais
              </a>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div key={item.label} className="glass rounded-xl p-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted">
                    {item.label}
                  </div>
                  <div className="mt-1 text-lg font-bold text-primary">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass relative overflow-hidden rounded-2xl p-8 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-transparent" />
            <div className="relative space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold">
                  LP
                </span>
                <div>
                  <div className="text-sm font-semibold text-primary">Blueprint de conversão</div>
                  <div className="text-sm text-muted">Landing sob medida para seu negócio</div>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-muted">
                <li>• Estrutura AIDA + provas + CTA forte</li>
                <li>• Performance otimizada e mobile-first</li>
                <li>• Integração com WhatsApp e formulários</li>
              </ul>
              <div className="rounded-xl bg-primary text-white p-4">
                <div className="text-sm font-semibold">Script de vendas pronto</div>
                <p className="text-sm opacity-90">
                  Primeira mensagem, follow-up, preço de entrada e fechamento. Copiar e colar todo dia.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="servicos" className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted">Serviços</p>
            <h2 className="text-3xl font-bold text-primary">Soluções para vender mais</h2>
            <p className="text-base text-muted">
              Sou desenvolvedor focado em landing pages de alta performance. Cada projeto é pensado para
              converter visitas em contatos reais com design moderno, código limpo e carregamento rápido.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => (
              <div key={service} className="glass flex items-start gap-3 rounded-xl p-4">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
                <div>
                  <div className="text-base font-semibold text-primary">{service}</div>
                  <p className="text-sm text-muted">Entrega clara, rápida e focada em conversão.</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projetos" className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted">Projetos</p>
            <h2 className="text-3xl font-bold text-primary">3 demos reais para mostrar</h2>
            <p className="text-base text-muted">
              Use estes exemplos como print, link e argumento de venda. Templates prontos para adaptar.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {demos.map((demo) => (
              <div key={demo.title} className="glass flex h-full flex-col rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {demo.badge}
                  </span>
                  <span className="text-xs font-semibold text-muted">{demo.price}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-primary">{demo.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted">{demo.subtitle}</p>
                <a
                  href={whatsappLink}
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {demo.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl bg-primary px-6 py-8 text-white md:grid-cols-3">
          {differentiators.map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
              <p className="text-sm font-semibold leading-tight">{item}</p>
            </div>
          ))}
        </section>

        <section id="sobre" className="grid gap-8 md:grid-cols-2">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted">Sobre</p>
            <h2 className="text-3xl font-bold text-primary">Quem desenvolve</h2>
            <p className="text-base text-muted leading-relaxed">
              Sou desenvolvedor focado em criação de landing pages de alta performance. Meu trabalho é
              transformar visitantes em contatos reais usando design moderno, código limpo e estruturas
              pensadas para conversão. Cada projeto é desenvolvido para carregar rápido, funcionar
              perfeitamente no celular e gerar resultados para o negócio.
            </p>
          </div>
          <div className="glass space-y-4 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-primary font-bold">
                1:1
              </span>
              <div>
                <div className="text-sm font-semibold text-primary">Atendimento direto</div>
                <div className="text-sm text-muted">Sem camada intermediária: você fala comigo.</div>
              </div>
            </div>
            <div className="rounded-xl bg-primary/5 p-4 text-sm text-muted">
              <p>
                Script diário de vendas pronto: primeira mensagem, follow-up, resposta de preço e
                fechamento. Basta copiar e colar para prospectar clientes todos os dias.
              </p>
            </div>
            <ul className="space-y-2 text-sm text-muted">
              <li>• Hospedagem recomendada: React em Vercel, HTML em Netlify (grátis para começar)</li>
              <li>• Domínios: seunome.dev, seunomeweb.com, seunegocio.digital</li>
              <li>• Performance, mobile-first, SEO básico incluídos</li>
            </ul>
          </div>
        </section>

        <section id="contato" className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted">Contato</p>
            <h2 className="text-3xl font-bold text-primary">Fale agora</h2>
            <p className="text-base text-muted">
              Respondo rápido com um plano claro, prazo e valor justo. Se preferir, chame direto no WhatsApp.
            </p>
            <div className="glass rounded-2xl p-5">
              <div className="text-sm font-semibold text-primary">WhatsApp</div>
              <p className="text-sm text-muted">Atendimento rápido e direto com o desenvolvedor.</p>
              <a
                href={whatsappLink}
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Abrir WhatsApp
              </a>
            </div>
            <div className="glass rounded-2xl p-5 text-sm text-muted">
              <div className="text-sm font-semibold text-primary">Script rápido</div>
              <p>
                "Olá! Analisei seu negócio e percebi que uma landing page simples pode gerar mais contatos
                para você. Posso te mostrar um exemplo?"
              </p>
            </div>
          </div>
          <div className="glass rounded-2xl p-6">
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="text-sm font-semibold text-primary">Nome</label>
                <input
                  type="text"
                  required
                  className="mt-2 w-full rounded-lg border border-black/5 bg-white px-3 py-3 text-sm text-primary shadow-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-primary">Email</label>
                <input
                  type="email"
                  required
                  className="mt-2 w-full rounded-lg border border-black/5 bg-white px-3 py-3 text-sm text-primary shadow-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                  placeholder="voce@email.com"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-primary">Objetivo da página</label>
                <textarea
                  required
                  rows={4}
                  className="mt-2 w-full rounded-lg border border-black/5 bg-white px-3 py-3 text-sm text-primary shadow-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                  placeholder="Ex.: captar leads para serviço local, lançar um produto, validar oferta"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                Enviar briefing rápido
              </button>
              <p className="text-xs text-muted">
                Retorno em poucas horas com proposta, prazo e próximos passos.
              </p>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
