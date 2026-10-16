/**
 * Configurazione pubblica del sito.
 *
 * ⚠️ PRIMA DEL RILASCIO: i contatti personali restano a `null` finché Antonio non approva
 * esplicitamente quali pubblicare. Con `email: null` il modulo contatti spiega che l'invio
 * non è ancora attivo invece di simulare un invio riuscito.
 */
export const publicContact: {
  email: string | null;
  linkedin: string | null;
  /** Il CV pubblico (redatto) diventa scaricabile solo dopo l'approvazione. */
  cvUrl: string | null;
} = {
  email: null, // TODO(approvazione): es. "nome@dominio.it"
  linkedin: null, // TODO(approvazione): URL del profilo LinkedIn
  cvUrl: null, // TODO(approvazione): "/cv/antonio-de-santis-cv.pdf"
};

export const site = {
  name: "Antonio De Santis",
  role: "Full Stack Web Developer",
  location: "Italia · disponibile da remoto",
  // URL di produzione da impostare quando il dominio sarà scelto (usato per canonical, OG, sitemap).
  url: "https://www.example.com",
  description:
    "Antonio De Santis, Full Stack Web Developer: siti web, menu digitali e web app per ristoranti, palestre, professionisti e piccole imprese. Italia, da remoto.",
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/servizi", label: "Servizi" },
  { to: "/progetti", label: "Progetti" },
  { to: "/chi-sono", label: "Chi sono" },
  { to: "/contatti", label: "Contatti" },
];
