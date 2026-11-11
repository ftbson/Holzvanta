"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { productsData, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format-price";

export default function ShopGrid() {
  const { addToCart } = useCart();

  // Paginación y opciones de visualización
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [sortOption, setSortOption] = useState<string>("standard");

  // Filtros
  const [showFilterPanel, setShowFilterPanel] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [minRating, setMinRating] = useState<number>(0);

  // Obtener las categorías disponibles
  const categories = useMemo(() => {
    const cats = new Set(productsData.map((p) => p.category));
    return ["all", ...Array.from(cats)];
  }, []);

  // Application des filtres et du tri
  const filteredProducts = useMemo(() => {
    let result = [...productsData];

    // 1. Filtrar por categoría
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // 2. Filtrar por precio máximo
    result = result.filter((p) => p.price <= maxPrice);

    // 3. Filtrar por valoración mínima
    if (minRating > 0) {
      result = result.filter((p) => (p.rating || 0) >= minRating);
    }

    // 4. Ordenar los productos
    if (sortOption === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating-desc") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [selectedCategory, maxPrice, minRating, sortOption]);

  // Productos de la página actual
  const displayedProducts = filteredProducts.slice(0, itemsPerPage);

  // Restablecer los filtros
  const resetFilters = () => {
    setSelectedCategory("all");
    setMaxPrice(2000);
    setMinRating(0);
    setSortOption("standard");
  };

  return (
    <section className="shop-section">
      <div className="shop-container">
        {/* BARRE D'OUTILS ET FILTRES */}
        <div className="shop-toolbar">
          <div className="shop-breadcrumb">
            <Link href="/">Startseite</Link>
            <span className="separator">/</span>
            <span className="current">Sortiment</span>
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
                <option value="standard">Empfohlene Sortierung</option>
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

        {/* PANNEAU DE FILTRES */}
        {showFilterPanel && (
          <div className="filter-panel">
            <div className="filter-group">
              <label className="filter-label">Kategorie:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">Alle Kategorien</option>
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
                Höchstpreis: <strong>{formatPrice(maxPrice)}</strong>
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
                <option value={0}>Alle Bewertungen</option>
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

        {/* RESULTADOS */}
        <div className="results-count">
          Auf dieser Seite: <strong>{displayedProducts.length}</strong> von{" "}
          <strong>{filteredProducts.length}</strong>{" "}
          {filteredProducts.length === 1 ? "Produkt" : "Produkten"}
        </div>

        {/* GRILLE DE PRODUITS */}
        <div className="products-grid">
          {displayedProducts.map((product: Product) => (
            <div key={product.id} className="product-card">
              {/* Imagen y etiqueta de promoción */}
              <Link
                href={`/boutique/${product.id}`}
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

              {/* Detalles del producto */}
              <div className="product-info">
                <Link
                  href={`/boutique/${product.id}`}
                  className="product-detail-link"
                >
                  <span className="product-category">{product.category}</span>
                  <h3 className="product-title">{product.title}</h3>

                  {/* Valoraciones */}
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

                  {/* Precio */}
                  <div className="product-price-box">
                    {product.oldPrice && (
                      <span className="old-price">
                        {formatPrice(product.oldPrice)}
                      </span>
                    )}
                    <span className="current-price">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </Link>

                {/* Botón para añadir al carrito */}
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
                      // quantity: 1,
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
            <p>Wir haben keine Produkte gefunden, die den ausgewählten Filtern entsprechen.</p>
            <button className="btn-reset-filters" onClick={resetFilters}>
              Filter zurücksetzen
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
