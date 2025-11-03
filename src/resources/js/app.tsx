import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

const pages = {
  ...import.meta.glob("./Pages/**/*.tsx", { eager: true }),
  ...import.meta.glob("../../Modules/**/resources/assets/js/Pages/**/*.tsx", {
    eager: true,
  }),
};

createInertiaApp({
  title: (title: string) => `${title} - ${appName}`,
  resolve: (name) => {
    const key = Object.keys(pages).find((k) => k.endsWith(`${name}.tsx`));
    if (!key) throw new Error(`Page ${name} not found`);
    return pages[key] as any;
  },
  setup({ el, App, props }) {
    const root = createRoot(el);

    root.render(<App {...props} />);
  },
  progress: {
    color: "#4B5563",
  },
});
