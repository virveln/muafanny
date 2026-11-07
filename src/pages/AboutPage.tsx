
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow } from "../components/features/Eyebrow";
import ValuesSection from "../components/about/ValuesSection";
import { aboutContent } from "../data/about";
import { title } from "../data/title";
import "./AboutPage.css";

import ImgFanny from "../assets/fanny2.jpg";

export function AboutPage() {
  return (
    <>
      <title>{title.about}</title>
      <div id="about-page">
        <main className="page-main site-container site-container--narrow">

          {/* Personal introduction */}
          <section className="about-layout animation-fade-up">
            <div className="page-heading">
              <Eyebrow>
                <span>{aboutContent.work.professionMakeup}</span>
                <span className="eyebrow__separator">·</span>
                <span>{aboutContent.work.professionHair}</span>
                <span className="eyebrow__separator eyebrow__separator--location">·</span>
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

            <img
              src={ImgFanny}
              alt="Porträtt av Fanny"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              grid-area="image"
              className="animation-fade-up animation-fade-up-delay"
            />
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
