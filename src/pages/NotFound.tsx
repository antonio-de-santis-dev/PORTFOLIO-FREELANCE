import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="container not-found">
      <h1>Questa pagina non esiste</h1>
      <p className="lead">Forse il link è cambiato. Puoi ripartire dalla home o vedere i progetti.</p>
      <div className="actions">
        <Link to="/" className="btn btn--primary">
          Torna alla home
        </Link>
        <Link to="/progetti" className="btn btn--secondary">
          Vedi i progetti
        </Link>
      </div>
    </section>
  );
}
