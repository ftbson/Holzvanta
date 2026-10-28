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
    id: "brennholz",
    title: "Brennholz",
    slug: "/brennholz",
    icon: "fa-fire",
    image: "/img/cat-bois.jpg",
    isLarge: true,
  },
  {
    id: "pellets",
    title: "Holzpellets",
    slug: "/pellets",
    icon: "fa-seedling",
    image: "/img/cat-granules.jpg",
  },
  {
    id: "holzbriketts",
    title: "Holzbriketts",
    slug: "/holzbriketts",
    icon: "fa-cubes",
    image: "/img/cat-briquettes.jpg",
  },
  {
    id: "pressholz",
    title: "Pressholz",
    slug: "/pressholz",
    icon: "fa-layer-group",
    image: "/img/cat-presse.jpg",
  },
  {
    id: "kaminoefen",
    title: "Kaminöfen und Kaminzubehör",
    slug: "/kaminoefen",
    icon: "fa-dumpster-fire",
    image: "/img/cat-fours.jpg",
  },
];

export default function Categories() {
  return (
    <section className="categories-section" id="categories">
      <div className="categories-container">
        {/* Überschrift */}
        <div className="categories-header">
          <span className="categories-tag">Finden Sie, was Sie brauchen</span>
          <h2 className="categories-title">Brennstoffe und Heizung für Ihr Zuhause</h2>
          <p className="categories-subtitle">
            Entdecken Sie unsere Auswahl an Brennholz, Pellets und Öfen, um die passende Option für Ihr Haus zu wählen.
          </p>
        </div>

        {/* Raster */}
        <div className="categories-grid">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop${cat.slug}`}
              className={`category-card ${cat.isLarge ? "large-card" : ""}`}
            >
              {/* Kartenhintergrund */}
              <div
                className="card-bg-image"
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div className="card-overlay" />

              {/* Kartenkopf (Icon-Badge) */}
              <div className="card-header-info">
                <div className="card-icon-badge">
                  <i className={`fa-solid ${cat.icon}`}></i>
                </div>
              </div>

              {/* Kartenfuß (Titel + Aktionsbutton) */}
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