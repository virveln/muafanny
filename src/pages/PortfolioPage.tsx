import { Eyebrow } from "../components/features/Eyebrow";
import { PortfolioGallery } from "../components/portfolio/PortfolioGallery";
import CTASection from "../components/CTASection/CTASection";

export function PortfolioPage() {
  return (
    <main >
        <div className="page-main site-container site-container--wide">
            <section className="page-heading">
                <Eyebrow>Utvalda arbeten</Eyebrow>
                <h1>Portfolio</h1>
                <p>En samling uttryck, människor och fina samarbeten.</p>
            </section>
            <PortfolioGallery />
        </div>
        <CTASection
                title="Gillar du vad du ser?"
                description="Låt oss prata om dina önskemål och hur vi kan skapa din look."
                buttonText="Hör av dig"
                buttonHref="/kontakt"
                />
    </main>
  );
}
