
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow } from "../features/Eyebrow";
import "./PortfolioPreview.css";

import image1 from "../../assets/portfolio/production/allsangen.webp";
import image2 from "../../assets/portfolio/event/tone.jpg";
import image3 from "../../assets/portfolio/event/andrea.webp";

const previewImages = [
  { src: image1, alt: "Selected make-up look" },
  { src: image2, alt: "Selected hairstyling look" },
  { src: image3, alt: "Selected beauty look" },
];

export function PortfolioPreview() {
  return (
    <section className="portfolio-preview site-container site-container--wide">
      <div className="section-heading">
        <div>
          <Eyebrow>Utvalda arbeten</Eyebrow>
          <h2>Olika uttryck, alltid personliga.</h2>
        </div>

        <Link className="text-link" to="/portfolio">
          Hela portfolion <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>

      <div className="portfolio-preview__grid">
        {previewImages.map((image) => (
          <Link
            className="portfolio-preview__item"
            to="/portfolio"
            key={image.src}
            aria-label={`Se hela portfolion: ${image.alt}`}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
