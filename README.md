# Portfolio · Antonio De Santis — Versione A (dark premium)

Sito portfolio per un Full Stack Web Developer freelance: Home, Servizi, Progetti con 5 case study,
Chi sono, Contatti. React 18 + TypeScript + Vite, prerender statico di ogni pagina per SEO.

> **Stato: anteprima da approvare.** Non pubblicato. Contatti personali e CV disattivati finché non
> approvati (vedi «Prima della pubblicazione»).

## Comandi

```bash
npm install
npm run dev        # sviluppo su http://localhost:5173
npm run build      # typecheck + build client + prerender in dist/
npm run preview    # serve dist/ su http://localhost:4173
npm run lint
npm test           # unit test (Vitest): contenuti, vincoli privacy/GitHub, form
npm run test:e2e   # Playwright su 390, 768, 1440, 1920 px (avvia da sé il preview)
```

Per un'anteprima non indicizzabile: `NOINDEX=1 npm run build`. Per l'URL definitivo:
`SITE_URL=https://dominio.it npm run build` (canonical, Open Graph, sitemap).

### Asset
- `npm run images -- "<cartella mok up>" public/projects` rigenera AVIF/WebP/JPEG dagli originali
  (gli originali non sono nel repository). Mapping in `docs/assets-mapping.md`.
- `node scripts/brand-assets.mjs` rigenera `og-image.jpg` e `apple-touch-icon.png`.
- `python3 -I scripts/cv-draft.py drafts/cv-pubblico-BOZZA.pdf` rigenera la bozza del CV redatto.

## Dove modificare i contenuti
| Cosa | File |
|---|---|
| Case study, ordine dei progetti, filtri | `src/data/projects.ts` (`editorialOrder`) |
| Servizi e CTA precompilate | `src/data/services.ts` |
| Biografia, timeline, stack | `src/data/profile.ts` |
| Email, LinkedIn, CV, URL del sito | `src/data/site.ts` (`publicContact`, `site.url`) |
| Titoli e descrizioni SEO | `src/data/meta.ts` |
| Colori, font, spaziature, motion | `src/styles/tokens.css` · regole in `docs/DESIGN.md` |

## Prima della pubblicazione (serve la tua approvazione)
1. Email pubblica (e se vuoi LinkedIn) in `publicContact`: senza email il modulo dichiara che l'invio
   non è attivo, senza simulare successi.
2. CV: rivedere `drafts/cv-pubblico-BOZZA.pdf`; se approvato copiarlo in `public/cv/` e impostare `cvUrl`.
3. Confermare il ruolo in BoardRoom e i dati ITS (1.800 ore, 101/110).
4. Sostituire gli screenshot di MenuDigitale (immagini rotte) e, se possibile, aggiungerne per BollettaLAB.
5. Dominio e hosting statico (qualsiasi host che serva `dist/`, con `404.html` come pagina d'errore).

## Documentazione
`docs/DESIGN.md` · `docs/skill-audit.md` · `docs/assets-mapping.md` · `docs/content-sources.md` · `docs/qa-report.md`

Nessun cookie, tracker o servizio esterno a runtime; font self-hosted (SIL OFL).
