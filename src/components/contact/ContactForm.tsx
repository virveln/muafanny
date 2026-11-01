
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Alert,
  Button,
  Popover,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";

import {
  DatePicker,
  type DateStringValue,
} from "@mantine/dates";

import { CalendarDays, Send } from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import {
  contactSchema,
  type ContactFormData,
} from "./ContactFormSchema";

import { formatSelectedDates } from "../../utils/formatSelectedDates";

import "./ContactForm.css";

const fieldClassNames = {
  root: "contact-form__field",
  label: "contact-form__label",
  input: "contact-form__input",
};

const calendarClassNames = {
  calendarHeader: "mantine-calendar__header",
  calendarHeaderControl: "mantine-calendar__header-control",
  calendarHeaderLevel: "mantine-calendar__header-level",
  day: "mantine-calendar__day",
  month: "mantine-calendar__month",
  weekday: "mantine-calendar__weekday",
};

type FormStatus =
  | "idle"
  | "sending"
  | "success"
  | "error"
  | "not-connected";

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

  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const today = format(new Date(), "yyyy-MM-dd");

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: {
      errors,
      isSubmitting,
      isSubmitted,
      submitCount,
    },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),

    // Validera först när användaren skickar formuläret.
    mode: "onSubmit",

    // Efter första submit uppdateras felen när användaren skriver.
    reValidateMode: "onChange",

    defaultValues,
  });

  const selectedDates = watch("eventDates") ?? [];
  const dateFlexible = watch("dateFlexible");

  const selectedDateLabel = formatSelectedDates(selectedDates);

  const hasErrors = Object.keys(errors).length > 0;

  // Flytta fokus till felöversikten efter en misslyckad submit.
  useEffect(() => {
    if (submitCount > 0 && hasErrors) {
      errorSummaryRef.current?.focus();
    }
  }, [submitCount, hasErrors]);

  // Validerad data. Anslut Web3Forms eller annan backend här.
  const onSubmit = async (data: ContactFormData) => {
    setStatus("not-connected");

    // Backend integration kommer här.
    // Exempel:
    // await sendContactForm(data);
    // setStatus("success");
  };

  // Hantera misslyckad validering.
  const onInvalid = () => {
    setStatus("idle");
    setCalendarOpen(false);
  };

  const handleFormSubmit = handleSubmit(onSubmit, onInvalid);

  // Återställ formuläret.
  const handleReset = () => {
    reset(defaultValues);
    setStatus("idle");
    setCalendarOpen(false);
  };

  // Återställ status när användaren börjar ändra formuläret.
  const handleFormChange = () => {
    if (status !== "idle") {
      setStatus("idle");
    }
  };

  // Samla alla fältfel i en gemensam översikt.
  const errorFields = [
    { name: "givenName", label: "Förnamn", error: errors.givenName },
    { name: "familyName", label: "Efternamn", error: errors.familyName },
    { name: "phone", label: "Telefon", error: errors.phone },
    { name: "email", label: "E-post", error: errors.email },
    { name: "occasion", label: "Tillfälle", error: errors.occasion },
    { name: "eventDates", label: "Önskat datum", error: errors.eventDates },
    { name: "message", label: "Meddelande", error: errors.message },
  ].filter((field) => field.error);

  if (status === "success") {
    return (
      <div className="success-message" role="status" aria-live="polite">
        <Send size={27} strokeWidth={1.5} aria-hidden="true" />

        <h2>Tack för din förfrågan!</h2>

        <p>
          Ditt meddelande har skickats. Artisten återkommer
          till dig så snart som möjligt.
        </p>

        <button
          className="text-button"
          onClick={handleReset}
          type="button"
        >
          Skicka en ny förfrågan
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleFormSubmit}
      onChange={handleFormChange}
      noValidate
      aria-label="Kontaktformulär"
    >
      
      {/* NAME */}

      <div className="form-row">
        <div className={`contact-form__field-group ${errors.givenName ? "has-error" : ""}`}>
          <TextInput
            id="givenName"
            classNames={fieldClassNames}
            label="Förnamn"
            placeholder="Anna"
            autoComplete="given-name"
            {...register("givenName")}
            aria-invalid={!!errors.givenName}
            aria-describedby={errors.givenName ? "givenName-error" : undefined}
          />

          <div id="givenName-error" className="contact-form__error-slot">
            {errors.givenName?.message}
          </div>
        </div>

        <div className={`contact-form__field-group ${errors.familyName ? "has-error" : ""}`}>
          <TextInput
            id="familyName"
            classNames={fieldClassNames}
            label="Efternamn"
            placeholder="Andersson"
            autoComplete="family-name"
            {...register("familyName")}
            aria-invalid={!!errors.familyName}
            aria-describedby={errors.familyName ? "familyName-error" : undefined}
          />

          <div id="familyName-error" className="contact-form__error-slot">
            {errors.familyName?.message}
          </div>
        </div>
      </div>

      {/* CONTACT INFORMATION */}

      <div className="form-row">
        <div className={`contact-form__field-group ${errors.phone ? "has-error" : ""}`}>
          <TextInput
            id="phone"
            classNames={fieldClassNames}
            label="Telefon"
            type="tel"
            autoComplete="tel"
            placeholder="070 123 45 67"
            {...register("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />

          <div id="phone-error" className="contact-form__error-slot">
            {errors.phone?.message}
          </div>
        </div>

        <div className={`contact-form__field-group ${errors.email ? "has-error" : ""}`}>
          <TextInput
            id="email"
            classNames={fieldClassNames}
            label="E-post"
            type="email"
            autoComplete="email"
            placeholder="anna@gmail.se"
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />

          <div id="email-error" className="contact-form__error-slot">
            {errors.email?.message}
          </div>
        </div>
      </div>

      {/* OCCASION */}

      <div className={`contact-form__field-group ${errors.occasion ? "has-error" : ""}`}>
        <Controller
          name="occasion"
          control={control}
          render={({ field }) => (
            <Select
              id="occasion"
              classNames={fieldClassNames}
              label="Vad gäller tillfället?"
              placeholder="Välj ett tillfälle"
              data={[
                "Bröllop",
                "Fest / Event",
                "TV-produktion",
                "Fotografering",
                "Annat",
              ]}
              value={field.value}
              onChange={(value) => field.onChange(value ?? "")}
              onBlur={field.onBlur}
              aria-invalid={!!errors.occasion}
              aria-describedby={errors.occasion ? "occasion-error" : undefined}
            />
          )}
        />

        <div id="occasion-error" className="contact-form__error-slot">
          {errors.occasion?.message}
        </div>
      </div>

      {/* DATE PICKER */}

      <div className={`contact-form__date-field ${errors.eventDates ? "has-error" : ""}`}>
        <label className="contact-form__label" id="eventDates-label">
          Önskat datum
        </label>

        <Controller
          name="eventDates"
          control={control}
          render={({ field }) => (
            <Popover
              opened={calendarOpen && !dateFlexible}
              onChange={setCalendarOpen}
              position="bottom-start"
              shadow="md"
              radius="sm"
              withinPortal
              closeOnClickOutside
            >
              <Popover.Target>
                <Button
                  id="eventDates"
                  className="contact-form__date-input"
                  variant="default"
                  type="button"
                  fullWidth
                  rightSection={<CalendarDays size={18} />}
                  disabled={dateFlexible}
                  aria-haspopup="dialog"
                  aria-expanded={calendarOpen}
                  aria-labelledby="eventDates-label"
                  aria-invalid={!!errors.eventDates}
                  aria-describedby={errors.eventDates ? "eventDates-error" : undefined}
                  onBlur={field.onBlur}
                  onClick={() => setCalendarOpen((open) => !open)}
                >
                  {dateFlexible
                    ? "Datum inte bestämt"
                    : selectedDateLabel || "Välj datum"}
                </Button>
              </Popover.Target>

              <Popover.Dropdown>
                <DatePicker
                  className="mantine-calendar"
                  classNames={calendarClassNames}
                  type="multiple"
                  value={(field.value ?? []) as DateStringValue[]}
                  onChange={field.onChange}
                  excludeDate={(date) => date < today}
                  maxLevel="month"
                  headerControlsOrder={["level", "previous", "next"]}
                  locale="sv"
                />
              </Popover.Dropdown>
            </Popover>
          )}
        />

        <div id="eventDates-error" className="contact-form__error-slot">
          {errors.eventDates?.message}
        </div>
      </div>

      {/* MESSAGE */}

      <div className={`contact-form__message-field ${errors.message ? "has-error" : ""}`}>
        <Textarea
          id="message"
          classNames={fieldClassNames}
          label="Meddelande"
          minRows={5}
          maxLength={2000}
          placeholder="Berätta gärna om plats, önskemål och vad du tänker dig."
          {...register("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />

        <div id="message-error" className="contact-form__error-slot">
          {errors.message?.message}
        </div>
      </div>

      {/* PRIVACY INFORMATION */}

      <div className="contact-form__privacy">
        <p>
          Dina uppgifter används för att besvara din förfrågan
          och hantera eventuell bokning. Läs mer i{" "}
          <Link to="/integritetspolicy">
            integritetspolicyn
          </Link>.
        </p>
      </div>

      {/* STATUS MESSAGES */}

      {status === "not-connected" && (
        <Alert color="blue" role="status">
          Formuläret är validerat, men mejlfunktionen är
          ännu inte aktiverad.
        </Alert>
      )}

      {status === "error" && (
        <Alert color="red" role="alert">
          Något gick fel när förfrågan skulle skickas.
          Dina uppgifter finns kvar. Försök igen.
        </Alert>
      )}

      {/* SUBMIT */}

      <Button
        className="button button--submit"
        type="submit"
        loading={isSubmitting}
        disabled={isSubmitting}
        rightSection={
          <Send size={16} strokeWidth={1.5} aria-hidden="true" />
        }
      >
        Skicka förfrågan
      </Button>
    </form>
  );
}
