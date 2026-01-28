import { Header } from "../components/Header";
import { FloatingCTA } from "../components/FloatingCTA";

const WHATSAPP = "https://wa.me/5551997799212";

export function ProjectCutlery() {
  return (
    <div className="bg-hero" style={{ minHeight: "100vh" }}>
      <Header />
      <section className="py-5">
        <div className="container">
          <p className="section-title">Portfólio</p>
          <h1 className="display-6 text-primary fw-bold mb-3">Facas Artesanais de Alto Desempenho</h1>
          <p className="lead muted mb-4">Corte preciso, design exclusivo e acabamento profissional.</p>
          <div className="row g-4 align-items-start">
            <div className="col-lg-7">
              <div className="glass p-4 h-100">
                <h5 className="fw-bold text-primary mb-3">O que fiz</h5>
                <ul className="muted small mb-0">
                  <li>Landing page com storytelling de fabricação artesanal.</li>
                  <li>Galeria hero + chamadas para WhatsApp com rastreio.</li>
                  <li>Prova social e garantia de afiação.</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="glass p-4 h-100 d-flex flex-column">
                <span className="badge bg-light text-primary fw-semibold align-self-start mb-3">Valor percebido alto</span>
                <p className="muted small mb-4 flex-grow-1">Foco em ticket médio maior e posicionamento premium.</p>
                <a className="btn btn-primary fw-semibold" href={WHATSAPP} target="_blank" rel="noopener">
                  Solicitar orçamento no WhatsApp
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
