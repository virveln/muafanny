
import { Controller, type Control, type UseFormRegister, type FieldErrors } from "react-hook-form";

import {
  Button,
  Popover,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";

import { DatePicker, type DateStringValue } from "@mantine/dates";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

import type { ContactFormData } from "./ContactFormSchema";
import { contactFormContent as content } from "../../data/ContactFormContent";
import { formatSelectedDates } from "../../utils/formatSelectedDates";

interface ContactFormFieldsProps {
  register: UseFormRegister<ContactFormData>;
  control: Control<ContactFormData>;
  errors: FieldErrors<ContactFormData>;
  calendarOpen: boolean;
  setCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDates: string[];
  dateFlexible: boolean;
}

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

export function ContactFormFields({
  register,
  control,
  errors,
  calendarOpen,
  setCalendarOpen,
  selectedDates,
  dateFlexible,
}: ContactFormFieldsProps) {
  const today = format(new Date(), "yyyy-MM-dd");

  const selectedDateLabel = formatSelectedDates(selectedDates);

  return (
    <>
      {/* NAME */}

      <div className="form-row">
        <div className={`contact-form__field-group ${errors.givenName ? "has-error" : ""}`}>
          <TextInput
            id="givenName"
            classNames={fieldClassNames}
            label={content.fields.givenName.label}
            placeholder={content.fields.givenName.placeholder}
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
            label={content.fields.familyName.label}
            placeholder={content.fields.familyName.placeholder}
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
        <div className={`contact-form__field-group ${errors.email ? "has-error" : ""}`}>
          <TextInput
            id="email"
            classNames={fieldClassNames}
            label={content.fields.email.label}
            type="email"
            autoComplete="email"
            placeholder={content.fields.email.placeholder}
            {...register("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />

          <div id="email-error" className="contact-form__error-slot">
            {errors.email?.message}
          </div>
        </div>
        
        <div className={`contact-form__field-group ${errors.phone ? "has-error" : ""}`}>
          <TextInput
            id="phone"
            classNames={fieldClassNames}
            label={content.fields.phone.label}
            type="tel"
            autoComplete="tel"
            placeholder={content.fields.phone.placeholder}
            {...register("phone")}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />

          <div id="phone-error" className="contact-form__error-slot">
            {errors.phone?.message}
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
              label={content.fields.occasion.label}
              placeholder={content.fields.occasion.placeholder}
              data={[...content.fields.occasion.options]}
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
          {content.fields.eventDates.label}
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
                  className="border-line contact-form__date-input"
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
                    ? content.fields.eventDates.flexibleLabel
                    : selectedDateLabel || content.fields.eventDates.placeholder}
                </Button>
              </Popover.Target>

              <Popover.Dropdown>
                <DatePicker
                  className="border-line mantine-calendar"
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
          label={content.fields.message.label}
          minRows={5}
          maxLength={content.fields.message.maxLength}
          placeholder={content.fields.message.placeholder}
          {...register("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />

        <div id="message-error" className="contact-form__error-slot">
          {errors.message?.message}
        </div>
      </div>
    </>
  );
}
