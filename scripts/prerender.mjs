// Prerender statico: genera un file HTML per ogni route, con metadati SEO, sitemap e robots.
// Con NOINDEX=1 (anteprime) aggiunge <meta name="robots" content="noindex"> e blocca robots.txt.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ssr = await import(pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href);
const { render, getMeta, prerenderRoutes, site } = ssr;
const noindex = process.env.NOINDEX === "1";
const baseUrl = (process.env.SITE_URL || site.url).replace(/\/$/, "");

const template = readFileSync(join(dist, "index.html"), "utf8");

const escape = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function jsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: baseUrl + "/",
    address: { "@type": "PostalAddress", addressCountry: "IT" },
    knowsAbout: ["Sviluppo web", "React", "TypeScript", "Java", "Spring Boot", "Menu digitali", "Web app"],
    makesOffer: ["Landing page e siti vetrina", "Restyling di siti", "Menu digitali", "Web app e gestionali", "Manutenzione"].map(
      (name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name, areaServed: "IT" } }),
    ),
  };
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

for (const route of prerenderRoutes) {
  const meta = getMeta(route);
  const canonical = baseUrl + (route === "/" ? "/" : route);
  const image = baseUrl + (meta.image ?? "/og-image.jpg");
  const head = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="it_IT" />`,
    `<meta property="og:site_name" content="${escape(site.name)}" />`,
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    noindex || route === "/404" ? `<meta name="robots" content="noindex" />` : "",
    route === "/" ? jsonLd() : "",
  ]
    .filter(Boolean)
    .join("\n    ");

  const html = template
    .replace(/<title>.*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${escape(meta.description)}" />`)
    .replace("<!--head-meta-->", head)
    .replace('<div id="root"><!--app-html-->', `<div id="root" data-route="${route}">${render(route)}`);

  const file = route === "/" ? join(dist, "index.html") : route === "/404" ? join(dist, "404.html") : join(dist, route, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log("prerender", route);
}

const urls = prerenderRoutes.filter((r) => r !== "/404");
writeFileSync(
  join(dist, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((r) => `  <url><loc>${baseUrl}${r === "/" ? "/" : r}</loc></url>`)
    .join("\n")}\n</urlset>\n`,
);
writeFileSync(
  join(dist, "robots.txt"),
  noindex ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\n\nSitemap: ${baseUrl}/sitemap.xml\n`,
);
rmSync(join(root, "dist-ssr"), { recursive: true, force: true });
