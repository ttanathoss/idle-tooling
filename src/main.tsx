import { StrictMode } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ForgeAndFortune from "./forgeAndFortune/index.tsx";
import VF from "./vf/index.tsx";
import VF2 from "./vf2/index.tsx";
import VViolet from "./vViolet/index.tsx";
import VCyan from "./vCyan/index.tsx";
import CookieClickerEditor from "./vCyan/CookieClickerEditor.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/forgeandfortune" element={<ForgeAndFortune />} />
        <Route path="/v-violet" element={<VViolet />} />
        <Route path="/v-cyan" element={<VCyan />} />
        <Route
          path="/v-cyan/cookie-clicker"
          element={<CookieClickerEditor />}
        />
        <Route path="/v-f/*" element={<VF />} />
        <Route path="/v-f2/*" element={<VF2 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
