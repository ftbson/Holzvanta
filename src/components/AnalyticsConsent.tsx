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
          throw new Error("La visite n'a pas pu être enregistrée.");
      },
    ).catch((error: unknown) => {
      console.error("Erreur lors de l'envoi des statistiques :", error);
    });
  }, [pathname]);

  const dismissNotice = () => {
    setShowNotice(false);
  };

  if (!showNotice) {
    return null;
  }

  return (
    <aside className="analytics-consent" aria-label="Datenschutzhinweis">
      <div>
        <strong>Besucherstatistik</strong>
        <p>
          Wir zählen aufgerufene Seiten und fassen Besuche nach Möglichkeit
          nach dem ungefähren Land zusammen. Wir speichern keine IP-Adressen
          und identifizieren keine Besucher.{" "}
          <Link href="/politique-de-confidentialite">
            Mehr zum Datenschutz
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
