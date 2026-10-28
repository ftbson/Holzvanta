import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns | Holzvanta, Kaminholz und Heizung in Deutschland",
  description:
    "Lernen Sie Holzvanta kennen: eine Auswahl an Brennholz, Pellets, Briketts und Öfen, um Ihr Zuhause mit Beratung und Lieferung in Deutschland zu heizen.",
};

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* SEKTION 1: MISSION UND BEREICHE */}
      <section className="about-intro-section">
        <div className="about-container">
          <div className="about-grid-3">
            {/* Bereich 1: Unsere Mission */}
            <div className="about-col">
              <span className="about-subtitle-tag">Holzvanta kennenlernen</span>
              <h1 className="about-col-title">
                Wohlfühlatmosphäre durch bewusste Holzauswahl
              </h1>
              <p className="about-text">
                Bei Holzvanta möchten wir, dass das Heizen Ihres Hauses mit Holz
                eine praktische, erschwingliche und umweltfreundlichere Option
                wird. Wir wählen Qualitätsbrennstoffe aus verantwortungsvollen
                Quellen aus, um eine zuverlässige Leistung und eine angenehme
                Wärme im Alltag zu bieten.
              </p>
            </div>

            {/* Bereich 2: Erfahrung */}
            <div className="about-col flex-between">
              <div>
                <h3 className="about-col-h3">
                  Erfahrung in der Heizungstechnik, damit Sie beruhigt wählen können.
                </h3>
                <p className="about-text">
                  Wir vertreiben seit Jahren Brennholz und helfen Haushalten und
                  Unternehmen dabei, die passenden Lösungen für ihren
                  Heizbedarf zu finden.
                </p>
              </div>
              <Link href="/boutique" className="about-link-btn">
                KATALOG ENTDECKEN
              </Link>
            </div>

            {/* Bereich 3: Produktauswahl */}
            <div className="about-col flex-between">
              <div>
                <h3 className="about-col-h3">
                  Produkte ausgewählt nach Qualität und Leistung
                </h3>
                <p className="about-text">
                  Im Katalog finden Sie Brennholz, Buchenbriketts, Pellets,
                  Pressholz und Kaminöfen, die für eine zuverlässige Anwendung
                  und gute Leistung ausgewählt wurden.
                </p>
              </div>
              <Link href="/boutique" className="about-link-btn">
                PRODUKTE ERKUNDEN
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEKTION 2: MIT HOLZVANTA WÄHLEN SIE */}
      <section className="about-feature-section">
        <div className="about-container">
          <div className="about-feature-grid">
            {/* Bild des Lagers */}
            <div className="about-image-wrapper">
              <Image
                src="/img/about.jpeg"
                alt="Holzvanta Brennholzlager"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="about-img"
                priority
              />
            </div>

            {/* Textinhalt */}
            <div className="about-feature-content">
              <span className="about-subtitle-tag">
                Ihr Shop für Brennholz und Heizung
              </span>
              <h2 className="about-main-title">
                Was Sie bei Holzvanta finden
              </h2>

              <p className="about-highlight-text">
                Ausgewählte Brennstoffe, zuverlässige Leistung und persönliche
                Betreuung, damit Sie eine auf Ihr Zuhause abgestimmte Lösung
                finden.
              </p>

              <p className="about-text">
                Qualität leitet unsere Auswahl. Wir arbeiten mit Partnern zusammen,
                die eine verantwortungsvolle Forstwirtschaft unterstützen, und
                bieten Brennstoffe mit hohem Heizwert, geringer Restfeuchte und
                konstanten Eigenschaften an.
              </p>

              <p className="about-text">
                Wir suchen nach Produkten, die eine effiziente Verbrennung und eine
                gleichmäßige Wärme gewährleisten. Jedes Referenzprodukt wird mit
                Blick auf den ganzjährigen Heizbedarf ausgewählt.
              </p>

              {/* Soziale Netzwerke / Divider */}
              <div className="about-social-divider">
                <div className="about-social-links"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}