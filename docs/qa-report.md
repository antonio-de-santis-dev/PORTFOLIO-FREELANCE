# QA report — 16 ottobre 2026

Ambiente: container Linux, Node 22, Chromium 141 (Playwright 1.56). Build servita con `vite preview`.

## Esito

| Controllo | Risultato |
|---|---|
| `tsc -b` (strict) | ✅ nessun errore |
| ESLint | ✅ nessun errore |
| Vitest | ✅ 11/11: form, contenuti, immagini esistenti, nessun "github", nessun dato del CV nei sorgenti, contatti disattivati |
| Playwright E2E | ✅ 64/64 su Chromium a 390×844, 768×1024, 1440×900, 1920×1080 — stabile su 3 esecuzioni consecutive |
| axe-core (WCAG 2.2 A/AA) | ✅ 0 violazioni su 7 pagine, desktop e mobile (28 test) |
| Scansione `dist/` | ✅ nessun "github", nessun dato personale del CV, nessuna source map |

Cosa verificano gli E2E per **ognuna** delle 10 pagine a ogni viewport: un solo `h1`; nessun errore
o warning in console; nessuna risposta HTTP ≥ 400; tutte le immagini (anche lazy) si decodificano;
nessun overflow orizzontale; `alt` presente su ogni immagine; nessun riferimento a GitHub.
In più: navigazione e CTA, menu mobile (apertura, Esc, ritorno del focus), filtri dei progetti con URL
e `aria-pressed`, lightbox della galleria (Esc), CTA «Vuoi qualcosa di simile?» con modulo
precompilato, validazione del modulo (5 errori, focus sul primo campo, `aria-invalid`,
`aria-describedby`), assenza di finti invii riusciti, skip link e focus visibile, pagina 404.

## Lighthouse 12 (locale, `vite preview`, senza compressione HTTP né CDN)

| Pagina | Profilo | Performance | Accessibilità | Best practice | SEO | LCP | CLS |
|---|---|---|---|---|---|---|---|
| `/` | mobile | 97 | 100 | 100 | 100 | 2,2 s | 0,002 |
| `/` | desktop | 100 | 100 | 100 | 100 | 0,4 s | 0 |
| `/progetti/gymplanner` | mobile | 99 | 100 | 100 | 100 | 1,9 s | 0 |
| `/progetti/gymplanner` | desktop | 100 | 100 | 100 | 100 | 0,5 s | 0 |
| `/contatti` | mobile | 98 | 100 | 100 | 100 | 2,0 s | 0 |
| `/contatti` | desktop | 100 | 100 | 100 | 100 | 0,4 s | 0 |

Misurati prima dell'ultimo ritocco ai colori dei bordi (solo CSS); da ripetere sull'hosting reale.

**Budget:** JS iniziale ≤ 240 kB (attuale 221 kB, 71 kB gzip), CSS 25 kB (6 kB gzip), font
self-hosted ~80 kB (solo sottoinsiemi latin), immagini AVIF con `srcset` 800/1600 e lazy loading
tranne l'immagine LCP.

## Revisione visiva
Screenshot a pagina intera di Home e dei 5 case study, desktop 1440 e mobile 390, in
`docs/screenshots/`. Guardati e corretti durante lo sviluppo:
- etichette delle composizioni nascoste dietro le altre nella pila dell'hero → mostrata solo quella in primo piano;
- meta del case study (Tipo/Anno/Ruolo) troppo lunghi su mobile → griglia a due colonne;
- testo del consenso in grassetto → peso normale; interlinea del titolo nel footer;
- bordo del «progetto successivo» più largo del contenuto → corretto;
- bordi di input e chip a 1,4:1 → nuovo token `--line-strong` a ≥ 3:1 (WCAG 1.4.11).

Bug trovati dai test e corretti: variante 1200 px mancante per un'immagine di BoardRoom (srcset
rotto); idratazione su pagine servite da fallback (ora si idrata solo se la route coincide);
warning dei future flag di React Router.

## Non verificato
- **Firefox e WebKit**: non installati nell'ambiente. Configurati (`PW_ALL_BROWSERS=1` dopo
  `npx playwright install`), non eseguiti.
- Screen reader reali (NVDA/VoiceOver), dispositivi fisici, orientamento orizzontale su telefono reale.
- Invio reale del modulo: nessun indirizzo approvato, quindi è testato solo lo stato «non configurato».
- Lighthouse sull'hosting di produzione (dominio non ancora scelto).
