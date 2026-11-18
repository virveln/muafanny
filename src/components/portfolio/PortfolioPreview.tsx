
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow } from "../features/Eyebrow";
import {
  staggeredGroupVariants,
  staggeredItemVariants,
} from "../animation/animationVariants";
import { getResponsiveImage } from "../../data/optimizedImages";
import "./PortfolioPreview.css";

type PreviewImage = {
  image: ReturnType<typeof getResponsiveImage>;
  sizes?: string;
  alt: string;
};

const previewImages: PreviewImage[] = [
  {
    image: getResponsiveImage("portfolio/production/allsangen.webp"),
    sizes: "(max-width: 760px) calc(50vw - 22px), 33vw",
    alt: "Make-up och hårstyling till produktion",
  },
  {
    image: getResponsiveImage("portfolio/wedding/tone.jpg"),
    sizes: "(max-width: 760px) calc(50vw - 22px), 33vw",
    alt: "Hårstyling inför bröllop",
  },
  {
    image: getResponsiveImage("portfolio/wedding/andrea.webp"),
    sizes: "(max-width: 760px) calc(100vw - 32px), 33vw",
    alt: "Make-up och hårstyling inför kollektionssläpp",
  },
];

export function PortfolioPreview() {
  const shouldAnimate = !useReducedMotion();

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

      <motion.div
        className="portfolio-preview__grid"
        variants={staggeredGroupVariants}
        initial={shouldAnimate ? "hidden" : false}
        whileInView={shouldAnimate ? "visible" : undefined}
        viewport={{ once: true, amount: 0.2 }}
      >
        {previewImages.map((image) => (
          <motion.div
            variants={staggeredItemVariants}
            className="portfolio-preview__item"
            key={image.image.src}
          >
            <Link
              to="/portfolio"
              aria-label={`Se hela portfolion: ${image.alt}`}
            >
              <picture>
                <source
                  type="image/webp"
                  srcSet={image.image.webpSrcSet}
                  sizes={image.sizes}
                />
                <img
                  src={image.image.src}
                  srcSet={image.image.srcSet}
                  sizes={image.sizes}
                  alt={image.alt}
                  width={image.image.width}
                  height={image.image.height}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
