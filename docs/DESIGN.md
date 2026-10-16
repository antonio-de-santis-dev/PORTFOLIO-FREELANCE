# DESIGN.md — Portfolio Antonio De Santis · Versione A (dark premium)

## 1. Personalità e scena d'uso

- **Chi arriva:** titolari di ristoranti, palestre, agenzie e piccole imprese italiane, spesso da
  telefono, tra un servizio e l'altro; in seconda battuta recruiter IT da desktop.
- **Cosa devono fare:** capire in 10 secondi *cosa* Antonio realizza (siti, menu digitali, web app),
  vedere lavori veri e chiedere un preventivo senza attrito.
- **Personalità:** concreta, artigianale, precisa. Niente gergo da agenzia, niente promesse.
  Il prodotto (gli screenshot reali) è il protagonista; l'interfaccia del portfolio fa da cornice.
- **Modalità (Impeccable):** Home e Servizi = *Persuade*; Progetti e case study = *Experience*
  (l'artefatto guida, l'interfaccia arretra); Contatti = *Operate*.

### Riferimenti metodologici
Impeccable (craft floor, modalità, critique), Taste Skill (registro dei "tells" da evitare),
Emil Kowalski (curve e durate dell'animazione), UI UX Pro Max (gerarchia, responsive),
skill personale `ui-ux-design` (WCAG 2.2, signifier, stati, label dei link). Dettagli in
`docs/skill-audit.md`.

### Cose che il progetto rifiuta (deliberatamente)
- Eyebrow/kicker sopra i titoli, numerazione decorativa 01/02/03, testo in gradiente, glow al neon,
  glass/blur decorativo, tre card identiche icona+titolo+testo, badge "Available for work" pulsante,
  dashboard finte, ritratti generati, emoji come icone, scroll-jacking, carousel automatici.
- L'unico elenco numerato è il **metodo di lavoro** (`<ol>` nativo), dove l'ordine è informazione.

## 2. Colore (token in `src/styles/tokens.css`)

| Token | HEX | Uso | Contrasto su `--bg` |
|---|---|---|---|
| `--bg` | `#0D0E0C` | fondo pagina (nero carbone caldo) | — |
| `--surface-1` | `#151714` | fasce e sezioni alternate | — |
| `--surface-2` | `#1E211D` | pannelli, campi form | — |
| `--surface-3` | `#2A2E28` | hover superfici, separatori pieni | — |
| `--line-strong` | `#6E7267` | bordi di input, chip, pulsanti icona | 3.9 : 1 (3.3 su `--surface-2`) |
| `--ink` | `#EEEEE6` | testo principale | 16.6 : 1 |
| `--ink-muted` | `#A9AC9F` | testo secondario | 8.4 : 1 |
| `--ink-subtle` | `#868A7E` | note, didascalie | 5.5 : 1 (4.6 su `--surface-2`) |
| `--accent` | `#C8F26D` | colore unico d'accento (verde acido raffinato) | 15.1 : 1 |
| `--accent-ink` | `#0D0E0C` | testo su pulsante accento | 15.1 : 1 su accento |
| `--danger` | `#FF8A7A` | errori form (sempre con icona + testo) | 8.4 : 1 |
| `--plate` | `#ECE8DF` | "passe-partout" chiaro dietro le composizioni degli screenshot | — |

Regole: un solo accento, usato per azioni primarie, focus e stati attivi; mai come unico indicatore
(stato attivo filtri = accento + `aria-pressed` + peso). Link nel testo sempre sottolineati.
Nessuna ombra colorata, nessun glow: la profondità nasce da gradini tonali + ombra con offset.

## 3. Tipografia

| Ruolo | Font | Fallback | Licenza |
|---|---|---|---|
| Display / titoli | **Bricolage Grotesque Variable** (self-host via `@fontsource-variable`) | `"Arial Narrow", system-ui, sans-serif` | SIL OFL 1.1 |
| Testo / UI | **Figtree Variable** (self-host via `@fontsource-variable`) | `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | SIL OFL 1.1 |

Scala fluida (clamp): display `clamp(2.6rem, 1.6rem + 4.6vw, 5.6rem)` (max < 6rem),
h2 `clamp(2rem, 1.4rem + 2.4vw, 3.4rem)`, h3 `clamp(1.35rem, 1.2rem + .6vw, 1.75rem)`,
body 1.0625rem / 1.65, small .875rem. Tracking display −0.035em (sopra il pavimento −0.04em),
`text-wrap: balance` sui titoli, misura del corpo 62–70ch, cifre tabellari nei dati.

## 4. Griglia, spaziatura, forme

- Contenitore max 1240px, gutter `clamp(16px, 4vw, 40px)` (16px su telefono).
- Griglia a 12 colonne da 900px in su; composizioni asimmetriche 7/5 e 5/7 per i case study.
- Scala spaziatura 4/8/12/16/24/32/48/64/96/128 (`--space-1`…`--space-10`); più spazio sopra
  i titoli che sotto; sezioni `clamp(72px, 10vw, 144px)` di respiro verticale.
- Raggi: 6px (controlli), 12px (pannelli), 20px (immagini grandi). Pill solo per i chip filtro.
- Ombra unica per immagini: `0 24px 48px -24px rgb(0 0 0 / .6)` (offset + blur, niente alone).

## 5. Componenti

Navbar sticky (fondo opaco, si compatta allo scroll) · pulsante primario (pieno accento) /
secondario (contorno 1.5px ink) / link testuale con freccia · chip filtro (`button` con
`aria-pressed`) · ProjectFeature (immagine grande + testo, alternata) · tag tecnologia ·
Figure con didascalia e lightbox su `<dialog>` nativo · timeline `<ol>` · form con label vere,
errori per campo collegati via `aria-describedby` · banner "configurazione in sospeso".

## 6. Interazioni e motion

Token: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1)`,
durate 160ms (press/hover), 240ms (menu, dialog), 700ms (unico momento firmato).

- **Momento firmato:** all'apertura della Home le tre composizioni reali nell'hero si "aprono a
  ventaglio" da una pila (transform + opacity, stagger 80ms). Nessun'altra entrata coreografata.
- Reveal leggero (opacity + translate 12px) per le sezioni sotto la piega, **solo se JS attivo**:
  senza JS il contenuto è visibile da subito.
- Press feedback `scale(.97)` su pulsanti; hover delle immagini: lieve scale 1.015 solo con
  `(hover: hover)`.
- `prefers-reduced-motion: reduce`: niente movimento, restano solo cambi di colore/opacità.

## 7. Breakpoint e regole mobile

`< 640` telefono · `640–899` tablet verticale · `900–1199` laptop · `≥ 1200` desktop ampio.

Mobile progettato a parte: menu a pannello a tutto schermo con focus trap ed Esc; CTA preventivo
sempre raggiungibile nella navbar; hero con immagine reale *sotto* il messaggio (il messaggio viene
prima); case study a colonna singola con galleria scorrevole orizzontalmente con scroll-snap
(nessun autoplay); target touch ≥ 44×44 px; nessun contenuto tagliato a 320px né a zoom 200%.

## 8. Accessibilità

WCAG 2.2 AA come minimo: un `h1` per pagina, landmark, skip link, focus visibile con contorno
2px accento + offset 3px (contrasto ≥3:1 col fondo), focus non coperto dalla navbar sticky
(`scroll-padding-top`), alt descrittivi, `lang="it"`, form senza `disabled` sul submit,
messaggi di stato in `aria-live`.
