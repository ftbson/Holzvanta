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
    badgeText: "Restfeuchte < 18 %",
  },
  {
    id: 2,
    title: "Premium-holzvanta",
    subtitle: "Kammergetrocknet für höchste Effizienz",
    image: "/img/hero-2.jpeg",
    badgeText: "Alta Eficiencia",
  },
  {
    id: 3,
    title: "Schneller Versand",
    subtitle: "Direktlieferung in 24 bis 72 Stunden",
    image: "/img/hero-3.jpeg",
    badgeText: "Lieferung in ganz Deutschland",
  },
];

export default function Hero() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="hero-modern-section">
      {/* Éléments de fond décoratifs / Grille subtile */}
      <div className="hero-bg-grid" />

      {/* Badges Flottants Stylisés (Inspirés de l'image) */}
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
          <strong className="badge-title">Expressversand</strong>
          <span className="badge-sub">24h - 72h</span>
        </div>
      </div>

      <div className="hero-container">
        {/* --- PARTIE HAUTE : CONTENU TEXTE CENTRÉ --- */}
        <div className="hero-header-content">
          {/* Tag Avis / Réputation */}
          <div className="hero-reviews-tag">
            <div className="avatar-stack">
              <span className="avatar">🔥</span>
              <span className="avatar">🌲</span>
              <span className="avatar">📦</span>
            </div>
            <span className="reviews-text">
              Mehr als 1.200 zufriedene Kunden in Deutschland
            </span>
          </div>

          {/* Titre Principal Épuré */}
          <h1 className="hero-main-title">
            Natürliche Wärme, <br />
            <span>effiziente Leistung.</span>
          </h1>

          {/* Description */}
          <p className="hero-main-description">
            holzvanta bietet Ihnen hochwertiges, kammergetrocknetes und sofort
            einsatzbereites holzvanta und Pellets. Schnell zu Ihnen nach Hause
            geliefert.
          </p>

          {/* Boutons de CTA */}
          <div className="hero-cta-group">
            <Link href="/boutique" className="btn-modern-primary">
              <span>SORTIMENT ENTDECKEN</span>
              <div className="btn-arrow-circle">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </Link>
            <Link href="#categories" className="btn-modern-secondary">
              Kategorien ansehen
            </Link>
          </div>
        </div>

        {/* --- PARTIE BASSE : GRILLE D'IMAGES / CARTES (RESPONSIVE SUR MOBILE) --- */}
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
              {/* Image de fond de la carte */}
              <div
                className="card-image-bg"
                style={{ backgroundImage: `url(${card.image})` }}
              />
              <div className="card-gradient-overlay" />

              {/* Badge supérieur sur la carte */}
              {card.badgeText && (
                <div className="card-top-tag">{card.badgeText}</div>
              )}

              {/* Contenu bas de la carte */}
              <div className="card-bottom-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-subtitle">{card.subtitle}</p>
              </div>

              {/* Petit bouton Play / Action interactif au survol */}
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
