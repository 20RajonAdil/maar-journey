import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { registerSW } from "virtual:pwa-register";

// Registers the offline service worker and checks for a fresh version
// (new build = new precached content) on every load.
registerSW({ immediate: true });

createRoot(document.getElementById("root")!).render(<App />);
