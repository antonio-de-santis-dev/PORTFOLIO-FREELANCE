import { getProject, orderedProjects } from "./projects";
import { site } from "./site";

export interface PageMeta {
  title: string;
  description: string;
  image?: string;
}

const pages: Record<string, PageMeta> = {
  "/": {
    title: `${site.name} · Siti web, menu digitali e web app`,
    description: site.description,
  },
  "/servizi": {
    title: `Servizi · ${site.name}`,
    description:
      "Landing page e siti vetrina, restyling, menu digitali per ristoranti, web app e gestionali, manutenzione su accordo. Perimetro chiaro, nessuna promessa a vuoto.",
  },
  "/progetti": {
    title: `Progetti · ${site.name}`,
    description:
      "Cinque case study con screenshot reali: sito per agriturismo, menu digitale, web app per palestre, comparatore di bollette, piattaforma di prenotazione sale.",
  },
  "/chi-sono": {
    title: `Chi sono · ${site.name}`,
    description:
      "Full Stack Web Developer junior: ITS Academy in sviluppo software (1.800 ore), tirocinio come developer e anni di lavoro a contatto con i clienti nella ristorazione.",
  },
  "/contatti": {
    title: `Contatti · ${site.name}`,
    description: "Raccontami il tuo progetto: sito, menu digitale o web app. Rispondo con domande mirate e una proposta chiara.",
  },
};

export function getMeta(pathname: string): PageMeta {
  const clean = pathname.replace(/\/+$/, "") || "/";
  if (pages[clean]) return pages[clean];
  const match = clean.match(/^\/progetti\/([^/]+)$/);
  const project = getProject(match?.[1]);
  if (project) {
    return {
      title: `${project.title} · Case study · ${site.name}`,
      description: project.tagline,
      image: `/projects/${project.cover.src}.jpg`,
    };
  }
  return { title: `Pagina non trovata · ${site.name}`, description: site.description };
}

/** Tutte le route da prerenderizzare. */
export const prerenderRoutes = [...Object.keys(pages), ...orderedProjects.map((p) => `/progetti/${p.slug}`), "/404"];
