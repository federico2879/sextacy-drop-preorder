import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const MerchPreview = () => {
  return (
    <section id="collection" className="section-padding">
      <div className="text-center mb-16">
        <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-2">
          Drop // 01
        </p>
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/50">
          The collection.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {products.map((product, i) => (
          <ProductCard key={`${product.id}-${i}`} product={product} />
        ))}
      </div>
    </section>
  );
};

export default MerchPreview;
