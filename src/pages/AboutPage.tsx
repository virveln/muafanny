import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow } from "../components/Eyebrow";
import "./AboutPage.css";

import ImgFanny from "../assets/fanny2.jpg";
import ValuesSection from "../components/about/ValuesSection";
import { aboutPageContent } from "../data/aboutPage";

export function AboutPage() {
  return (
    <div id="about-page" >
      <main className="page-main site-container site-container--narrow">

        {/* Personal introduction */}
        <section className="about-layout animation-fade-up">
          <img
            src={ImgFanny}
            alt="Porträtt av Fanny"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />

          <div className="page-heading">
            <Eyebrow>{aboutPageContent.eyebrow}</Eyebrow>
            <h1>Hej, jag är <em>Fanny</em></h1>
            <p>{aboutPageContent.introduction}</p>
            <Link
              className="text-link"
              to={aboutPageContent.linkHref}
            >
              {aboutPageContent.linkText}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>

        {/* Experience */}
        <section className="about-story animation-fade-up">
          <div className="about-story__inner">
            <Eyebrow>Min bakgrund</Eyebrow>
            <h2>{aboutPageContent.experienceHeading}</h2>

            {aboutPageContent.background.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Personal approach */}
        <section className="about-approach animation-fade-up">
          <Eyebrow>Mitt arbetssätt</Eyebrow>
          <h2>{aboutPageContent.approachHeading}</h2>

          {aboutPageContent.approach.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>

      </main>

      <ValuesSection />
    </div>
  );
}