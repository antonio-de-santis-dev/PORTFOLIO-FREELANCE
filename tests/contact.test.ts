import { describe, expect, it } from "vitest";
import { buildMailto, contactHref, validateContact, type ContactForm } from "../src/lib/contact";

const valid: ContactForm = {
  name: "Mario Rossi",
  email: "mario@example.it",
  type: "Menu digitale",
  message: "Vorrei un menù digitale per la pizzeria, circa 40 piatti.",
  consent: true,
  website: "",
};

describe("validateContact", () => {
  it("accetta un modulo completo", () => {
    expect(validateContact(valid)).toEqual({});
  });

  it("segnala ogni campo mancante con un messaggio che spiega cosa fare", () => {
    const errors = validateContact({ ...valid, name: "", email: "x@", type: "", message: "breve", consent: false });
    expect(Object.keys(errors).sort()).toEqual(["consent", "email", "message", "name", "type"]);
    expect(errors.email).toMatch(/nome@dominio\.it/);
  });
});

describe("buildMailto", () => {
  it("codifica oggetto e corpo", () => {
    const url = buildMailto("info@example.it", valid);
    expect(url.startsWith("mailto:info@example.it?subject=")).toBe(true);
    expect(decodeURIComponent(url)).toContain("Richiesta preventivo: Menu digitale");
    expect(decodeURIComponent(url)).toContain("Email: mario@example.it");
  });
});

describe("contactHref", () => {
  it("porta alla pagina contatti con tipo e messaggio", () => {
    const href = contactHref("Restyling", "Ciao Antonio");
    expect(href).toBe("/contatti?tipo=Restyling&messaggio=Ciao+Antonio");
  });
});
