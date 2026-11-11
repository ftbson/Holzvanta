import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns | Woodenza – Heizen mit Holz in Spanien",
  description:
    "Lernen Sie Woodenza kennen: ausgewähltes Brennholz, Pellets, Holzbriketts und Öfen – mit Beratung und Lieferung in Spanien.",
};

export default function AboutPage() {
  return (
    <div className="about-page">
      {/* ABSCHNITT 1: UNSERE MISSION */}
      <section className="about-intro-section">
        <div className="about-container">
          <div className="about-grid-3">
            {/* Bereich 1: unsere Mission */}
            <div className="about-col">
              <span className="about-subtitle-tag">Lernen Sie Woodenza kennen</span>
              <h1 className="about-col-title">Wohlige Wärme – bewusst gewählt</h1>
              <p className="about-text">
                Bei Woodenza möchten wir Ihnen eine praktische, erschwingliche
                und umweltbewusstere Möglichkeit bieten, Ihr Zuhause mit Holz
                zu heizen. Wir wählen hochwertige Brennstoffe aus
                verantwortungsvollen Quellen aus – für zuverlässige Leistung
                und angenehme Wärme im Alltag.
              </p>
            </div>

            {/* Bereich 2: Erfahrung */}
            <div className="about-col flex-between">
              <div>
                <h3 className="about-col-h3">
                  Unsere Erfahrung mit Heizlösungen gibt Ihnen Sicherheit bei
                  der Auswahl.
                </h3>
                <p className="about-text">
                  Seit Jahren vertreiben wir Brennholz und helfen Haushalten
                  und Unternehmen, passende Heizlösungen zu finden.
                </p>
              </div>
              <Link href="/boutique" className="about-link-btn">
                SORTIMENT ENTDECKEN
              </Link>
            </div>

            {/* Bereich 3: Produktauswahl */}
            <div className="about-col flex-between">
              <div>
                <h3 className="about-col-h3">
                  Produkte, ausgewählt nach Qualität und Leistung
                </h3>
                <p className="about-text">
                  In unserem Sortiment finden Sie Brennholz, Buchenbriketts,
                  Pellets, Holzpresslinge und Kaminöfen – ausgewählt für
                  zuverlässige Nutzung und gute Leistung.
                </p>
              </div>
              <Link href="/boutique" className="about-link-btn">
                PRODUKTE ENTDECKEN
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABSCHNITT 2: IHRE WAHL MIT WOODENZA */}
      <section className="about-feature-section">
        <div className="about-container">
          <div className="about-feature-grid">
            {/* Lagerbild */}
            <div className="about-image-wrapper">
              <Image
                src="/img/about.jpeg"
                alt="Brennholzlager von Woodenza"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="about-img"
                priority
              />
            </div>

            {/* Textinhalt */}
            <div className="about-feature-content">
              <span className="about-subtitle-tag">
                Ihr Fachhandel für Brennholz und Heizung
              </span>
              <h2 className="about-main-title">
                Das finden Sie bei Woodenza
              </h2>

              <p className="about-highlight-text">
                Ausgewählte Brennstoffe, zuverlässige Leistung und persönliche
                Beratung – damit Sie die passende Lösung für Ihr Zuhause
                finden.
              </p>

              <p className="about-text">
                Qualität bestimmt unsere Auswahl. Wir arbeiten mit Partnern,
                die eine verantwortungsvolle Forstwirtschaft unterstützen,
                und bieten Brennstoffe mit hohem Heizwert, geringer
                Restfeuchte und gleichbleibenden Eigenschaften.
              </p>

              <p className="about-text">
                Wir suchen Produkte, die effizient verbrennen und gleichmäßige
                Wärme liefern. Bei jeder Auswahl berücksichtigen wir Ihren
                Heizbedarf das ganze Jahr über.
              </p>

              {/* Soziale Medien */}
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
