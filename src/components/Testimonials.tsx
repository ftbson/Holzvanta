"use client";

import { useState } from "react";

interface Testimonial {
  id: number;
  rating: number;
  quote: string;
  initials: string;
  name: string;
  city: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    rating: 5,
    quote:
      "« Die Holzbriketts von Holzvanta brennen extrem gleichmäßig und geben eine herrliche, langanhaltende Wärme ab. Absolut empfehlenswert! »",
    initials: "M",
    name: "Matthias Becker",
    city: "München",
  },
  {
    id: 2,
    rating: 5,
    quote:
      "« Pünktliche Lieferung direkt bis vor die Haustür hier in Berlin. Das Kaminholz ist trocken und sofort einsatzbereit. »",
    initials: "C",
    name: "Claudia Weber",
    city: "Berlin",
  },
  {
    id: 3,
    rating: 5,
    quote:
      "« Hervorragende Pellet-Qualität mit sehr geringer Aschebildung. Der Bestellprozess und der Kundenservice waren erstklassig. »",
    initials: "T",
    name: "Tobias Wagner",
    city: "Hamburg",
  },
  {
    id: 4,
    rating: 5,
    quote:
      "« Unser neuer Kaminofen kam sicher verpackt an und funktioniert perfekt. Vielen Dank an das gesamte Holzvanta-Team für die Beratung! »",
    initials: "S",
    name: "Stefanie Hoffmann",
    city: "Köln",
  },
];

export default function Testimonials() {
  const [activeDot, setActiveDot] = useState(2); // Dritter Indikator standardmäßig aktiv

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        {/* Titel */}
        <div className="testimonials-header">
          <h2 className="testimonials-title">Das sagen unsere Kunden über Holzvanta</h2>
        </div>

        {/* Bewertungen */}
        <div className="testimonials-grid">
          {testimonials.slice(0, 3).map((item) => (
            <div key={item.id} className="testimonial-card">
              {/* Sternebewertung */}
              <div className="testimonial-stars">
                {[...Array(item.rating)].map((_, i) => (
                  <i key={i} className="fa-solid fa-star"></i>
                ))}
              </div>

              {/* Kundenstimme */}
              <p className="testimonial-quote">{item.quote}</p>

              {/* Autor */}
              <div className="testimonial-author">
                <div className="author-avatar">{item.initials}</div>
                <div className="author-info">
                  <h4 className="author-name">{item.name}</h4>
                  <span className="author-city">{item.city}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigationsindikatoren */}
        <div className="testimonials-pagination">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              className={`pagination-dot ${
                activeDot === index ? "active" : ""
              }`}
              onClick={() => setActiveDot(index)}
              aria-label={`Zu Folie ${index + 1} wechseln`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}