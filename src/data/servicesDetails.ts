export interface Service {
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
    title: "Tjänster & villkor.",
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
      "Make-up inför bröllopsdagen",
      "Håruppsättning inför bröllopsdagen",
      "Ett provtillfälle för make-up och hår",
    ],

    trialHeading: "Provtillfället",
    trialDescription:
      "Under provtillfället testar vi make-up och hår tillsammans så att du kan känna dig trygg inför din bröllopsdag. Provet görs förslagsvis hos mig på Kungsholmen en vardag, cirka 1–2 månader innan bröllopet, om inget annat datum bestäms.",

    price: "Pris enligt överenskommelse",

    ctaText: "Skicka en förfrågan",
    ctaHref: "/kontakt",
  },

  otherServices: [
    {
      number: "02",
      eyebrow: "För brudfölje & tärnor",
      title: "Tärnpaket",
      description: "Ett harmoniskt skönhetsupplägg för brudföljet, med make-up och hår som kompletterar brudens stil och bröllopets helhet.",
      price: "Från 1500 kr/person för make-up och hårstyling",
      details: ["Personligt anpassad make-up för varje tärna", "Håruppsättning eller hårstyling enligt överenskommelse", "Anpassning efter önskad stil, klädsel och bröllopets tema", "Samordning av looken med brudens styling."],
    },
    {
      number: "03",
      eyebrow: "För fest & event",
      title: "Make-up",
      description: "En make-up som framhäver dina naturliga drag och anpassas efter din personliga stil, dina önskemål och tillfället.",
      price: "Från 1000 kr/person",
      details: ["Genomgång av önskemål och inspiration", "Anpassad bas, ögonmake-up och läppar", "Finish anpassad efter tillfället och önskat uttryck", "Möjlighet att välja mellan en naturlig, klassisk eller mer markerad look"],
    },
    {
      number: "04",
      eyebrow: "För fest & event",
      title: "Håruppsättning",
      description: "En personlig hårstyling med fokus på form, textur och detaljer — från mjuka vågor till eleganta uppsättningar",
      price: "Från 1000 kr/person",
      details: ["Genomgång av önskad frisyr och inspirationsbilder", "Styling enligt överenskommen frisyr", "Anpassning efter hårtyp, hårlängd och önskat resultat", "Finputsning för en hållbar och välbalanserad look"],
    },
  ] satisfies Service[],

  bookingTermsHeading: {
    eyebrow: "Viktig information",
    title: "Villkor vid bokning av Brudpaket",
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
        "Om stylingen på bröllopsdagen pågår längre än 5 timmar och sträcker sig över lunch behöver mat och dryck finnas tillgängligt.",
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
