import { expect, test, type Page } from "@playwright/test";

const routes = [
  "/",
  "/servizi",
  "/progetti",
  "/chi-sono",
  "/contatti",
  "/progetti/la-moro",
  "/progetti/menu-digitale",
  "/progetti/gymplanner",
  "/progetti/bollettalab",
  "/progetti/boardroom",
];

const isNarrow = (page: Page) => (page.viewportSize()?.width ?? 1440) < 960;

function trackConsole(page: Page) {
  const problems: string[] = [];
  page.on("console", (m) => {
    if (m.type() === "error" || m.type() === "warning") problems.push(`${m.type()}: ${m.text()}`);
  });
  page.on("pageerror", (e) => problems.push(`pageerror: ${e.message}`));
  page.on("response", (r) => {
    if (r.status() >= 400) problems.push(`${r.status()} ${r.url()}`);
  });
  return problems;
}

for (const route of routes) {
  test(`${route}: un h1, nessun errore, nessun overflow orizzontale, nessun link a GitHub`, async ({ page }) => {
    const problems = trackConsole(page);
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    // Scorre per caricare le immagini lazy e verificarle tutte.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
    });
    await page.waitForLoadState("networkidle");
    // Forza il caricamento di tutte le immagini (anche lazy) e verifica che si decodifichino.
    const broken = await page.$$eval("img", async (imgs) => {
      const failed: string[] = [];
      await Promise.all(
        imgs.map(async (i) => {
          i.loading = "eager";
          try {
            await i.decode();
          } catch {
            failed.push(i.currentSrc || i.src);
          }
          if (i.naturalWidth === 0) failed.push(i.currentSrc || i.src);
        }),
      );
      return failed;
    });
    expect(broken).toEqual([]);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const html = await page.content();
    expect(html).not.toMatch(/github/i);
    const missingAlt = await page.$$eval("img", (imgs) => imgs.filter((i) => !i.hasAttribute("alt")).length);
    expect(missingAlt).toBe(0);
    expect(problems).toEqual([]);
  });
}

test("navigazione principale e CTA preventivo", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Richiedi un preventivo" }).first().click();
  await expect(page).toHaveURL(/\/contatti$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Raccontami il tuo progetto");

  await page.goto("/");
  await page.getByRole("link", { name: "Esplora i progetti" }).click();
  await expect(page).toHaveURL(/\/progetti$/);

  if (isNarrow(page)) {
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    const menu = page.getByRole("dialog", { name: "Menu" });
    await expect(menu).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(menu).toBeHidden();
    await expect(page.getByRole("button", { name: "Menu", exact: true })).toBeFocused();
    await page.getByRole("button", { name: "Menu", exact: true }).click();
    await menu.getByRole("link", { name: "Chi sono" }).click();
  } else {
    await page.getByRole("navigation", { name: "Principale" }).getByRole("link", { name: "Chi sono" }).click();
  }
  await expect(page).toHaveURL(/\/chi-sono$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Chi sono");
});

test("filtri dei progetti", async ({ page }) => {
  await page.goto("/progetti");
  const titles = page.locator(".project-feature h3");
  await expect(titles).toHaveCount(5);
  await page.getByRole("button", { name: /Web app/ }).click();
  await expect(page).toHaveURL(/categoria=webapp/);
  await expect(titles).toHaveText(["GymPlanner", "BollettaLAB", "BoardRoom"]);
  await expect(page.getByRole("button", { name: /Web app/ })).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: /Menu digitali/ }).click();
  await expect(titles).toHaveText(["MenuDigitale"]);
  await page.getByRole("button", { name: /Siti & Landing/ }).click();
  await expect(titles).toHaveText(["Agriturismo La Morò"]);
  await page.getByRole("button", { name: /Tutti/ }).click();
  await expect(titles).toHaveCount(5);
});

test("case study: etichetta, galleria con lightbox e CTA precompilata", async ({ page }) => {
  await page.goto("/progetti/boardroom");
  await expect(page.locator(".case-meta")).toContainText("Progetto personale collaborativo");
  const zoom = page.getByRole("button", { name: /^Ingrandisci/ }).first();
  await zoom.scrollIntoViewIfNeeded();
  await zoom.click();
  const dialog = page.locator("dialog.lightbox");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();

  await page.getByRole("link", { name: "Parliamone" }).click();
  await expect(page).toHaveURL(/\/contatti\?tipo=/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Raccontami il tuo progetto");
  await expect(page.getByRole("combobox", { name: "Tipo di progetto" })).toHaveValue("Web app / gestionale");
  await expect(page.getByLabel("Il tuo progetto")).toHaveValue(/BoardRoom/);
});

test("modulo contatti: validazione accessibile e nessun invio simulato", async ({ page }) => {
  await page.goto("/contatti");
  await page.getByRole("button", { name: "Prepara l'email" }).click();
  await expect(page.getByText("Ci sono 5 campi da correggere.")).toBeVisible();
  await expect(page.getByLabel("Nome e cognome")).toBeFocused();
  await expect(page.getByLabel("Nome e cognome")).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("Email", { exact: true })).toHaveAttribute("aria-describedby", "email-error");

  await page.getByLabel("Nome e cognome").fill("Mario Rossi");
  await page.getByLabel("Email", { exact: true }).fill("mario@example.it");
  await page.getByLabel("Tipo di progetto").selectOption("Menu digitale");
  await page.getByLabel("Il tuo progetto").fill("Vorrei un menù digitale per la pizzeria con circa 40 piatti.");
  await page.getByLabel(/Acconsento/).check();
  await page.getByRole("button", { name: "Prepara l'email" }).click();
  // Senza email pubblica configurata il sito dichiara che l'invio non è attivo.
  await expect(page.getByText("l'invio non è ancora attivo")).toBeVisible();
  await expect(page.getByText(/inviato con successo/i)).toHaveCount(0);
});

test("tastiera: skip link e focus visibile", async ({ page }) => {
  await page.goto("/servizi");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Vai al contenuto" });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press("Enter");
  await page.keyboard.press("Tab");
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
  expect(outline).not.toBe("none");
});

test("pagina inesistente", async ({ page }) => {
  await page.goto("/progetti/non-esiste");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Questa pagina non esiste");
});
