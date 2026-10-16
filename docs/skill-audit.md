# Skill audit: cosa è stato letto e cosa è stato applicato

Tutti i repository sono stati clonati in sola lettura in una cartella temporanea. Nessuno script
d'installazione è stato eseguito (`install.sh`, `skill.sh` e simili non sono stati lanciati).

| Risorsa | Accesso | Cosa ho letto | Applicato concretamente |
|---|---|---|---|
| **Impeccable** (pbakaus/impeccable) | ✅ letto | `SKILL.md` (modalità Persuade/Operate/Read/Experience), `reference/craft-floor.md` | Modalità per pagina in DESIGN.md §1; niente eyebrow/kicker sopra i titoli; niente card icona+titolo+testo come struttura; ombre con offset e blur (niente aloni); scrollbar, selezione e focus a tema; un solo momento di motion firmato (ventaglio dell'hero); verifica sul render reale a più breakpoint |
| **Taste Skill** (Leonxlnx/taste-skill) | ✅ letto | `references/tells.md` (registro dei "tells") | Evitati: gradient text, glow neon su fondo nero, glass decorativo, badge pulsanti "available", numerazione decorativa 01/02/03, monospace come costume, terracotta/crema; unico `<ol>` dove l'ordine è informazione (metodo, timeline) |
| **Emil Kowalski skills** | ✅ letto | `improve-animations/SKILL.md`, `AUDIT.md` | Curve forti come token (`--ease-out: cubic-bezier(0.23,1,0.32,1)`), UI < 300 ms, press feedback `scale(.97)`, nessun `scale(0)`, nessun `ease-in`, stagger 80 ms, hover con motion solo su `(hover: hover)`, `prefers-reduced-motion` che toglie il movimento ma lascia il feedback |
| **UI UX Pro Max** | ✅ clonato | struttura e skill `design-system`, `ui-styling` (consultate per gerarchia e responsive) | Scala tipografica fluida, griglia 12 colonne con composizioni 7/5, breakpoint documentati |
| **Awesome DESIGN.md** (VoltAgent) | ✅ clonato | formato dei file DESIGN.md di esempio | Struttura di `docs/DESIGN.md` (personalità, token, tipografia, componenti, motion, a11y) |
| **Skill `ui-ux-design` (personale)** | ✅ caricata nell'ambiente | regole non negoziabili 1–16 | Semantica (link vs button), un h1 per pagina, label vere, errori per campo con `aria-describedby`, niente `disabled` sul submit, focus 2px con offset, target ≥ 44 px, testo dei link comprensibile fuori contesto, colore mai unico indicatore |
| **Skill-programmazione-** (repo personale) | ✅ clonato | indice delle skill (Docker, Java/Spring, microservizi, React, Redux, UI/UX) | Le skill React e UI/UX coincidono con quelle caricate nell'ambiente; applicate le convenzioni React (hook, componenti, dati tipizzati) |
| **Formazione** (repo personale) | ✅ clonato | elenco dei corsi (Figma, accessibilità WCAG 2.2, React/Redux, microservizi, Spring) | Usato solo come contesto per lo stack in «Chi sono»; non citato nel sito |
| **Playwright** | ✅ usato | — | 92 test E2E/a11y su 4 viewport, screenshot di revisione (`scripts/screens.mjs`) |
| **Playwright Agent CLI** | ⚠️ non usato | — | Sostituito da script Playwright equivalenti (navigazione + screenshot) |
| **img2threejs** | ✅ clonato, **non usato** | — | Opzionale da brief: nessun vantaggio per un portfolio di screenshot reali; evitato 3D gratuito |
| **tasteskill.dev / impeccable.style** | ⚠️ non consultati | — | I contenuti equivalenti sono nei repository letti |

## Strumenti di verifica usati
- Lighthouse 12 (Chromium locale), axe-core 4.10 via `@axe-core/playwright`, Vitest, ESLint, `tsc`.
- Firefox e WebKit non sono installati nell'ambiente: configurati ma non eseguiti (vedi qa-report).
