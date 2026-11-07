
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { LockKeyhole, ArrowRight, Check, Eye, EyeOff } from "lucide-react";
import { Eyebrow } from "../components/features/Eyebrow";
import { CategorySwitch } from "../components/features/CategorySwitch";
import { ServiceCardList } from "../components/services/ServiceCardList";
import CTASection from "../components/CTASection/CTASection";
import {
  servicesPageContent,
  type ServiceCategory,
} from "../data/servicesDetails";
import "./ServicesDetailsPage.css";
import { title } from "../data/title";

const SESSION_KEY = "services-prices-unlocked";
const serviceCategories = [
  { value: "wedding", label: "Bröllop" },
  { value: "event", label: "Event" },
] as const;

export function ServicesDetailsPage() {
  const { hash } = useLocation();
  const [category, setCategory] = useState<ServiceCategory>("wedding");
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(SESSION_KEY) === "true",
  );
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const wasUnlocked = useRef(unlocked);

  const bridal = servicesPageContent.bridalPackage;

  useEffect(() => {
    const justUnlocked = unlocked && !wasUnlocked.current;
    wasUnlocked.current = unlocked;
    const targetId = unlocked && category === "wedding" && hash === "#villkor-brollop"
      ? "booking-terms"
      : null;

    const frame = window.requestAnimationFrame(() => {
      if (!unlocked || (justUnlocked && !targetId)) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (targetId) {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [category, hash, unlocked]);

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
      <>
      <title>{title.servicesDetails}</title>
        <main id="services-details-login-page" className="page-main site-container">
          <div id="login-card" className="login-card border-line">
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
              <div className="password-input-wrapper">
                <input
                  id="service-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  placeholder="Ange ditt lösenord"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Dölj lösenord" : "Visa lösenord"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <EyeOff size={19} aria-hidden="true" />
                  ) : (
                    <Eye size={19} aria-hidden="true" />
                  )}
                </button>
              </div>

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
      </>
    );
  }

  return (
    <>
      <title>{title.servicesDetails}</title>
      <div id="services-details-page">
        <main className="page-main site-container site-container--wide">
          {/* Page introduction */}
          <section className="page-heading">
            <Eyebrow>{servicesPageContent.heading.eyebrow}</Eyebrow>
            <h1>
              {servicesPageContent.heading.title}{" "}<em>{servicesPageContent.heading.titleItalic}</em>
            </h1>
            <p>{servicesPageContent.heading.description}</p>
          </section>

          <div className="animation-fade-up animation-fade-up-delay">
            <CategorySwitch
              categories={serviceCategories}
              value={category}
              onChange={setCategory}
              ariaLabel="Välj tjänstekategori"
            />

            {/* Featured bridal package */}
            {category === "wedding" && <section
              className="bridal-service border-line"
              aria-labelledby="bridal-service-title"
            >
              <div className="services-details-card-header">
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
            </section>}

            {/* Other services */}
            <section className="other-services">
              <ServiceCardList
                services={servicesPageContent.otherServices.filter(
                  (service) => service.category === category,
                )}
              />
            </section>

            {/* Booking terms */}
            {category === "wedding" && <section
              id="villkor-brollop"
              className="booking-terms"
              aria-labelledby="booking-terms-title"
            >
              <div className="page-heading">
                <Eyebrow>
                  {servicesPageContent.bookingTermsHeading.eyebrow}
                </Eyebrow>

                <h2 id="booking-terms-title">
                  {servicesPageContent.bookingTermsHeading.title}{" "}<em>{servicesPageContent.bookingTermsHeading.titleItalic}</em>
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
            </section>}

            {/* Lock page */}
            <div className="lock-button-container">
              <button type="button" onClick={handleLock}>
                <LockKeyhole size={14} aria-hidden="true" />
                Lås sidan
              </button>
            </div>
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
    </>
  );
}
