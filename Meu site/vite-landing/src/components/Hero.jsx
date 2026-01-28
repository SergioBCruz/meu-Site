import { useEffect, useState } from "react";
import { fetchCity } from "../services/geo";

const WHATSAPP = "https://wa.me/5551997799212";

export function Hero() {
  const [city, setCity] = useState(null);

  useEffect(() => {
    fetchCity().then((c) => {
      if (c) setCity(c);
    });
  }, []);

  return (
    <section className="hero hero-dark text-center d-flex align-items-center">
      <div className="container position-relative">
        <div className="hero-shell mx-auto">
          <h1 className="hero-brand fade-in delay-1">Sérgio Landing Studio</h1>
          <h2 className="hero-title fade-in delay-2">Landing pages que convertem tráfego em clientes</h2>
          <p className="hero-subtitle slide-up delay-3">Estratégia. Performance. Conversão.</p>
          <p className="hero-lead fade-in delay-4">Criamos páginas estratégicas focadas em performance, leads e crescimento real.</p>
          <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            <a className="btn btn-hero btn-lg fw-semibold" href={WHATSAPP} target="_blank" rel="noopener">
              Criar minha landing page
            </a>
          </div>
          <p className="hero-meta mt-4 slide-up delay-5">Atendendo empresas em {city || "todo o Brasil"}</p>
        </div>
      </div>
    </section>
  );
}
