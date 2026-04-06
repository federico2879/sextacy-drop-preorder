import { useState } from "react";
import { Link } from "react-router-dom";
import { type Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const productUrl = `/product/${product.id}`;

  return (
    <div className="group">
      <Link to={productUrl} className="block">
        <div className="relative overflow-hidden bg-card mb-5">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse" />
          )}
          <img
            src={product.graphicCover}
            alt={product.name}
            className={`w-full aspect-[4/5] object-cover transition-all duration-500 group-hover:scale-105 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            loading="lazy"
            draggable={false}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </Link>

      <Link to={productUrl} className="block">
        <p className="text-sm tracking-[0.15em] uppercase text-foreground">
          {product.name}
        </p>
        <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground/60 mt-2">
          Drop // 01
        </p>
      </Link>
    </div>
  );
};

export default ProductCard;
