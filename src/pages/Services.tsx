import { Link } from "react-router-dom";
import { CtaBand } from "../components/CtaBand";
import { Icon } from "../components/Icon";
import { getProject } from "../data/projects";
import { services } from "../data/services";
import { contactHref } from "../lib/contact";

export function Services() {
  return (
    <>
      <header className="container page-head">
        <h1>Servizi pensati per attività reali</h1>
        <p className="lead">
          Ogni lavoro parte da cosa deve ottenere la tua attività: più prenotazioni, meno telefonate ripetitive, un'immagine
          più curata. Qui trovi cosa è incluso e cosa va concordato prima. Il preventivo è sempre scritto e su misura.
        </p>
      </header>

      <section className="container" aria-label="Elenco servizi" style={{ paddingBottom: "var(--section-y)" }}>
        <ul className="service-list">
          {services.map((s) => (
            <li key={s.id} id={s.id} className="service" data-reveal="">
              <div className="service__intro">
                <h2>{s.title}</h2>
                <p className="muted">{s.lead}</p>
                <p className="service__for">Per chi: {s.forWho}</p>
                <div>
                  <Link to={contactHref(s.request.type, s.request.message)} className="btn btn--primary btn--small">
                    {s.cta} <Icon name="arrow-right" size={18} />
                  </Link>
                </div>
              </div>
              <div className="service__cols">
                <div>
                  <h3>Cosa include</h3>
                  <ul className="check-list">
                    {s.includes.map((item) => (
                      <li key={item}>
                        <Icon name="check" size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Da concordare prima</h3>
                  <ul className="check-list check-list--quiet">
                    {s.agreeFirst.map((item) => (
                      <li key={item}>
                        <Icon name="minus" size={18} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {s.relatedProjects.length > 0 && (
                    <p className="muted" style={{ marginTop: "var(--space-5)", fontSize: "var(--fs-small)" }}>
                      Esempi:{" "}
                      {s.relatedProjects.map((slug, i) => {
                        const p = getProject(slug)!;
                        return (
                          <span key={slug}>
                            {i > 0 && ", "}
                            <Link to={`/progetti/${slug}`}>{p.title}</Link>
                          </span>
                        );
                      })}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title="Non sai quale servizio fa per te?"
        text="Descrivimi la situazione con parole tue. Ti dico onestamente cosa serve, cosa si può rimandare e cosa non ti consiglio di fare."
        label="Scrivimi"
      />
    </>
  );
}
