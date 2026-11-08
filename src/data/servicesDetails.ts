export type ServiceCategory = "wedding" | "event";

export interface Service {
  category: ServiceCategory;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  price: string;
  details: string[];
}

export interface BookingTerm {
  number: string;
  title: string;
  description: string;
}

export const servicesPageContent = {
  heading: {
    eyebrow: "Information inför bokning",
    title: "Tjänster &",
    titleItalic: "villkor.",
    description:
      "Här hittar du mer information om mina tjänster, vad som ingår i brudpaketet och vad som gäller inför din bokning.",
  },

  bridalPackage: {
    number: "01",
    eyebrow: "För din bröllopsdag",
    title: "Brudpaket",
    description:
      "En personlig helhet för din bröllopsdag, med make-up och hår anpassat efter dig, din stil och dina önskemål.",

    includedHeading: "Det här ingår",
    included: [
      "Make-up enligt överenskommelse",
      "Håruppsättning enligt överenskommelse",
      "Ett provtillfälle för make-up och hår",
    ],

    trialHeading: "Provtillfället",
    trialDescription:
      "Under provtillfället testar vi make-up och hår tillsammans så att du kan känna dig trygg inför din bröllopsdag. Provet görs förslagsvis hos mig på Kungsholmen en vardag, cirka 1–2 månader innan bröllopet, om inget annat datum bestäms.",

    price: "8000:-",

    ctaText: "Skicka en förfrågan",
    ctaHref: "/kontakt",
  },


otherServices: [
  {
    category: "wedding",
    number: "02",
    eyebrow: "För bruden",
    title: "Make-up brud",
    description:
      "En personlig brudmake-up som framhäver din naturliga skönhet och skapas utifrån din stil och dina önskemål.",
    price: "5000:-",
    details: [
      "Personligt utformad brudmake-up",
      "Anpassning efter klädsel och bröllopets helhet",
      "Val av önskad stil och finish",
      "Personlig konsultation inför bröllopet",
    ],
  },
  {
    category: "wedding",
    number: "03",
    eyebrow: "För bruden",
    title: "Hårstyling brud",
    description:
      "En exklusiv hårstyling för bröllopsdagen, skapad utifrån din personliga stil, önskade frisyr och bröllopets helhet.",
    price: "3500:-",
    details: [
      "Personlig konsultation inför bröllopet",
      "Håruppsättning anpassad efter din önskade stil",
      "Utformning med hänsyn till hårtyp, klädsel och bröllopets tema",
    ],
  },
  {
    category: "wedding",
    number: "04",
    eyebrow: "För brudfölje & tärnor",
    title: "Tärnor paket",
    description:
      "Ett harmoniskt skönhetsupplägg för brudföljet, med make-up och hårstyling som kompletterar brudens stil och bröllopets helhet.",
    price: "3000:-",
    details: [
      "Personligt anpassad make-up för varje tärna",
      "Håruppsättning eller hårstyling enligt överenskommelse",
      "Styling anpassad efter klädsel och bröllopets tema",
    ],
  },
  {
    category: "wedding",
    number: "05",
    eyebrow: "För brudfölje & gäster",
    title: "Tärnor & gäster",
    description:
      "Make-up eller hårstyling för tärnor och bröllopsgäster, anpassad efter personliga önskemål och bröllopets stil.",
    price: "2000:-",
    details: [
      "Valfri make-up eller hårstyling",
      "Personlig konsultation kring önskad stil",
      "Styling anpassad efter klädsel och tillfälle",
    ],
  },
  {
    category: "wedding",
    number: "06",
    eyebrow: "För brudgum & näbb",
    title: "Brudgum & näbb",
    description:
      "En personlig och stilren styling med fokus på ett välvårdat, naturligt resultat inför bröllopsdagen.",
    price: "Från 500:-",
    details: [
      "Enklare styling anpassad efter önskemål",
      "Fokus på ett naturligt och välvårdat resultat",
      "Anpassning efter person och bröllopets tema",
    ],
  },
  {
    category: "event",
    number: "01",
    eyebrow: "För fest & event",
    title: "Make-up",
    description:
      "En make-up som framhäver dina naturliga drag och anpassas efter din personliga stil, dina önskemål och tillfället.",
    price: "Pris lämnas på förfrågan",
    details: [
      "Genomgång av önskemål och inspiration",
      "Anpassad bas, ögonmake-up och läppar",
      "Finish utifrån önskat uttryck och tillfälle",
      "Naturlig, klassisk eller mer markerad look",
    ],
  },
  {
    category: "event",
    number: "02",
    eyebrow: "För fest & event",
    title: "Håruppsättning",
    description:
      "En personlig hårstyling med fokus på form, textur och detaljer – från mjuka vågor till eleganta uppsättningar.",
    price: "Pris lämnas på förfrågan",
    details: [
      "Genomgång av önskad frisyr och inspiration",
      "Styling enligt överenskommen frisyr",
      "Anpassning efter hårtyp och hårlängd",
      "Finputsning för ett hållbart och välbalanserat resultat",
    ],
  },
] satisfies Service[],


  bookingTermsHeading: {
    eyebrow: "Viktig information",
    title: "Villkor vid bokning av",
    titleItalic: "Brudpaket",
    description:
      "Läs igenom villkoren inför din bokning så att du vet vad som gäller före, under och efter din bokning.",
  },

  bookingTerms: [
    {
      number: "01",
      title: "Bokning & bokningsavgift",
      description:
        "Vid bokning skickas en faktura med en bokningsavgift på 1 000 kr ut för att bekräfta bokningen och avtalet, denna dras sedan av från slutfakturan.",
    },
    {
      number: "02",
      title: "Avbokning",
      description:
        "Vid avbokning mindre än 3 månader före avtalad bokning debiteras 50 % av kostnaden. (Bokningsavgiften återbetalas ej vid avbokning).",
    },
    {
      number: "03",
      title: "Bokning på lördagar och röda dagar",
      description:
        "Vid bokning på en lördag eller röd dag är minimibeloppet 10 000 kr för brudpaket tillsammans med tärnpaket eller motsvarande tjänster.",
    },
    {
      number: "04",
      title: "Resa & transport",
      description:
        "Vid resor utanför Stockholms centrum tillkommer resekostnad på 25 kr/mil samt 500 kr/h för restid.",
    },
    {
      number: "05",
      title: "Övernattning",
      description:
        "Om uppdraget kräver övernattning står brudparet för logi.",
    },
    {
      number: "06",
      title: "Mat & paus",
      description:
        "Om stylingen på bröllopsdagen pågår längre än 4 timmar och sträcker sig över lunch behöver mat och dryck finnas tillgängligt.",
    },
  ] satisfies BookingTerm[],

  callToAction: {
    title: "Frågor eller funderingar?",
    description:
      "Hör gärna av dig så pratar vi vidare om dina önskemål.",
    buttonText: "Kontakta mig",
    buttonHref: "/kontakt",
  },
};
