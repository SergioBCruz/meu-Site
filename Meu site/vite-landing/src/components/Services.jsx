const items = [
  "Landing pages focadas em conversão",
  "Sites institucionais modernos",
  "Integração com WhatsApp",
  "Formulários funcionais",
  "SEO básico",
  "Performance e mobile-first",
];

export function Services() {
  return (
    <section id="servicos" className="py-5 bg-light">
      <div className="container">
        <div className="mb-4">
          <p className="section-title">Serviços</p>
          <h2 className="h3 text-primary fw-bold">Soluções para vender mais</h2>
          <p className="muted">Entrega clara, rápida e focada em conversão.</p>
        </div>
        <div className="row g-4">
          {items.map((service) => (
            <div className="col-md-4" key={service}>
              <div className="p-4 glass h-100">
                <h6 className="fw-bold text-primary mb-2">{service}</h6>
                <p className="muted small mb-0">Estrutura pensada para captar leads com clareza.</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
