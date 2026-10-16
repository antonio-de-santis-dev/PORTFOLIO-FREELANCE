import { Link, useParams } from "react-router-dom";
import { CtaBand } from "../components/CtaBand";
import { Gallery } from "../components/Gallery";
import { Icon } from "../components/Icon";
import { Picture } from "../components/Picture";
import { categoryLabels, getProject, orderedProjects } from "../data/projects";
import { contactHref } from "../lib/contact";
import { NotFound } from "./NotFound";

export function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  if (!project) return <NotFound />;

  const index = orderedProjects.findIndex((p) => p.slug === project.slug);
  const next = orderedProjects[(index + 1) % orderedProjects.length];

  return (
    <>
      <article>
        <header className="container case-hero">
          <nav className="breadcrumb" aria-label="Percorso">
            <ol>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/progetti">Progetti</Link>
              </li>
              <li aria-current="page">{project.title}</li>
            </ol>
          </nav>
          <div className="case-hero__head">
            <ul className="tag-list" aria-label="Categoria del progetto">
              <li className="tag tag--kind">{project.kind}</li>
              {project.categories.map((c) => (
                <li key={c} className="tag">
                  {categoryLabels[c]}
                </li>
              ))}
            </ul>
            <h1>{project.title}</h1>
            <p className="lead">{project.summary}</p>
          </div>
          <dl className="case-meta">
            <div>
              <dt>Tipo</dt>
              <dd>{project.kind}</dd>
            </div>
            <div>
              <dt>Anno</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Ruolo</dt>
              <dd>{project.role}</dd>
            </div>
          </dl>
          <div className="case-cover plate">
            <Picture image={project.cover} sizes="(min-width: 1240px) 1240px, 100vw" priority />
          </div>
        </header>

        <section className="section section--tone" aria-label="Il progetto">
          <div className="container case-story">
            <div>
              <h2>Il problema</h2>
              <p className="muted">{project.problem}</p>
            </div>
            <div>
              <h2>L'obiettivo</h2>
              <p className="muted">{project.goal}</p>
            </div>
            <div>
              <h2>La soluzione</h2>
              <p className="muted">{project.solution}</p>
            </div>
          </div>
        </section>

        <section className="section" aria-label="Funzionalità e tecnologie">
          <div className="container case-columns">
            <div>
              <h2>Cosa fa</h2>
              <ul className="check-list">
                {project.features.map((f) => (
                  <li key={f}>
                    <Icon name="check" size={18} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Tecnologie</h2>
              <ul className="tag-list">
                {project.stack.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
              {project.notes.length > 0 && (
                <aside className="notes" aria-labelledby="notes-title">
                  <h2 id="notes-title">Da sapere</h2>
                  <ul>
                    {project.notes.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          </div>
        </section>

        <section className="section section--tone" aria-labelledby="gallery-title">
          <div className="container">
            <div className="section-head">
              <h2 id="gallery-title">Schermate</h2>
              <p className="muted">Screenshot reali dell'interfaccia su desktop e mobile. Tocca un'immagine per ingrandirla.</p>
            </div>
            <Gallery images={project.gallery} title={project.title} />
          </div>
        </section>
      </article>

      <CtaBand
        title="Vuoi qualcosa di simile?"
        text={`Se ${project.title} somiglia a ciò che ti serve, raccontami la tua situazione: partiamo da qui per capire cosa adattare.`}
        to={contactHref(project.similarRequest.type, project.similarRequest.message)}
        label="Parliamone"
      />

      <nav className="container case-next" aria-label="Progetto successivo" style={{ paddingBottom: "var(--section-y)" }}>
        <div className="case-next__inner">
          <p className="muted">Progetto successivo</p>
          <Link to={`/progetti/${next.slug}`}>
            {next.title} <Icon name="arrow-right" size={32} />
          </Link>
        </div>
      </nav>
    </>
  );
}
