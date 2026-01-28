import { Header } from "../components/Header";
import { FloatingCTA } from "../components/FloatingCTA";

const WHATSAPP = "https://wa.me/5551997799212";

export function ProjectFlights() {
  return (
    <div className="bg-hero" style={{ minHeight: "100vh" }}>
      <Header />
      <section className="py-5">
        <div className="container">
          <p className="section-title">Portfólio</p>
          <h1 className="display-6 text-primary fw-bold mb-3">Encontre Passagens Aéreas Mais Baratas em Minutos</h1>
          <p className="lead muted mb-4">Atendimento rápido, seguro e personalizado.</p>
          <div className="row g-4 align-items-start">
            <div className="col-lg-7">
              <div className="glass p-4 h-100">
                <h5 className="fw-bold text-primary mb-3">O que fiz</h5>
                <ul className="muted small mb-0">
                  <li>Landing com formulário rápido para cotação e captura de lead.</li>
                  <li>Integração CTA WhatsApp para atendimento imediato.</li>
                  <li>Seção de vantagens e selos de segurança para confiança.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="glass p-4 h-100 d-flex flex-column">
                <span className="badge bg-light text-primary fw-semibold align-self-start mb-3">Volume alto</span>
                <p className="muted small mb-4 flex-grow-1">Focado em grande quantidade de leads qualificados diariamente.</p>
                <a className="btn btn-primary fw-semibold" href={WHATSAPP} target="_blank" rel="noopener">
                  Cotar passagem agora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
+      <FloatingCTA />
    </div>
  );
}
