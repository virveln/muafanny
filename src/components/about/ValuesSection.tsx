
import { motion, useReducedMotion } from "motion/react";
import {
  Heart,
  Sparkles,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import {
  staggeredGroupVariants,
  staggeredItemVariants,
} from "../animation/animationVariants";
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
    text: "Mitt signum är en strålande, hudliknande make-up som gör dig vackrare och som fortfarande känns som du.",
    icon: Sparkles,
  },
  {
    title: "Baserad i Stockholm",
    text: "Men tillgänglig överallt - jag kommer till dig. Till hemmet eller på evenemangsplatsen.",
    icon: MapPin,
  },
];

export default function ValuesSection() {
  const shouldAnimate = !useReducedMotion();

  return (
    <section className="values-section">
      <div className="values-container">
        <motion.div
          className="values-grid"
          variants={staggeredGroupVariants}
          initial={shouldAnimate ? "hidden" : false}
          whileInView={shouldAnimate ? "visible" : undefined}
          viewport={{ once: true, amount: 0.2 }}
        >
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <motion.article
                className="value-card"
                key={value.title}
                variants={staggeredItemVariants}
              >
                <Icon
                  className="value-icon"
                  size={26}
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <h3 className="value-title">{value.title}</h3>

                <p className="value-text">{value.text}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
