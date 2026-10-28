"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { productsData, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ShopGrid() {
  const { addToCart } = useCart();

  // Paginierung und Anzeigeoptionen
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [sortOption, setSortOption] = useState<string>("standard");

  // Filter
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [minRating, setMinRating] = useState<number>(0);

  // Verfügbare Kategorien abrufen
  const categories = useMemo(() => {
    const cats = new Set(productsData.map((p) => p.category));
    return ["all", ...Array.from(cats)];
  }, []);

  // Filter und Sortierung anwenden
  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    // 1. Nach Kategorie filtern
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. Nach Maximalpreis filtern
    result = result.filter((p) => p.price <= maxPrice);

    // 3. Nach Mindestbewertung filtern
    if (minRating > 0) {
      result = result.filter((p) => (p.rating || 0) >= minRating);
    }

    // 4. Produkte sortieren
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating-desc") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [selectedCategory, maxPrice, minRating, sortOption]);

  // Produkte der aktuellen Seite
  const displayedProducts = filteredProducts.slice(0, itemsPerPage);

  // Filter zurücksetzen
  const resetFilters = () => {
    setSelectedCategory("all");
    setMaxPrice(2000);
    setMinRating(0);
    setSortOption("standard");
  };

  return (
    <section className="shop-section">
      <div className="shop-container">
        {/* WERKZEUGLEISTE UND FILTER */}
        <div className="shop-toolbar">
          <div className="shop-breadcrumb">
            <Link href="/">Startseite</Link>
            <span className="separator">/</span>
            <span className="current">Shop</span>
          </div>

          <div className="shop-controls">
            <div className="items-per-page">
              <span>Produkte pro Seite:</span>
              {[24, 36, 45, 55].map((num) => (
                <button
                  key={num}
                  onClick={() => setItemsPerPage(num)}
                  className={itemsPerPage === num ? "active" : ""}
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="sort-select-wrapper">
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="sort-select"
              >
                <option value="standard">Empfohlene Reihenfolge</option>
                <option value="price-asc">Preis: aufsteigend</option>
                <option value="price-desc">Preis: absteigend</option>
                <option value="rating-desc">Höchste Bewertung</option>
              </select>
            </div>

            <button
              className={`filter-btn ${showFilterPanel ? "active" : ""}`}
              onClick={() => setShowFilterPanel(!showFilterPanel)}
            >
              <i className="fa-solid fa-sliders"></i>
              <span>Produkte filtern</span>
            </button>
          </div>
        </div>

        {/* FILTERPANEL */}
        {showFilterPanel && (
          <div className="filter-panel">
            <div className="filter-group">
              <label className="filter-label">Kategorie:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">Alle Kategorien anzeigen</option>
                {categories
                  .filter((cat) => cat !== "all")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">
                Max. Preis: <strong>{maxPrice.toFixed(2)} €</strong>
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="filter-range"
              />
            </div>

            <div className="filter-group">
              <label className="filter-label">Mindestbewertung:</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="filter-select"
              >
                <option value={0}>Jede Bewertung</option>
                <option value={4}>4 Sterne oder mehr</option>
                <option value={4.5}>4,5 Sterne oder mehr</option>
                <option value={5}>5 Sterne</option>
              </select>
            </div>

            <button className="btn-reset-filters" onClick={resetFilters}>
              Filter zurücksetzen
            </button>
          </div>
        )}

        {/* ERGEBNISSE */}
        <div className="results-count">
          Auf dieser Seite: <strong>{displayedProducts.length}</strong> von{" "}
          <strong>{filteredProducts.length}</strong>{" "}
          {filteredProducts.length === 1 ? "Produkt" : "Produkten"}
        </div>

        {/* PRODUKTGITTER */}
        <div className="products-grid">
          {displayedProducts.map((product: Product) => (
            <div key={product.id} className="product-card">
              {/* Bild und Rabatt-Badge */}
              <Link
                href={`/shop/${product.id}`}
                className="product-image-link"
                aria-label={`${product.title} ansehen`}
              >
                <div className="product-image-wrap">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="product-image"
                  />
                  {product.discount && (
                    <span className="badge-discount">{product.discount}</span>
                  )}
                </div>
              </Link>

              {/* Produktdetails */}
              <div className="product-info">
                <Link
                  href={`/shop/${product.id}`}
                  className="product-detail-link"
                >
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-title">{product.title}</h3>

                  {/* Bewertungen */}
                  <div className="product-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fa-solid fa-star ${
                            i < Math.floor(product.rating || 0) ? "active" : ""
                          }`}
                        ></i>
                      ))}
                    </div>
                    {product.reviewsCount !== undefined && (
                      <span className="reviews-count">
                        ({product.reviewsCount})
                      </span>
                    )}
                  </div>

                  {/* Preis */}
                  <div className="product-price-box">
                    {product.oldPrice && (
                      <span className="old-price">
                        {product.oldPrice.toFixed(2)} €
                      </span>
                    )}
                    <span className="current-price">
                      {product.price.toFixed(2)} €
                    </span>
                  </div>
                </Link>

                {/* In den Warenkorb Button */}
                <button
                  className="btn-add-cart"
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      title: product.title,
                      category: product.category,
                      price: product.price,
                      oldPrice: product.oldPrice,
                      image: product.image,
                    })
                  }
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  In den Warenkorb
                </button>
              </div>
            </div>
          ))}
        </div>

        {displayedProducts.length === 0 && (
          <div className="no-products-found">
            <p>Es wurden keine Produkte gefunden, die den ausgewählten Filtern entsprechen.</p>
            <button className="btn-reset-filters" onClick={resetFilters}>
              Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
    </section>
  );
}