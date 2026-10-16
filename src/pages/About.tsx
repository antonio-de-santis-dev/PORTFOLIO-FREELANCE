import { Link } from "react-router-dom";
import { CtaBand } from "../components/CtaBand";
import { Icon } from "../components/Icon";
import { languages, stack, timeline } from "../data/profile";
import { publicContact } from "../data/site";

export function About() {
  return (
    <>
      <header className="container page-head split">
        <div>
          <h1>Chi sono</h1>
          <p className="lead">
            Mi chiamo Antonio De Santis e sono un Full Stack Web Developer junior. Realizzo siti web che valorizzano le
            attività e applicazioni che semplificano il lavoro, dall'interfaccia al database.
          </p>
        </div>
        <div className="prose" style={{ alignSelf: "end" }}>
          <p>
            Sono arrivato allo sviluppo dopo diversi anni a contatto con i clienti, tra sala e vendita. Quell'esperienza è
            ancora il mio metro: un sito funziona se il cliente trova quello che cerca in pochi secondi, e se chi lo gestisce
            non perde tempo per aggiornarlo.
          </p>
          <p>
            Sono all'inizio della carriera e lo dico senza giri di parole: in cambio offro attenzione ai dettagli, comunicazione
            diretta, preventivi chiari e la voglia di fare bene ogni progetto, anche il più piccolo.
          </p>
        </div>
      </header>

      <section className="section section--tone" aria-labelledby="path-title">
        <div className="container split">
          <div>
            <h2 id="path-title">Il percorso</h2>
            <p className="muted" style={{ marginTop: "var(--space-4)" }}>
              {languages}
            </p>
          </div>
          <ol className="timeline">
            {timeline.map((t) => (
              <li key={t.title} data-reveal="">
                <span className="timeline__period">{t.period}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="stack-title">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 id="stack-title">Con cosa lavoro</h2>
            <p className="lead">Strumenti usati davvero nei progetti che trovi nel portfolio, non un elenco di parole chiave.</p>
          </div>
          <div className="stack-grid">
            {stack.map((g) => (
              <div key={g.group} data-reveal="">
                <h3>{g.group}</h3>
                <ul className="tag-list">
                  {g.items.map((i) => (
                    <li key={i} className="tag">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tone" aria-labelledby="approach-title">
        <div className="container split">
          <h2 id="approach-title">Come mi piace lavorare</h2>
          <ul className="check-list" style={{ gap: "var(--space-5)" }}>
            <li>
              <Icon name="check" size={18} />
              <span>
                <strong style={{ color: "var(--ink)" }}>Prima capire, poi disegnare.</strong> Parto da chi userà il sito e da
                cosa deve fare, non dalla tecnologia.
              </span>
            </li>
            <li>
              <Icon name="check" size={18} />
              <span>
                <strong style={{ color: "var(--ink)" }}>Versioni da provare presto.</strong> Ti mostro il lavoro a fasi, così
                le correzioni costano poco.
              </span>
            </li>
            <li>
              <Icon name="check" size={18} />
              <span>
                <strong style={{ color: "var(--ink)" }}>Accessibile e veloce.</strong> Testi leggibili, contrasti corretti,
                pagine leggere anche con una connessione lenta.
              </span>
            </li>
            <li>
              <Icon name="check" size={18} />
              <span>
                <strong style={{ color: "var(--ink)" }}>Onestà sui limiti.</strong> Se una cosa non serve o non è alla mia
                portata, te lo dico.
              </span>
            </li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="cv-title">
        <div className="container split">
          <h2 id="cv-title">Curriculum</h2>
          <div className="prose">
            {publicContact.cvUrl ? (
              <a className="btn btn--secondary" href={publicContact.cvUrl} download>
                Scarica il CV in PDF
              </a>
            ) : (
              <p>
                Il CV completo è disponibile su richiesta.{" "}
                <Link to="/contatti?tipo=Altro&messaggio=Ciao%20Antonio%2C%20vorrei%20ricevere%20il%20tuo%20CV.%20">
                  Chiedilo dalla pagina contatti
                </Link>
                .
              </p>
            )}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
