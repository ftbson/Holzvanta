import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Seite nicht gefunden | Woodenza",
  description:
    "Die gesuchte Seite ist nicht verfügbar. Kehren Sie zur Woodenza-Startseite zurück oder entdecken Sie unser Sortiment an Brennholz, Pellets und Öfen.",
};

export default function NotFound() {
  return (
    <main className="legal-page">
      <div className="legal-container">
        <span className="section-subtitle">Woodenza</span>
        <h1 className="legal-title">Diese Seite wurde nicht gefunden</h1>
        <p className="legal-intro">
          Möglicherweise wurde die Adresse geändert oder der Inhalt ist nicht mehr verfügbar.
        </p>
        <Link href="/" className="about-link-btn">
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
