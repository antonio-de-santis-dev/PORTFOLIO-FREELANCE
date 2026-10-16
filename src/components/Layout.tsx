import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getMeta } from "../data/meta";
import { Footer } from "./Footer";
import { Header } from "./Header";

function useRouteEffects() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const meta = getMeta(pathname);
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
  }, [pathname]);

  useEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);

  // Reveal leggero: nasconde solo ciò che è sotto la piega e solo se JS è attivo.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "shown";
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    for (const el of items) {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.dataset.reveal = "hidden";
        observer.observe(el);
      }
    }
    return () => observer.disconnect();
  }, [pathname]);
}

export function Layout() {
  useRouteEffects();
  return (
    <>
      <a className="skip-link" href="#contenuto">
        Vai al contenuto
      </a>
      <Header />
      <main id="contenuto" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
