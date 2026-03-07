import { useRef } from "react";

import img1 from "@/assets/righe_rosse.jpeg";
import img2 from "@/assets/rtm_macchina.jpeg";
import img3 from "@/assets/saponata.jpeg";
import img4 from "@/assets/tshirt-1.jpg";
import img5 from "@/assets/tshirt-2.jpg";
import img6 from "@/assets/tshirt-3.jpg";

const defaultImages = [img1, img2, img3, img4, img5, img6];

interface MarqueeProps {
  images?: string[];
  speed?: number; // seconds for one full loop
  height?: string;
}

const Marquee = ({ images = defaultImages, speed = 30, height = "h-48 sm:h-64 md:h-80" }: MarqueeProps) => {
  const items = [...images, ...images];

  return (
    <section className="w-full overflow-hidden py-8">
      <div
        className="flex w-max animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={`${height} w-auto object-cover mx-2 flex-shrink-0`}
            loading="lazy"
            draggable={false}
          />
        ))}
      </div>
    </section>
  );
};

export default Marquee;
