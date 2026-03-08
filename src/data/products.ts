import rtmWhite1 from "@/assets/rtm_white_tshirt_1_placeholder.jpg";
import rtmWhite2 from "@/assets/rtm_white_tshirt_2_placeholder.jpg";
import blackLS1 from "@/assets/black_long_sleeves_1_placeholder.jpg";
import blackLS2 from "@/assets/black_long_sleeves_2_placeholder.jpg";
import rtmMacchina from "@/assets/rtm_macchina.jpeg";
import model4 from "@/assets/model-4.jpg";
import righeRosse from "@/assets/righe_rosse.jpeg";
import model2 from "@/assets/model-2.jpg";
import redHoodie1 from "@/assets/red_hoodie_1_placeholder.jpg";
import redHoodie2 from "@/assets/red_hoodie_2_placeholder.jpg";
import graffito1 from "@/assets/graffito_black_tshirt_1_placeholder.jpg";
import graffito2 from "@/assets/graffito_black_tshirt_2_placeholder.jpg";
import saponata1 from "@/assets/saponata_white_tshirt_1_placeholder.jpg";
import saponata2 from "@/assets/saponata_white_tshirt_2_placeholder.jpg";
import leccaLecca1 from "@/assets/lecca_lecca_white_tshirt_1_placeholder.jpg";
import leccaLecca2 from "@/assets/lecca_lecca_white_tshirt_2_placeholder.jpg";
import blackHoodie1 from "@/assets/black_hoodie_1_placeholder.jpg";
import blackHoodie2 from "@/assets/black_hoodie_2_placeholder.jpg";
import righeNere1 from "@/assets/righe_nere_striped_longsleeve_1_placeholder.jpg";
import righeNere2 from "@/assets/righe_nere_striped_longsleeve_2_placeholder.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
}

export const products: Product[] = [
  {
    id: "rtm",
    name: "RTM",
    description:
      "Heavyweight 240gsm cotton. Oversized boxy fit. Screen-printed front graphic. Cut and sewn in Italy.",
    price: "€20",
    images: [rtmWhite1, rtmWhite2],
  },
  {
    id: "black-long-sleeves",
    name: "Black Long Sleeves",
    description:
      "Heavyweight 240gsm cotton. Oversized boxy fit. Long sleeve silhouette. Cut and sewn in Italy.",
    price: "€20",
    images: [blackLS1, blackLS2],
  },
  {
    id: "rtm-macchina",
    name: "RTM Macchina",
    description:
      "Heavyweight 240gsm cotton. Oversized boxy fit. Contrast print on premium white base. Cut and sewn in Italy.",
    price: "€20",
    images: [rtmMacchina, model4],
  },
  {
    id: "righe-rosse",
    name: "Righe Rosse",
    description:
      "Heavyweight 240gsm cotton. Oversized boxy fit. Screen-printed front graphic with embossed back detail. Cut and sewn in Italy.",
    price: "€20",
    images: [righeRosse, model2],
  },
  {
    id: "red-hoodie",
    name: "Red Hoodie",
    description:
      "Heavyweight 380gsm cotton. Oversized fit. Kangaroo pocket. Cut and sewn in Italy.",
    price: "€20",
    images: [redHoodie1, redHoodie2],
  },
  {
    id: "graffito",
    name: "Graffito",
    description:
      "Heavyweight 240gsm cotton. Oversized boxy fit. Screen-printed front graphic. Cut and sewn in Italy.",
    price: "€20",
    images: [graffito1, graffito2],
  },
  {
    id: "saponata",
    name: "Saponata",
    description:
      "Heavyweight 240gsm cotton. Oversized boxy fit. Screen-printed front graphic. Cut and sewn in Italy.",
    price: "€20",
    images: [saponata1, saponata2],
  },
  {
    id: "lecca-lecca",
    name: "Lecca Lecca",
    description:
      "Heavyweight 240gsm cotton. Oversized boxy fit. Screen-printed front graphic. Cut and sewn in Italy.",
    price: "€20",
    images: [leccaLecca1, leccaLecca2],
  },
  {
    id: "black-hoodie",
    name: "Black Hoodie",
    description:
      "Heavyweight 380gsm cotton. Oversized fit. Kangaroo pocket. Cut and sewn in Italy.",
    price: "€20",
    images: [blackHoodie1, blackHoodie2],
  },
  {
    id: "righe-nere",
    name: "Righe Nere",
    description:
      "Heavyweight 240gsm cotton. Oversized boxy fit. Horizontal black and white stripes. Long sleeve. Cut and sewn in Italy.",
    price: "€20",
    images: [righeNere1, righeNere2],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
