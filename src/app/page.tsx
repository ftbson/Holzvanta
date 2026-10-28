"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import BestSellers from "@/components/BestSellers";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Poele from "@/components/Poele";

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main>
      {/* 1. Haupt-Karussell / Hero */}
      <Hero />

      {/* 2. Kategorien */}

      {/* 3. Bestseller-Produkte */}
      <BestSellers />

      <Poele />
      <Categories />

      {/* 4. Warum Holzvanta */}
      <WhyUs />

      {/* 5. Saisonale Aktion */}

      <section className="promo-banner-section">
        <div className="promo-banner-container">
          <div className="promo-banner-content">
            {/* Rabatt */}
            <div className="promo-badge">
              <i className="fa-solid fa-bolt"></i>
              <span>-50%</span>
            </div>

            {/* Titel */}
            <h2 className="promo-title">
              Rüsten Sie Ihr Zuhause mit hochwertiger Heizung aus und sparen Sie bis zu 50 %
            </h2>

            {/* Untertitel */}
            <p className="promo-subtitle">
              Saisonale Aktion gültig solange der Vorrat reicht.
            </p>
          </div>

          {/* Call to Action */}
          <Link href="/boutique" className="promo-btn">
            <span>Angebote entdecken</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </section>

      {/* 6. Bewertungen */}
      <Testimonials />

      {/* 7. Nach oben */}

      <section className="scroll-top-section">
        {/* Fester Button zum Nach-oben-Scrollen */}
        <button
          onClick={scrollToTop}
          className="scroll-top-btn-fixed"
          aria-label="Nach oben scrollen"
        >
          <i className="fa-solid fa-arrow-up"></i>
          {/* <span>Nach oben</span> */}
        </button>
      </section>
    </main>
  );
}