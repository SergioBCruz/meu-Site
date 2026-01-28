import { Link } from "react-router-dom";

const demos = [
  {
    title: "Facas Artesanais de Alto Desempenho",
    subtitle: "Corte preciso, design exclusivo e acabamento profissional",
    badge: "Valor percebido alto",
    to: "/projetos/cutelaria",
  },
  {
    title: "Encontre Passagens Aéreas Mais Baratas em Minutos",
    subtitle: "Atendimento rápido, seguro e personalizado",
    badge: "Volume alto",
    to: "/projetos/passagens",
  },
  {
    title: "Soluções Profissionais para Seu Negócio",
    subtitle: "Atendimento rápido, confiança e resultado",
    badge: "Fácil de vender",
    to: "/projetos/servicos-locais",
  },
];

export function Projects() {
  return (
    <section id="projetos" className="py-5">
      <div className="container">
        <div className="mb-4">
          <p className="section-title">Portfólio</p>
          <h2 className="h3 text-primary fw-bold">Nossos Projetos</h2>
        </div>
        <div className="row g-4">
          {demos.map((demo) => (
            <div className="col-lg-4 col-md-6" key={demo.title}>
              <div className="card h-100 shadow-sm border-0 glass">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge bg-light text-primary fw-semibold">{demo.badge}</span>
                    <span className="muted small">Portfólio</span>
                  </div>
                  <h5 className="mt-3 text-primary fw-bold">{demo.title}</h5>
                  <p className="muted small mb-4 flex-grow-1">{demo.subtitle}</p>
                  <Link className="btn btn-primary fw-semibold" to={demo.to}>
                    Ver projeto
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
