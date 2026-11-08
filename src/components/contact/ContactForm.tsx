
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Alert } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Send, Check  } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

import { formatSelectedDates } from "../../utils/formatSelectedDates";

import {
  contactSchema,
  type ContactFormData,
} from "./ContactFormSchema";

import { contactFormContent as content } from "../../data/ContactFormContent";
import { ContactFormFields } from "./ContactFormFields";

import "./ContactForm.css";

const FORMWARD_ENDPOINT =
  "https://forms.formward.eu/f/3ec53f97-7e50-4852-87c3-3478cabfd2a9";

type FormStatus = "idle" | "sending" | "success" | "error";

const defaultValues: ContactFormData = {
  givenName: "",
  familyName: "",
  email: "",
  phone: "",
  occasion: "",
  eventDates: [],
  dateFlexible: false,
  message: "",
};


export function ContactForm() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [searchParams] = useSearchParams();
  const requestedOccasion = searchParams.get("occasion");
  const initialOccasion = content.fields.occasion.options.find(
    (option) => option === requestedOccasion,
  ) ?? "";
  const initialValues = { ...defaultValues, occasion: initialOccasion };

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: initialValues,
  });

  const selectedDates = watch("eventDates") ?? [];
  const dateFlexible = watch("dateFlexible");

  const onSubmit = async (data: ContactFormData) => {
  setStatus("sending");

  try {
    const formData = new FormData();

    formData.set("Förnamn", data.givenName);
    formData.set("Efternamn", data.familyName);
    formData.set("email", data.email);
    formData.set("Telefon", data.phone);
    formData.set("Vad gäller förfrågan?", data.occasion);

    const formattedDates = formatSelectedDates(data.eventDates ?? []) || "Inget datum valt";

    formData.set("Önskat datum", formattedDates);

    // formData.set(
    //   "Datum inte bestämt",
    //   data.dateFlexible ? "Ja" : "Nej"
    // );

    formData.set("Meddelande", data.message);

    formData.set(
      "_subject",
      `${data.occasion} – ${formattedDates}`
    );

    const response = await fetch(FORMWARD_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result?.ok) {
      throw new Error("Formuläret kunde inte skickas.");
    }

    reset(initialValues);
    setCalendarOpen(false);
    setStatus("success");

    notifications.show({
      title: content.success.title,
      message: content.success.message,
      icon: <Check size={20} strokeWidth={1.5} aria-hidden="true" />,
      color: "var(--site-accent)",
      autoClose: 6000,
      withCloseButton: true,
      position: "top-right",
    });

  } catch (error) {
    console.error("Form submission failed:", error);
    setStatus("error");
  }
};

  const onInvalid = () => {
    setStatus("idle");
    setCalendarOpen(false);
  };

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
      aria-label={content.accessibility.formLabel}
    >
      
      {/* SPAM PROTECTION */}

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="contact-website">
          {content.spamProtection.label}
        </label>

        <input
          id="contact-website"
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* FORM FIELDS */}

      <ContactFormFields
        register={register}
        control={control}
        errors={errors}
        calendarOpen={calendarOpen}
        setCalendarOpen={setCalendarOpen}
        selectedDates={selectedDates}
        dateFlexible={dateFlexible}
      />

      {/* PRIVACY */}

      <div className="contact-form__privacy">
        <p>
          {content.privacy.text}{" "}
          <Link to={content.privacy.linkTo}>
            {content.privacy.linkText}
          </Link>.
        </p>
      </div>

      {/* ERROR */}

      {status === "error" && (
        <Alert color="red" role="alert">
          {content.errors.submit}
        </Alert>
      )}

      {/* SUBMIT */}

      <Button
        className="button button--submit"
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting || status === "sending"}
        rightSection={
          <Send size={16} strokeWidth={1.5} aria-hidden="true" />
        }
      >
        {content.submit.label}
      </Button>
    </form>
  );
}
