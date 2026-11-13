import Link from "next/link";

interface CategoryItem {
  id: string;
  title: string;
  slug: string;
  icon: string;
  image: string;
  isLarge?: boolean;
}

const categories: CategoryItem[] = [
  {
    id: "bois-de-chauffage",
    title: "holzvanta",
    slug: "/bois-de-chauffage",
    icon: "fa-fire",
    image: "/img/cat-bois.jpg",
    isLarge: true,
  },
  {
    id: "granules",
    title: "Holzpellets",
    slug: "/granules",
    icon: "fa-seedling",
    image: "/img/cat-granules.jpg",
  },
  {
    id: "briquettes",
    title: "Holzbriketts",
    slug: "/briquettes",
    icon: "fa-cubes",
    image: "/img/cat-briquettes.jpg",
  },
  {
    id: "bois-presse",
    title: "Holzpresslinge",
    slug: "/bois-presse",
    icon: "fa-layer-group",
    image: "/img/cat-presse.jpg",
  },
  {
    id: "fours",
    title: "Kaminöfen und Holzheizungen",
    slug: "/fours",
    icon: "fa-dumpster-fire",
    image: "/img/cat-fours.jpg",
  },
];

export default function Categories() {
  return (
    <section className="categories-section" id="categories">
      <div className="categories-container">
        {/* Encabezado */}
        <div className="categories-header">
          <span className="categories-tag">Finden Sie das Richtige</span>
          <h2 className="categories-title">
            Brennstoffe und Heizlösungen für Ihr Zuhause
          </h2>
          <p className="categories-subtitle">
            Entdecken Sie unser Sortiment an holzvanta, Pellets und Öfen und
            finden Sie die passende Lösung für Ihr Zuhause.
          </p>
        </div>

        {/* Grilla */}
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/boutique${cat.slug}`}
              className={`category-card ${cat.isLarge ? "large-card" : ""}`}
            >
              {/* Fond de la carte */}
              <div
                className="card-bg-image"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div className="card-overlay" />

              {/* Haut de carte (Icône badge) */}
              <div className="card-header-info">
                <div className="card-icon-badge">
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
              </div>

              {/* Bas de carte (Titre + Bouton d'action) */}
              <div className="card-content">
                <h3 className="card-title">{cat.title}</h3>
                <div className="card-action-btn">
                  <i className="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
