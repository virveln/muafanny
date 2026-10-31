
import { ArrowRight } from "lucide-react";
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
        <a href={buttonHref} className="button button--cta">
          {buttonText}
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
