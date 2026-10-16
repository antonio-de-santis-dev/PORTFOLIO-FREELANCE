/*
 * Dati biografici pubblicabili, estratti dal CV e dalle informazioni fornite.
 * Esclusi per scelta: documento d'identità, indirizzo, data e luogo di nascita, telefono,
 * email personale, nomi dei datori di lavoro non informatici.
 */

export const timeline = [
  {
    period: "2016 – 2021",
    title: "Diploma tecnico economico, articolazione Sistemi Informativi Aziendali",
    text: "Le prime basi di informatica applicata all'azienda: gestione dei dati, processi, strumenti digitali.",
  },
  {
    period: "2021 – 2025",
    title: "Ristorazione e vendita",
    text: "Diverse stagioni in sala tra ristoranti e stabilimenti del Salento e un'esperienza come rappresentante tecnico-commerciale nelle telecomunicazioni. Da qui viene l'abitudine ad ascoltare il cliente e a capire come lavora davvero un locale.",
  },
  {
    period: "2024 – 2026",
    title: "ITS Academy · Tecnico superiore per lo sviluppo software",
    text: "Percorso biennale di 1.800 ore tra aula, laboratori e progetti: Java e Spring Boot, database, front-end, metodologie di lavoro in team. Concluso con 101/110.",
  },
  {
    period: "Dal 2026",
    title: "Tirocinio come developer · Zerodd",
    text: "Tirocinio di inserimento lavorativo come sviluppatore, a contatto con progetti e strumenti di un team reale.",
  },
];

export const stack = [
  { group: "Front-end", items: ["React", "TypeScript", "JavaScript", "HTML", "CSS", "Angular (in team)", "Responsive design"] },
  { group: "Back-end", items: ["Java", "Spring Boot", "API REST", "Microservizi"] },
  { group: "Dati", items: ["MySQL", "PostgreSQL", "SQL", "MongoDB (base)"] },
  { group: "Strumenti", items: ["Docker", "Git", "Playwright", "Vitest", "Figma", "UI/UX e accessibilità"] },
];

export const languages = "Italiano madrelingua · Inglese B2";
