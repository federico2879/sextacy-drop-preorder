import model1 from "@/assets/model-1.jpg";
import model2 from "@/assets/model-2.jpg";
import model3 from "@/assets/model-3.jpg";
import model4 from "@/assets/model-4.jpg";
import model5 from "@/assets/model-5.jpg";
import model6 from "@/assets/model-6.jpg";

const defaultImages = [model1, model2, model3, model4, model5, model6];

interface MarqueeProps {
  images?: string[];
  speed?: number;
  cardWidth?: string;
}

const Marquee = ({ images = defaultImages, speed = 40, cardWidth = "w-48 sm:w-56 md:w-72" }: MarqueeProps) => {
  const items = [...images, ...images];

  return (
    <div className="w-full overflow-hidden py-4">
      <div
        className="flex w-max animate-marquee gap-3 sm:gap-4"
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((src, i) => (
          <div key={i} className={`${cardWidth} flex-shrink-0 aspect-[3/4] overflow-hidden rounded-xl`}>
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
