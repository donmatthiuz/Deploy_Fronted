import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "swiper/swiper-bundle.css";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/flatpickr.css";
import App from "./App.tsx";
import { AppWrapper } from "./components/common/PageMeta.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { TokenProvider } from "./hooks/useToken.tsx";
import {CodigoProvider} from "./hooks/useCodigo.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <TokenProvider>
      <CodigoProvider>
        <AppWrapper>
          <App />
        </AppWrapper>
        </CodigoProvider>
      </TokenProvider>

    </ThemeProvider>
  </StrictMode>
);
