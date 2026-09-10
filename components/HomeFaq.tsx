"use client";

import { useState } from "react";

type FaqItem = {
  id?: string;
  question: string;
  answer: string;
};

export function HomeFaq({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(faqs.length ? 0 : null);

  return (
    <div className="v14-faq-list">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const answerId = `home-faq-answer-${index}`;

        return (
          <article
            className={`v14-faq-item${isOpen ? " is-open" : ""}`}
            key={faq.id || `${faq.question}-${index}`}
          >
            <button
              type="button"
              className="v14-faq-question"
              aria-expanded={isOpen}
              aria-controls={answerId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{faq.question}</strong>
              <b aria-hidden="true">+</b>
            </button>
            <div className="v14-faq-answer" id={answerId} aria-hidden={!isOpen}>
              <div className="v14-faq-answer-inner">
                <p>{faq.answer}</p>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
