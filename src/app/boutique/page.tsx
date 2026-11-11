import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "Brennholz, Pellets und Öfen kaufen | Woodenza",
  description:
    "Entdecken Sie das Woodenza-Sortiment: Brennholz, Pellets, Holzbriketts und Kaminöfen mit Lieferung in Spanien.",
};

export default function BoutiquePage() {
  return (
    <main className="shop-page-wrapper">
      <ShopGrid />
    </main>
  );
}
