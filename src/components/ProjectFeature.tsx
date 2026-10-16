import { Link } from "react-router-dom";
import { categoryLabels } from "../data/projects";
import type { Project } from "../data/types";
import { Icon } from "./Icon";
import { Picture } from "./Picture";

interface Props {
  project: Project;
  flip?: boolean;
  compact?: boolean;
  headingLevel?: "h2" | "h3";
}

export function ProjectFeature({ project, flip = false, compact = false, headingLevel = "h3" }: Props) {
  const Heading = headingLevel;
  const href = `/progetti/${project.slug}`;
  return (
    <article className={`project-feature${flip ? " project-feature--flip" : ""}`} data-reveal="">
      {/* L'immagine è un duplicato del link sul titolo: fuori dal tab order e nascosta agli screen reader. */}
      <Link to={href} className="project-feature__media" tabIndex={-1} aria-hidden="true">
        <div className="plate">
          <Picture image={project.cover} sizes={compact ? "(min-width: 900px) 600px, 100vw" : "(min-width: 900px) 720px, 100vw"} />
        </div>
      </Link>
      <div className="project-feature__body">
        <ul className="project-feature__meta tag-list" aria-label="Categoria del progetto">
          <li className="tag tag--kind">{project.kind}</li>
          {project.categories.map((c) => (
            <li key={c} className="tag">
              {categoryLabels[c]}
            </li>
          ))}
        </ul>
        <Heading>
          <Link to={href}>{project.title}</Link>
        </Heading>
        <p className="muted">{project.tagline}</p>
        <p className="muted" style={{ fontSize: "var(--fs-small)" }}>
          {project.stack.slice(0, 5).join(" · ")}
        </p>
        <Link to={href} className="text-link" aria-label={`Leggi il case study di ${project.title}`}>
          Leggi il case study <Icon name="arrow-right" size={18} />
        </Link>
      </div>
    </article>
  );
}
