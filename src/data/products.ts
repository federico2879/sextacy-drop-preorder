import tshirt1 from "@/assets/tshirt-1.jpg";
import tshirt2 from "@/assets/tshirt-2.jpg";
import tshirt3 from "@/assets/tshirt-3.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
}

export const products: Product[] = [
  {
    id: "presence-tee-black",
    name: "Presence Tee — Black",
    description:
      "Heavyweight 240gsm cotton. Oversized boxy fit. Screen-printed front graphic with embossed back detail. Cut and sewn in Italy.",
    price: "€55",
    images: [tshirt1, tshirt1, tshirt1, tshirt1],
  },
  {
    id: "presence-tee-white",
    name: "Presence Tee — White",
    description:
      "Heavyweight 240gsm cotton. Oversized boxy fit. Contrast print on premium white base. Cut and sewn in Italy.",
    price: "€55",
    images: [tshirt2, tshirt2, tshirt2, tshirt2],
  },
  {
    id: "presence-tee-washed",
    name: "Presence Tee — Washed",
    description:
      "Vintage wash treatment on heavyweight cotton. Relaxed fit with raw hem detail. Each piece is unique. Cut and sewn in Italy.",
    price: "€60",
    images: [tshirt3, tshirt3, tshirt3, tshirt3],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
