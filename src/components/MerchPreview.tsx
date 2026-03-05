import tshirt1 from "@/assets/tshirt-1.jpg";
import tshirt2 from "@/assets/tshirt-2.jpg";
import tshirt3 from "@/assets/tshirt-3.jpg";

const products = [
  { name: "Presence Tee — Black", image: tshirt1 },
  { name: "Presence Tee — White", image: tshirt2 },
  { name: "Presence Tee — Washed", image: tshirt3 },
];

const MerchPreview = () => {
  return (
    <section className="section-padding">
      <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-16 text-center">
        Collection
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {products.map((product) => (
          <div key={product.name} className="group cursor-pointer">
            <div className="overflow-hidden bg-card mb-5">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <p className="text-sm tracking-[0.15em] uppercase text-foreground">
              {product.name}
            </p>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2">
              Limited preorder
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MerchPreview;
