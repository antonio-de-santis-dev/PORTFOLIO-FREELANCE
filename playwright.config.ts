import { defineConfig, devices } from "@playwright/test";

// Viewport richiesti dal brief: 390×844, 768×1024, 1440×900, 1920×1080.
// Firefox e WebKit sono configurabili, ma nell'ambiente di sviluppo usato è disponibile solo Chromium:
// impostare PW_ALL_BROWSERS=1 dopo `npx playwright install` per eseguirli.
const viewports = {
  "mobile-390": { width: 390, height: 844 },
  "tablet-768": { width: 768, height: 1024 },
  "desktop-1440": { width: 1440, height: 900 },
  "desktop-1920": { width: 1920, height: 1080 },
};

const engines = process.env.PW_ALL_BROWSERS
  ? [
      ["chromium", devices["Desktop Chrome"]],
      ["firefox", devices["Desktop Firefox"]],
      ["webkit", devices["Desktop Safari"]],
    ]
  : [["chromium", devices["Desktop Chrome"]]];

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  reporter: [["list"]],
  use: { baseURL: "http://localhost:4173" },
  webServer: {
    command: "npx vite preview --port 4173 --strictPort",
    url: "http://localhost:4173",
    reuseExistingServer: true,
  },
  projects: engines.flatMap(([engine, device]) =>
    Object.entries(viewports).map(([name, viewport]) => ({
      name: `${engine}-${name}`,
      use: { ...(device as object), viewport, isMobile: false, hasTouch: name === "mobile-390" && engine !== "firefox" },
    })),
  ),
});
