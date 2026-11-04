type BridalFaqQuestion = {
  question: string;
  answer: string[];
  tips?: {
    title: string;
    text: string;
  }[];
};

export const bridalFaqContent = {
  eyebrow: "Bra att veta",
  heading: "Vanliga frågor inför bröllopet",
  description:
    "Här har jag samlat svar på några av de vanligaste frågorna inför en bröllopsbokning. Hittar du inte det du söker är du varmt välkommen att höra av dig.",

  questions: [
    {
      question:
        "Mitt bröllop är inte i Stockholm. Utgår du endast från Stockholm eller reser du även till andra platser?",
      answer: [
        "Jag utgår från Stockholm men reser självklart dit bröllopet tar mig! Oavsett om ni planerar ert bröllop på annan ort eller utomlands är ni varmt välkomna att skicka en förfrågan.",
      ],
    },
    {
      question: "Ingår en provning av hår och makeup i priset?",
      answer: [
        "Ja! När du bokar din bröllopsstyling hos mig ingår en provning där vi tillsammans går igenom hår och makeup inför den stora dagen. Det är ett tillfälle för oss att lära känna varandra, testa oss fram och landa i en look som känns helt rätt för dig.",
      ],
    },
    {
      question: "Hur fungerar betalningen?",
      answer: [
        "Efter bröllopet skickas en faktura ut, vanligtvis inom sju dagar efter stylingtillfället.",
      ],
    },
    {
      question: "Gör du även hår och makeup på tärnor och gäster?",
      answer: [
        "Absolut! Jag erbjuder även styling för tärnor och övriga bröllopsgäster. När du skickar in din förfrågan går vi tillsammans igenom era önskemål och hittar ett upplägg som passar er och dagens tidsplan.",
      ],
    },
    {
      question: "Hur lång tid tar stylingen?",
      answer: [
        "Tidsåtgången varierar beroende på vilken look du önskar, hårets längd och tjocklek samt andra individuella förutsättningar. När jag har fått en bättre bild av dina önskemål tar jag fram en uppskattad tidsplan som vi går igenom tillsammans. På så sätt skapar vi goda förutsättningar för en lugn och härlig start på bröllopsdagen.",
      ],
    },
    {
      question:
        "Behöver jag ta med mig något till provningen av hår och makeup?",
      answer: [
        "Du behöver inte förbereda eller ta med dig något särskilt. Om du planerar att bära slöja eller har andra håraccessoarer får du gärna ta med dem, så kan vi testa hur de passar in i helheten.",
        "Har du någon favoritprodukt inom makeup som du gärna vill använda även på bröllopsdagen får du självklart ta med den. Då ser vi om och hur vi kan inkludera den i din look.",
      ],
    },
    {
      question: "Vad ska jag tänka på med min hudvård inför bröllopet?",
      answer: [
        "En väl förberedd hud ger fina förutsättningar för en jämn och hållbar makeup. Här är några av mina bästa tips inför bröllopsdagen:",
      ],
      tips: [
        {
          title: "Undvik nya produkter",
          text: "Testa helst inte ny hudvård veckorna innan bröllopet. Huden kan reagera på nya ingredienser och det är onödigt att riskera irritation eller oönskade hudreaktioner inför den stora dagen.",
        },
        {
          title: "Var försiktig med ansiktsmasker och eye patches",
          text: "Om du vill använda en ansiktsmask eller eye patches på bröllopsdagen rekommenderar jag att du väljer produkter du vet att din hud tål. Rengör huden efteråt och följ upp med din vanliga hudvårdsrutin, gärna samma produkter som vi använde vid provningen.",
        },
        {
          title: "Exfoliera med omtanke",
          text: "En skonsam exfoliering kan bidra till en jämnare hudyta och en finare makeupbas. Om du vill börja exfoliera rekommenderar jag att du rådgör med en hudterapeut och introducerar produkterna i god tid, snarare än att testa något nytt precis innan bröllopet.",
        },
        {
          title: "Glöm inte läpparna",
          text: "Återfukta läpparna regelbundet och använd gärna en mild läppskrubb samma dag om dina läppar behöver det. Det ger fina förutsättningar för en jämn och hållbar läppmakeup.",
        },
        {
          title: "Tänk på brun utan sol",
          text: "Om du planerar att använda brun utan sol eller spraytan rekommenderar jag att du undviker att applicera den i ansiktet. Jag anpassar istället makeupbasen efter din hudton och matchar den med halsen för ett naturligt och enhetligt resultat.",
        },
      ],
    },
    {
      question:
        "Ska jag tvätta håret dagen innan eller samma dag som bröllopet?",
      answer: [
        "Det beror på din hårtyp och vilken frisyr vi har planerat. Vissa frisyrer blir bäst i nytvättat hår medan andra fungerar bättre med lite mer textur. Under vår provning går vi igenom vad som passar just ditt hår och jag ger dig personliga rekommendationer inför bröllopsdagen.",
      ],
    },
    {
      question: "Hur långt i förväg behöver jag boka dig?",
      answer: [
        "Jag rekommenderar att du skickar din förfrågan så snart du har bestämt ditt bröllopsdatum. Populära datum bokas ofta upp långt i förväg, så vänta gärna inte för länge. Skicka en förfrågan via formuläret så återkommer jag med besked om min tillgänglighet.",
      ],
    },
    {
      question: "Hur går det till när jag vill boka min bröllopsstyling?",
      answer: [
        "Du börjar med att skicka en förfrågan via mitt bokningsformulär. Berätta gärna lite om ert bröllop, var stylingen ska äga rum, vilket datum det gäller och hur många personer som önskar styling.",
        "Jag återkommer vanligtvis inom 48 timmar med information om tillgänglighet och prisförslag. Därefter tar vi det vidare tillsammans och går igenom detaljerna inför en eventuell bokning.",
      ],
    },
    {
      question: "Vad händer om jag vill ändra något efter provningen?",
      answer: [
        "Självklart! Provningen är till för att vi tillsammans ska hitta fram till en look som känns helt rätt för dig. Det är viktigt att du känner dig bekväm med att berätta vad du tycker, både om det är något du vill justera och sådant du tycker extra mycket om.",
        "Det kan ibland kännas ovant att se sig själv i en ny makeup eller frisyr, så ge dig själv lite tid att känna efter. Mitt mål är att skapa en look som fortfarande känns som du, men med en extra genomarbetad och professionell touch.",
      ],
    },
    {
      question:
        "Hur ser du till att makeup och frisyr håller hela dagen och kvällen?",
      answer: [
        "Jag anpassar både makeup och hår efter dina personliga förutsättningar, önskemål och dagens förutsättningar. Med rätt produkter och tekniker skapar vi en look som är genomtänkt för att hålla från vigsel till fest.",
        "För att enkelt kunna fräscha upp makeupen under dagen rekommenderar jag att du har med dig ett litet bättringskit med puder, puderpuff och dina valda läpprodukter. Då har du det viktigaste nära till hands för små touch-ups under dagen.",
      ],
    },
  ] satisfies BridalFaqQuestion[],
};
