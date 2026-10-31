
import {
  Heart,
  Sparkles,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import "./ValuesSection.css";

type Value = {
  title: string;
  text: string;
  icon: LucideIcon;
};

const values: Value[] = [
  {
    title: "Personligt bemötande",
    text: "Varje ansikte är unikt. Jag tar mig tid att förstå din stil, din hud och vad du känner dig bekväm med.",
    icon: Heart,
  },
  {
    title: "Framhäva, inte maskera",
    text: "Mitt signum är en strålande, hudliknande makeup som gör dig vackrare och som fortfarande känns som du.",
    icon: Sparkles,
  },
  {
    title: "Baserad i Stockholm",
    text: "Men tillgänglig överallt - jag kommer till dig. Till hemmet eller på evenemangsplatsen.",
    icon: MapPin,
  },
];

export default function ValuesSection() {
  return (
    <section className="values-section">
      <div className="values-container">
        <div className="values-grid">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article className="value-card" key={value.title}>
                <Icon
                  className="value-icon"
                  size={26}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <h3 className="value-title">{value.title}</h3>

                <p className="value-text">{value.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
