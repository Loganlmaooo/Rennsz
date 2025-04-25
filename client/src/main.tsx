import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AdminProvider } from "@/contexts/AdminContext";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <AdminProvider>
      <App />
    </AdminProvider>
  </ThemeProvider>
);
