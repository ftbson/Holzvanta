"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductDetails({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const addProductToCart = () => {
    for (let index = 0; index < quantity; index += 1) {
      addToCart({
        id: product.id,
        title: product.title,
        category: product.category,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.image,
      });
    }
  };

  return (
    <main className="product-page">
      <div className="product-page-container">
        <div className="product-page-breadcrumb">
          <Link href="/">Startseite</Link>
          <span>/</span>
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <span>{product.title}</span>
        </div>

        <div className="product-detail-layout">
          <div className="product-detail-image-wrap">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="product-detail-image"
              priority
            />
            {product.discount && (
              <span className="badge-discount">{product.discount}</span>
            )}
          </div>

          <div className="product-detail-content">
            <span className="product-category">{product.category}</span>
            <h1>{product.title}</h1>
            <div className="product-rating product-detail-rating">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <i
                    key={index}
                    className={`fa-solid fa-star ${index < Math.floor(product.rating || 0) ? "active" : ""}`}
                  ></i>
                ))}
              </div>
              {product.reviewsCount !== undefined && (
                <span className="reviews-count">
                  ({product.reviewsCount} Bewertungen)
                </span>
              )}
            </div>

            <div className="product-detail-price">
              {product.oldPrice && (
                <span className="old-price">
                  {product.oldPrice.toFixed(2).replace(".", ",")} €
                </span>
              )}
              <strong>{product.price.toFixed(2).replace(".", ",")} €</strong>
            </div>
            <p className="product-detail-description">
              {product.description}
            </p>

            <div className="product-purchase-row">
              <div className="quantity-control" aria-label="Menge">
                <button
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Menge verringern"
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Menge erhöhen"
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="btn-detail-add-cart"
                onClick={addProductToCart}
              >
                <i className="fa-solid fa-cart-shopping"></i>
                In den Warenkorb
              </button>
            </div>
            <Link href="/cart" className="product-cart-link">
              Zum Warenkorb
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}