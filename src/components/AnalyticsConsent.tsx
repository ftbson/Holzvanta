"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./AnalyticsConsent.css";

export default function AnalyticsConsent() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);
  const [showNotice, setShowNotice] = useState(true);

  useEffect(() => {
    if (lastTrackedPath.current === pathname) return;
    lastTrackedPath.current = pathname;

    fetch("/api/analytics", { method: "POST", keepalive: true }).then(
      (response) => {
        if (!response.ok)
          throw new Error("Besuch konnte nicht registriert werden.");
      },
    ).catch((error: unknown) => {
      console.error("Fehler beim Senden der Statistiken:", error);
    });
  }, [pathname]);

  const dismissNotice = () => {
    setShowNotice(false);
  };

  if (!showNotice) {
    return null;
  }

  return (
    <aside className="analytics-consent" aria-label="Datenschutzinformationen">
      <div>
        <strong>Besuchsstatistiken</strong>
        <p>
          Wir zählen die aufgerufenen Seiten und erfassen Besuche nach
          ungefährer Länderherkunft, sofern verfügbar. Wir speichern keine
          IP-Adressen und identifizieren keine Besucher.{" "}
          <Link href="/datenschutz">
            Mehr Informationen zum Datenschutz
          </Link>
        </p>
      </div>
      <div className="analytics-consent-actions">
        <button type="button" onClick={dismissNotice}>
          Verstanden
        </button>
      </div>
    </aside>
  );
}