
// import { CalendarDays } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ContactForm } from "../components/contact/ContactForm";
import { Eyebrow } from "../components/features/Eyebrow";
import {
  softRevealVariants,
  staggeredGroupVariants,
  staggeredItemVariants,
} from "../components/animation/animationVariants";
// import AvailabilityCalendar from "../components/contact/AvailabilityCalendar";
import { contactDetails } from "../data/contactDetails"
import { SEO } from "../components/features/SEO";
import { seo } from "../data/seo";
import "./ContactPage.css";



export function ContactPage() {
  const shouldAnimate = !useReducedMotion();

  return (
    <>
    <SEO data={seo.contact} />
      <main id="main-content" className="page-main site-container site-container--narrow" tabIndex={-1}>
        <motion.section
          className="page-heading page-heading--wide"
          variants={softRevealVariants}
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={{ once: true, amount: 0.3 }}
        >
          <Eyebrow>Kontakt</Eyebrow>
          <h1>Låt oss höras.</h1>
          <p>
            Berätta om ditt datum, tillfälle och vilken stil du har
            i åtanke. Jag svarar vanligtvis inom 48 timmar.
          </p>
        </motion.section>

        <motion.section
          className="contact-layout"
          variants={staggeredGroupVariants}
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={{ once: true, amount: 0.12 }}
        >
          <motion.aside className="contact-details" variants={staggeredItemVariants}>
            <motion.div
              className="contact-details-list"
              variants={staggeredGroupVariants}
            >
              {Object.entries(contactDetails).map(([key, detail]) => {
                const Icon = detail.icon;
                const isExternal = detail.href?.startsWith("https://");

                return (
                  <motion.div
                    className="contact-detail"
                    key={key}
                    variants={staggeredItemVariants}
                  >
                    <div className="contact-detail-icon">
                      <Icon size={19} strokeWidth={1.5} aria-hidden="true" />
                    </div>

                    <div className="contact-detail-text">
                      <p className="contact-detail-label">
                        {detail.label}
                      </p>

                      {detail.href ? (
                        <a
                          href={detail.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          aria-label={detail.ariaLabel}
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <p className="contact-detail-value">
                          {detail.value}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            {/* Do not remove this commented section or its classes!!!!
            <section className="availability-calendar-container">
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
          </motion.aside>

          <motion.div
            className="border-line contact-form-panel"
            variants={staggeredItemVariants}
          >
            <ContactForm />
          </motion.div>
        </motion.section>
      </main>
    </>
  );
}
