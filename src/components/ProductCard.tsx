import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { type Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const SIZES = ["S", "M", "L", "XL"] as const;

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [activeImage, setActiveImage] = useState(0);
  const [showSizes, setShowSizes] = useState(false);
  const { addItem } = useCart();
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setActiveImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
      } else {
        setActiveImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
      }
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSizes(true);
  };

  const handleSizeSelect = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({ productId: product.id, productName: product.name, size });
    toast({ title: `${product.name} (${size}) added to cart` });
    setShowSizes(false);
  };

  return (
    <div className="group">
      {/* Image carousel */}
      <Link to={`/product/${product.id}`} className="block">
        <div
          className="relative overflow-hidden bg-card mb-5"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <img
            src={product.images[activeImage]}
            alt={product.name}
            className="w-full aspect-[4/5] object-cover transition-opacity duration-300"
            loading="lazy"
            draggable={false}
          />

          {/* Desktop arrows */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/70 text-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {product.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {product.images.map((_, i) => (
                <span
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    i === activeImage ? "bg-foreground" : "bg-foreground/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      {/* Info + Add to Cart */}
      <div className="flex items-start justify-between gap-3">
        <Link to={`/product/${product.id}`} className="min-w-0">
          <p className="text-sm tracking-[0.15em] uppercase text-foreground">
            {product.name}
          </p>
          <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2">
            {product.price} — Limited preorder
          </p>
        </Link>

        <button
          onClick={handleAddToCart}
          className="flex-shrink-0 w-10 h-10 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
          aria-label="Add to cart"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>

      {/* Size selector */}
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
