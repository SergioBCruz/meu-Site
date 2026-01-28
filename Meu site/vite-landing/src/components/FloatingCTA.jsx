const WHATSAPP = "https://wa.me/5551997799212";

export function FloatingCTA() {
  return (
    <a className="floating-whatsapp" href={WHATSAPP} target="_blank" rel="noopener">
      WhatsApp
    </a>
  );
}
