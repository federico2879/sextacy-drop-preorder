import { products } from "@/data/products";

// Use only the FIRST lifestyle image per product for a lighter initial load
const lifestyleImages = products
  .map((p) => p.lifestyleImages[0])
  .filter((url): url is string => !!url);

interface MarqueeProps {
  images?: string[];
  speed?: number;
  cardWidth?: string;
}

const Marquee = ({
  images = lifestyleImages,
  speed = 40,
  cardWidth = "w-48 sm:w-56 md:w-72",
}: MarqueeProps) => {
  const items = [...images, ...images];

  if (images.length === 0) return null;

  return (
    <div className="w-full overflow-hidden py-4">
      <div
        className="flex w-max animate-marquee gap-3 sm:gap-4"
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((src, i) => (
          <div
            key={i}
            className={`${cardWidth} flex-shrink-0 aspect-[3/4] overflow-hidden rounded-xl`}
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover block"
              loading="lazy"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
