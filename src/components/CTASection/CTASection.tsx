
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import "./CTASection.css";

type CTASectionProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
};

export default function CTASection({
  title = "Låt oss skapa något vackert",
  description = "Ska ni gifta er, planerar ni ett evenemang eller vill ni boka för en produktion? Hör gärna av er!",
  buttonText = "Kontakta mig",
  buttonHref = "/kontakt"
}: CTASectionProps) {
  return (
    <section
      className="cta-section"
    >
      <div className="cta-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link className="button button--cta" to={buttonHref}>{buttonText} <ArrowRight size={17} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
