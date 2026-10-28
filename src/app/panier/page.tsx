"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

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
            "No ha sido posible consultar la disponibilidad de Bizum.",
          );
        setBizumDetails(await response.json());
      })
      .catch(() => setBizumDetails({ enabled: false }));

    fetch("/api/bank-transfer")
      .then(async (response) => {
        if (!response.ok)
          throw new Error("No ha sido posible consultar los datos bancarios.");
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
        throw new Error(data.error || "No se pudo completar el pedido.");
      if (paymentMethod === "stripe") {
        if (!data.url)
          throw new Error(
            "No se recibió el enlace para continuar con el pago.",
          );
        window.location.assign(data.url);
        return;
      }

      if (paymentMethod === "bizum") {
        setMessage(
          `Hemos registrado el pedido ${data.orderId}. Envía ${data.grandTotal.toFixed(2)} € por Bizum al ${data.bizumDetails.phoneNumber}, a nombre de ${data.bizumDetails.recipientName}.`,
        );
      } else {
        const { accountName, iban, bic } = data.bankDetails;
        const details = [
          accountName && `titular: ${accountName}`,
          iban && `IBAN: ${iban}`,
          bic && `BIC: ${bic}`,
        ]
          .filter(Boolean)
          .join(" | ");
        setMessage(
          `Hemos registrado el pedido ${data.orderId}. Transfiere ${data.grandTotal.toFixed(2)} €${details ? ` a ${details}` : ". Contacta con nosotros para solicitar los datos bancarios"}. Incluye esta referencia: ${data.orderId}.`,
        );
      }
      clearCart();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "No se pudo completar el pedido.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="cart-page">
      <div className="cart-container">
        <h1 className="cart-page-title">Tu cesta</h1>
        {cart.length === 0 ? (
          <div className="empty-cart">
            {message && <p className="checkout-message">{message}</p>}
            <i className="fa-solid fa-basket-shopping empty-icon"></i>
            <h2>Aún no has añadido productos</h2>
            <p>
              Explora el catálogo y encuentra leña, pellets o una estufa para tu
              hogar.
            </p>
            <Link href="/boutique" className="btn-primary-cart">
              Ir al catálogo
            </Link>
          </div>
        ) : (
          <form className="cart-layout" onSubmit={checkout}>
            <div className="cart-items-section">
              <div className="cart-items-header">
                <span>Artículo</span>
                <span>Precio unitario</span>
                <span>Unidades</span>
                <span>Importe</span>
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
                    {item.price.toFixed(2).replace(".", ",")} €
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
                    {(item.price * item.quantity).toFixed(2).replace(".", ",")}{" "}
                    €
                  </div>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Quitar ${item.title} de la cesta`}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </div>
              ))}
              <div className="cart-actions-bottom">
                <button type="button" className="btn-clear" onClick={clearCart}>
                  Eliminar todos los artículos
                </button>
                <Link href="/boutique" className="btn-continue">
                  <i className="fa-solid fa-arrow-left"></i> Volver al catálogo
                </Link>
              </div>
              <section className="checkout-customer">
                <h2>Datos para la entrega</h2>
                <div className="checkout-fields">
                  {(
                    [
                      ["firstName", "Nombre"],
                      ["lastName", "Apellidos"],
                      ["email", "Correo electrónico"],
                      ["whatsapp", "Teléfono o WhatsApp"],
                      ["streetAddress", "Dirección donde recibir el pedido"],
                      ["country", "País de entrega"],
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
              <h3>Detalle de la compra</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2).replace(".", ",")} €</span>
              </div>
              <div className="summary-row">
                <span>Coste de envío</span>
                <span>
                  {shippingCost === 0
                    ? "Sin coste"
                    : `${shippingCost.toFixed(2).replace(".", ",")} €`}
                </span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total a pagar (impuestos incluidos)</span>
                <span>{grandTotal.toFixed(2).replace(".", ",")} €</span>
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
                  Tarjeta bancaria
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
                  {!bizumDetails?.enabled && " (temporalmente no disponible)"}
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
                  Transferencia bancaria
                  {!bankTransferDetails?.enabled &&
                    " (temporalmente no disponible)"}
                </label>
              </div>
              {paymentMethod === "bizum" && bizumDetails?.enabled ? (
                <div className="bank-transfer-details" role="status">
                  <strong>Datos de Bizum</strong>
                  {bizumDetails.recipientName && (
                    <p>
                      <span>Beneficiario</span> {bizumDetails.recipientName}
                    </p>
                  )}
                  {bizumDetails.phoneNumber && (
                    <p>
                      <span>Número</span> {bizumDetails.phoneNumber}
                    </p>
                  )}
                  <p className="bank-transfer-reference">
                    Completa el pago desde Bizum. El pedido quedará pendiente de
                    verificación.
                  </p>
                </div>
              ) : paymentMethod === "bizum" ? (
                <p className="checkout-message">
                  {bizumDetails === null
                    ? "Consultando los datos de Bizum..."
                    : "Bizum todavía no está configurado. Contacta con nosotros si quieres completar el pedido con este método."}
                </p>
              ) : paymentMethod === "bank_transfer" &&
                bankTransferDetails?.enabled ? (
                <div className="bank-transfer-details" role="status">
                  <strong>Datos bancarios</strong>
                  {bankTransferDetails.accountName && (
                    <p>
                      <span>Beneficiario</span>{" "}
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
                    Incluye la referencia del pedido en la transferencia. La
                    compra se tramitará cuando recibamos los fondos.
                  </p>
                </div>
              ) : paymentMethod === "bank_transfer" ? (
                <p className="checkout-message">
                  {bankTransferDetails === null
                    ? "Consultando los datos bancarios..."
                    : "El pago por transferencia todavía no está configurado. Contacta con nosotros para completar el pedido."}
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
                  ? "Tramitando..."
                  : `Confirmar pedido con ${
                      paymentMethod === "stripe"
                        ? "Stripe"
                        : paymentMethod === "bizum"
                          ? "Bizum"
                          : "transferencia bancaria"
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
