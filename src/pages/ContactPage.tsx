
import { Mail, MapPin } from "lucide-react";
import { ContactForm } from "../components/contactform/ContactForm";
import { Eyebrow } from "../components/Eyebrow";

import "./ContactPage.css";

const contactDetails = [
  {
    icon: Mail,
    label: "E-post",
    value: "info@muafanny.se",
    href: "mailto:info@muafanny.se",
  },
  {
    icon: Mail,
    label: "Instagram",
    value: "@fannyehrnholm",
    href: "https://www.instagram.com/",
  },
  {
    icon: MapPin,
    label: "Utgår från",
    value: "Stockholm, Sverige",
  },
];

export function ContactPage() {
  return (
    <main className="page-main site-container site-container--narrow">
      <section className="page-heading page-heading--wide">
        <Eyebrow>Kontakt</Eyebrow>
        <h1>Låt oss höras.</h1>
        <p>
          Berätta om ditt datum, tillfälle och vilken stil du har
          i åtanke. Jag svarar vanligtvis inom 24 timmar.
        </p>
      </section>

      <section className="contact-layout ">
        <aside className="contact-details animation-fade-up">
          <div className="contact-details-list">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;

              return (
                <div className="contact-detail" key={detail.label}>
                  <div className="contact-detail-icon">
                    <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
                  </div>

                  <div className="contact-detail-text">
                    <p className="contact-detail-label">
                      {detail.label}
                    </p>

                    {detail.href ? (
                      <a href={detail.href}>
                        {detail.value}
                      </a>
                    ) : (
                      <p className="contact-detail-value">
                        {detail.value}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="contact-note">
            <span className="contact-note-line" />
            <p>
              Osäker på vad du behöver? Berätta om dina idéer,
              så hittar vi rätt tillsammans.
            </p>
          </div>
        </aside>

        <div className="contact-form-panel animation-fade-up animation-fade-up-delay">
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
