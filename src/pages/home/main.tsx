import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { AppProvider } from "./AppContext";
import { AppDialogContent } from "./AppDialogContent";
import { MainContent } from "./MainContent";

function App() {
  return (
    <AppProvider>
      <MainContent />
      <AppDialogContent />
    </AppProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);


