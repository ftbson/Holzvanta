// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import "./admin.css";

interface Order {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  streetAddress: string;
  whatsapp: string;
  email: string;
  subtotal: number;
  shippingCost: number;
  grandTotal: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  stripeSessionId?: string | null;
  createdAt: string;
}

interface BizumSettings {
  recipientName: string;
  phoneNumber: string;
  enabled: boolean;
}

interface AnalyticsSummary {
  totalVisits: number;
  byCountry: { country: string; visits: number }[];
}

interface BankTransferSettings {
  accountName: string;
  iban: string;
  bic: string;
  enabled: boolean;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [bizumSettings, setBizumSettings] = useState<BizumSettings>({
    recipientName: "",
    phoneNumber: "",
    enabled: false,
  });
  const [savingBizum, setSavingBizum] = useState(false);
  const [bizumMessage, setBizumMessage] = useState("");
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [analyticsError, setAnalyticsError] = useState("");
  const [bankTransferSettings, setBankTransferSettings] =
    useState<BankTransferSettings>({
      accountName: "",
      iban: "",
      bic: "",
      enabled: false,
    });
  const [savingBankTransfer, setSavingBankTransfer] = useState(false);
  const [bankTransferMessage, setBankTransferMessage] = useState("");

  useEffect(() => {
    fetch("/api/admin/check")
      .then((response) => {
        if (!response.ok) {
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);
        fetch("/api/orders")
          .then(async (ordersResponse) => {
            if (ordersResponse.ok) setOrders(await ordersResponse.json());
          })
          .catch(() => undefined);
        fetch("/api/admin/bizum")
          .then(async (settingsResponse) => {
            const data = await settingsResponse.json();
            if (!settingsResponse.ok)
              throw new Error(data.error || "Impossible de charger Bizum.");
            setBizumSettings(data);
          })
          .catch((error: unknown) =>
            setBizumMessage(
              error instanceof Error
                ? error.message
                : "Impossible de charger le paramétrage Bizum.",
            ),
          );
        fetch("/api/admin/bank-transfer")
          .then(async (settingsResponse) => {
            if (settingsResponse.ok)
              setBankTransferSettings(await settingsResponse.json());
            else
              setBankTransferMessage(
                "Impossible de charger les coordonnées bancaires.",
              );
          })
          .catch(() =>
            setBankTransferMessage(
              "Impossible de charger les coordonnées bancaires.",
            ),
          );
      })
      .catch(() => setIsAuthenticated(false));
  }, []);

  useEffect(() => {
    if (isAuthenticated !== true) return;

    let active = true;
    const loadAnalytics = async () => {
      try {
        const response = await fetch("/api/analytics", {
          cache: "no-store",
        });
        if (!response.ok)
          throw new Error("Impossible de charger les statistiques de visite.");
        const data: AnalyticsSummary = await response.json();
        if (active) {
          setAnalytics(data);
          setAnalyticsError("");
        }
      } catch (error) {
        if (active)
          setAnalyticsError(
            error instanceof Error
              ? error.message
              : "Impossible de charger les statistiques de visite.",
          );
      }
    };

    void loadAnalytics();
    const interval = window.setInterval(() => void loadAnalytics(), 30_000);
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setIsAuthenticated(true);
        loadOrders();
        loadBizumSettings();
        loadBankTransferSettings();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Échec de la connexion");
      }
    } catch {
      setLoginError("Une erreur est survenue.");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const res = await fetch("/api/orders");
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des commandes :", err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const loadBizumSettings = async () => {
    try {
      const response = await fetch("/api/admin/bizum");
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Impossible de charger le paramétrage Bizum.");
      setBizumSettings(data);
      setBizumMessage("");
    } catch (error) {
      setBizumMessage(
        error instanceof Error
          ? error.message
          : "Impossible de charger le paramétrage Bizum.",
      );
    }
  };

  const loadBankTransferSettings = async () => {
    try {
      const response = await fetch("/api/admin/bank-transfer");
      if (!response.ok)
        throw new Error("Impossible de charger les coordonnées bancaires.");
      setBankTransferSettings(await response.json());
    } catch (error) {
      setBankTransferMessage(
        error instanceof Error
          ? error.message
          : "Impossible de charger les coordonnées bancaires.",
      );
    }
  };

  const saveBankTransferSettings = async (event: React.FormEvent) => {
    event.preventDefault();
    setSavingBankTransfer(true);
    setBankTransferMessage("");
    try {
      const response = await fetch("/api/admin/bank-transfer", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bankTransferSettings),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Enregistrement impossible.");
      setBankTransferSettings(data);
      setBankTransferMessage("Coordonnées bancaires enregistrées.");
    } catch (error) {
      setBankTransferMessage(
        error instanceof Error ? error.message : "Enregistrement impossible.",
      );
    } finally {
      setSavingBankTransfer(false);
    }
  };

  const saveBizumSettings = async (event: React.FormEvent) => {
    event.preventDefault();
    setSavingBizum(true);
    setBizumMessage("");
    try {
      const response = await fetch("/api/admin/bizum", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bizumSettings),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Enregistrement impossible.");
      setBizumSettings(data);
      setBizumMessage("Coordonnées Bizum enregistrées.");
    } catch (error) {
      setBizumMessage(
        error instanceof Error ? error.message : "Enregistrement impossible.",
      );
    } finally {
      setSavingBizum(false);
    }
  };

  if (isAuthenticated === null) {
    return (
      <div className="admin-loading">
        <p>Chargement...</p>
      </div>
    );
  }

  // ÉCRAN DE CONNEXION
  if (!isAuthenticated) {
    return (
      <main className="admin-login-wrapper">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <i className="fa-solid fa-lock admin-login-icon"></i>
            <h1 className="admin-login-title">Connexion Admin</h1>
            <p className="admin-login-subtitle">Administration Woodenza</p>
          </div>

          {loginError && <div className="admin-login-error">{loginError}</div>}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="admin-form-group">
              <label htmlFor="username">Nom d&apos;utilisateur</label>
              <input
                id="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Admin"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password">Mot de passe</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="admin-btn-primary">
              Se connecter
            </button>
          </form>
        </div>
      </main>
    );
  }

  // TABLEAU DE BORD ADMIN
  return (
    <main className="admin-container">
      <div className="admin-header">
        <div>
          <h1 className="admin-header-title">Commandes</h1>
          <p className="admin-header-desc">
            Aperçu de toutes les commandes clients reçues
          </p>
        </div>

        <button onClick={handleLogout} className="admin-btn-logout">
          <i className="fa-solid fa-right-from-bracket"></i> Se déconnecter
        </button>
      </div>

      <section className="admin-payment-settings">
        <h2>Paramétrage du paiement Bizum</h2>
        <form onSubmit={saveBizumSettings}>
          <label>
            Nom du bénéficiaire
            <input
              required={bizumSettings.enabled}
              value={bizumSettings.recipientName}
              onChange={(event) =>
                setBizumSettings((current) => ({
                  ...current,
                  recipientName: event.target.value,
                }))
              }
              maxLength={120}
            />
          </label>
          <label>
            Numéro Bizum
            <input
              required={bizumSettings.enabled}
              value={bizumSettings.phoneNumber}
              onChange={(event) =>
                setBizumSettings((current) => ({
                  ...current,
                  phoneNumber: event.target.value,
                }))
              }
              maxLength={40}
            />
          </label>
          <label className="admin-payment-enabled">
            <input
              type="checkbox"
              checked={bizumSettings.enabled}
              onChange={(event) =>
                setBizumSettings((current) => ({
                  ...current,
                  enabled: event.target.checked,
                }))
              }
            />
            Activer Bizum au paiement
          </label>
          <button
            type="submit"
            className="admin-btn-primary"
            disabled={savingBizum}
          >
            {savingBizum ? "Enregistrement..." : "Enregistrer Bizum"}
          </button>
        </form>
        {bizumMessage && <p className="admin-payment-message">{bizumMessage}</p>}
      </section>

      <section className="admin-payment-settings">
        <h2>Origine des visiteurs</h2>
        <p className="admin-analytics-description">
          Nombre cumulé de pages consultées et répartition par pays. Les
          statistiques sont actualisées toutes les 30 secondes ; aucune adresse
          IP ni identité de visiteur n&apos;est conservée.
        </p>
        {analyticsError ? (
          <p className="admin-payment-message" role="alert">
            {analyticsError}
          </p>
        ) : analytics ? (
          <div className="admin-analytics-dashboard">
            <div className="admin-analytics-total">
              <i className="fa-solid fa-eye" aria-hidden="true"></i>
              <span>VISITES TOTALES</span>
              <strong>{analytics.totalVisits.toLocaleString("fr-FR")}</strong>
            </div>
            <div className="admin-analytics-origins">
              <h3>
                <i className="fa-solid fa-earth-europe" aria-hidden="true"></i>{" "}
                Origen de los visitantes
              </h3>
              <div className="admin-analytics-country-header">
                <span>País / Código</span>
                <span>Visitas</span>
              </div>
              {analytics.byCountry.length === 0 ? (
                <p>Aucune visite enregistrée pour le moment.</p>
              ) : (
                <ul className="admin-analytics-countries">
                  {analytics.byCountry.map(({ country, visits }) => (
                    <li key={country}>
                      <span>
                        <i className="fa-solid fa-location-dot" aria-hidden="true"></i>
                        {country === "UNKNOWN" ? "Desconocido" : country}
                      </span>
                      <strong>{visits.toLocaleString("fr-FR")}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <p>Chargement des statistiques...</p>
        )}
      </section>

      <section className="admin-payment-settings">
        <h2>Paramétrage du virement bancaire</h2>
        <form onSubmit={saveBankTransferSettings}>
          <label>
            Nom du bénéficiaire
            <input
              required={bankTransferSettings.enabled}
              value={bankTransferSettings.accountName}
              onChange={(event) =>
                setBankTransferSettings((current) => ({
                  ...current,
                  accountName: event.target.value,
                }))
              }
              maxLength={120}
            />
          </label>
          <label>
            IBAN
            <input
              required={bankTransferSettings.enabled}
              value={bankTransferSettings.iban}
              onChange={(event) =>
                setBankTransferSettings((current) => ({
                  ...current,
                  iban: event.target.value,
                }))
              }
              maxLength={34}
              autoComplete="off"
            />
          </label>
          <label>
            BIC (facultatif)
            <input
              value={bankTransferSettings.bic}
              onChange={(event) =>
                setBankTransferSettings((current) => ({
                  ...current,
                  bic: event.target.value,
                }))
              }
              maxLength={11}
              autoComplete="off"
            />
          </label>
          <label className="admin-payment-enabled">
            <input
              type="checkbox"
              checked={bankTransferSettings.enabled}
              onChange={(event) =>
                setBankTransferSettings((current) => ({
                  ...current,
                  enabled: event.target.checked,
                }))
              }
            />
            Activer le virement bancaire au paiement
          </label>
          <button
            type="submit"
            className="admin-btn-primary"
            disabled={savingBankTransfer}
          >
            {savingBankTransfer
              ? "Enregistrement..."
              : "Enregistrer le virement"}
          </button>
        </form>
        {bankTransferMessage && (
          <p className="admin-payment-message" role="status">
            {bankTransferMessage}
          </p>
        )}
      </section>

      {loadingOrders ? (
        <p className="admin-loading">Chargement des commandes...</p>
      ) : orders.length === 0 ? (
        <div className="admin-empty-state">Aucune commande disponible.</div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>N° de commande</th>
                <th>Client</th>
                <th>Adresse de livraison</th>
                <th>Contact</th>
                <th>Montant total</th>
                <th>Paiement</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="admin-order-id">{order.id}</td>
                  <td>
                    <strong>
                      {order.firstName} {order.lastName}
                    </strong>
                    <br />
                    <span className="admin-customer-sub">{order.country}</span>
                  </td>
                  <td>{order.streetAddress}</td>
                  <td>
                    <a
                      href={`https://wa.me/${order.whatsapp.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-whatsapp-link"
                    >
                      <i className="fa-brands fa-whatsapp"></i> {order.whatsapp}
                    </a>
                    <br />
                    <span className="admin-customer-sub">{order.email}</span>
                  </td>
                  <td className="admin-price">
                    € {order.grandTotal.toFixed(2)}
                  </td>
                  <td>
                    <strong>
                      {order.paymentMethod === "bizum"
                        ? "Bizum"
                        : order.paymentMethod === "stripe"
                          ? "Stripe"
                          : "Virement"}
                    </strong>
                    <br />
                    <span
                      className={`admin-badge admin-badge-${order.paymentStatus}`}
                    >
                      {order.paymentStatus === "paid" ? "Payé" : "En attente"}
                    </span>
                  </td>
                  <td>
                    {new Date(order.createdAt).toLocaleDateString("fr-CH")}
                  </td>
                  <td>
                    <span className={`admin-badge admin-badge-${order.status}`}>
                      {order.status === "pending" ? "En attente" : order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
