import { useState } from "react";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const SIZES = ["S", "M", "L", "XL"] as const;

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [showSizes, setShowSizes] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSizes(true);
  };

  const handleSizeSelect = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ productId: String(product.id), productName: product.name, size });
    toast({ title: `${product.name} (${size}) added to preorder` });
    setShowSizes(false);
  };

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

      <div className="flex items-start justify-between gap-3">
        <Link to={productUrl} className="min-w-0">
          <p className="text-sm tracking-[0.15em] uppercase text-foreground">
            {product.name}
          </p>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2">
            Limited pieces available. Free preorder. Register now and secure yours.
          </p>
        </Link>

        <button
          onClick={handleAddToCart}
          className="flex-shrink-0 w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          aria-label="Add to preorder"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>

      {showSizes && (
        <div className="mt-3 flex gap-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={(e) => handleSizeSelect(size, e)}
              className="flex-1 h-10 border border-border text-xs tracking-widest text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
            >
              {size}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductCard;