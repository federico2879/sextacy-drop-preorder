import righeRosse from "@/assets/righe_rosse.jpeg";
import model2 from "@/assets/model-2.jpg";
import rtmMacchina from "@/assets/rtm_macchina.jpeg";
import model4 from "@/assets/model-4.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
}

export const products: Product[] = [
  {
    id: "righe-rosse",
    name: "Righe Rosse",
    description:
      "Heavyweight 240gsm cotton. Oversized boxy fit. Screen-printed front graphic with embossed back detail. Cut and sewn in Italy.",
    price: "€55",
    images: [righeRosse, model2],
  },
  {
    id: "rtm",
    name: "RTM",
    description:
      "Heavyweight 240gsm cotton. Oversized boxy fit. Contrast print on premium white base. Cut and sewn in Italy.",
    price: "€55",
    images: [rtmMacchina, model4],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
