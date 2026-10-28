import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* Spalte 1: Marke, Beschreibung und soziale Netzwerke */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <Image
              src="/img/woodenza.svg"
              alt="Holzvanta"
              width={130}
              height={45}
            />
          </div>
          <p className="footer-description">
            Ausgewähltes Brennholz und Brennstoffe für effizientes und verantwortungsvolles Heizen.
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
              <Link href="/shop">Brennholz</Link>
            </li>
            <li>
              <Link href="/shop">Pellets</Link>
            </li>
            <li>
              <Link href="/shop">Holzbriketts</Link>
            </li>
            <li>
              <Link href="/shop">Gepresstes Brennholz</Link>
            </li>
            <li>
              <Link href="/shop">Kaminöfen</Link>
            </li>
          </ul>
        </div>

        {/* Spalte 3: Informationen */}
        <div className="footer-col">
          <h4 className="footer-heading">INFORMATIONEN</h4>
          <ul className="footer-links-list">
            <li>
              <Link href="/versand-und-ruecksendung">Versand und Rücksendung</Link>
            </li>
            <li>
              <Link href="/kontakt">Zahlungsinformationen</Link>
            </li>
            <li>
              <Link href="/agb">
                Allgemeine Geschäftsbedingungen
              </Link>
            </li>
            <li>
              <Link href="/datenschutz">
                Datenschutzbestimmungen
              </Link>
            </li>
            <li>
              <Link href="/impressum">Impressum</Link>
            </li>
          </ul>
        </div>

        {/* Spalte 4: Hilfe */}
        <div className="footer-col">
          <h4 className="footer-heading">HILFE</h4>
          <ul className="footer-links-list">
            <li>
              <Link href="/kontakt">Häufig gestellte Fragen</Link>
            </li>
            <li>
              <Link href="/kontakt">Kontakt</Link>
            </li>
          </ul>
        </div>

        {/* Spalte 5: Kontakt */}
        <div className="footer-col contact-col"> 
          <h4 className="footer-heading">KONTAKT</h4>
          <ul className="contact-info-list">
            <li>
              <i className="fa-solid fa-location-dot"></i>
              <span> Hauptstraße 45, 10117 Berlin, DEUTSCHLAND</span>
            </li>
            <li>
              <i className="fa-solid fa-phone"></i>
              <a href="tel:+493012345678">+49 30 123 456 78</a>
            </li>
            <li>
              <i className="fa-solid fa-envelope"></i>
              <a href="mailto:info@holzvanta.de">info@holzvanta.de</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Fußzeile unten: Copyright und Zahlungsmethoden */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="copyright-text">
            © 2026 Holzvanta. Alle Rechte vorbehalten.
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