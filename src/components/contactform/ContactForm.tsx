
import { useState, useRef } from "react";
import { Send, CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import "./ContactForm.css";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [selected, setSelected] = useState<Date>();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const dateFieldRef = useRef<HTMLDivElement>(null);

  if (sent) {
    return (
      <div className="success-message" role="status">
        <Send size={27} strokeWidth={1.5} aria-hidden="true" />
        <h2>Tack för ditt meddelande.</h2>
        <p>
          Formuläret är en visningsversion och behöver kopplas
          till en formulärtjänst för att ta emot meddelanden.
        </p>
        <button
          className="text-button"
          onClick={() => setSent(false)}
          type="button"
        >
          Skicka ett till
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSent(true);
      }}
    >
      <div className="form-row">
        <label>
          <span>Förnamn</span>
          <input
            name="givenName"
            type="text"
            autoComplete="given-name"
            placeholder="Anna"
            required
          />
        </label>

        <label>
          <span>Efternamn</span>
          <input
            name="familyName"
            type="text"
            autoComplete="family-name"
            placeholder="Andersson"
            required
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          <span>Telefon</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="0701234567"
          />
        </label>

        <label>
          <span>E-post</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="anna.andersson@gmail.se"
            required
          />
        </label>
      </div>

      <label>
        <span>Vad gäller tillfället?</span>
        <select name="occasion" defaultValue="" required>
          <option value="" disabled>
            Välj ett tillfälle
          </option>
          <option value="Bröllop">Bröllop</option>
          <option value="Fest eller event">Fest eller event</option>
          <option value="Foto eller produktion">
            Foto eller produktion
          </option>
          <option value="Annat">Annat</option>
        </select>
      </label>

      <div className="contact-form__date-field" ref={dateFieldRef}>
        <label htmlFor="eventDate">
          <span>Datum</span>
        </label>

        <div className="contact-form__date-picker">
          <button
            id="eventDate"
            className="contact-form__date-input"
            type="button"
            aria-haspopup="dialog"
            aria-expanded={calendarOpen}
            onClick={() => setCalendarOpen((open) => !open)}
          >
            <span>
              {selected
                ? selected.toLocaleDateString("sv-SE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Välj datum"}
            </span>

            <CalendarDays size={18} aria-hidden="true" />
          </button>

          {calendarOpen && (
            <div className="contact-form__calendar">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={(date) => {
                  setSelected(date);
                  if (date) setCalendarOpen(false);
                }}
                locale={undefined}
                disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
                showOutsideDays
                autoFocus
              />
            </div>
          )}
        </div>

        <input
          type="hidden"
          name="eventDate"
          value={selected ? selected.toISOString().slice(0, 10) : ""}
        />
      </div>

      <label>
        <span>Meddelande</span>
        <textarea
          name="message"
          rows={5}
          placeholder="Berätta gärna om plats, önskemål och vad du tänker dig."
          required
        />
      </label>

      <button className="button button--submit" type="submit">
        <span>Skicka förfrågan</span>
        <Send size={16} strokeWidth={1.5} aria-hidden="true" />
      </button>
    </form>
  );
}
