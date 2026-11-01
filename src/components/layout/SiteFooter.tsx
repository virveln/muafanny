import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import "./SiteFooter.css";

const currentYear = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container site-container--wide footer-inner">
        <Link className="footer-wordmark" to="/">Fanny Ehrnholm</Link>
        <Link className="footer-privacy" to="/integritetspolicy">Integritetspolicy</Link>
        <Link className="footer-contact" to="/kontakt">Ta kontakt <ArrowRight size={15} aria-hidden="true" /></Link>
        <small>© {currentYear} Jessica Hvirfvel</small>
      </div>
    </footer>
  );
}
