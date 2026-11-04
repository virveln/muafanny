import { ArrowRight, LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { Eyebrow } from "../components/Eyebrow";
import { services } from "../data/services";
import { BridalFAQ } from "../components/services/BridalFAQ";
import CTASection from "../components/CTASection/CTASection";
import "./ServicesPage.css";

export function ServicesPage() {
  return (
    <main >
        <div className="page-main site-container site-container--narrow">
            <section className="page-heading page-heading--wide">
                <Eyebrow>Det här kan vi göra</Eyebrow>
                <h1>Små detaljer.<br /><em>Stora ögonblick.</em></h1>
                <p>Varje uppdrag börjar med dig och vad du vill känna dig som.</p>
            </section>
            <section className="services-list animation-fade-up" aria-label="Tjänster">
                {services.map(({ number, title, text }) => (
                <article className="service-item" key={number}>
                    <span className="service-number">{number}</span>
                    <h2>{title}</h2>
                    <p>{text}</p>
                    <Link className="round-link" to="/kontakt" aria-label={`Fråga om ${title}`}>
                    <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                </article>
                ))}
                
            </section>
            <div className="services-tell-more">
                <p>Har du något annat i tankarna eller vill ha kostnadsförslag?</p>
                <Link className="text-link" to="/kontakt">Kontakta mig och berätta mer <ArrowRight size={17} aria-hidden="true" /></Link>
            </div>
            <div className="service-details-link">
                <Link className="text-link" to="/tjanster-detaljer">
                    <LockKeyhole size={13} aria-hidden="true" />
                    Detaljerad information
                    <ArrowRight size={16} aria-hidden="true" />
                </Link>
            </div>
        </div>

        <BridalFAQ />
        
        <CTASection
                title="Redo att boka?"
                description="Berätta om ditt datum och dina önskemål - jag svarar vanligtvis inom 24 timmar."
                buttonText="Kontakta mig"
                buttonHref="/kontakt"
                />
    </main>
  );
}
