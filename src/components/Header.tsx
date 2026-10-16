import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav } from "../data/site";
import { Icon } from "./Icon";

function Brand() {
  return (
    <Link to="/" className="brand" aria-label="Antonio De Santis, torna alla home">
      <span className="brand__mark" aria-hidden="true">
        AD
      </span>
      <span>Antonio De Santis</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Chiude il menu a ogni cambio pagina.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const focusable = Array.from(panel.querySelectorAll<HTMLElement>("a, button"));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      // Restituisce il focus al pulsante che ha aperto il menu (se è ancora visibile).
      requestAnimationFrame(() => {
        if (toggle && toggle.offsetParent !== null) toggle.focus();
      });
    };
  }, [open]);

  return (
    <header className="site-header" data-scrolled={scrolled}>
      <div className="container site-header__inner">
        <Brand />
        <nav className="primary-nav" aria-label="Principale">
          <ul>
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === "/"}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="/contatti" className="btn btn--primary btn--small header-cta">
          Parliamo del tuo progetto
        </Link>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
        >
          <Icon name="menu" />
          Menu
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" ref={panelRef}>
          <div className="mobile-menu__top">
            <Brand />
            <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Chiudi il menu">
              <Icon name="close" />
            </button>
          </div>
          <nav aria-label="Principale">
            <ul>
              {nav.map((item) => (
                <li key={item.to}>
                  <NavLink to={item.to} end={item.to === "/"}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mobile-menu__foot">
            <Link to="/contatti" className="btn btn--primary">
              Parliamo del tuo progetto
            </Link>
            <p className="muted">Italia · disponibile da remoto</p>
          </div>
        </div>
      )}
    </header>
  );
}
