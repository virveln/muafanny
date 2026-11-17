import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./layouts/SiteLayout";
import { HomePage } from "./pages/HomePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { ScrollToHash } from "./components/features/ScrollToHash";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./App.css";

const routeLoadingFallback = (
  <main
    id="main-content"
    className="page-main site-container site-container--wide route-loading"
    tabIndex={-1}
    aria-busy="true"
  >
  </main>
);

const AboutPage = lazy(() =>
  import("./pages/AboutPage").then(({ AboutPage }) => ({ default: AboutPage })),
);
const ContactPage = lazy(() =>
  import("./pages/ContactPage").then(({ ContactPage }) => ({ default: ContactPage })),
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage").then(({ NotFoundPage }) => ({ default: NotFoundPage })),
);
const PortfolioPage = lazy(() =>
  import("./pages/PortfolioPage").then(({ PortfolioPage }) => ({ default: PortfolioPage })),
);
const ServicesPage = lazy(() =>
  import("./pages/ServicesPage").then(({ ServicesPage }) => ({ default: ServicesPage })),
);
const ServicesDetailsPage = lazy(() =>
  import("./pages/ServicesDetailsPage").then(({ ServicesDetailsPage }) => ({ default: ServicesDetailsPage })),
);

function App() {
  return (
    <MantineProvider>
      <Notifications
        position="top-right"
        zIndex={1000}
      />
      <BrowserRouter>
        <ScrollToHash />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="om" element={<Suspense fallback={routeLoadingFallback}><AboutPage /></Suspense>} />
            <Route path="tjanster" element={<Suspense fallback={routeLoadingFallback}><ServicesPage /></Suspense>} />
            <Route path="/tjanster-detaljer" element={<Suspense fallback={routeLoadingFallback}><ServicesDetailsPage /></Suspense>} />
            <Route path="portfolio" element={<Suspense fallback={routeLoadingFallback}><PortfolioPage /></Suspense>} />
            <Route path="kontakt" element={<Suspense fallback={routeLoadingFallback}><ContactPage /></Suspense>} />
            <Route path="integritetspolicy" element={<PrivacyPolicyPage />} />
            <Route path="*" element={<Suspense fallback={routeLoadingFallback}><NotFoundPage /></Suspense>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>

  );
}

export default App;