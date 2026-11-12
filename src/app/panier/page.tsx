"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format-price";

type Customer = {
  firstName: string;
  lastName: string;
  country: string;
  streetAddress: string;
  whatsapp: string;
  email: string;
};

type BizumDetails = {
  enabled: boolean;
  recipientName?: string;
  phoneNumber?: string;
};

type BankTransferDetails = {
  enabled: boolean;
  accountName?: string;
  iban?: string;
  bic?: string;
};

type PaymentMethod = "stripe" | "bizum" | "bank_transfer";

const emptyCustomer: Customer = {
  firstName: "",
  lastName: "",
  country: "Deutschland",
  streetAddress: "",
  whatsapp: "",
  email: "",
};

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal, clearCart } =
    useCart();
  const [customer, setCustomer] = useState<Customer>(emptyCustomer);
  const [bizumDetails, setBizumDetails] = useState<BizumDetails | null>(null);
  const [bankTransferDetails, setBankTransferDetails] =
    useState<BankTransferDetails | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const shippingCost = subtotal > 150 || cart.length === 0 ? 0 : 15;
  const grandTotal = subtotal + shippingCost;

  useEffect(() => {
    fetch("/api/bizum")
      .then(async (response) => {
        if (!response.ok)
          throw new Error(
            "Die Verfügbarkeit von Bizum konnte nicht abgerufen werden.",
          );
        setBizumDetails(await response.json());
      })
      .catch(() => setBizumDetails({ enabled: false }));

    fetch("/api/bank-transfer")
      .then(async (response) => {
        if (!response.ok)
          throw new Error("Die Bankverbindung konnte nicht abgerufen werden.");
        setBankTransferDetails(await response.json());
      })
      .catch(() => setBankTransferDetails({ enabled: false }));
  }, []);

  const updateCustomer = (field: keyof Customer, value: string) =>
    setCustomer((current) => ({ ...current, [field]: value }));

  const checkout = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const checkoutRoutes: Record<PaymentMethod, string> = {
        stripe: "/api/checkout/stripe",
        bizum: "/api/checkout/bizum",
        bank_transfer: "/api/checkout/bank-transfer",
      };
      const response = await fetch(checkoutRoutes[paymentMethod], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items: cart.map(({ id, quantity }) => ({ id, quantity })),
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(
          data.error || "Ihre Bestellung konnte nicht abgeschlossen werden.",
        );
      if (paymentMethod === "stripe") {
        if (!data.url)
          throw new Error(
            "Der Link zur Fortsetzung der Zahlung wurde nicht empfangen.",
          );
        window.location.assign(data.url);
        return;
      }

      if (paymentMethod === "bizum") {
        setMessage(
          `Ihre Bestellung ${data.orderId} wurde registriert. Bitte überweisen Sie ${formatPrice(data.grandTotal)} per Bizum an ${data.bizumDetails.phoneNumber} (Empfänger: ${data.bizumDetails.recipientName}).`,
        );
      } else {
        const { accountName, iban, bic } = data.bankDetails;
        const details = [
          accountName && `Kontoinhaber: ${accountName}`,
          iban && `IBAN: ${iban}`,
          bic && `BIC: ${bic}`,
        ]
          .filter(Boolean)
          .join(" | ");
        setMessage(
          `Ihre Bestellung ${data.orderId} wurde registriert. Bitte überweisen Sie ${formatPrice(data.grandTotal)}${details ? ` an ${details}` : ". Kontaktieren Sie uns, um die Bankverbindung zu erhalten"}. Geben Sie dabei diese Bestellnummer an: ${data.orderId}.`,
        );
      }
      clearCart();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Ihre Bestellung konnte nicht abgeschlossen werden.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="cart-page">
      <div className="cart-container">
        <h1 className="cart-page-title">Ihr Warenkorb</h1>
        {cart.length === 0 ? (
          <div className="empty-cart">
            {message && <p className="checkout-message">{message}</p>}
            <i className="fa-solid fa-basket-shopping empty-icon"></i>
            <h2>Ihr Warenkorb ist noch leer</h2>
            <p>
              Entdecken Sie unser Sortiment an Brennholz, Pellets und Öfen für
              Ihr Zuhause.
            </p>
            <Link href="/boutique" className="btn-primary-cart">
              Zum Sortiment
            </Link>
          </div>
        ) : (
          <form className="cart-layout" onSubmit={checkout}>
            <div className="cart-items-section">
              <div className="cart-items-header">
                <span>Artikel</span>
                <span>Stückpreis</span>
                <span>Menge</span>
                <span>Gesamt</span>
                <span></span>
              </div>
              {cart.map((item) => (
                <div key={item.id} className="cart-item-row">
                  <div className="cart-item-info">
                    <div className="cart-item-image">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <p className="cart-item-category">{item.category}</p>
                      <h4 className="cart-item-title">{item.title}</h4>
                    </div>
                  </div>
                  <div className="cart-item-price">
                    {formatPrice(item.price)}
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`${item.title} aus dem Warenkorb entfernen`}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
              <div className="cart-actions-bottom">
                <button type="button" className="btn-clear" onClick={clearCart}>
                  Alle Artikel entfernen
                </button>
                <Link href="/boutique" className="btn-continue">
                  <i className="fa-solid fa-arrow-left"></i> Weiter einkaufen
                </Link>
              </div>
              <section className="checkout-customer">
                <h2>Lieferdaten</h2>
                <div className="checkout-fields">
                  {(
                    [
                      ["firstName", "Vorname"],
                      ["lastName", "Nachname"],
                      ["email", "E-Mail-Adresse"],
                      ["whatsapp", "Telefon oder WhatsApp"],
                      ["streetAddress", "Lieferadresse"],
                      ["country", "Lieferland"],
                    ] as [keyof Customer, string][]
                  ).map(([field, label]) => (
                    <label key={field}>
                      {label}
                      <input
                        required
                        type={field === "email" ? "email" : "text"}
                        value={customer[field]}
                        onChange={(event) =>
                          updateCustomer(field, event.target.value)
                        }
                      />
                    </label>
                  ))}
                </div>
              </section>
            </div>
            <div className="cart-summary-card">
              <h3>Bestellübersicht</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Versandkosten</span>
                <span>
                  {shippingCost === 0 ? "Kostenlos" : formatPrice(shippingCost)}
                </span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Gesamtbetrag (inkl. Steuern)</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
              <div className="payment-options">
                <label>
                  <input
                    type="radio"
                    name="payment-method"
                    value="stripe"
                    checked={paymentMethod === "stripe"}
                    onChange={() => setPaymentMethod("stripe")}
                  />
                  Kreditkarte
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment-method"
                    value="bizum"
                    checked={paymentMethod === "bizum"}
                    disabled={!bizumDetails?.enabled}
                    onChange={() => setPaymentMethod("bizum")}
                  />
                  Bizum
                  {!bizumDetails?.enabled && " (derzeit nicht verfügbar)"}
                </label>
                <label>
                  <input
                    type="radio"
                    name="payment-method"
                    value="bank_transfer"
                    checked={paymentMethod === "bank_transfer"}
                    disabled={!bankTransferDetails?.enabled}
                    onChange={() => setPaymentMethod("bank_transfer")}
                  />
                  Banküberweisung
                  {!bankTransferDetails?.enabled &&
                    " (derzeit nicht verfügbar)"}
                </label>
              </div>
              {paymentMethod === "bizum" && bizumDetails?.enabled ? (
                <div className="bank-transfer-details" role="status">
                  <strong>Bizum-Daten</strong>
                  {bizumDetails.recipientName && (
                    <p>
                      <span>Empfänger</span> {bizumDetails.recipientName}
                    </p>
                  )}
                  {bizumDetails.phoneNumber && (
                    <p>
                      <span>Nummer</span> {bizumDetails.phoneNumber}
                    </p>
                  )}
                  <p className="bank-transfer-reference">
                    Schließen Sie die Zahlung über Bizum ab. Die Bestellung
                    bleibt bis zur Überprüfung ausstehend.
                  </p>
                </div>
              ) : paymentMethod === "bizum" ? (
                <p className="checkout-message">
                  {bizumDetails === null
                    ? "Bizum-Daten werden abgerufen ..."
                    : "Bizum ist noch nicht eingerichtet. Kontaktieren Sie uns, wenn Sie mit dieser Methode bestellen möchten."}
                </p>
              ) : paymentMethod === "bank_transfer" &&
                bankTransferDetails?.enabled ? (
                <div className="bank-transfer-details" role="status">
                  <strong>Bankverbindung</strong>
                  {bankTransferDetails.accountName && (
                    <p>
                      <span>Kontoinhaber</span>{" "}
                      {bankTransferDetails.accountName}
                    </p>
                  )}
                  {bankTransferDetails.iban && (
                    <p>
                      <span>IBAN</span> {bankTransferDetails.iban}
                    </p>
                  )}
                  {bankTransferDetails.bic && (
                    <p>
                      <span>BIC</span> {bankTransferDetails.bic}
                    </p>
                  )}
                  <p className="bank-transfer-reference">
                    Geben Sie bei der Überweisung die Bestellnummer an. Ihre
                    Bestellung wird bearbeitet, sobald die Zahlung eingegangen
                    ist.
                  </p>
                </div>
              ) : paymentMethod === "bank_transfer" ? (
                <p className="checkout-message">
                  {bankTransferDetails === null
                    ? "Bankverbindung wird abgerufen ..."
                    : "Die Banküberweisung ist noch nicht eingerichtet. Kontaktieren Sie uns, um Ihre Bestellung abzuschließen."}
                </p>
              ) : null}
              {message && <p className="checkout-message">{message}</p>}
              <button
                className="btn-checkout"
                type="submit"
                disabled={
                  loading ||
                  (paymentMethod === "bizum" && !bizumDetails?.enabled) ||
                  (paymentMethod === "bank_transfer" &&
                    !bankTransferDetails?.enabled)
                }
              >
                {loading
                  ? "Wird bearbeitet ..."
                  : `Bestellung aufgeben mit ${
                      paymentMethod === "stripe"
                        ? "Stripe"
                        : paymentMethod === "bizum"
                          ? "Bizum"
                          : "Banküberweisung"
                    }`}
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
