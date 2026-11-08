
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { SlSocialInstagram } from "react-icons/sl";
import { Link } from "react-router-dom";
import { contactDetails } from "../../data/contactDetails";

import "./SiteFooter.css";

const currentYear = new Date().getFullYear();

const informationLinks = [
  { label: "Villkor vid bokning av Brudpaket", to: "/tjanster-detaljer#villkor-brollop" },
  { label: "FAQ Bröllop", to: "/tjanster#faq-brollop" },
  { label: "Integritetspolicy", to: "/integritetspolicy" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-container--wide footer-inner">

        <div className="footer-brand">
          <Link className="footer-wordmark" to="/">
            Fanny Ehrnholm
          </Link>

          <p>
            Make-up artist & hårstylist för bröllop, event och speciella tillfällen.
          </p>

          <div className="footer-social-links">
            <a
              href={contactDetails.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={contactDetails.instagram.ariaLabel}
            >
              <SlSocialInstagram size={18} aria-hidden="true" />
            </a>

            <a
              href={contactDetails.email.href}
              aria-label="{contactDetails.email.ariaLabel}"
            >
              <Mail size={18} aria-hidden="true" />
            </a>
          </div>

          <p className="footer-address">
            <MapPin size={15} aria-hidden="true" />
            {contactDetails.location.value}
          </p>
        </div>

        <nav className="footer-column" aria-label="Information">
          <h2>Information</h2>

          {informationLinks.map(({ label, to }) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}

          <Link className="footer-contact" to="/kontakt">
            Skicka en förfrågan
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </nav>

        <div className="footer-bottom">
          <small>
            © {currentYear} Fanny Ehrnholm.
          </small>
          <small>
            Design & utveckling av Jessica Hvirfvel
          </small>
        </div>

      </div>
    </footer>
  );
}
