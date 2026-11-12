import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Spalte 1: Marke, Beschreibung und soziale Medien */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <Image
              src="/img/woodenza.svg"
              alt="Woodenza"
              width={130}
              height={45}
            />
          </div>
          <p className="footer-description">
            Ausgewähltes Brennholz und Brennstoffe für effizientes und
            verantwortungsbewusstes Heizen.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook" className="social-icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Instagram" className="social-icon">
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>

        {/* Spalte 2: Produkte */}
        <div className="footer-col">
          <h4 className="footer-heading">PRODUKTE</h4>
          <ul className="footer-links-list">
            <li>
              <Link href="/boutique">Brennholz</Link>
            </li>
            <li>
              <Link href="/boutique">Pellets</Link>
            </li>
            <li>
              <Link href="/boutique">Holzbriketts</Link>
            </li>
            <li>
              <Link href="/boutique">Holzpresslinge</Link>
            </li>
            <li>
              <Link href="/boutique">Kaminöfen</Link>
            </li>
          </ul>
        </div>

        {/* Spalte 3: Informationen */}
        <div className="footer-col">
          <h4 className="footer-heading">INFORMATIONEN</h4>
          <ul className="footer-links-list">
            <li>
              <Link href="/livraison-et-retours">
                Versand und Rücksendungen
              </Link>
            </li>
            <li>
              <Link href="/contact">Fragen zur Zahlung</Link>
            </li>
            <li>
              <Link href="/termes-et-conditions">
                Allgemeine Geschäftsbedingungen
              </Link>
            </li>
            <li>
              <Link href="/politique-de-confidentialite">
                Datenschutzerklärung
              </Link>
            </li>
            <li>
              <Link href="/mentions-legales">Impressum</Link>
            </li>
          </ul>
        </div>

        {/* Spalte 4: Kundenservice */}
        <div className="footer-col">
          <h4 className="footer-heading">KUNDENSERVICE</h4>
          <ul className="footer-links-list">
            <li>
              <Link href="/contact">Häufige Fragen</Link>
            </li>
            <li>
              <Link href="/contact">Kontakt</Link>
            </li>
          </ul>
        </div>

        {/* Spalte 5: Kontakt */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">KONTAKT</h4>
          <ul className="contact-info-list">
            <li>
              <i className="fa-solid fa-location-dot"></i>
              <span>
                {" "}
                Avenida de la Constitución, 344 08860 Castelldefels, Deutschland
              </span>
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              <a href="tel:+34727745478">+34 727 74 54 78</a>
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:info@woodenza.es">info@woodenza.es</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Fußzeile: Urheberrecht und Zahlungsmethoden */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © 2026 Woodenza. Alle Rechte vorbehalten.
          </p>
          <div className="payment-icons">
            <span className="payment-card">VISA</span>
            <span className="payment-card">
              <i className="fa-brands fa-cc-mastercard"></i>
            </span>
            <span className="payment-card amex">AM EX</span>
            <span className="payment-card paypal">PayPal</span>
            <span className="payment-card applepay">
              <i className="fa-brands fa-apple-pay"></i> Pay
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
