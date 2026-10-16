import { useSearchParams } from "react-router-dom";
import { CtaBand } from "../components/CtaBand";
import { ProjectFeature } from "../components/ProjectFeature";
import { categoryLabels, orderedProjects } from "../data/projects";
import type { ProjectCategory } from "../data/types";

const filters: { id: ProjectCategory | "tutti"; label: string }[] = [
  { id: "tutti", label: "Tutti" },
  ...(Object.keys(categoryLabels) as ProjectCategory[]).map((id) => ({ id, label: categoryLabels[id] })),
];

export function Projects() {
  const [params, setParams] = useSearchParams();
  const raw = params.get("categoria");
  const active = filters.some((f) => f.id === raw) ? (raw as ProjectCategory | "tutti") : "tutti";
  const visible = active === "tutti" ? orderedProjects : orderedProjects.filter((p) => p.categories.includes(active));

  const select = (id: string) => {
    const next = new URLSearchParams(params);
    if (id === "tutti") next.delete("categoria");
    else next.set("categoria", id);
    setParams(next, { replace: true, preventScrollReset: true });
  };

  return (
    <>
      <header className="container page-head">
        <h1>Progetti</h1>
        <p className="lead">
          Cinque progetti personali, uno dei quali sviluppato in team. Ogni case study racconta il problema, le scelte e le
          schermate reali dell'interfaccia.
        </p>
      </header>

      <section className="container" aria-labelledby="list-title" style={{ paddingBottom: "var(--section-y)" }}>
        <h2 id="list-title" className="visually-hidden">
          Elenco dei progetti
        </h2>
        <div className="filters" role="group" aria-label="Filtra per tipo di progetto">
          {filters.map((f) => {
            const count = f.id === "tutti" ? orderedProjects.length : orderedProjects.filter((p) => p.categories.includes(f.id as ProjectCategory)).length;
            return (
              <button key={f.id} type="button" className="chip" aria-pressed={active === f.id} onClick={() => select(f.id)}>
                {f.label}
                <span className="chip__count" aria-label={`${count} progetti`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        <p className="visually-hidden" aria-live="polite">
          {visible.length === 1 ? "1 progetto mostrato" : `${visible.length} progetti mostrati`}
        </p>
        <div className="feature-list">
          {visible.map((p, i) => (
            <ProjectFeature key={p.slug} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      <CtaBand title="Vuoi qualcosa di simile per la tua attività?" />
    </>
  );
}
