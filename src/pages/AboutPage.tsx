
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow } from "../components/features/Eyebrow";
import ValuesSection from "../components/about/ValuesSection";
import { aboutContent } from "../data/about";
import { SEO } from "../components/features/SEO";
import { seo } from "../data/seo";
import { getResponsiveImage } from "../data/optimizedImages";
import "./AboutPage.css";

const portrait = getResponsiveImage("featured/fanny.jpg");

export function AboutPage() {
  return (
    <>
      <SEO data={seo.about} />
      <div id="about-page">
        <main id="main-content" className="page-main site-container site-container--narrow" tabIndex={-1}>

          {/* Personal introduction */}
          <section className="about-layout animation-fade-up">
            <div className="page-heading">
              <Eyebrow>
                <span>{aboutContent.work.professionMakeup}</span>
                <span className="eyebrow__separator">·</span>
                <span>{aboutContent.work.professionHair}</span>
                <span className="eyebrow__location">{aboutContent.work.locationWork}</span>
              </Eyebrow>

              <h1>Hej, jag är <em>Fanny</em></h1>
              <p>{aboutContent.introduction}</p>

              <Link
                className="text-link"
                to={aboutContent.linkHref}
              >
                {aboutContent.linkText}
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>

            <div className="about-img-container">
              <picture>
                <source
                  type="image/webp"
                  srcSet={portrait.webpSrcSet}
                  sizes="(max-width: 760px) calc(100vw - 40px), 390px"
                />
                <img
                  src={portrait.src}
                  srcSet={portrait.srcSet}
                  sizes="(max-width: 760px) calc(100vw - 40px), 390px"
                  width={portrait.width}
                  height={portrait.height}
                  alt="Porträtt av Fanny"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  grid-area="image"
                  className="animation-fade-up animation-fade-up-delay"
                />
              </picture>
            </div>
          </section>

          {/* Background & approach */}
          <div className="about-details animation-fade-up">
            <section className="about-story">
              <Eyebrow>Min bakgrund</Eyebrow>
              <h2>{aboutContent.experienceHeading}</h2>

              {aboutContent.background.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </section>

            <section className="about-approach">
              <Eyebrow>Mitt arbetssätt</Eyebrow>
              <h2>{aboutContent.approachHeading}</h2>

              {aboutContent.approach.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </section>
          </div>

        </main>

        <ValuesSection />
      </div>
    </> 
  );
}
