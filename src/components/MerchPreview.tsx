import { Link } from "react-router-dom";
import { products } from "@/data/products";

const MerchPreview = () => {
  return (
    <section id="collection" className="section-padding">
      <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-16 text-center">
        Collection
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {products.map((product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="group cursor-pointer"
          >
            <div className="overflow-hidden bg-card mb-5">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <p className="text-sm tracking-[0.15em] uppercase text-foreground">
              {product.name}
            </p>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2">
              {product.price} — Limited preorder
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default MerchPreview;
