import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { App } from "./App";

export { getMeta, prerenderRoutes } from "./data/meta";
export { orderedProjects } from "./data/projects";
export { site } from "./data/site";

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
