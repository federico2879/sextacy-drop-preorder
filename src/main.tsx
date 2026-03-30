import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// GitHub Pages SPA redirect: convert /?/path back to /path
(function () {
  const { search, hash } = window.location;
  if (search.startsWith("?/")) {
    const decoded = search
      .slice(1)
      .replace(/~and~/g, "&");
    const path = decoded + hash;
    window.history.replaceState(null, "", path);
  }
})();

createRoot(document.getElementById("root")!).render(<App />);
