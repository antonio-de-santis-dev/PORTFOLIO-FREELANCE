import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./styles";

document.documentElement.classList.add("js");

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// Le pagine sono prerenderizzate in build: si idrata l'HTML solo se corrisponde alla route richiesta
// (un fallback del server, es. 404.html, contiene un'altra pagina); altrimenti si monta da zero.
const path = window.location.pathname.replace(/\/+$/, "") || "/";
if (root.dataset.route === path) hydrateRoot(root, app);
else {
  root.textContent = "";
  createRoot(root).render(app);
}
