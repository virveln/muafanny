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
  return (
    <header className="site-header">
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
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
