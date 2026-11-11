"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { productsData } from "@/data/products";
import { formatPrice } from "@/lib/format-price";

const products = productsData.slice(0, 10);

export default function BestSellers() {
  const { addToCart } = useCart();

  return (
    <section className="bestsellers-section">
      <div className="bestsellers-container">
        {/* Encabezado */}
        <div className="bestsellers-header">
          <h2 className="bestsellers-title">Die beliebtesten Produkte unserer Kunden</h2>
          <p className="bestsellers-subtitle">
            Ausgewählte Brennstoffe und Heizartikel für Ihre nächste Bestellung.
          </p>
          <div className="bestsellers-line"></div>
        </div>

        {/* Grille de produits */}
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {/* Imagen y etiqueta de descuento */}
              <Link
                href={`/boutique/${product.id}`}
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
                    <span className="reviews-count">
                      ({product.reviewsCount})
                    </span>
                  </div>
                </Link>

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

        {/* Botón para ver todos los productos */}
        <div
          className="bestsellers-footer"
          style={{ textAlign: "center", marginTop: "40px" }}
        >
          <Link href="/boutique" className="btn-view-all">
            Sortiment entdecken <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
