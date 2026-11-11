"use client";

import { useState } from "react";

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "Welche Brennholzsorten finde ich im Sortiment?",
      answer:
        "Unser Sortiment umfasst vor allem Harthölzer mit hohem Heizwert wie Eiche, Buche, Hainbuche und Esche. Durch ihre gleichmäßige und lang anhaltende Verbrennung eignen sie sich für Öfen, Kamine und geschlossene Feuerstellen.",
    },
    {
      question: "Kann ich das Brennholz direkt nach der Lieferung verwenden?",
      answer:
        "Ja. Das Brennholz wird kammergetrocknet und hat eine Restfeuchte von weniger als 20 %. Es ist sofort einsatzbereit und ermöglicht eine effiziente Verbrennung mit weniger Rauch.",
    },
    {
      question: "In welchen Längen sind die Holzscheite erhältlich?",
      answer:
        "Wir bieten Holzscheite mit 25 und 33 cm Länge an – gängige Maße, die für viele moderne Öfen und Kamine geeignet sind.",
    },
    {
      question: "Wie werden die Paletten geliefert?",
      answer:
        "Wir liefern die Paletten zu Ihnen nach Hause und stellen sie mit einem Hubwagen so nah wie möglich an dem Ort ab, an dem Sie sie lagern möchten.",
    },
    {
      question: "Wie viel Brennholz benötige ich für die Heizsaison?",
      answer:
        "Wenn Sie den Kamin nur gelegentlich nutzen, reicht meist eine halbe Palette. Ist Brennholz im Winter Ihre Hauptwärmequelle, benötigen Sie je nach Größe des Hauses möglicherweise zwei bis drei Paletten.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-grid">
          {/* LINKE SPALTE: häufige Fragen */}
          <div className="faq-column">
            <span className="section-subtitle">WIR HELFEN IHNEN</span>
            <h2 className="section-title">Häufige Fragen zu Brennholz und Bestellungen</h2>

            <div className="faq-accordion">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${openFaq === index ? "active" : ""}`}
                >
                  <button
                    className="faq-question"
                    onClick={() => toggleFaq(index)}
                  >
                    {faq.question}
                    <i
                      className={`fa-solid fa-chevron-${openFaq === index ? "up" : "down"}`}
                    ></i>
                  </button>
                  <div
                    className="faq-answer-wrapper"
                    style={{
                      maxHeight: openFaq === index ? "200px" : "0",
                      opacity: openFaq === index ? 1 : 0,
                    }}
                  >
                    <p className="faq-answer">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VERTIKALE TRENNLINIE */}
          <div className="vertical-divider"></div>

          {/* RECHTE SPALTE: KONTAKTFORMULAR */}
          <div className="form-column">
            <span className="section-subtitle">BRAUCHEN SIE HILFE?</span>
            <h2 className="section-title">
              Wir beantworten gerne Ihre Fragen zu Produkten, Lieferungen und Bestellungen.
            </h2>

            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              {/* Textfeld */}
              <input
                type="text"
                className="input-full-bordered"
                placeholder=""
              />

              {/* Formularfelder */}
              <div className="input-grid">
                <input
                  type="text"
                  className="input-underline"
                  placeholder="Ihr Name"
                  required
                />
                <input
                  type="email"
                  className="input-underline"
                  placeholder="Ihre E-Mail-Adresse"
                  required
                />
                <input
                  type="tel"
                  className="input-underline"
                  placeholder="Ihre Telefonnummer"
                />
                <input
                  type="text"
                  className="input-underline"
                  placeholder="Grund Ihrer Anfrage"
                />
              </div>

              {/* Nachricht */}
              <textarea
                className="input-underline textarea"
                placeholder="Wie können wir Ihnen helfen?"
                rows={3}
                required
              ></textarea>

              <button type="submit" className="btn-submit-contact">
                ANFRAGE SENDEN
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
