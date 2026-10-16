import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CtaBand } from "../components/CtaBand";
import { Icon } from "../components/Icon";
import { Picture } from "../components/Picture";
import { ProjectFeature } from "../components/ProjectFeature";
import { getProject, orderedProjects } from "../data/projects";

const heroProjects = ["gymplanner", "boardroom", "la-moro"].map((slug) => getProject(slug)!);

const offer = [
  {
    title: "Siti web",
    text: "Landing page e siti vetrina per attività locali: chi sei, cosa offri, come trovarti. Pensati prima per lo smartphone.",
    to: "/servizi#siti-vetrina",
    linkLabel: "Servizi per siti e restyling",
  },
  {
    title: "Menu digitali",
    text: "Il menù del locale sul telefono dei clienti: portate ordinate, prezzi aggiornati, descrizioni anche in inglese.",
    to: "/servizi#menu-digitali",
    linkLabel: "Servizi per menu digitali",
  },
  {
    title: "Web app",
    text: "Strumenti su misura per prenotazioni, schede, calcoli e documenti: meno fogli Excel, meno lavoro ripetuto.",
    to: "/servizi#web-app",
    linkLabel: "Servizi per web app e gestionali",
  },
];

const method = [
  { title: "Ascolto", text: "Una chiamata o qualche messaggio per capire attività, clienti e obiettivo. Niente gergo tecnico." },
  { title: "Proposta", text: "Ti mando perimetro, tempi e costo per iscritto. Sai cosa ricevi prima di iniziare." },
  { title: "Sviluppo", text: "Lavoro per fasi brevi e ti mostro versioni navigabili, così correggiamo la rotta presto." },
  { title: "Consegna", text: "Pubblicazione, verifica su telefono e computer, e le istruzioni per gestire i contenuti." },
];

function HeroStack() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div className="hero-stack" data-ready={ready}>
      {heroProjects.map((p, i) => (
        <Link key={p.slug} to={`/progetti/${p.slug}`} className="hero-stack__item" aria-label={`Case study ${p.title}`}>
          <Picture image={p.cover} sizes="(min-width: 1000px) 480px, 78vw" priority={i === 2} />
          <span className="hero-stack__label" aria-hidden="true">
            {p.title}
          </span>
        </Link>
      ))}
    </div>
  );
}

export function Home() {
  const [first, second, third, fourth, fifth] = orderedProjects;
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__grid">
          <div>
            <h1 id="hero-title">
              Siti che valorizzano la tua attività. <span className="accent">App che semplificano il lavoro.</span>
            </h1>
            <p className="lead hero__lead">
              Sono Antonio De Santis, Full Stack Web Developer. Progetto e sviluppo siti web, menu digitali e web app per
              ristoranti, palestre, professionisti e piccole imprese, dall'idea alla pubblicazione.
            </p>
            <div className="actions">
              <Link to="/contatti" className="btn btn--primary">
                Richiedi un preventivo <Icon name="arrow-right" size={18} />
              </Link>
              <Link to="/progetti" className="btn btn--secondary">
                Esplora i progetti
              </Link>
            </div>
            <ul className="hero__focus" aria-label="In breve">
              <li>
                <Icon name="check" size={16} /> Italia, disponibile da remoto
              </li>
              <li>
                <Icon name="check" size={16} /> Front-end e back-end
              </li>
              <li>
                <Icon name="check" size={16} /> Preventivo scritto, senza sorprese
              </li>
            </ul>
          </div>
          <HeroStack />
        </div>
      </section>

      <section className="section section--tone" aria-labelledby="offer-title">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 id="offer-title">Cosa posso realizzare per te</h2>
            <p className="lead">
              Tre tipi di lavoro, un solo obiettivo: far funzionare meglio la tua attività online, senza tecnicismi inutili.
            </p>
          </div>
          <ul className="offer-list">
            {offer.map((o) => (
              <li key={o.title} className="offer-item" data-reveal="">
                <h3>{o.title}</h3>
                <p>{o.text}</p>
                <Link to={o.to} className="text-link" aria-label={o.linkLabel}>
                  Dettagli e perimetro <Icon name="arrow-right" size={18} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 id="work-title">Progetti con schermate reali</h2>
            <p className="lead">
              Progetti personali, uno sviluppato in team: per ognuno trovi il problema di partenza, le scelte fatte e le
              schermate vere dell'interfaccia.
            </p>
          </div>
          <div className="feature-list">
            <ProjectFeature project={first} />
            <div className="project-pair">
              <ProjectFeature project={second} compact />
              <ProjectFeature project={third} compact />
            </div>
            <ProjectFeature project={fourth} flip />
            <ProjectFeature project={fifth} />
          </div>
          <div style={{ marginTop: "var(--space-8)" }}>
            <Link to="/progetti" className="btn btn--secondary">
              Tutti i progetti, con filtri <Icon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tone" aria-labelledby="method-title">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 id="method-title">Come lavoriamo insieme</h2>
            <p className="lead">Un percorso semplice, con un punto di controllo a ogni passaggio.</p>
          </div>
          <ol className="method">
            {method.map((m) => (
              <li key={m.title} data-reveal="">
                <h3>{m.title}</h3>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="about-title">
        <div className="container split">
          <h2 id="about-title">Uno sviluppatore che conosce il lavoro dall'altra parte del bancone</h2>
          <div className="prose" data-reveal="">
            <p>
              Prima del codice ho lavorato per anni nella ristorazione e nella vendita: so quanto conta rispondere in fretta a
              un cliente e quanto poco tempo resta, a fine servizio, per aggiornare un sito.
            </p>
            <p>
              Oggi sono uno sviluppatore full stack junior: ho concluso un percorso ITS Academy di 1.800 ore in sviluppo
              software e sto facendo un tirocinio come developer. Lavoro con React e TypeScript sul front-end, Java e Spring
              Boot sul back-end.
            </p>
            <p style={{ marginTop: "var(--space-5)" }}>
              <Link to="/chi-sono" className="text-link">
                Il mio percorso <Icon name="arrow-right" size={18} />
              </Link>
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
