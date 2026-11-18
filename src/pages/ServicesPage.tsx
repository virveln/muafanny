import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow } from "../components/features/Eyebrow";
import {
  staggeredGroupVariants,
  staggeredItemVariants,
  softRevealVariants,
} from "../components/animation/animationVariants";
import { services } from "../data/services";
import { BridalFAQ } from "../components/services/BridalFAQ";
import CTASection from "../components/CTASection/CTASection";
import { SEO } from "../components/features/SEO";
import { seo } from "../data/seo";
import "./ServicesPage.css";

export function ServicesPage() {
  const shouldAnimate = !useReducedMotion();

  return (
    <>
      <SEO data={seo.services} />
        <main id="main-content" tabIndex={-1}>
            <div className="page-main site-container site-container--narrow">
                <motion.section
                    className="page-heading page-heading--wide"
                    variants={softRevealVariants}
                    initial={shouldAnimate ? "hidden" : false}
                    whileInView={shouldAnimate ? "visible" : undefined}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <Eyebrow>Det här kan vi göra</Eyebrow>
                    <h1>Små detaljer.<br /><em>Stora ögonblick.</em></h1>
                    <p>Varje uppdrag börjar med dig och vad du eller dina gäster vill känna dig som.</p>
                </motion.section>
                <motion.section
                    className="services-list"
                    aria-label="Tjänster"
                    variants={staggeredGroupVariants}
                    initial={shouldAnimate ? "hidden" : false}
                    animate={shouldAnimate ? "visible" : undefined}
                >
                    {services.map(({ number, title, text }) => (
                    <motion.article className="service-item" key={number} variants={staggeredItemVariants}>
                        <span className="service-number">{number}</span>
                        <h2>{title}</h2>
                        <p>{text}</p>
                        <Link className="round-link" to={`/kontakt?occasion=${encodeURIComponent(title)}`} aria-label={`Fråga om ${title}`}>
                        <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                    </motion.article>
                    ))}
                    
                </motion.section>
                <motion.div
                    className="service-details-link"
                    variants={softRevealVariants}
                    initial={shouldAnimate ? "hidden" : false}
                    whileInView={shouldAnimate ? "visible" : undefined}
                    viewport={{ once: true, amount: 0.5 }}
                >
                    <Link className="text-link" to="/tjanster-detaljer">
                        <LockKeyhole size={13} aria-hidden="true" />
                        Detaljerad information
                        <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                </motion.div>
                <motion.div
                    className="services-tell-more"
                    variants={softRevealVariants}
                    initial={shouldAnimate ? "hidden" : false}
                    whileInView={shouldAnimate ? "visible" : undefined}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <p>Har du något annat i tankarna eller vill ha kostnadsförslag?</p>
                    <Link className="text-link" to="/kontakt">Kontakta mig och berätta mer <ArrowRight size={17} aria-hidden="true" /></Link>
                </motion.div>
            <BridalFAQ />
            </div>

            
            <CTASection
                    title="Redo att boka?"
                    description="Berätta om ditt datum och dina önskemål - jag svarar vanligtvis inom 48 timmar."
                    buttonText="Kontakta mig"
                    buttonHref="/kontakt"
                    />
        </main>
    </>
  );
}
