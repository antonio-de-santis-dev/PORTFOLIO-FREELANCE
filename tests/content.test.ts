import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { orderedProjects, projects } from "../src/data/projects";
import { services } from "../src/data/services";
import { publicContact } from "../src/data/site";

const root = join(__dirname, "..");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

describe("contenuti dei progetti", () => {
  it("contiene i 5 case study nell'ordine editoriale previsto", () => {
    expect(orderedProjects.map((p) => p.slug)).toEqual(["la-moro", "menu-digitale", "gymplanner", "bollettalab", "boardroom"]);
  });

  it("etichetta correttamente progetti personali e collaborativi", () => {
    for (const p of projects) {
      expect(p.kind).toBe(p.slug === "boardroom" ? "Progetto personale collaborativo" : "Progetto personale");
    }
  });

  it("ogni immagine esiste in AVIF, WebP e JPEG", () => {
    for (const p of projects) {
      expect(p.gallery.length).toBeGreaterThan(0);
      for (const img of [p.cover, ...p.gallery]) {
        expect(img.alt.length).toBeGreaterThan(20);
        expect(existsSync(join(root, "public/projects", `${img.src}.jpg`))).toBe(true);
        for (const w of img.widths) {
          expect(existsSync(join(root, "public/projects", `${img.src}-${w}.avif`)), `${img.src}-${w}.avif`).toBe(true);
          expect(existsSync(join(root, "public/projects", `${img.src}-${w}.webp`))).toBe(true);
        }
      }
    }
  });

  it("i servizi rimandano solo a progetti esistenti", () => {
    const slugs = new Set(projects.map((p) => p.slug));
    for (const s of services) for (const r of s.relatedProjects) expect(slugs.has(r)).toBe(true);
  });
});

describe("vincoli di pubblicazione", () => {
  const files = [...walk(join(root, "src")), ...walk(join(root, "public")), join(root, "index.html")].filter((f) =>
    /\.(tsx?|css|html|svg|json|txt|xml)$/.test(f),
  );

  it("nessun riferimento a GitHub nei sorgenti pubblici", () => {
    for (const f of files) expect(readFileSync(f, "utf8"), f).not.toMatch(/github/i);
  });

  it("nessun dato personale sensibile del CV nei sorgenti", () => {
    // Frammenti volutamente parziali, per non riscrivere i dati nel test stesso.
    const forbidden = [/CA939/i, /388\s?904/, /Via Calimera/i, /desantisantonio/i, /73025/];
    for (const f of files) for (const re of forbidden) expect(readFileSync(f, "utf8"), `${f} ${re}`).not.toMatch(re);
  });

  it("i contatti personali restano disattivati finché non approvati", () => {
    expect(publicContact).toEqual({ email: null, linkedin: null, cvUrl: null });
  });
});
