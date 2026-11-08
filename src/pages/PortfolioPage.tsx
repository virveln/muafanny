import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Eyebrow } from "../components/features/Eyebrow";
import { PortfolioGallery } from "../components/portfolio/PortfolioGallery";
import CTASection from "../components/CTASection/CTASection";
import { title } from "../data/title";
import "./PortfolioPage.css";

export function PortfolioPage() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      setShowBackToTop(window.scrollY > 500);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <>
      <title>{title.portfolio}</title>
      <main >
          <div className="page-main site-container site-container--wide">
              <section className="page-heading">
                  <Eyebrow>Utvalda arbeten</Eyebrow>
                  <h1>Portfolio</h1>
                  <p>En samling uttryck, människor och fina samarbeten.</p>
              </section>
              <PortfolioGallery onLightboxChange={setIsLightboxOpen} />
          </div>
          <CTASection
                  title="Gillar du vad du ser?"
                  description="Låt oss prata om dina önskemål och hur vi kan skapa din look."
                  buttonText="Hör av dig"
                  buttonHref="/kontakt"
                  />
      </main>
      {showBackToTop && !isLightboxOpen && (
        <button
          className="portfolio-back-to-top"
          type="button"
          aria-label="Till sidans början"
          title="Till sidans början"
          onClick={() => {
            const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth";
            window.scrollTo({ top: 0, behavior });
          }}
        >
          <ArrowUp size={21} aria-hidden="true" />
        </button>
      )}
    </>
  );
}
