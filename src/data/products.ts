export interface Product {
  id: string;
  discount?: string;
  category: string;
  title: string;
  description: string;
  rating?: number;
  reviewsCount?: number;
  oldPrice?: number;
  price: number;
  image: string;
}

export const productsData: Product[] = [
  {
    id: "prod-1",
    discount: "-24 %",
    category: "Esche – holzvanta",
    title: "Palette ofengetrockneter Eschenholzscheite, 25 cm",
    description:
      "Palette ofengetrockneter Eschenholzscheite mit 25 cm Länge. Eine praktische Größe zur Bevorratung von holzvanta für Ofen oder Kamin.",
    rating: 5,
    reviewsCount: 214,
    oldPrice: 439.0,
    price: 307.3,
    image: "/img/prod/hele-pallet-essenhout-schuin-transparant-light-2-2-1.jpg",
  },
  {
    id: "prod-2",
    discount: "-21 %",
    category: "Eiche – holzvanta",
    title: "Palette ofengetrockneter Eichenholzscheite, 25 cm",
    description:
      "Eichenholz, auf 25 cm geschnitten und ofengetrocknet. Die Palette hält das holzvanta gebündelt und bereit zur Einlagerung.",
    rating: 5,
    reviewsCount: 431,
    oldPrice: 429.0,
    price: 300.3,
    image: "/img/prod/hele-pallet-eikenhout-schuin-transparant-light-1.jpg",
  },
  {
    id: "prod-3",
    category: "Esche – holzvanta",
    title: "Halbe Palette geschnittenes Birken- und Eschenholz",
    description:
      "Halbe Palette mit geschnittenem holzvanta aus einer Mischung von Birke und Esche – eine praktische Ergänzung zu Ihrem Brennstoffvorrat.",
    rating: 4.5,
    reviewsCount: 279,
    price: 195.3,
    image:
      "/img/prod/halve-pallet-berken-essen-mix-schuin-transparant-light.jpg",
  },
  {
    id: "prod-4",
    discount: "-22 %",
    category: "Hainbuche – holzvanta",
    title: "Palette ofengetrockneter Hainbuchenscheite, 25 cm",
    description:
      "Hainbuchenholz, auf 25 cm geschnitten und ofengetrocknet. Auf einer Palette zusammengestellt, damit Sie es gut lagern können.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 449.0,
    price: 314.3,
    image: "/img/prod/hele-pallet-haagbeuk-schuin-transparant-light_2-1.jpg",
  },
  {
    id: "prod-5",
    discount: "-30 %",
    category: "holzvanta",
    title: "50 Feueranzünder aus 100 % natürlicher Holzwolle",
    description:
      "Packung mit 50 Feueranzündern aus 100 % natürlicher Holzwolle – eine praktische Ergänzung zum Anzünden von holzvanta.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 8.0,
    price: 5.6,
    image:
      "/img/prod/allume-feu-100-naturel-en-laine-de-bois-50-pcs-2-430x430.webp",
  },
  {
    id: "prod-6",
    discount: "-30 %",
    category: "holzvanta",
    title: "120 kg trockenes Buchenholz mit Anzündholz",
    description:
      "120-kg-Lieferung mit trockenem Buchenholz, Anzündholz und Hartholz gemäß der für dieses Produkt angegebenen Zusammensetzung.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 84.0,
    price: 58.8,
    image: "/img/prod/7c66e9cf-d354-4e2f-9af7-8e6ccf87c873-400x300.avif",
  },
  {
    id: "prod-7",
    discount: "-30 %",
    category: "Birke – holzvanta",
    title: "88 Säcke ofengetrocknete Birkenholzscheite, 25 cm",
    description:
      "Lieferung von 88 Säcken Birkenholz, auf 25 cm geschnitten und ofengetrocknet – bereit zur Lagerung und Verwendung.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 409.0,
    price: 286.3,
    image: "/img/prod/80-zakken-haardhout_2-430x430.png",
  },
  {
    id: "prod-8",
    discount: "-30 %",
    category: "Pellets",
    title: "Bioenergie-Pellets: Palette mit 66 Säcken à 15 kg",
    description:
      "Palette Bioenergie-Pellets mit 66 Säcken à 15 kg – als Brennstoffvorrat für zu Hause.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 380.0,
    price: 266.0,
    image: "/img/prod/74-large_default-1-430x430.webp",
  },
  {
    id: "prod-9",
    discount: "-30 %",
    category: "holzvanta",
    title: "Extra trockenes holzvanta, 25 cm, im Sack – Palette mit 1,3 m³",
    description:
      "Palette mit 1,3 m³ extra trockenem holzvanta, auf 25 cm geschnitten und für eine einfache Lagerung in Säcken verpackt.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 301.0,
    price: 210.7,
    image: "/img/prod/bois25-extrasec-brz-430x430.webp",
  },
  {
    id: "prod-10",
    discount: "-31 %",
    category: "holzvanta",
    title: "Palette mit 1,7 m³ holzvanta im Sack, Scheitlänge 33 cm",
    description:
      "Palette mit 1,7 m³ holzvanta in Säcken und 33 cm langen Scheiten – eine praktische Größe zur Planung Ihres Lagerplatzes.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 310.0,
    price: 215.0,
    image: "/img/prod/buches-de-bois-sec-40cm-3-1-430x430.webp",
  },
  {
    id: "prod-11",
    discount: "-28 %",
    category: "holzvanta",
    title: "Hartholz-holzvanta lose, auf 50 cm geschnitten",
    description:
      "Lose geliefertes Hartholz-holzvanta, auf 50 cm geschnitten – für alle, die eine andere Lieferform bevorzugen.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 65.0,
    price: 46.5,
    image: "/img/prod/Bois-Vrac-arrivage-scaled-2-430x410.webp",
  },
  {
    id: "prod-12",
    discount: "-30 %",
    category: "Pellets",
    title: "Butagaz-Pellets: Palette mit 66 Säcken à 15 kg",
    description:
      "Lieferung von Butagaz-Pellets auf einer Palette mit 66 Säcken à 15 kg – für einen übersichtlichen Vorrat.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 400.0,
    price: 280.0,
    image: "/img/prod/image-3-1-430x385.webp",
  },
  {
    id: "prod-13",
    discount: "-8 %",
    category: "Holzbriketts",
    title: "Pollmeier Premium Plus Buchenholzbriketts, 960 kg",
    description:
      "Pollmeier Premium Plus Holzbriketts aus Buche im 960-kg-Gebinde – eine kompakte Alternative zu klassischem holzvanta.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 310.0,
    price: 286.3,
    image: "/img/prod/Pollmeier10Palette-Photoroom-430x430.jpg",
  },
  {
    id: "prod-14",
    discount: "-30 %",
    category: "Pellets",
    title: "ECOBIO-Pellets: Palette mit 66 Säcken à 15 kg",
    description:
      "Palette ECOBIO-Pellets mit 66 Säcken à 15 kg – für eine ordentliche Lagerung Ihres Brennstoffvorrats.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 425.0,
    price: 297.0,
    image: "/img/prod/ECOBIO-1-PALETTE-600x658-1-1-430x472.webp",
  },
  {
    id: "prod-15",
    discount: "-26 %",
    category: "Pellets",
    title: "Helios-Pellets: Palette mit 65 Säcken à 15 kg",
    description:
      "Die Helios-Palette umfasst 65 Säcke Pellets à 15 kg – eine praktische Möglichkeit, Ihren Heizvorrat zu organisieren.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 360.0,
    price: 266.0,
    image: "/img/prod/20-large_default-1-1-430x430.webp",
  },
  {
    id: "prod-16",
    discount: "-30 %",
    category: "Holzbriketts",
    title: "Uckermark-Holzbriketts auf Palette, 960 kg",
    description:
      "Gepresste Uckermark-Holzbriketts auf einer Palette mit 960 kg als praktischer Brennstoffvorrat.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 329.0,
    price: 230.3,
    image:
      "/img/prod/holzbriketts-uckermark-palettenware-960kg-informationen-430x430.jpg",
  },
  {
    id: "prod-17",
    discount: "-26 %",
    category: "Pellets",
    title: "Green-Energy-Pellets: Palette mit 65 Säcken à 15 kg",
    description:
      "Green-Energy-Pellets auf einer Palette mit 65 Säcken à 15 kg – eine praktische Lieferung für die Heizsaison.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 360.0,
    price: 266.0,
    image:
      "/img/prod/3-Pellet-Green-Energy-Palette-de-65-sacs-de-15-kg-1-430x430.webp",
  },
  {
    id: "prod-18",
    discount: "-30 %",
    category: "Kaminöfen",
    title: "DEVILLE TORON 50 Kaminofen, 8 kW",
    description:
      "DEVILLE TORON 50 Kaminofen mit einer angegebenen Leistung von 8 kW als Ergänzung zu Ihrem Heizsystem.",
    rating: 5,
    reviewsCount: 214,
    oldPrice: 1342.0,
    price: 939.4,
    image: "/img/prod/poele-bois-deville-toron-50-8-1-2-300x300.webp",
  },
  {
    id: "prod-19",
    discount: "-30 %",
    category: "Kaminöfen",
    title: "INTERSTOVES SARA Kaminofen, 12 kW",
    description:
      "INTERSTOVES SARA: Kaminofen mit einer angegebenen Nennleistung von 12 kW.",
    rating: 5,
    reviewsCount: 431,
    oldPrice: 577.0,
    price: 403.9,
    image: "/img/prod/poele-bois-interstoves-sara-12-300x300.webp",
  },
  {
    id: "prod-20",
    discount: "-30 %",
    category: "Kaminöfen",
    title: "DEVILLE SANDY Kaminofen, 8 kW, LAB-Ausführung",
    description: "DEVILLE SANDY Kaminofen mit 8 kW in der LAB-Ausführung.",
    rating: 4.5,
    reviewsCount: 1142,
    oldPrice: 1142.0,
    price: 799.4,
    image: "/img/prod/poele-bois-deville-sandy-8-300x300.webp",
  },
  {
    id: "prod-21",
    discount: "-30 %",
    category: "Kaminöfen",
    title: "INTERSTOVES LYA Kaminofen, 12 kW",
    description:
      "INTERSTOVES LYA Kaminofen für die Holzheizung mit einer angegebenen Leistung von 12 kW.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 489.0,
    price: 342.3,
    image: "/img/prod/poele-bois-interstoves-lya-12-300x300.webp",
  },
  {
    id: "prod-22",
    discount: "-30 %",
    category: "Kaminöfen",
    title: "INTERSTOVES ALESSIA Kaminofen, 14 kW",
    description:
      "Der INTERSTOVES ALESSIA Kaminofen hat eine angegebene Leistung von 14 kW.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 577.0,
    price: 403.9,
    image: "/img/prod/poele-bois-interstoves-alessia-14-2-300x300.webp",
  },
  {
    id: "prod-23",
    discount: "-30 %",
    category: "Kaminöfen",
    title: "DEVILLE EGUZKI raumluftunabhängiger Kaminofen, 6 kW",
    description:
      "DEVILLE EGUZKI, ein raumluftunabhängiger Kaminofen mit einer angegebenen Leistung von 6 kW.",
    rating: 4,
    reviewsCount: 58,
    oldPrice: 2600.0,
    price: 1820.0,
    image: "/img/prod/poele-bois-deville-eguzki-6-300x300.webp",
  },
];
