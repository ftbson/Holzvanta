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
      {/* 1. Hauptkarussell */}
      <Hero />

      {/* 2. Kategorien */}

      {/* 3. Bestseller */}
      <BestSellers />

      <Poele />
      <Categories />

      {/* 4. Warum holzvanta */}
      <WhyUs />

      {/* 5. Saisonangebot */}

      <section className="promo-banner-section">
        <div className="promo-banner-container">
          <div className="promo-banner-content">
            {/* Descuento */}
            <div className="promo-badge">
              <i className="fa-solid fa-bolt"></i>
              <span>-50%</span>
            </div>

            {/* Título */}
            <h2 className="promo-title">
              Heizen Sie Ihr Zuhause hochwertig und sparen Sie bis zu 50 %
            </h2>

            {/* Subtítulo */}
            <p className="promo-subtitle">
              Saisonangebot, solange der Vorrat reicht.
            </p>
          </div>

          {/* Llamada a la acción */}
          <Link href="/boutique" className="promo-btn">
            <span>Angebote entdecken</span>
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </section>
      {/* 6. Kundenstimmen */}
      <Testimonials />

      {/* 7. Zurück nach oben */}

      <section className="scroll-top-section">
        {/* Schaltfläche zum Zurückkehren nach oben */}
        <button
          onClick={scrollToTop}
          className="scroll-top-btn-fixed"
          aria-label="Zum Seitenanfang"
        >
          <i className="fa-solid fa-arrow-up"></i>
          {/* <span>Nach oben</span> */}
        </button>
      </section>
    </main>
  );
}
