
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { LockKeyhole, ArrowRight, Check } from "lucide-react";
import { Eyebrow } from "../components/features/Eyebrow";
import CTASection from "../components/CTASection/CTASection";
import { servicesPageContent } from "../data/servicesDetails";
import "./ServicesDetailsPage.css";

const SESSION_KEY = "services-prices-unlocked";

export function ServicesDetailsPage() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true",
  );
  const [error, setError] = useState("");

  const bridal = servicesPageContent.bridalPackage;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const correctPassword = import.meta.env.VITE_SERVICES_DETAILS_PASSWORD;

    if (!correctPassword) {
      setError("Lösenordet är inte konfigurerat.");
      return;
    }

    if (password === correctPassword) {
      sessionStorage.setItem(SESSION_KEY, "true");
      setUnlocked(true);
      setPassword("");
      setError("");
    } else {
      setError("Fel lösenord. Försök igen.");
    }
  }

  function handleLock() {
    sessionStorage.removeItem(SESSION_KEY);
    setUnlocked(false);
    setPassword("");
    setError("");
  }

  if (!unlocked) {
    return (
      <main
        id="services-details-login-page"
        className="page-main site-container"
      >
        <div className="login-card">
          <div className="login-card-icon">
            <LockKeyhole size={24} aria-hidden="true" />
          </div>

          <div className="page-heading">
            <Eyebrow>Privat information</Eyebrow>
            <h1>Välkommen</h1>
            <p>
              Den här sidan innehåller mer information om tjänster
              och priser. Ange ditt lösenord för att fortsätta.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="service-password">Lösenord</label>
            <input
              id="service-password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              placeholder="Ange ditt lösenord"
              autoComplete="current-password"
              required
            />

            {error && (
              <p className="login-error" role="alert">
                {error}
              </p>
            )}

            <button className="button button--login" type="submit">
              Visa tjänster och priser
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </form>

          <p className="login-card-footnote">
            Har du inte fått lösenordet?{" "}
            <Link to="/kontakt">Kontakta mig</Link> gärna.
          </p>
        </div>
      </main>
    );
  }

  return (
    <div id="services-details-page">
      <main className="page-main site-container site-container--wide">
        {/* Page introduction */}
        <section className="page-heading">
          <Eyebrow>{servicesPageContent.heading.eyebrow}</Eyebrow>
          <h1>
            Tjänster & <em>villkor.</em>
          </h1>
          <p>{servicesPageContent.heading.description}</p>
        </section>

        {/* Featured bridal package */}
        <section
          className="bridal-service"
          aria-labelledby="bridal-service-title"
        >
          <div className="bridal-service__header">
            <span className="services-details-number">
              {bridal.number}
            </span>
            <Eyebrow>{bridal.eyebrow}</Eyebrow>
          </div>

          <div className="bridal-service__content">
            <h2 id="bridal-service-title">{bridal.title}</h2>

            <p className="bridal-service__intro">
              {bridal.description}
            </p>

            <div className="bridal-service__included">
              <h3>{bridal.includedHeading}</h3>

              <ul>
                {bridal.included.map((item) => (
                  <li key={item}>
                    <Check size={17} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bridal-service__trial">
              <h3>{bridal.trialHeading}</h3>
              <p>{bridal.trialDescription}</p>
            </div>

            <div className="bridal-service__price">
              <div>
                <p>{bridal.price}</p>
              </div>

              <Link to={bridal.ctaHref} className="button">
                {bridal.ctaText}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="other-services">
          <div className="services-details-layout">
            {servicesPageContent.otherServices.map((service) => (
              <article
                className="services-details-card"
                key={service.number}
              >
                <div className="services-details__header">
                  <span className="services-details-number">
                    {service.number}
                  </span>
                  <Eyebrow>{service.eyebrow}</Eyebrow>
                </div>

                <h3>{service.title}</h3>

                {service.description && (
                  <p className="services-details-description">
                    {service.description}
                  </p>
                )}

                {service.details.length > 0 && (
                  <ul>
                    {service.details.map((detail) => (
                      <li key={detail}>
                        <Check size={16} aria-hidden="true" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                )}

                {service.price && (
                  <div className="services-details-card-footer">
                    <p className="services-details-price">
                      {service.price}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Booking terms */}
        <section
          className="booking-terms"
          aria-labelledby="booking-terms-title"
        >
          <div className="page-heading">
            <Eyebrow>
              {servicesPageContent.bookingTermsHeading.eyebrow}
            </Eyebrow>

            <h2 id="booking-terms-title">
              {servicesPageContent.bookingTermsHeading.title}
            </h2>

            <p>
              {servicesPageContent.bookingTermsHeading.description}
            </p>
          </div>

          <div className="booking-terms__list">
            {servicesPageContent.bookingTerms.map((term) => (
              <article className="booking-term" key={term.number}>
                <span className="booking-term__number">
                  {term.number}
                </span>

                <div>
                  <h3>{term.title}</h3>
                  <p>{term.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Lock page */}
        <div className="lock-button-container">
          <button type="button" onClick={handleLock}>
            <LockKeyhole size={14} aria-hidden="true" />
            Lås sidan
          </button>
        </div>
      </main>

      {/* Contact call to action */}
      <CTASection
        title={servicesPageContent.callToAction.title}
        description={servicesPageContent.callToAction.description}
        buttonText={servicesPageContent.callToAction.buttonText}
        buttonHref={servicesPageContent.callToAction.buttonHref}
      />
    </div>
  );
}
