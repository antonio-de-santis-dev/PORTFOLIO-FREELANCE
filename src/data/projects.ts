import type { Project, ProjectCategory, ProjectImage } from "./types";

/*
 * Contenuti dei case study. Fonti: screenshot in mokup.zip (mapping in docs/assets-mapping.md)
 * e analisi in sola lettura dei sorgenti dei progetti (docs/content-sources.md).
 * Regola: nessun link ai repository, nessun cliente, metrica o risultato inventato.
 */

const COVER = { width: 1600, height: 1050, widths: [800, 1600] };
const DESKTOP = { width: 1600, height: 1000, widths: [800, 1600] };
const SHEET = { width: 1600, height: 1200, widths: [800, 1600] };
const PHONE_CROP = { width: 298, height: 648, widths: [298], shape: "phone" as const };

function img(src: string, alt: string, caption: string, size: Omit<ProjectImage, "src" | "alt" | "caption">): ProjectImage {
  return { src, alt, caption, ...size };
}

export const projects: Project[] = [
  {
    slug: "la-moro",
    title: "Agriturismo La Morò",
    kind: "Progetto personale",
    categories: ["siti"],
    tagline: "Sito one-page per un agriturismo salentino con ristorante e prodotti dell'azienda.",
    summary:
      "Un sito vetrina su una sola pagina pensato per una realtà di ristorazione: atmosfera fotografica, menù sfogliabile, piatti su prenotazione, prodotti e indicazioni per arrivare.",
    problem:
      "Un agriturismo che lavora soprattutto con la cena e il passaparola ha bisogno di mostrare l'atmosfera del posto e di rispondere subito alle domande più frequenti: cosa si mangia, cosa va prenotato prima, dove si trova.",
    goal:
      "Una pagina veloce da consultare dal telefono che porti il visitatore a scoprire il menù o a raggiungere la struttura, con un'identità calda e coerente con il territorio.",
    solution:
      "HTML, CSS e JavaScript senza framework: hero fotografica con logo, sezione Chi siamo, menù a coverflow, piatti su prenotazione con prezzo per porzione, prodotti, galleria dell'ambiente e contatti con mappa. Le foto si sostituiscono mantenendo lo stesso nome file, senza toccare il codice.",
    features: [
      "Hero fotografica con due azioni chiare: «Scopri il menù» e «Vieni a trovarci»",
      "Menù a coverflow con i piatti divisi per portata",
      "Sezione «piatti su prenotazione» con preavviso di 24 ore e porzioni minime indicate",
      "Galleria dell'ambiente e sezione Chi siamo",
      "Contatti con mappa e link telefonico",
      "Menu mobile dedicato, animazioni di comparsa e layout responsive",
    ],
    stack: ["HTML5", "CSS3", "JavaScript"],
    role: "Progettazione grafica e sviluppo front-end completi.",
    year: "2026",
    cover: img("la-moro/cover", "Home del sito Agriturismo La Morò su desktop e smartphone: foto serale del giardino tra gli ulivi con il logo e i pulsanti Scopri il menù e Vieni a trovarci.", "Hero su desktop e mobile.", COVER),
    gallery: [
      img("la-moro/prenotazione-desktop", "Sezione Piatti su prenotazione: a sinistra la foto dell'agnello con prezzo di 15 euro a porzione, a destra l'elenco dei piatti selezionabili.", "Piatti su prenotazione: foto, prezzo a porzione e scelta del piatto.", DESKTOP),
      img("la-moro/hero-mobile", "Hero su desktop accanto allo smartphone che mostra il menù a coverflow con il piatto Involtini e bombette.", "Su mobile il menù diventa un coverflow da scorrere col dito.", COVER),
    ],
    notes: [
      "Progetto personale realizzato per il portfolio: non è presentato come commessa di un cliente.",
      "Alcune foto di piatti e prodotti sono segnaposto in attesa delle immagini definitive.",
    ],
    similarRequest: {
      type: "Sito vetrina / landing page",
      message: "Ciao Antonio, ho visto il progetto La Morò. Vorrei un sito simile per la mia attività: ",
    },
  },
  {
    slug: "menu-digitale",
    title: "MenuDigitale",
    kind: "Progetto personale",
    categories: ["menu"],
    tagline: "Menù digitale per ristorante con portate espandibili e descrizioni in italiano e inglese.",
    summary:
      "Un menù da consultare al tavolo dal telefono: le portate si aprono e si chiudono con un tocco, ogni piatto ha prezzo e descrizione in due lingue.",
    problem:
      "Il menù cartaceo è scomodo da aggiornare e poco leggibile per i clienti stranieri; un PDF sul telefono costringe a zoomare.",
    goal:
      "Una pagina leggera, leggibile su smartphone, che mostri le portate in modo ordinato e permetta di aggiornare piatti e prezzi modificando un solo file.",
    solution:
      "Pagina statica in HTML, CSS e JavaScript: ogni categoria (antipasti, primi, secondi, contorni, bevande, vini, dolci, amari, piatti su prenotazione) è un'intestazione che apre l'elenco dei piatti, con prezzo e descrizione italiana e inglese.",
    features: [
      "Categorie espandibili con un tocco",
      "Prezzo e descrizione bilingue (italiano / inglese) per ogni piatto",
      "Coperto e piatti su prenotazione evidenziati",
      "Layout pensato per lo smartphone",
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    role: "Sviluppo completo.",
    year: "2026",
    cover: img("menu-digitale/cover", "Il menù digitale su desktop e smartphone: categorie Antipasti e Primi piatti aperte con piatti, prezzi e traduzione inglese.", "Categorie aperte su desktop e mobile.", COVER),
    gallery: [
      img("menu-digitale/mobile", "Schermata smartphone del menù con la categoria Antipasti aperta: Antipasto casereccio a 11 euro, Frittini misti a 9 euro, Formaggi misti a 9,50 euro.", "Su smartphone: antipasti con prezzi e descrizioni in due lingue.", PHONE_CROP),
    ],
    notes: [
      "Non include pannello di amministrazione né generatore di QR code: i contenuti si aggiornano nel codice. Un QR code verso la pagina si può aggiungere a parte.",
    ],
    similarRequest: {
      type: "Menu digitale",
      message: "Ciao Antonio, mi interessa un menù digitale per il mio locale. Abbiamo circa __ piatti e ci servirebbe: ",
    },
  },
  {
    slug: "gymplanner",
    title: "GymPlanner",
    kind: "Progetto personale",
    categories: ["webapp"],
    tagline: "Web app per palestre: schede di allenamento, sessioni guidate con timer di recupero e storico.",
    summary:
      "La palestra crea e assegna le schede; chi si allena le segue serie per serie dal telefono, con timer di recupero, carichi registrati e grafici dei progressi.",
    problem:
      "Le schede su carta o in chat si perdono, non si aggiornano facilmente e non dicono nulla su come sta andando l'allenamento.",
    goal:
      "Dare all'istruttore uno strumento per gestire utenti, esercizi e schede, e all'atleta un percorso guidato e uno storico consultabile.",
    solution:
      "Applicazione con due ruoli. L'amministratore gestisce account, catalogo esercizi per gruppo muscolare e schede divise in sezioni. L'utente sceglie i giorni, riceve le sessioni in rotazione, si allena serie per serie e consulta storico e progressi mensili.",
    features: [
      "Editor delle schede con sezioni, ordine degli esercizi, serie, ripetizioni e recuperi",
      "Sessione guidata serie per serie con timer di recupero, pausa e +30 secondi",
      "Registrazione di peso e ripetizioni effettive",
      "Storico con filtri, riepilogo e grafico dei progressi mensili",
      "Catalogo esercizi per gruppo muscolare e gestione utenti per l'amministratore",
      "Playlist musicali personali, tema chiaro/scuro e navigazione mobile a schede",
    ],
    stack: ["Java 21", "Spring Boot", "PostgreSQL", "Flyway", "React", "TypeScript", "Vite", "Playwright"],
    role: "Progettazione e sviluppo full stack.",
    year: "2026",
    cover: img("gymplanner/cover", "Sessione di allenamento in GymPlanner su desktop e smartphone: esercizio Panca piana bilanciere, serie 3 di 4, timer di recupero a 20 secondi ed elenco degli esercizi.", "Sessione guidata con timer di recupero.", COVER),
    gallery: [
      img("gymplanner/editor-schede", "Editor della scheda Push, petto e spalle: esercizi divisi per sezione con serie, ripetizioni e recupero, e pulsanti per riordinare o modificare.", "Editor delle schede lato amministratore.", COVER),
      img("gymplanner/progressi-desktop", "Grafico a barre dei progressi mensili con il volume registrato per agosto, settembre e ottobre e la sezione dei record.", "Progressi mensili e record nello storico.", DESKTOP),
      img("gymplanner/funzionalita", "Quattro schermate: catalogo esercizi per gruppo muscolare, dettaglio utente con report attività, storico con filtri e pagina musica su mobile.", "Catalogo esercizi, dettaglio utente, storico e musica.", SHEET),
    ],
    notes: ["Progetto personale: i dati visibili negli screenshot sono dati di prova."],
    similarRequest: {
      type: "Web app / gestionale",
      message: "Ciao Antonio, ho visto GymPlanner. Mi servirebbe un'applicazione per gestire: ",
    },
  },
  {
    slug: "bollettalab",
    title: "BollettaLAB",
    kind: "Progetto personale",
    categories: ["webapp"],
    tagline: "Piattaforma per confrontare bollette di luce e gas e generare proposte in PDF.",
    summary:
      "Uno strumento per chi propone offerte energetiche: inserisci la bolletta del cliente, confronti l'offerta proposta sugli stessi consumi e scarichi un PDF chiaro da consegnare.",
    problem:
      "Confrontare una bolletta con una nuova offerta richiede calcoli ripetitivi e fogli di calcolo diversi per luce, gas e utenze business, con il rischio di errori e documenti poco leggibili.",
    goal:
      "Riunire i simulatori in un'unica applicazione con accessi separati per privati e imprese, storico condiviso e documenti PDF coerenti.",
    solution:
      "Applicazione React con backend Java a microservizi (utenti, pagamenti, luce, luce business, gas), un database MySQL per servizio, proxy Nginx e avvio con Docker. Le imprese gestiscono titolare e agenti con un saldo di simulazioni condiviso.",
    features: [
      "Simulatori di confronto per luce, gas e utenze business",
      "Riepilogo bolletta attuale, offerta proposta, risparmio nel periodo e proiezione annua indicativa",
      "Generazione del PDF della proposta con impostazioni personalizzabili",
      "Storico dei confronti e area impresa con titolare e agenti",
      "Area amministratore per account, quote e fonti dei dati",
    ],
    stack: ["Java 17", "Spring Boot", "Microservizi", "MySQL", "React", "TypeScript", "Docker", "Nginx"],
    role: "Progettazione e sviluppo full stack.",
    year: "2026",
    cover: img("bollettalab/cover", "Schermata di confronto di BollettaLAB su desktop e smartphone: bolletta attuale 912,70 euro, offerta proposta 670,01 euro, risparmio nel periodo 242,69 euro con grafico a barre.", "Confronto tra bolletta attuale e offerta proposta.", COVER),
    gallery: [
      img("bollettalab/confronto-desktop", "Dettaglio desktop: menu laterale del workspace, riepilogo dei costi, grafico delle due offerte e composizione del costo proposto.", "Workspace di confronto su desktop.", { width: 1160, height: 936, widths: [800] }),
      img("bollettalab/mobile", "Schermata smartphone con il confronto di un cliente demo e il pulsante Scarica PDF.", "Su smartphone: riepilogo e download del PDF.", PHONE_CROP),
    ],
    notes: [
      "I pagamenti sono in modalità simulata: nessun addebito reale è attivo.",
      "I calcoli sono indicativi e richiedono la validazione delle tariffe prima di un uso commerciale.",
      "Nomi e importi negli screenshot sono dati dimostrativi.",
    ],
    similarRequest: {
      type: "Web app / gestionale",
      message: "Ciao Antonio, ho visto BollettaLAB. Mi servirebbe uno strumento che calcoli o confronti: ",
    },
  },
  {
    slug: "boardroom",
    title: "BoardRoom",
    kind: "Progetto personale collaborativo",
    categories: ["webapp"],
    tagline: "Piattaforma per prenotare sale riunioni ed eventi, sviluppata in un team di due persone.",
    summary:
      "Prenotazione delle sale con disponibilità in tempo reale, eventi pubblici e privati, lista d'attesa, calendario e una dashboard di statistiche per l'amministrazione.",
    problem:
      "Quando sale e spazi condivisi si prenotano a voce o per email, nascono sovrapposizioni, sale sovraffollate e nessuno sa davvero quanto vengono usate.",
    goal:
      "Un unico punto in cui cercare una sala libera, prenotarla, creare un evento e seguirne lo stato, con controlli lato server su capienza, sovrapposizioni e permessi.",
    solution:
      "Applicazione JHipster con backend Spring Boot e frontend Angular. Le prenotazioni passano per stati (in attesa, confermata, rifiutata, annullata), gli eventi possono essere pubblici o privati e l'amministrazione vede calendario e statistiche.",
    features: [
      "Ricerca delle sale disponibili per data, orario e capienza",
      "Eventi pubblici in bacheca o privati su invito, con prezzo del biglietto facoltativo",
      "Stati della prenotazione e lista d'attesa",
      "Calendario per sala e per stato, storico personale delle prenotazioni",
      "Dashboard amministrativa con prenotazioni per sala, orari più richiesti e tasso di occupazione",
      "Email di conferma per la partecipazione agli eventi",
    ],
    stack: ["Java", "Spring Boot", "JHipster", "Angular", "TypeScript", "Chart.js", "Docker"],
    role:
      "Sviluppato in coppia. Il mio contributo si è concentrato soprattutto sul backend: logica di prenotazione, controlli di capienza e sovrapposizione, autorizzazioni per ruolo, email di conferma, collegamento con il frontend, test e immagine Docker. Le pagine dell'interfaccia sono state realizzate in gran parte dall'altra persona del team.",
    year: "2026",
    cover: img("boardroom/cover", "Dashboard di BoardRoom su desktop con statistiche: 47 prenotazioni totali, 36 confermate, tasso di occupazione 76,6 per cento, grafici per sala e per orario; su smartphone la scheda di un evento pubblico.", "Dashboard amministrativa e bacheca eventi su mobile.", COVER),
    gallery: [
      img("boardroom/bacheca-desktop", "Bacheca pubblica di BoardRoom con l'evento Conferenza Innovazione Digitale: foto della sala, data, posti e prezzo del biglietto.", "Bacheca degli eventi pubblici.", DESKTOP),
      img("boardroom/funzionalita-1", "Quattro schermate: ricerca delle sale disponibili, calendario delle prenotazioni di ottobre, elenco Le tue prenotazioni con stati, creazione evento su mobile.", "Ricerca sale, calendario, prenotazioni e creazione evento.", SHEET),
      img("boardroom/funzionalita-2", "Quattro schermate: scelta tra evento pubblico o privato, gestione prenotazioni per l'amministratore, storico prenotazioni, bacheca eventi su mobile.", "Tipo di evento, gestione amministrativa e storico.", SHEET),
      img("boardroom/mobile", "Due smartphone affiancati: la pagina Le tue prenotazioni con filtri e la dashboard con le statistiche.", "Versione mobile a 390 × 844.", { width: 1200, height: 1500, widths: [800] }),
    ],
    notes: [
      "Progetto personale collaborativo: il merito del risultato è condiviso con l'altra persona del team.",
      "I dati negli screenshot sono dati di prova.",
    ],
    similarRequest: {
      type: "Web app / gestionale",
      message: "Ciao Antonio, ho visto BoardRoom. Ci servirebbe un sistema di prenotazione per: ",
    },
  },
];

/** Ordine editoriale: modificare questo array per cambiare l'ordine in tutto il sito. */
export const editorialOrder = ["la-moro", "menu-digitale", "gymplanner", "bollettalab", "boardroom"];

export const orderedProjects = editorialOrder
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter((p): p is Project => Boolean(p));

export const categoryLabels: Record<ProjectCategory, string> = {
  siti: "Siti & Landing",
  menu: "Menu digitali",
  webapp: "Web app",
};

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
