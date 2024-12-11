import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { DaoHooksProvider } from "./DaoHooksContext.tsx";
import { HashRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const daoHooksConfig = {
  graphKey: import.meta.env.VITE_GRAPH_KEY,
};

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <DaoHooksProvider keyConfig={daoHooksConfig}>
          <App />
        </DaoHooksProvider>
      </QueryClientProvider>
    </HashRouter>
  </StrictMode>
);
