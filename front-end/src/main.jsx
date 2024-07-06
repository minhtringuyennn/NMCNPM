import { theme } from "@/config";
import ErrorBoundaryProvider from "@/providers/error-boundary";
import I18nProvider from "@/providers/i18n";
import StatsProvider from "@/providers/stats";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ConfigProvider } from "antd";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Render the app
const rootElement = document.getElementById("root");
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ConfigProvider theme={theme}>
        <StatsProvider disable={true}>
          <I18nProvider>
            <ErrorBoundaryProvider>
              <RouterProvider router={router} />
            </ErrorBoundaryProvider>
          </I18nProvider>
        </StatsProvider>
      </ConfigProvider>
    </StrictMode>
  );
}
