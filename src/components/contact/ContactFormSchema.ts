
import { z } from "zod";

export const contactSchema = z
  .object({
    givenName: z
      .string()
      .trim()
      .min(2, "Ange minst 2 tecken.")
      .max(50, "Namnet är för långt."),

    familyName: z
      .string()
      .trim()
      .min(2, "Ange minst 2 tecken.")
      .max(50, "Namnet är för långt."),

    email: z
      .string()
      .trim()
      .email("Ange en giltig e-postadress.")
      .max(254, "E-postadressen är för lång."),

    phone: z
      .string()
      .trim()
      .refine(
        (value) =>
          value === "" ||
          /^[+]?[0-9\s()-]{7,20}$/.test(value),
        "Ange ett giltigt telefonnummer."
      ),

    occasion: z
      .string()
      .min(1, "Välj ett tillfälle."),

    eventDates: z
      .array(z.string()),

    dateFlexible: z.boolean(),

    message: z
      .string()
      .trim()
      .min(10, "Meddelandet behöver vara minst 10 tecken.")
      .max(4000, "Meddelandet får vara högst 4000 tecken."),
  })
  .refine(
    (data) =>
      data.dateFlexible || data.eventDates.length > 0,
    {
      message: "Välj minst ett datum.",
      path: ["eventDates"],
    }
  );

export type ContactFormData = z.infer<typeof contactSchema>;
