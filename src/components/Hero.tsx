"use client";

import { useState } from "react";
import Link from "next/link";

interface FeatureCard {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  badgeText?: string;
  badgeIcon?: string;
}

const cardsData: FeatureCard[] = [
  {
    id: 1,
    title: "98 % Kundenzufriedenheit",
    subtitle: "Qualität und Service in Deutschland",
    image: "/img/hero-1.jpeg",
    badgeText: "< 18 % Feuchtigkeit",
  },
  {
    id: 2,
    title: "Premium Brennholz",
    subtitle: "Ofentrocken für maximale Effizienz",
    image: "/img/hero-2.jpeg",
    badgeText: "Hohe Effizienz",
  },
  {
    id: 3,
    title: "Schneller Versand",
    subtitle: "Direkte Lieferung in 24h bis 72h",
    image: "/img/hero-3.jpeg",
    badgeText: "Deutschlandweit",
  },
];

export default function Hero() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="hero-modern-section">
      {/* Dekorative Hintergrundelemente / Subtiles Raster */}
      <div className="hero-bg-grid" />

      {/* Stilisierte schwebende Badges */}
      <div className="floating-badge badge-top-left">
        <div className="badge-avatar-group">
          <i className="fa-solid fa-fire text-amber-500"></i>
        </div>
        <div>
          <strong className="badge-title">100+</strong>
          <span className="badge-sub">Bestellungen heute</span>
        </div>
      </div>

      <div className="floating-badge badge-top-right">
        <div className="badge-icon-box">
          <i className="fa-solid fa-truck-fast"></i>
        </div>
        <div>
          <strong className="badge-title">Express-Versand</strong>
          <span className="badge-sub">24h - 72h</span>
        </div>
      </div>

      <div className="hero-container">
        {/* --- OBERER BEREICH: ZENTRIERTER TEXTINHALT --- */}
        <div className="hero-header-content">
          {/* Bewertungs- / Reputations-Tag */}
          <div className="hero-reviews-tag">
            <div className="avatar-stack">
              <span className="avatar">🔥</span>
              <span className="avatar">🌲</span>
              <span className="avatar">📦</span>
            </div>
            <span className="reviews-text">
              +1.200 zufriedene Kunden in Deutschland
            </span>
          </div>

          {/* Haupttitel */}
          <h1 className="hero-main-title">
            Natürliche Wärme, <br />
            <span>garantierte Effizienz.</span>
          </h1>

          {/* Beschreibung */}
          <p className="hero-main-description">
            HOLZVANTA bietet Ihnen hochwertiges Brennholz und Pellets, ofentrocken und sofort einsatzbereit. Schnelle Lieferung direkt zu Ihnen nach Hause.
          </p>

          {/* CTA-Buttons */}
          <div className="hero-cta-group">
            <Link href="/shop" className="btn-modern-primary">
              <span>KATALOG DURCHSTÖBERN</span>
              <div className="btn-arrow-circle">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </Link>
            <Link href="#categories" className="btn-modern-secondary">
              Kategorien ansehen
            </Link>
          </div>
        </div>

        {/* --- UNTERER BEREICH: BILDER- / KARTEN-GRID --- */}
        <div className="hero-cards-grid">
          {cardsData.map((card) => (
            <div
              key={card.id}
              className={`hero-card-item ${
                activeCard === card.id ? "is-hovered" : ""
              }`}
              onMouseEnter={() => setActiveCard(card.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Hintergrundbild der Karte */}
              <div
                className="card-image-bg"
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <div className="card-gradient-overlay" />

              {/* Oberes Badge auf der Karte */}
              {card.badgeText && (
                <div className="card-top-tag">{card.badgeText}</div>
              )}

              {/* Unterer Inhalt der Karte */}
              <div className="card-bottom-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-subtitle">{card.subtitle}</p>
              </div>

              {/* Interaktiver Aktions-Button beim Hover */}
              <div className="card-action-btn">
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}