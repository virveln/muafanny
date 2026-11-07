
import { Accordion } from "@mantine/core";
import { bridalFaqContent } from "../../data/bridalFaq";
import { Eyebrow } from "../features/Eyebrow";
import "./BridalFAQ.css";

export function BridalFAQ() {
  return (
    <section
      id="faq-brollop"
      className=" bridal-faq section-top "
      aria-labelledby="bridal-faq-title"
    >
      <div className="page-heading">
        <Eyebrow>{bridalFaqContent.eyebrow}</Eyebrow>
        <h2 id="bridal-faq-title">{bridalFaqContent.heading}</h2>
        <p>{bridalFaqContent.description}</p>
      </div>

      <Accordion
        className="bridal-faq__list"
        variant="default"
        chevronPosition="right"
        transitionDuration={200}
        radius={0}
        multiple
      >
        {bridalFaqContent.questions.map((item, index) => (
          <Accordion.Item
            key={item.question}
            value={item.question}
            className="bridal-faq__item"
          >
            <Accordion.Control>
              <span className="bridal-faq__question-row">
                <span className="bridal-faq__number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="bridal-faq__question">
                  {item.question}
                </span>
              </span>
            </Accordion.Control>

            <Accordion.Panel>
              <div className="bridal-faq__answer">
                {item.answer.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}

                {item.tips && (
                  <ul className="bridal-faq__tips">
                    {item.tips.map((tip) => (
                      <li key={tip.title}>
                        <strong>{tip.title}:</strong>{" "}
                        {tip.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
}
