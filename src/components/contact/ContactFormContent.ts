
export const contactFormContent = {
  accessibility: {
    formLabel: "Kontaktformulär",
  },

  fields: {
    givenName: {
      label: "Förnamn",
      placeholder: "Anna",
    },

    familyName: {
      label: "Efternamn",
      placeholder: "Andersson",
    },

    phone: {
      label: "Telefon",
      placeholder: "070 123 45 67",
    },

    email: {
      label: "E-post",
      placeholder: "anna.andersson@gmail.se",
    },

    occasion: {
      label: "Vad gäller förfrågan?",
      placeholder: "Välj en kategori",
      options: [
        "Bröllop",
        "Fest / Event",
        "TV-produktion",
        "Annat",
      ],
    },

    eventDates: {
      label: "Önskat datum",
      placeholder: "Välj datum",
      flexibleLabel: "Datum inte bestämt",
      emptyLabel: "Inget datum valt",
    },

    message: {
      label: "Meddelande",
      placeholder:
        "Berätta gärna om plats, hur många perser som ska sminkas och /eller stylas, önskemål och vad du tänker dig.",
      maxLength: 2000,
    },
  },

  privacy: {
    text:
      "Dina uppgifter används för att besvara din förfrågan och hantera eventuell bokning. Läs mer i ",
    linkText: "integritetspolicyn",
    linkTo: "/integritetspolicy",
  },

  submit: {
    label: "Skicka förfrågan",
  },

  success: {
    title: "Tack för din förfrågan!",
    message:
      "Ditt meddelande har skickats. Jag återkommer till dig så snart som möjligt.",
    resetLabel: "Skicka en ny förfrågan",
  },

  errors: {
    submit:
      "Något gick fel när förfrågan skulle skickas. Dina uppgifter finns kvar. Försök igen.",
  },

  spamProtection: {
    label: "Lämna detta fält tomt",
  },

  email: {
    subjectPrefix: "Ny förfrågan från",
  },
} as const;
