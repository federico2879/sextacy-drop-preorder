import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";

const SIZE_GUIDE = [
  { size: "XXS", it: "40",    chest: "78–83",   waist: "66–71",   hip: "80–84" },
  { size: "XS",  it: "42/44", chest: "84–89",   waist: "72–77",   hip: "85–91" },
  { size: "S",   it: "46/48", chest: "90–95",   waist: "78–83",   hip: "92–97" },
  { size: "M",   it: "48/50", chest: "96–101",  waist: "84–89",   hip: "98–103" },
  { size: "L",   it: "50/52", chest: "102–107", waist: "90–95",   hip: "104–109" },
  { size: "XL",  it: "54/56", chest: "108–113", waist: "96–101",  hip: "110–115" },
  { size: "XXL", it: "58/60", chest: "114–120", waist: "102–108", hip: "116–122" },
];

const SIZES = ["S", "M", "L", "XL"] as const;

const ProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const product = getProduct(id || "");
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({});

  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    setImageLoaded({});
    setActiveImage(0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Product not found.
      </div>
    );
  }

  const images = product.productPageImages;

  const goNext = () => {
    setImageLoaded({});
    setActiveImage((prev) => (prev + 1) % images.length);
  };
  const goPrev = () => {
    setImageLoaded({});
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPos({ x, y });
  };

  const handleAdd = () => {
    if (!selectedSize) {
      toast({ title: "Please select a size" });
      return;
    }
    addItem({
      productId: String(product.id),
      productName: product.name,
      size: selectedSize,
    });
    toast({ title: `${product.name} (${selectedSize}) added to cart` });
    setSelectedSize("");
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 400);
  };

  return (
    <main className="min-h-screen section-padding">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground transition-colors mb-12"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <div
            className="relative overflow-hidden bg-card group cursor-zoom-in"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={() => setIsZoomed(!isZoomed)}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setIsZoomed(false)}
          >
            {/* Skeleton placeholder */}
            {!imageLoaded[activeImage] && (
              <div className="absolute inset-0 bg-muted animate-pulse" />
            )}
            <img
              src={images[activeImage]}
              alt={product.name}
              className={`w-full aspect-[4/5] object-cover transition-all duration-500 ${
                imageLoaded[activeImage] ? "opacity-100" : "opacity-0"
              } ${isZoomed ? "scale-[2] cursor-zoom-out" : ""}`}
              style={isZoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
              onLoad={() => setImageLoaded((prev) => ({ ...prev, [activeImage]: true }))}
            />
            {images.length > 1 && !isZoomed && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/70 backdrop-blur-sm border border-border text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-background/70 backdrop-blur-sm border border-border text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-background"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setActiveImage(i); }}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        activeImage === i ? "bg-foreground" : "bg-foreground/30"
                      }`}
                      aria-label={`View image ${i + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`overflow-hidden bg-card border transition-colors ${
                    activeImage === i
                      ? "border-foreground"
                      : "border-border hover:border-muted-foreground"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full aspect-square object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-4">
            Drop // 01
          </p>
          <h1 className="text-2xl md:text-3xl tracking-[0.15em] uppercase text-foreground mb-4 font-medium">
            {product.name}
          </h1>
          <div className="mb-8">
            <p className="text-lg tracking-wide text-foreground">
              <span className="line-through opacity-60">€25</span>{" "}€20
            </p>
            <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground mt-2">
              Limited pieces available
            </p>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground mb-12 max-w-md whitespace-pre-line">
            {PRODUCT_DESCRIPTIONS[product.id] ?? "Heavyweight 240gsm cotton. Oversized boxy fit. Screen-printed front\ngraphic. Cut and sewn in Italy."}
          </p>

          {/* Size selector */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground">
                Size
              </p>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-xs tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Size Guide
              </button>
            </div>
            <div className="flex gap-3">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 border text-xs tracking-widest transition-colors ${
                    selectedSize === size
                      ? "border-foreground text-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`border border-foreground px-10 py-4 text-xs tracking-[0.3em] uppercase text-foreground transition-all duration-300 hover:bg-foreground hover:text-background w-fit ${
              addedAnimation ? "scale-95 bg-foreground text-background" : ""
            }`}
          >
            Add to Cart
          </button>
          <p className="text-[11px] tracking-[0.15em] text-muted-foreground mt-4 max-w-xs">
            Preorder — we'll contact you on WhatsApp to confirm your order
          </p>
        </div>
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={() => setShowSizeGuide(false)}
        >
          <div
            className="relative bg-card border border-border w-full max-w-sm p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close size guide"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground mb-6">
              Size Guide
            </p>
            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
              Measurements in cm. All garments are unisex with a relaxed fit.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left pb-3 pr-3 tracking-[0.15em] uppercase text-muted-foreground font-normal">Size</th>
                    <th className="text-left pb-3 pr-3 tracking-[0.15em] uppercase text-muted-foreground font-normal">IT</th>
                    <th className="text-left pb-3 pr-3 tracking-[0.15em] uppercase text-muted-foreground font-normal">Chest</th>
                    <th className="text-left pb-3 pr-3 tracking-[0.15em] uppercase text-muted-foreground font-normal">Waist</th>
                    <th className="text-left pb-3 tracking-[0.15em] uppercase text-muted-foreground font-normal">Hip</th>
                  </tr>
                </thead>
                <tbody>
                  {SIZE_GUIDE.map((row) => (
                    <tr key={row.size} className="border-b border-border/50 last:border-0">
                      <td className="py-3 pr-3 tracking-widest text-foreground">{row.size}</td>
                      <td className="py-3 pr-3 text-muted-foreground">{row.it}</td>
                      <td className="py-3 pr-3 text-muted-foreground">{row.chest}</td>
                      <td className="py-3 pr-3 text-muted-foreground">{row.waist}</td>
                      <td className="py-3 text-muted-foreground">{row.hip}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ProductPage;