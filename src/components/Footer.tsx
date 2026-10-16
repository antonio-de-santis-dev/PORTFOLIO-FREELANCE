import { Link } from "react-router-dom";
import { orderedProjects } from "../data/projects";
import { nav, publicContact, site } from "../data/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__grid">
          <div>
            <p className="site-footer__title">Hai un'idea o un sito da rinnovare? Parliamone.</p>
            <Link to="/contatti" className="btn btn--primary">
              Richiedi un preventivo
            </Link>
          </div>
          <nav aria-label="Pagine">
            <h2>Pagine</h2>
            <ul>
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
              {publicContact.linkedin && (
                <li>
                  <a href={publicContact.linkedin} rel="me noopener" target="_blank">
                    LinkedIn (si apre in una nuova scheda)
                  </a>
                </li>
              )}
            </ul>
          </nav>
          <nav aria-label="Progetti">
            <h2>Progetti</h2>
            <ul>
              {orderedProjects.map((p) => (
                <li key={p.slug}>
                  <Link to={`/progetti/${p.slug}`}>{p.title}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="site-footer__legal">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.role}
          </p>
          <p>{site.location} · Nessun cookie di profilazione o tracciamento.</p>
        </div>
      </div>
    </footer>
  );
}
