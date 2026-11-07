import { Check } from "lucide-react";
import { Eyebrow } from "../features/Eyebrow";
import type { Service } from "../../data/servicesDetails";

import "./ServiceCardList.css";

type ServiceCardListProps = {
  services: readonly Service[];
};

export function ServiceCardList({ services }: ServiceCardListProps) {
  return (
    <div
      className={`services-details-layout${services.length === 2 ? " services-details-layout--two" : services.length === 5 ? " services-details-layout--five" : ""}`}
    >
      {services.map((service) => (
        <article className="services-details-card border-line" key={service.number}>
          <div className="services-details-card-header">
            <span className="services-details-number">{service.number}</span>
            <Eyebrow>{service.eyebrow}</Eyebrow>
          </div>

          <h3>{service.title}</h3>
          {service.description && (
            <p className="services-details-description">
              {service.description}
            </p>
          )}

          {service.details.length > 0 && (
            <ul>
              {service.details.map((detail) => (
                <li key={detail}>
                  <Check size={16} aria-hidden="true" />
                  {detail}
                </li>
              ))}
            </ul>
          )}

          {service.price && (
            <div className="services-details-card-footer">
              <p className="services-details-price">{service.price}</p>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}