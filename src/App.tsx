import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteLayout } from "./layouts/SiteLayout";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ServicesDetailsPage } from "./pages/ServicesDetailsPage";
import { schedulePortfolioImagePreload } from "./utils/preloadPortfolioImages";

import "./App.css";

schedulePortfolioImagePreload();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="om" element={<AboutPage />} />
          <Route path="tjanster" element={<ServicesPage />} />
          <Route path="/tjanster-detaljer" element={<ServicesDetailsPage />}/>
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="kontakt" element={<ContactPage />} />
          <Route path="integritetspolicy" element={<PrivacyPolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;