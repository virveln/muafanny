import { Link } from "react-router-dom";
import { Eyebrow } from "../components/features/Eyebrow";
import { title } from "../data/title";

import "./PrivacyPolicyPage.css";

const policySections = [
  { id: "ansvar", title: "Vem ansvarar för dina personuppgifter?" },
  { id: "uppgifter", title: "Vilka personuppgifter samlar jag in?" },
  { id: "andamal", title: "Varför behandlar jag dina personuppgifter?" },
  { id: "delning", title: "Hur hanteras och delas dina uppgifter?" },
  { id: "lagring", title: "Hur länge sparas uppgifterna?" },
  { id: "rattigheter", title: "Dina rättigheter" },
  { id: "sakerhet", title: "Säkerhet" },
  { id: "andringar", title: "Ändringar i integritetspolicyn" },
];

const contactInfo = {
  name: "Fanny Ehrnholm",
  company: "MUA Fanny",
  website: "muafanny.se",
  websiteURL: "https://muafanny.se",
  email: "info@muafanny.se",
};

export function PrivacyPolicyPage() {
  return (
    <>
      <title>{title.privacyPolicy}</title>
      <main className="privacy-page page-main site-container site-container--wide">
        <header className="privacy-page__heading page-heading">
          <Eyebrow>Personuppgifter</Eyebrow>
          <h1>Integritetspolicy</h1>
          <p className="privacy-page__updated">Senast uppdaterad: 2026-11-01</p>
        </header>

        <div className="privacy-page__layout">
          <nav className="privacy-page__contents" aria-label="Innehåll på sidan">
            <p>På den här sidan</p>
            <ol>
              {policySections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <article className="privacy-policy">
            <section id="ansvar" className="privacy-policy__section">
              <h2>1. Vem ansvarar för dina personuppgifter?</h2>
              <p>
                {contactInfo.name}, som driver {contactInfo.company} (enskild firma),
                är personuppgiftsansvarig för behandlingen av dina
                personuppgifter.
              </p>
              <p>Du kan kontakta mig vid frågor om hur dina personuppgifter hanteras:</p>
              <dl className="privacy-policy__details">
                <div>
                  <dt>Företag</dt>
                  <dd>{contactInfo.company}</dd>
                </div>
                <div>
                  <dt>Webbplats</dt>
                  <dd>
                    <a href={contactInfo.websiteURL} target="_blank" rel="noopener noreferrer">
                      {contactInfo.website}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt>E-post</dt>
                  <dd>
                    <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                  </dd>
                </div>
              </dl>
            </section>

            <section id="uppgifter" className="privacy-policy__section">
              <h2>2. Vilka personuppgifter samlar jag in?</h2>
              <p>
                När du använder kontaktformuläret på webbplatsen kan jag samla in
                följande uppgifter:
              </p>
              <ul>
                <li>Namn</li>
                <li>E-postadress</li>
                <li>Telefonnummer</li>
                <li>Meddelande och övrig information som du själv väljer att lämna</li>
                <li>Eventuella datum eller andra uppgifter som du anger i formuläret</li>
              </ul>
              <p>
                Jag ber dig att inte skicka känsliga personuppgifter eller annan
                information som inte behövs för din förfrågan.
              </p>
            </section>

            <section id="andamal" className="privacy-policy__section">
              <h2>3. Varför behandlar jag dina personuppgifter?</h2>
              <p>Jag behandlar dina personuppgifter för att:</p>
              <ul>
                <li>Ta emot och besvara frågor och förfrågningar.</li>
                <li>Kontakta dig angående dina önskemål.</li>
                <li>Hantera eventuell bokning, offert eller överenskommelse.</li>
                <li>Följa upp en förfrågan och vid behov administrera en kundrelation.</li>
              </ul>
              <p>
                Den rättsliga grunden är i första hand att behandlingen är
                nödvändig för att vidta åtgärder på din begäran innan ett avtal
                ingås. Om ett avtal ingås kan behandlingen i stället vara
                nödvändig för att fullgöra avtalet.
              </p>
            </section>

            
                          
              <section id="delning" className="privacy-policy__section">
              <h2>4. Hur hanteras och delas dina uppgifter?</h2>

              <p>
                  När du skickar ett meddelande via kontaktformuläret på
                  webbplatsen används <strong>Formward</strong> för att ta emot,
                  hantera och lagra dina uppgifter samt skicka en
                  e-postavisering till min företagsmejladress.
              </p>

              <p>
                  Jag är personuppgiftsansvarig för de personuppgifter du
                  lämnar via formuläret. Formward, som drivs av EGF
                  Fastighetsservice AB, agerar personuppgiftsbiträde och
                  behandlar uppgifterna för min räkning enligt deras
                  personuppgiftsbiträdesavtal (Data Processing Agreement).
              </p>

              <p>
                  De uppgifter som behandlas är den information du själv
                  lämnar i formuläret, exempelvis namn, e-postadress,
                  telefonnummer och meddelande. Formward behandlar även
                  teknisk information, såsom en pseudonymiserad version
                  av din IP-adress, för att förebygga spam och missbruk
                  av tjänsten.
              </p>

              <p>
                  Formward lagrar formulärinskickningar, filer och
                  säkerhetskopior på servrar i Sverige. E-postaviseringar
                  hanteras via Mailjet/Sinch, som är en underleverantör
                  med databehandling inom EU.
              </p>

              <p>
                  Formward använder även andra underleverantörer för att
                  tillhandahålla och driva tjänsten. Enligt Formwards
                  aktuella dokumentation behandlas formulärdata som
                  standard inom EU/EES och överförs inte till länder
                  utanför EU/EES. Vissa valfria funktioner, exempelvis
                  Cloudflare Turnstile, kan innebära att teknisk
                  information behandlas utanför EU/EES. Sådana funktioner
                  används endast om de aktiveras.
              </p>

              <p>
                  Formuläruppgifterna lagras hos Formward enligt den
                  lagringstid som gäller för tjänsten och de inställningar
                  som används. Jag ansvarar för att uppgifterna inte
                  sparas längre än vad som är nödvändigt för att hantera
                  din förfrågan.
              </p>

              <p>
                  Jag använder personuppgifterna för att besvara din
                  förfrågan och hantera eventuell fortsatt kontakt.
                  Uppgifterna lämnas inte ut till andra aktörer, utöver
                  de tjänsteleverantörer som behövs för att hantera
                  formuläret och e-postaviseringen, eller när det krävs
                  enligt lag.
              </p>

              <p>
                  Du kan läsa mer om hur Formward behandlar personuppgifter
                  i deras{" "}
                  <a
                  href="https://formward.eu/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  integritetspolicy
                  </a>
                  {" "}och deras{" "}
                  <a
                  href="https://formward.eu/dpa"
                  target="_blank"
                  rel="noopener noreferrer"
                  >
                  personuppgiftsbiträdesavtal
                  </a>.
              </p>
              </section>



            <section id="lagring" className="privacy-policy__section">
              <h2>5. Hur länge sparas uppgifterna?</h2>
              <p>Jag sparar personuppgifter endast så länge de behövs för ändamålet.</p>
              <p>
                Förfrågningar som inte leder till ett uppdrag sparas normalt i
                högst <strong>12 månader efter den senaste kontakten</strong>, om
                det inte finns särskilda skäl att spara dem längre.
              </p>
              <p>
                Om en förfrågan leder till ett kundförhållande kan vissa uppgifter
                behöva sparas längre för att hantera avtalet eller uppfylla
                lagstadgade krav, exempelvis bokföringsregler.
              </p>
              <p>
                När uppgifterna inte längre behövs raderas de på ett säkert sätt.
                Tänk på att uppgifter även kan finnas kvar hos de tjänsteleverantörer
                som hanterar formuläret och e-posten enligt deras lagringsrutiner.
              </p>
            </section>

            <section id="rattigheter" className="privacy-policy__section">
              <h2>6. Dina rättigheter</h2>
              <p>Du har enligt GDPR rätt att:</p>
              <ul>
                <li>Begära information om vilka personuppgifter jag behandlar om dig.</li>
                <li>Begära att felaktiga uppgifter rättas.</li>
                <li>Begära att dina uppgifter raderas, i de fall lagen tillåter det.</li>
                <li>Begära begränsning av behandlingen.</li>
                <li>Invända mot behandling som grundar sig på intresseavvägning.</li>
                <li>I vissa fall få ut dina uppgifter i ett strukturerat format (dataportabilitet).</li>
              </ul>
              <p>
                Om du vill använda någon av dessa rättigheter kontaktar du mig via
                e-postadressen ovan.
              </p>
              <p>
                Du har även rätt att lämna klagomål till Integritetsskyddsmyndigheten
                (IMY) om du anser att dina personuppgifter behandlas felaktigt.
              </p>
              <p>
                Webbplats: <a href="https://www.imy.se/">https://www.imy.se/</a>
              </p>
            </section>

            <section id="sakerhet" className="privacy-policy__section">
              <h2>7. Säkerhet</h2>
              <p>
                Jag vidtar lämpliga tekniska och organisatoriska åtgärder för att
                skydda dina personuppgifter mot obehörig åtkomst, förlust och
                otillåten användning.
              </p>
            </section>

            <section id="andringar" className="privacy-policy__section">
              <h2>8. Ändringar i integritetspolicyn</h2>
              <p>
                Denna integritetspolicy kan uppdateras om verksamheten eller
                hanteringen av personuppgifter förändras. Den senaste versionen
                finns alltid tillgänglig på webbplatsen.
              </p>
            </section>

            <p className="privacy-policy__backlink">
              <Link to="/kontakt">Tillbaka till kontaktformuläret</Link>
            </p>
          </article>
        </div>
      </main>
    </>
  );
}