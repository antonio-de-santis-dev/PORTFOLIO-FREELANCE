import { Link } from "react-router-dom";
import { Icon } from "./Icon";

interface Props {
  title?: string;
  text?: string;
  to?: string;
  label?: string;
}

export function CtaBand({
  title = "Raccontami il tuo progetto",
  text = "Mi scrivi cosa fa la tua attività e cosa ti serve. Ti rispondo con qualche domanda mirata e una proposta chiara su tempi, perimetro e costi.",
  to = "/contatti",
  label = "Richiedi un preventivo",
}: Props) {
  return (
    <section className="section" aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-band" data-reveal="">
          <div>
            <h2 id="cta-title">{title}</h2>
            <p style={{ marginTop: "var(--space-4)" }}>{text}</p>
          </div>
          <Link to={to} className="btn btn--dark">
            {label} <Icon name="arrow-right" size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
