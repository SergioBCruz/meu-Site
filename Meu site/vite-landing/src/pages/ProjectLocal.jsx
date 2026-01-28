import { Header } from "../components/Header";
import { FloatingCTA } from "../components/FloatingCTA";

const WHATSAPP = "https://wa.me/5551997799212";

export function ProjectLocal() {
  return (
    <div className="bg-hero" style={{ minHeight: "100vh" }}>
      <Header />
      <section className="py-5">
        <div className="container">
          <p className="section-title">Portfólio</p>
          <h1 className="display-6 text-primary fw-bold mb-3">Soluções Profissionais para Seu Negócio</h1>
          <p className="lead muted mb-4">Atendimento rápido, confiança e resultado.</p>
          <div className="row g-4 align-items-start">
            <div className="col-lg-7">
              <div className="glass p-4 h-100">
                <h5 className="fw-bold text-primary mb-3">O que fiz</h5>
                <ul className="muted small mb-0">
                  <li>Landing para serviços locais com prova social e mapa de atendimento.</li>
                  <li>CTA para WhatsApp e formulário para orçamentos rápidos.</li>
                  <li>Seção de diferenciais voltada a confiança e rapidez.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="glass p-4 h-100 d-flex flex-column">
                <span className="badge bg-light text-primary fw-semibold align-self-start mb-3">Fácil de vender</span>
                <p className="muted small mb-4 flex-grow-1">Ideal para fechar negócios recorrentes e serviços de bairro.</p>
                <a className="btn btn-primary fw-semibold" href={WHATSAPP} target="_blank" rel="noopener">
                  Falar no WhatsApp
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
