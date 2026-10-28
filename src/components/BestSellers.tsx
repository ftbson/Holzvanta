"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { productsData } from "@/data/products";

const products = productsData.slice(0, 10);

export default function BestSellers() {
  const { addToCart } = useCart();

  return (
    <section className="bestsellers-section">
      <div className="bestsellers-container">
        {/* Überschrift */}
        <div className="bestsellers-header">
          <h2 className="bestsellers-title">Die Favoriten unserer Kunden</h2>
          <p className="bestsellers-subtitle">
            Eine Auswahl an Brennstoffen und Heizartikeln, bereit für Ihre nächste Bestellung.
          </p>
          <div className="bestsellers-line"></div>
        </div>

        {/* Produktgitter */}
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {/* Bild und Rabatt-Badge */}
              <Link
                href={`/shop/${product.id}`}
                className="product-image-link"
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
                    <span className="reviews-count">
                      ({product.reviewsCount})
                    </span>
                  </div>
                </Link>

                {/* Preis */}
                <div className="product-price-box">
                  {product.oldPrice && (
                    <span className="old-price">
                      {product.oldPrice.toFixed(2).replace(".", ",")} €
                    </span>
                  )}
                  <span className="current-price">
                    {product.price.toFixed(2).replace(".", ",")} €
                  </span>
                </div>

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

        {/* Alle Produkte ansehen Button */}
        <div
          className="bestsellers-footer"
          style={{ textAlign: "center", marginTop: "40px" }}
        >
          <Link href="/shop" className="btn-view-all">
            Katalog durchstöbern <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}