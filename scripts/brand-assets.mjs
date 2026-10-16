// Genera public/og-image.jpg (1200×630) e public/apple-touch-icon.png (180×180) con Playwright.
// Uso: node scripts/brand-assets.mjs   (dopo `npm run images`)
import { chromium } from "@playwright/test";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const font = (pkg, file) => pathToFileURL(join(root, "node_modules/@fontsource-variable", pkg, "files", file)).href;
const cover = pathToFileURL(join(root, "public/projects/la-moro/cover-800.webp")).href;
const gym = pathToFileURL(join(root, "public/projects/gymplanner/cover-800.webp")).href;

const css = `
@font-face { font-family: Display; src: url(${font("bricolage-grotesque", "bricolage-grotesque-latin-wght-normal.woff2")}); font-weight: 200 800; }
@font-face { font-family: Body; src: url(${font("figtree", "figtree-latin-wght-normal.woff2")}); font-weight: 300 900; }
* { margin: 0; box-sizing: border-box; }
body { background: #0d0e0c; color: #eeeee6; font-family: Body; }
.mark { display: grid; place-items: center; background: #c8f26d; color: #0d0e0c; font-family: Display; font-weight: 760; letter-spacing: -0.04em; }
`;

const og = `<!doctype html><style>${css}
.og { width: 1200px; height: 630px; padding: 64px; position: relative; overflow: hidden; }
.og .mark { width: 64px; height: 64px; border-radius: 16px; font-size: 28px; }
h1 { font-family: Display; font-weight: 640; font-size: 76px; line-height: .98; letter-spacing: -0.035em; margin-top: 48px; max-width: 620px; }
h1 span { color: #c8f26d; }
p { margin-top: 28px; font-size: 26px; color: #a9ac9f; }
.shot { position: absolute; width: 520px; border-radius: 18px; overflow: hidden; background: #ece8df; box-shadow: 0 24px 48px -24px rgb(0 0 0 / .7); }
.shot img { display: block; width: 100%; }
</style>
<div class="og">
  <div class="mark">AD</div>
  <h1>Siti, menu digitali <span>e web app.</span></h1>
  <p>Antonio De Santis · Full Stack Web Developer</p>
  <div class="shot" style="right:-40px; top:70px; transform: rotate(3deg)"><img src="${gym}"></div>
  <div class="shot" style="right:60px; top:270px; transform: rotate(-2deg)"><img src="${cover}"></div>
</div>`;

const icon = `<!doctype html><style>${css} body{background:#c8f26d}</style>
<div class="mark" style="width:180px;height:180px;font-size:84px">AD</div>`;

const dir = mkdtempSync(join(tmpdir(), "brand-"));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

writeFileSync(join(dir, "og.html"), og);
await page.goto(pathToFileURL(join(dir, "og.html")).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(root, "public/og-image.jpg"), type: "jpeg", quality: 82 });

await page.setViewportSize({ width: 180, height: 180 });
writeFileSync(join(dir, "icon.html"), icon);
await page.goto(pathToFileURL(join(dir, "icon.html")).href, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(root, "public/apple-touch-icon.png") });

await browser.close();
console.log("og-image.jpg e apple-touch-icon.png generati");
