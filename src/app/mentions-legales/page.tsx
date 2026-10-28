export default function LegalNoticePage() {
  return (
    <article className="legal-page">
      <div className="legal-container">
        <span className="section-subtitle">Veröffentlichungsdaten</span>
        <h1 className="legal-title">Impressum</h1>
        <p className="legal-intro">
          Dieser Bereich enthält die Identifikationsinformationen und Nutzungsbedingungen
          des Online-Shops.
        </p>

        <section className="legal-section">
          <h2>Herausgeber und Verantwortlicher für die Website</h2>
          <p>
            Holzvanta
            <br />
            Adresse: Deutschland
            <br />
            E-Mail: info@holzvanta.de
            <br />
            Telefon: +49 800 123 4567
          </p>
          <p>
            Vor der endgültigen Veröffentlichung muss der Verantwortliche
            die Rechtsform des Unternehmens, seine Registernummer und ggf.
            die Umsatzsteuer-Identifikationsnummer hinzufügen.
          </p>
        </section>
        
        <section className="legal-section">
          <h2>Hosting-Anbieter</h2>
          <p>
            Der Verantwortliche muss den Namen und den eingetragenen Sitz des
            Anbieters angeben, der diese Website hostet, unter Verwendung der
            von diesem bereitgestellten Daten.
          </p>
        </section>

        <section className="legal-section">
          <h2>Urheberrecht und geistiges Eigentum</h2>
          <p>
            Die Texte, Bilder, Marken, Logos und sonstigen Inhalte dieser Website
            sind durch das Urheberrecht geschützt. Jegliche Vervielfältigung oder
            Nutzung ohne Genehmigung ist nicht gestattet.
          </p>
        </section>

        <section className="legal-section">
          <h2>Verfügbarkeit und Haftung</h2>
          <p>
            Holzvanta bemüht sich sicherzustellen, dass die veröffentlichten
            Informationen korrekt und aktuell sind, jedoch kann es zu Fehlern
            oder vorübergehenden Dienstunterbrechungen kommen. Das Vorhandensein
            externer Links bedeutet nicht, dass wir die Inhalte Dritter unterstützen.
          </p>
        </section>

        <p className="legal-updated">
          Letzte Aktualisierung: 17. September 2026
        </p>
      </div>
    </article>
  );
}