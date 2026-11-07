
// import { CalendarDays } from "lucide-react";
import { ContactForm } from "../components/contact/ContactForm";
import { Eyebrow } from "../components/features/Eyebrow";
// import AvailabilityCalendar from "../components/contact/AvailabilityCalendar";
import { contactDetails } from "../data/contactDetails"
import "./ContactPage.css";



export function ContactPage() {
  return (
    <main className="page-main site-container site-container--narrow">
      <section className="page-heading page-heading--wide">
        <Eyebrow>Kontakt</Eyebrow>
        <h1>Låt oss höras.</h1>
        <p>
          Berätta om ditt datum, tillfälle och vilken stil du har
          i åtanke. Jag svarar vanligtvis inom 48 timmar.
        </p>
      </section>

      <section className="contact-layout ">
        <aside className="contact-details animation-fade-up animation-fade-up-delay">
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
          {/* <section className="availability-calendar-container">
            <div className="contact-detail">
              <div className="contact-detail-icon">
                <CalendarDays size={19} strokeWidth={1.5} aria-hidden="true"/>
              </div>
              <div className="contact-detail-text">
                <p className="contact-detail-label">Tillgänglighet</p>
                <p className="contact-detail-value">Lediga datum</p>
              </div>
            </div>
            <AvailabilityCalendar />
          </section> */}

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
