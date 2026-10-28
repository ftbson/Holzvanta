"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { totalItems } = useCart();

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: "Startseite", path: "/" },
    { name: "Über Holzvanta", path: "/about" },
    { name: "Katalog", path: "/shop" },
    { name: "Produkte", path: "/shop" },
    { name: "Hilfe & Kontakt", path: "/contact" },
  ];

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="navbar-logo">
          <Image
            src="/img/woodenza.svg"
            alt="Holzvanta"
            width={100}
            height={45}
            priority
          />
        </Link>

        {/* Desktop-Navigation */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={`${link.name}-${link.path}`}
              href={link.path}
              className={`nav-link ${isActive(link.path) ? "active" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Aktionen */}
        <div className="navbar-actions">
          {/* Suche */}
          <button className="icon-btn search-btn" aria-label="Produkte suchen">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          {/* Warenkorb mit Zähler */}
          <Link
            href="/cart"
            className="icon-btn cart-btn"
            aria-label="Warenkorb ansehen"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>

          {/* Mobiles Menü */}
          <button
            className="menu-burger-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Navigationsmenü öffnen"
          >
            <i
              className={isMenuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}
            ></i>
          </button>
        </div>
      </div>

      {/* Mobiles Menü Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu">
            <div className="mobile-menu-header">
              <Image
                src="/img/woodenza.svg"
                alt="Holzvanta"
                width={100}
                height={35}
              />
              <div className="mobile-menu-actions">
                <Link
                  href="/cart"
                  className="icon-btn cart-btn"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  {totalItems > 0 && (
                    <span className="cart-badge">{totalItems}</span>
                  )}
                </Link>
                <button
                  className="close-btn"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>

            <nav className="mobile-nav-links">
              {navLinks.map((link) => (
                <Link
                  key={`${link.name}-${link.path}`}
                  href={link.path}
                  className={`mobile-nav-link ${
                    isActive(link.path) ? "active" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}