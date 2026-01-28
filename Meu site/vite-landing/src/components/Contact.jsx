const WHATSAPP = "https://wa.me/5551997799212";

export function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section id="contato" className="py-5 bg-light">
      <div className="container">
        <div className="row g-4 align-items-start">
          <div className="col-lg-6">
            <p className="section-title">Contato</p>
            <h2 className="h3 text-primary fw-bold">Fale agora</h2>
            <p className="muted">Respondo rápido com plano claro, prazo e valor justo. Se preferir, chame direto no WhatsApp.</p>
            <a className="btn btn-accent btn-lg fw-semibold" href={WHATSAPP} target="_blank" rel="noopener">
              Abrir WhatsApp
            </a>
          </div>
          <div className="col-lg-6">
            <div className="card shadow border-0 glass">
              <div className="card-body">
                <h5 className="card-title text-primary fw-bold">Envie seu briefing</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-primary">Nome</label>
                    <input type="text" name="nome" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-primary">WhatsApp</label>
                    <input type="tel" name="whatsapp" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold text-primary">Mensagem</label>
                    <textarea name="mensagem" rows="4" className="form-control" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-semibold">Enviar</button>
                  <p className="text-muted small mt-2 mb-0">Retorno em poucas horas com proposta e próximos passos.</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
