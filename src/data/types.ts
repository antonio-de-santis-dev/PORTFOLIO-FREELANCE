export type ProjectCategory = "siti" | "menu" | "webapp";

export type ProjectKind = "Progetto personale" | "Progetto personale collaborativo";

export interface ProjectImage {
  /** Percorso base senza estensione, relativo a /projects (es. "la-moro/cover"). */
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** Larghezze disponibili per srcset. */
  widths: number[];
  /** "phone" = ritaglio di uno schermo mobile, mostrato più stretto. */
  shape?: "wide" | "phone";
}

export interface Project {
  slug: string;
  title: string;
  kind: ProjectKind;
  categories: ProjectCategory[];
  /** Una riga: cosa è, per chi. */
  tagline: string;
  summary: string;
  problem: string;
  goal: string;
  solution: string;
  features: string[];
  stack: string[];
  /** Ruolo di Antonio, formulato in modo verificabile. */
  role: string;
  year: string;
  cover: ProjectImage;
  gallery: ProjectImage[];
  notes: string[];
  /** Testo precompilato per la CTA "Vuoi qualcosa di simile?". */
  similarRequest: { type: string; message: string };
}

export interface Service {
  id: string;
  title: string;
  lead: string;
  forWho: string;
  includes: string[];
  agreeFirst: string[];
  cta: string;
  request: { type: string; message: string };
  relatedProjects: string[];
}
