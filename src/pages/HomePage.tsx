import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow } from "../components/features/Eyebrow";
import { PortfolioPreview } from "../components/portfolio/PortfolioPreview";
import CTASection from "../components/CTASection/CTASection";
import { aboutContent } from "../data/about";


import "./HomePage.css";

import HeroFanny from "../assets/fanny1.jpg";

export function HomePage() {
  const [heroImageLoaded, setHeroImageLoaded] = useState(false);

  return (
    <main id="home-page">
      <section className="home-hero site-container site-container--wide">
        <div className="hero-copy page-heading animation-fade-up">
          <Eyebrow>
            <span>{aboutContent.eyebrow.profession1}</span>
            <span className="eyebrow__separator">·</span>
            <span>{aboutContent.eyebrow.profession2}</span>
            <span className="eyebrow__separator eyebrow__separator--location">·</span>
            <span className="eyebrow__location">{aboutContent.eyebrow.location}</span>
          </Eyebrow>
          <h1>Skönhet som känns <em>som du.</em></h1>
          <p>Makeup och hår för stunder du vill minnas. Personligt, genomtänkt och alltid med plats för din egen känsla.</p>
          <Link className="text-link" to="/portfolio">Upptäck mitt arbete <ArrowRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="hero-image-container animation-fade-up-delay animation-fade-up">
          <img
            className={`hero-image${heroImageLoaded ? " is-loaded" : ""}`}
            src={HeroFanny}
            alt="Porträtt med mjuk, naturlig makeup"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            onLoad={() => setHeroImageLoaded(true)}
            onError={() => setHeroImageLoaded(true)}
          />
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
  );
}
