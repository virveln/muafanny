import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { NavLink } from "react-router-dom";
import { aboutContent } from "../../data/about";

import "./SiteHeader.css";

const navigation = [
  { label: "HEM", to: "/" },
  { label: "PORTFOLIO", to: "/portfolio" },
  { label: "TJÄNSTER", to: "/tjanster" },
  { label: "OM", to: "/om" },
  { label: "KONTAKT", to: "/kontakt" },
];

export function SiteHeader() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();
  const previousScrollY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0,
  );
  const [isScrolled, setIsScrolled] = useState(
    () => typeof window !== "undefined" && window.scrollY > 12,
  );
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 12);

    if (shouldReduceMotion || latest <= 80) {
      setIsHeaderVisible(true);
    } else {
      const scrollDelta = latest - previousScrollY.current;
      if (scrollDelta > 4) {
        setIsHeaderVisible(false);
      } else if (scrollDelta < -4) {
        setIsHeaderVisible(true);
      }
    }

    previousScrollY.current = latest;
  });

  return (
    <motion.header
      className={`site-header${isScrolled ? " is-scrolled" : ""}`}
      animate={{ y: isHeaderVisible ? 0 : "-100%" }}
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 420, damping: 42, mass: 0.8 }
      }
      onFocusCapture={() => setIsHeaderVisible(true)}
    >
      <div className="site-container site-container--wide header-inner">
        <NavLink className="wordmark" to="/" aria-label="Fanny Ehrnholm, hem">
          Fanny Ehrnholm
          <small>{aboutContent.work.professionMakeup} · {aboutContent.work.professionHair}</small>
        </NavLink>
        <nav className="main-nav" aria-label="Huvudmeny">
          {navigation.map(({ label, to }) => (
            <NavLink
              className={({ isActive }) => isActive ? "nav-link is-active" : "nav-link"}
              end={to === "/"}
              key={to}
              to={to}
            >
              {({ isActive }) => (
                <>
                  {label}
                  {isActive && (
                    <motion.span
                      className="nav-link__underline"
                      layoutId="site-nav-underline"
                      transition={{
                        layout: {
                          duration: shouldReduceMotion ? 0 : 0.34,
                          ease: [0.4, 0, 0.2, 1],
                        },
                      }}
                      aria-hidden="true"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}