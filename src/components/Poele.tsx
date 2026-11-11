"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format-price";

interface Product {
  id: string;
  discount?: string;
  category: string;
  title: string;
  rating: number;
  reviewsCount: number;
  oldPrice?: number;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: "poele-toron-50",
    discount: "-38 %",
    category: "Kaminöfen",
    title: "DEVILLE TORON 50 Kaminofen, 8 kW",
    rating: 5,
    reviewsCount: 214,
    oldPrice: 1342.00,
    price: 939.40,
    image: "/img/prod/poele-bois-deville-toron-50-8-1-2-300x300.webp",
  },
  {
    id: "poele-sara-12",
    discount: "-44 %",
    category: "Kaminöfen",
    title: "INTERSTOVES SARA Kaminofen, 12 kW",
    rating: 5,
    reviewsCount: 431,
    oldPrice: 577.00,
    price: 403.90,
    image: "/img/prod/poele-bois-interstoves-sara-12-300x300.webp",
  },
  {
    id: "poele-sandy-8",
    discount: "-20 %",
    category: "Kaminöfen",
    title: "DEVILLE SANDY Kaminofen, 8 kW, LAB-Ausführung",
    rating: 4.5,
    reviewsCount: 1142,
    price: 799.40,
    image: "/img/prod/poele-bois-deville-sandy-8-300x300.webp",
  },
  {
    id: "poele-lya-12",
    discount: "-22 %",
    category: "Kaminöfen",
    title: "INTERSTOVES LYA Kaminofen, 12 kW",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 489.00,
    price: 342.30,
    image: "/img/prod/poele-bois-interstoves-lya-12-300x300.webp",
  },
  {
    id: "poele-alessia-14",
    discount: "-45 %",
    category: "Kaminöfen",
    title: "INTERSTOVES ALESSIA Kaminofen, 14 kW",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 577.00,
    price: 403.90,
    image: "/img/prod/poele-bois-interstoves-alessia-14-2-300x300.webp",
  },
  {
    id: "poele-eguzki-6",
    discount: "-37 %",
    category: "Kaminöfen",
    title: "DEVILLE EGUZKI raumluftunabhängiger Kaminofen, 6 kW",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 2600.00,
    price: 1820.00,
    image: "/img/prod/poele-bois-deville-eguzki-6-300x300.webp",
  },
];

export default function Poele() {
  const { addToCart } = useCart();

  return (
    <section className="bestsellers-section">
      <div className="bestsellers-container">
        {/* Encabezado */}
        <div className="bestsellers-header">
          <h2 className="bestsellers-title">Kaminöfen für Ihr Zuhause</h2>
          <p className="bestsellers-subtitle">
            Vergleichen Sie Modelle mit unterschiedlichen Leistungen und finden Sie den passenden Ofen für Ihren Raum.
          </p>
          <div className="bestsellers-line"></div>
        </div>

        {/* Grille de produits */}
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              {/* Imagen y etiqueta de descuento */}
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

              {/* Detalles del producto */}
              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-title">{product.title}</h3>

                {/* Valoraciones */}
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fa-solid fa-star ${
                          i < Math.floor(product.rating) ? "active" : ""
                        }`}
                      ></i>
                    ))}
                  </div>
                  <span className="reviews-count">({product.reviewsCount})</span>
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
      </div>
    </section>
  );
}