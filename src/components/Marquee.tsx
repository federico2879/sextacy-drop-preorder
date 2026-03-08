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
  height?: string;
}

const Marquee = ({ images = defaultImages, speed = 40, height = "h-56 sm:h-72 md:h-96" }: MarqueeProps) => {
  const items = [...images, ...images];

  return (
    <div className="w-full overflow-hidden py-4">
      <div
        className="flex w-max animate-marquee gap-4"
        style={{ animationDuration: `${speed}s` }}
      >
        {items.map((src, i) => (
          <div key={i} className="flex-shrink-0">
            <img
              src={src}
              alt=""
              className={`${height} w-auto object-cover rounded-xl flex-shrink-0 block`}
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
