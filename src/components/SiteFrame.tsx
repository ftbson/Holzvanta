"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnalyticsConsent from "@/components/AnalyticsConsent";

export default function SiteFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  useEffect(() => {
    document.documentElement.lang = isAdminPage ? "fr" : "de";
  }, [isAdminPage]);

  return (
    <div
      className="app-container"
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {!isAdminPage && <Navbar />}
      <main className="main-content" style={{ flex: 1 }}>
        {children}
      </main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <AnalyticsConsent />}
    </div>
  );
}