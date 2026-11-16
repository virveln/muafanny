
const BASE_URL = "https://muafanny.se";

export const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      "name": "Fanny Ehrnholm",
      "alternateName": "MUA Fanny",
      "url": `${BASE_URL}/`,
      "description":
        "Professionell make-up artist och hårstylist.",
      "founder": {
        "@id": `${BASE_URL}/#person`
      }
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      "name": "Fanny Ehrnholm",
      "url": `${BASE_URL}/om`,
      "jobTitle": [
        "Make-up artist",
        "Hårstylist"
      ],
      "worksFor": {
        "@id": `${BASE_URL}/#organization`
      }
    }
  ]
};
