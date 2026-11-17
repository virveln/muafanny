import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow } from "../components/features/Eyebrow";
import { PortfolioPreview } from "../components/portfolio/PortfolioPreview";
import CTASection from "../components/CTASection/CTASection";
import { aboutContent } from "../data/about";
import { SEO } from "../components/features/SEO";
import { seo } from "../data/seo";
import { StructuredData } from "../components/features/StructuredData";
import { getResponsiveImage } from "../data/optimizedImages";


import "./HomePage.css";

const heroImage = getResponsiveImage("featured/fanny.jpg");
const heroImageSizes =
  "(max-width: 760px) calc(100vw - 40px), (max-width: 1440px) 50vw, 600px";

export function HomePage() {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  return (
    <div id="home-page">
      <SEO data={seo.home} />
      <StructuredData />
      
      <main id="main-content" tabIndex={-1}>
        <section className="home-hero site-container site-container--wide">
          <div className="hero-copy page-heading animation-fade-up">
            <Eyebrow>
              <span>{aboutContent.work.professionMakeup}</span>
              <span className="eyebrow__separator">·</span>
              <span>{aboutContent.work.professionHair}</span>
              <span className="eyebrow__separator eyebrow__separator--location">·</span>
              <span className="eyebrow__location">{aboutContent.work.locationWork}</span>
            </Eyebrow>
            <h1>Skönhet som känns <em>som du.</em></h1>
            <p>Make-up och hår för stunder du vill minnas. Personligt, genomtänkt och alltid med plats för din egen känsla.</p>
            <Link className="text-link" to="/portfolio">Upptäck mitt arbete <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <div className="hero-image-container animation-fade-up-delay animation-fade-up">
            <picture>
              <source
                type="image/webp"
                srcSet={heroImage.webpSrcSet}
                sizes={heroImageSizes}
              />
              <img
                className={`hero-image${heroImageLoaded ? " is-loaded" : ""}`}
                src={heroImage.src}
                srcSet={heroImage.srcSet}
                sizes={heroImageSizes}
                width={heroImage.width}
                height={heroImage.height}
                alt="Porträtt med mjuk, naturlig make-up"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                onLoad={() => setHeroImageLoaded(true)}
                onError={() => setHeroImageLoaded(true)}
              />
            </picture>
            {/* <span className="image-caption">Naturligt uttryck, med omtanke.</span> */}
          </div>
        </section>
        <section className="intro-band" id="intro">
          <div className="site-container site-container--narrow intro-band-inner">
            {/* <Eyebrow>En stund för dig</Eyebrow> */}
            <h2>För tillfällen som förtjänar det lilla extra.</h2>
            <Link className="text-link" to="/tjanster">Se tjänster <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
        </section>
        <PortfolioPreview />
        
          <CTASection
          title="Låt oss skapa något vackert"
          description="Ska ni gifta er, planerar ni ett evenemang eller vill ni boka för en produktion? Hör gärna av er!"
          buttonText="Hör av dig"
          buttonHref="/kontakt"
          />
      </main>
    </div>
  );
}
