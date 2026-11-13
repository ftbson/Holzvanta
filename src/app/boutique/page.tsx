import ShopGrid from "@/components/ShopGrid";

export const metadata = {
  title: "holzvanta, Pellets und Öfen kaufen | holzvanta",
  description:
    "Entdecken Sie das holzvanta-Sortiment: holzvanta, Pellets, Holzbriketts und Kaminöfen mit Lieferung in Deutschland.",
};

export default function BoutiquePage() {
  return (
    <main className="shop-page-wrapper">
      <ShopGrid />
    </main>
  );
}
