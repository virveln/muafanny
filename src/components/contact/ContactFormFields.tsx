
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

const errorProps = {
  className: "contact-form__error-slot",
  "aria-live": "polite" as const,
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
            error={errors.givenName?.message}
            errorProps={errorProps}
            {...register("givenName")}
          />
        </div>

        <div className={`contact-form__field-group ${errors.familyName ? "has-error" : ""}`}>
          <TextInput
            id="familyName"
            classNames={fieldClassNames}
            label={content.fields.familyName.label}
            placeholder={content.fields.familyName.placeholder}
            autoComplete="family-name"
            error={errors.familyName?.message}
            errorProps={errorProps}
            {...register("familyName")}
          />
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
            error={errors.email?.message}
            errorProps={errorProps}
            {...register("email")}
          />
        </div>
        
        <div className={`contact-form__field-group ${errors.phone ? "has-error" : ""}`}>
          <TextInput
            id="phone"
            classNames={fieldClassNames}
            label={content.fields.phone.label}
            type="tel"
            autoComplete="tel"
            placeholder={content.fields.phone.placeholder}
            error={errors.phone?.message}
            errorProps={errorProps}
            {...register("phone")}
          />
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
              error={errors.occasion?.message}
              errorProps={errorProps}
              value={field.value}
              onChange={(value) => field.onChange(value ?? "")}
              onBlur={field.onBlur}
            />
          )}
        />

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
                {selectedDates.length > 0 && (
                  <div className="contact-form__date-picker-actions">
                    <button
                      className="contact-form__date-clear"
                      type="button"
                      onClick={() => field.onChange([])}
                    >
                      {content.fields.eventDates.clearLabel}
                    </button>
                  </div>
                )}
              </Popover.Dropdown>
            </Popover>
          )}
        />

        <div id="eventDates-error" className="contact-form__error-slot" aria-live="polite">
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
          error={errors.message?.message}
          errorProps={errorProps}
          {...register("message")}
        />
      </div>
    </>
  );
}
