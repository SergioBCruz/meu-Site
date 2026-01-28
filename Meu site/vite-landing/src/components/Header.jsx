export function Header() {
  return (
    <header className="py-3 border-bottom bg-white position-sticky top-0" style={{ zIndex: 100 }}>
      <div className="container d-flex flex-column align-items-center gap-3 text-center">
        <div className="d-flex align-items-center justify-content-center gap-2 brand-logo">
          <div className="logo-text">
            <div className="logo-title">Sérgio landing studio</div>
            <div className="logo-sub">Estratégia. Performace. Conversão.</div>
          </div>
        </div>
        <a className="btn btn-primary btn-sm fw-semibold" href="#contato">
          Quero mais clientes
        </a>
      </div>
    </header>
  );
}
