// Screenshot di revisione: node scripts/screens.mjs <outdir> [baseUrl]
import { chromium } from "@playwright/test";
const out = process.argv[2] ?? "qa-screens";
const base = process.argv[3] ?? "http://localhost:4173";
const routes = ["/", "/servizi", "/progetti", "/chi-sono", "/contatti", "/progetti/la-moro", "/progetti/menu-digitale", "/progetti/gymplanner", "/progetti/bollettalab", "/progetti/boardroom"];
const viewports = { mobile: { width: 390, height: 844 }, desktop: { width: 1440, height: 900 } };
const browser = await chromium.launch();
for (const [name, vp] of Object.entries(viewports)) {
  const page = await browser.newPage({ viewport: vp, reducedMotion: "reduce" });
  for (const r of routes) {
    await page.goto(base + r, { waitUntil: "networkidle" });
    // carica le immagini lazy
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((res) => setTimeout(res, 60)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(300);
    const file = `${out}/${name}${r === "/" ? "-home" : r.replaceAll("/", "-")}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(file);
  }
  await page.close();
}
await browser.close();
