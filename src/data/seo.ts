
export interface PageSEO {
  title: string;
  description: string;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: "website" | "article";
  robots?: string;
}

const BASE_URL = "https://muafanny.se";
const DEFAULT_IMAGE = `${BASE_URL}/social-share.png`;

const businessName = "Fanny Ehrnholm";
const siteName = "MUA Fanny";

export const seo: Record<string, PageSEO> = {
  home: {
    title: `${businessName} | Make-up artist & hårstylist – ${siteName}`,
    description:
      "Fanny Ehrnholm är professionell make-up artist och hårstylist. Upptäck makeup, hårstyling och bröllopsstyling på MUA Fanny.",
    canonical: `${BASE_URL}/`,
    ogTitle: `${businessName} | Make-up artist & hårstylist – ${siteName}`,
    ogDescription:
      "Upptäck professionell makeup, hårstyling och bröllopsstyling av Fanny Ehrnholm.",
    ogImage: DEFAULT_IMAGE,
    ogType: "website",
  },

  portfolio: {
    title: `Portfolio | ${businessName} – ${siteName}`,
    description:
      "Se Fanny Ehrnholms portfolio med bilder från tidigare arbeten inom professionell makeup, hårstyling och bröllopsstyling.",
    canonical: `${BASE_URL}/portfolio`,
    ogTitle: `Portfolio | ${businessName} – ${siteName}`,
    ogDescription:
      "Upptäck Fanny Ehrnholms tidigare arbeten inom makeup, hårstyling och bröllopsstyling.",
    ogImage: DEFAULT_IMAGE,
    ogType: "website",
  },

  services: {
    title: `Tjänster | ${businessName} – ${siteName}`,
    description:
      "Upptäck Fanny Ehrnholms tjänster inom professionell makeup och hårstyling. Hitta rätt styling för fest, bröllop och andra speciella tillfällen.",
    canonical: `${BASE_URL}/tjanster`,
    ogTitle: `Tjänster | ${businessName} – ${siteName}`,
    ogDescription:
      "Läs mer om professionell makeup och hårstyling av Fanny Ehrnholm.",
    ogImage: DEFAULT_IMAGE,
    ogType: "website",
  },

  serviceDetails: {
    title: `Tjänstedetaljer & villkor | ${businessName} – ${siteName}`,
    description:
      "Detaljerad information om Fanny Ehrnholms tjänster, priser och bokningsvillkor.",
    canonical: `${BASE_URL}/tjanster-detaljer`,
    ogTitle: `Tjänstedetaljer & villkor | ${businessName} – ${siteName}`,
    ogDescription:
      "Information om tjänster, priser och villkor hos Fanny Ehrnholm.",
    ogImage: DEFAULT_IMAGE,
    ogType: "website",
    robots: "noindex, follow",
  },

  about: {
    title: `Om ${businessName} – ${siteName}`,
    description:
      "Lär känna Fanny Ehrnholm, professionell make-up artist och hårstylist. Läs mer om hennes erfarenhet, arbete och passion för makeup och hårstyling.",
    canonical: `${BASE_URL}/om`,
    ogTitle: `Om ${businessName} – ${siteName}`,
    ogDescription:
      "Lär känna Fanny Ehrnholm och hennes arbete inom makeup och hårstyling.",
    ogImage: DEFAULT_IMAGE,
    ogType: "website",
  },

  contact: {
    title: `Kontakt | ${businessName} – ${siteName}`,
    description:
      "Kontakta Fanny Ehrnholm för frågor och bokningar inom professionell makeup, hårstyling och bröllopsstyling.",
    canonical: `${BASE_URL}/kontakt`,
    ogTitle: `Kontakta ${businessName} – ${siteName}`,
    ogDescription:
      "Kontakta Fanny Ehrnholm för frågor och bokningar.",
    ogImage: DEFAULT_IMAGE,
    ogType: "website",
  },
};
